import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import cors from 'cors';
import sharp from 'sharp';
import { Product, Listing } from './model.js';
import sequelize from './db.js';
import { fetchItemsWithSignedUrls } from './service.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 5555;
app.use(cors());

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create Item model
const Item = mongoose.model('Item', {
    name: String,
    price: Number,
    imageKey: String,
    awsImageKey: String,
});


// Sync the model with the database

sequelize.sync({ alter: true }).then(() => {
    console.log('Database synchronized');
});


// Configure AWS
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

app.use(express.json());





// Configure Multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // limit file size to 5MB
    },
});



function get8DigitUuid() {
    const fullUuid = uuidv4();
    return fullUuid.replace(/-/g, '').substring(0, 8);
}


app.get('/api/getListingId', async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const eventIdentifier = get8DigitUuid();
        const listing = await Listing.create({
            userId: 124,
            eventIdentifier: eventIdentifier,
            active: true
        }, { transaction });

        await transaction.commit();
        res.status(201).json({ eventIdentifier: eventIdentifier });
    }
    catch (error) {
        await transaction.rollback();
        console.error(error);
        res.status(500).json({ message: 'error in creating listing id' });
    }
});

// app.post('/api/createListing', async (req, res) => {
//     const transaction = await sequelize.transaction();
//     try {
//         const { name, email, description, location, phone, instagram, telegram, twitter, whatsapp, selectedImage } = req.body;

//         const eventIdentifier = get8DigitUuid();
//         const listing = await Listing.create({
//             userId: 124,
//             name,
//             email,
//             description,
//             location,
//             phone,
//             instagram,
//             telegram,
//             twitter,
//             whatsapp,
//             eventIdentifier: eventIdentifier,
//             selectedImage,
//             active: true
//         }, { transaction });

//         await transaction.commit();
//         res.status(201).json(listing);
//     }
//     catch (error) {
//         await transaction.rollback();
//         console.error(error);
//         res.status(500).json({ message: 'Error uploading item' });
//     }
// });



app.post('/api/updateListing', async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { name, email, description, location, phone, instagram, telegram, twitter, whatsapp, id, selectedImage, eventIdentifier, theme } = req.body;
        let currentListing = await Listing.findOne({
            where: {
                eventIdentifier: eventIdentifier
            }
        })
        const listing = await currentListing.update({
            userId: 124,
            name,
            email,
            description,
            location,
            phone,
            instagram,
            telegram,
            twitter,
            whatsapp,
            selectedImage,
            theme,
            active: true,
        }, { transaction });

        await transaction.commit();
        res.status(201).json(listing);
    }
    catch (error) {
        await transaction.rollback();
        console.error(error);
        res.status(500).json({ message: 'Error uploading item' });
    }
});


// API route to create a new item
app.post('/api/items', upload.single('image'), async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { name, price, eventIdentifier } = req.body;
        const file = req.file;

        const fileBuffer = await sharp(file.buffer)
            .resize({
                width: 1080,
                height: 720,
                fit: sharp.fit.cover,
                position: sharp.strategy.entropy
            })
            .webp()
            .toBuffer()
        // Upload image to S3
        const putObjectParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${uuidv4()}-${file.originalname}`,
            Body: fileBuffer,
            ContentType: file.mimetype,
        };

        const command = new PutObjectCommand(putObjectParams);
        let uploadres = await s3Client.send(command);
        const product = await Product.create({ name, price, imageUrl: uploadres.Location, awsImageKey: putObjectParams.Key, eventIdentifier }, { transaction });
        await transaction.commit();
        res.status(201).json(product);
    }
    catch (error) {
        await transaction.rollback();
        console.error(error);
        res.status(500).json({ message: 'Error uploading item' });
    }
});

// API route to get all items with signed URLs
app.get('/api/items', async (req, res) => {
    try {
        let eventIdentifier = req.query.eventIdentifier;
        const items2 = await Product.findAll({
            raw: true, where: {
                eventIdentifier
            }
        });
        const itemsWithSignedUrls = await Promise.all(items2.map(async (item) => {
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: item.awsImageKey,
            };
            const command = new GetObjectCommand(params);
            const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 * 5 }); // URL expires in 5 minutes
            return {
                ...item,
                imageUrl: signedUrl
            };
        }));
        res.json(itemsWithSignedUrls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching items' });
    }
});


app.get('/api/listing/:eventIdentifier', async (req, res) => {
    try {
        let eventIdentifier = req.params.eventIdentifier;
        const eventDetails = await Listing.findOne({
            where: {
                eventIdentifier
            }
        });

        const items = await fetchItemsWithSignedUrls(eventIdentifier, s3Client);
        res.json({ eventDetails, items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching listing' });
    }
});


app.get('/api/details/:eventIdentifier', async (req, res) => {
    try {
        let eventIdentifier = req.params.eventIdentifier;
        const eventDetails = await Listing.findOne({
            where: {
                eventIdentifier
            }
        });
        res.json({ eventDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching listing' });
    }
});

app.get('/api/items/:eventIdentifier', async (req, res) => {
    try {
        let eventIdentifier = req.params.eventIdentifier;
        const items = await fetchItemsWithSignedUrls(eventIdentifier, s3Client);
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching items' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});