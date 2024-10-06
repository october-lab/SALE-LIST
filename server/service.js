import dotenv from 'dotenv';
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Product } from './model.js';
dotenv.config();


export const fetchItemsWithSignedUrls = async (listingId, s3Client) => {
    const items2 = await Product.findAll({
        raw: true, where: {
            listingId
        }
    });

    return await Promise.all(items2.map(async (item) => {
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
};
