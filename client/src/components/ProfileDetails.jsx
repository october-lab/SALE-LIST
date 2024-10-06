/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { PlusCircle, Info, MapPin } from 'lucide-react'; // Added Info icon for description
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Input, Textarea } from "@nextui-org/react";

const isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (error) {
        return false;
    }
    return true;
}

const ProfileDetailsForm = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const getStoredData = () => {
        const storedData = sessionStorage.getItem('listing-info');
        return isJsonString(storedData) ? JSON.parse(storedData) : {};
    };

    const storedData = getStoredData();

    const [name, setName] = useState(storedData?.name || '');
    const [description, setDescription] = useState(storedData?.description || '');
    const [location, setLocation] = useState(storedData?.location || '');
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [locationError, setLocationError] = useState('');
    const navigate = useNavigate();

    const profileImages = [
        { id: 1, colors: ['bg-cyan-300', 'bg-blue-600'] },
        { id: 2, colors: ['bg-red-400', 'bg-fuchsia-500'] },
        { id: 3, colors: ['bg-green-400', 'bg-yellow-300'] },
    ];


    const addListingSessionStorage = (eventData) => {
        sessionStorage.setItem('listing-info', JSON.stringify(eventData));
    }


    const getListingIdFromSessionStorage = () => {
        if (isJsonString(sessionStorage.getItem('listing-info'))) {
            const listingInfo = JSON.parse(sessionStorage.getItem('listing-info'));
            return listingInfo?.id;
        }
        return null;
    }


    const getListingPayload = () => {
        return {
            name,
            description,
            location,
        }
    }


    const formChanged = (src, target) => {
        // Check if both objects have the same keys and values
        for (let key in src) {
            if (src[key] !== target[key]) {
                return true; // If any value is different, return true
            }
        }
        return false; // If all values are the same, return false
    };

    const hasFieldChanges = () => {
        const storedData = JSON.parse(sessionStorage.getItem('listing-info'));
        const currentData = getListingPayload();
        return formChanged(storedData, currentData);
    };

    const handleCreateListing = async () => {
        try {

            let currentListingId = getListingIdFromSessionStorage();
            if (!currentListingId) {
                let payload = getListingPayload()
                const response = await axios.post('http://localhost:5555/api/createListing', payload);
                if (response?.data?.eventIdentifier) {
                    let eventData = response?.data;
                    addListingSessionStorage(eventData)
                }
            } else {
                if (hasFieldChanges()) {
                    let payload = getListingPayload();
                    payload.id = currentListingId;
                    const response = await axios.post('http://localhost:5555/api/updateListing', payload);
                    if (response?.data?.eventIdentifier) {
                        let eventData = response?.data;
                        sessionStorage.setItem('listing-info', JSON.stringify(eventData))
                    }
                }

            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };


    const handleContinue = () => {
        let hasError = false;
        setNameError('');
        setDescriptionError('');
        setLocationError('');

        if (name.trim() === '') {
            setNameError('Listing name is required.');
            hasError = true;
        } else if (name.length > 80) {
            setNameError('Listing name cannot exceed 80 characters.');
            hasError = true;
        }

        if (description.length > 80) {
            setDescriptionError('Description cannot exceed 80 characters.');
            hasError = true;
        }

        if (location.trim() === '') {
            setLocationError('Location is required.');
            hasError = true;
        }

        if (!hasError) {
            let currentPagePayload = getListingPayload();
            let currentSessionPayload = getStoredData();
            let combinedPayload = { ...currentSessionPayload, ...currentPagePayload };
            addListingSessionStorage(combinedPayload)
            navigate('/create/contact-details');
        }
    };

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader className="flex flex-col items-center">
                <h1 className="text-3xl font-bold">Add Listing Details</h1>
            </CardHeader>

            <CardBody>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Select a profile image</h2>
                    <div className="flex justify-center space-x-4">
                        {profileImages.map((image) => (
                            <Button
                                key={image.id}
                                onClick={() => setSelectedImage(image.id)}
                                className={`w-16 h-16 min-w-unit-16 rounded-full overflow-hidden ${selectedImage === image.id ? 'border-2 border-purple-500' : ''}`}
                            >
                                <div className="w-full h-full flex">
                                    <div className={`w-1/2 ${image.colors[0]}`}></div>
                                    <div className={`w-1/2 ${image.colors[1]}`}></div>
                                </div>
                            </Button>
                        ))}
                        <Button className="w-16 h-16 min-w-unit-16 rounded-full">
                            <PlusCircle className="w-8 h-8 text-gray-400" />
                        </Button>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Add Listing name, description, and location</h2>
                    <Input
                        type="text"
                        placeholder="Listing name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        startContent={<Info className="text-gray-500" />}
                        isInvalid={!!nameError}
                        errorMessage={nameError}
                        className="mb-3"
                    />
                    <Textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        isInvalid={!!descriptionError}
                        errorMessage={descriptionError}
                        className="mb-2"
                    />
                    <div className="text-right text-sm text-gray-500 mb-2">{description.length}/80</div>
                    <Input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        startContent={<MapPin className="text-gray-500" />}
                        isInvalid={!!locationError}
                        errorMessage={locationError}
                    />
                </div>
            </CardBody>

            <CardFooter>
                <Button
                    onClick={handleContinue}
                    color="primary"
                    className="w-full"
                >
                    Continue
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProfileDetailsForm;