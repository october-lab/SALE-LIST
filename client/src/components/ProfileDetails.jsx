/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { PlusCircle, Info, MapPin } from 'lucide-react'; // Added Info icon for description
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        <div className="card bg-base-100 shadow-xl max-w-md mx-auto">
            <div className="card-body">
                <h1 className="card-title text-3xl font-bold justify-center">Add Listing Details</h1>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Select a profile image</h2>
                    <div className="flex justify-center space-x-4">
                        {profileImages.map((image) => (
                            <button
                                key={image.id}
                                onClick={() => setSelectedImage(image.id)}
                                className={`btn btn-circle w-16 h-16 p-0 overflow-hidden ${selectedImage === image.id ? 'ring ring-primary ring-offset-base-100 ring-offset-2' : ''}`}
                            >
                                <div className="w-full h-full flex">
                                    <div className={`w-1/2 ${image.colors[0]}`}></div>
                                    <div className={`w-1/2 ${image.colors[1]}`}></div>
                                </div>
                            </button>
                        ))}
                        <button className="btn btn-circle w-16 h-16">
                            <PlusCircle className="w-8 h-8 text-gray-400" />
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Add Listing name, description, and location</h2>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Listing name</span>
                        </label>
                        <div className="input-group">
                            <span><Info className="text-gray-500" /></span>
                            <input
                                type="text"
                                placeholder="Listing name"
                                className={`input input-bordered w-full ${nameError ? 'input-error' : ''}`}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        {nameError && <label className="label"><span className="label-text-alt text-error">{nameError}</span></label>}
                    </div>

                    <div className="form-control w-full mt-4">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            placeholder="Description"
                            className={`textarea textarea-bordered h-24 ${descriptionError ? 'textarea-error' : ''}`}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <label className="label">
                            <span className="label-text-alt text-gray-500">{description.length}/80</span>
                            {descriptionError && <span className="label-text-alt text-error">{descriptionError}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full mt-4">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <div className="input-group">
                            <span><MapPin className="text-gray-500" /></span>
                            <input
                                type="text"
                                placeholder="Location"
                                className={`input input-bordered w-full ${locationError ? 'input-error' : ''}`}
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        {locationError && <label className="label"><span className="label-text-alt text-error">{locationError}</span></label>}
                    </div>
                </div>

                <div className="card-actions justify-end">
                    <button
                        onClick={handleContinue}
                        className="btn btn-primary w-full"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetailsForm;