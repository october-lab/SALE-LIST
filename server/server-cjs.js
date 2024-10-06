require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 5555;

app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create Item model
const Item = mongoose.model('Item', {
    name: String,
    price: Number,
    imageUrl: String,
    awsImageKey: String,
});

// Configure AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Configure Multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // limit file size to 5MB
    },
});

app.use(express.json());

// API route to upload an item
app.post('/api/items', upload.single('image'), async (req, res) => {
    try {
        const { name, price } = req.body;
        const file = req.file;

        // Upload image to S3
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${uuidv4()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        const s3UploadResult = await s3.upload(params).promise();

        // Create new item in database
        const newItem = new Item({
            name,
            price,
            imageUrl: s3UploadResult.Location,
            awsImageKey: params.Key
        });

        await newItem.save();

        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading item' });
    }
});

// API route to get all items
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        const itemsWithSignedUrls = await Promise.all(items.map(async (item) => {
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: item.awsImageKey,
                Expires: 60 * 60 // URL expires in 5 minutes
            };
            const signedUrl = await s3.getSignedUrlPromise('getObject', params);
            return {
                ...item.toObject(),
                imageUrl: signedUrl
            };
        }));
        res.json(itemsWithSignedUrls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching items' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});