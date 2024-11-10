import { DataTypes } from 'sequelize';
import sequelize from './db.js';

// Define a model for the 'products' table
export const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    awsImageKey: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    eventIdentifier: {
        type: DataTypes.STRING,
        allowNull: true,
    },

});

// name, email, description, location, phoneNumber, instagram, telegram, twitter, whatsapp
export const Listing = sequelize.define('Listing', {
    userId: {
        type: DataTypes.NUMBER,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bgColor: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    theme: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    eventIdentifier: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    whatsapp: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    twitter: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telegram: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    selectedImage: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

