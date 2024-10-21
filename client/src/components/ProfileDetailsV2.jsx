/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { PlusCircle, Info, MapPin, NotebookTabs, Phone, MessageCircle, Instagram, Twitter, X, Image } from 'lucide-react'; // Added Image icon
import { useNavigate } from 'react-router-dom';
import IMAGES from '../images/images';
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
    const [showImageSelector, setShowImageSelector] = useState(false);

    const getStoredData = () => {
        const storedData = sessionStorage.getItem('listing-info');
        return isJsonString(storedData) ? JSON.parse(storedData) : {};
    };

    const storedData = getStoredData();
    const [selectedImage, setSelectedImage] = useState(storedData?.selectedImage || IMAGES.image1);
    const [name, setName] = useState(storedData?.name || '');
    const [description, setDescription] = useState(storedData?.description || '');
    const [location, setLocation] = useState(storedData?.location || '');
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [locationError, setLocationError] = useState('');
    const navigate = useNavigate();
    const [activeContact, setActiveContact] = useState('phone');
    const [contacts, setContacts] = useState({
        phone: storedData?.phone || '',
        whatsapp: storedData?.whatsapp || '',
        instagram: storedData?.instagram || '',
        twitter: storedData?.twitter || '',
    });
    const [contactError, setContactError] = useState('');

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


    const handleUpdateListing = async () => {
        try {
            let currentListingId = getListingIdFromSessionStorage();
            let payload = getStoredData();
            if (!currentListingId) {
                const response = await axios.post('http://localhost:5555/api/createListing', payload);
                if (response?.data?.eventIdentifier) {
                    let eventData = response?.data;
                    addListingSessionStorage(eventData);
                }
            } else {
                if (hasFieldChanges()) {
                    payload.id = currentListingId;
                    const response = await axios.post('http://localhost:5555/api/updateListing', payload);
                    if (response?.data?.eventIdentifier) {
                        let eventData = response?.data;
                        sessionStorage.setItem('listing-info', JSON.stringify(eventData));
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleContinue = async () => {
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

        if (!contacts.phone && !contacts.whatsapp && !contacts.instagram && !contacts.twitter) {
            setContactError('Please add at least one contact method.');
            hasError = true;
        }

        if (!hasError) {
            let currentPagePayload = getListingPayload();
            let currentSessionPayload = getStoredData();
            let combinedPayload = { ...currentSessionPayload, ...currentPagePayload };
            addListingSessionStorage(combinedPayload)
            await handleUpdateListing();
            navigate('/create/congrats'); // Replace with the actual next page route
        }
    };

    const handleAddContact = (type) => {
        setActiveContact(type);
    };


    const handleContactChange = (e) => {
        let updatedContacts = { ...contacts, [activeContact]: e.target.value };

        setContacts(updatedContacts);
        addListingSessionStorage({ ...getStoredData(), ...updatedContacts });
    };

    const handleImageSelect = (image) => {
        setSelectedImage(image);
        let selectedObj = { ...getStoredData(), selectedImage: image };
        addListingSessionStorage(selectedObj)
        setShowImageSelector(false);
    };

    useEffect(() => {
        handleImageSelect(selectedImage)
    }, [])




    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow container mx-auto p-2 md:p-8">
                <div className="bg-base-100 rounded-lg shadow-xl p-2 md:p-8 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row md:space-x-8">
                        <div className="md:w-1/3 mb-6 md:mb-0">
                            <div className="relative">
                                <img src={selectedImage} alt="Event" className="w-full h-48 md:h-full object-cover rounded-lg" />
                                <button
                                    className="btn btn-sm btn-circle absolute top-2 left-2"
                                    onClick={() => setShowImageSelector(true)}
                                >
                                    <Image className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-3">Select a profile image</h2>
                                <div className="flex justify-center space-x-4">
                                    {profileImages.map((image) => (
                                        <button
                                            key={image.id}
                                            onClick={() => setSelectedImage(image.id)}
                                            className={`btn btn-circle w-8 h-8 p-0 overflow-hidden ${selectedImage === image.id ? 'ring ring-primary ring-offset-base-100 ring-offset-2' : ''}`}
                                        >
                                            <div className="w-full h-full flex">
                                                <div className={`w-1/2 ${image.colors[0]}`}></div>
                                                <div className={`w-1/2 ${image.colors[1]}`}></div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="md:w-2/3">
                            <div className="form-control mb-4">
                                <input
                                    type="text"
                                    placeholder="Listing Name"
                                    className={`input input-bordered w-full text-2xl font-bold ${nameError ? 'input-error' : ''}`}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {nameError && <label className="label"><span className="label-text-alt text-error">{nameError}</span></label>}
                            </div>

                            <div className="form-control w-full mb-4">

                                <label className="input input-bordered flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Location"
                                        className={`grow${locationError ? 'input-error' : ''}`}
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </label>
                                {locationError && <label className="label"><span className="label-text-alt text-error">{locationError}</span></label>}
                            </div>


                            <div className="form-control mb-4">
                                <textarea
                                    placeholder="Add Description"
                                    className={`textarea textarea-bordered h-24 ${descriptionError ? 'textarea-error' : ''}`}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                                <div className="flex justify-between pt-2">
                                    <span className="label-text-alt text-gray-500">{description.length}/80</span>
                                    {descriptionError && <span className="label-text-alt text-error">{descriptionError}</span>}
                                </div>
                            </div>

                            <div className="form-control w-full mt-4">
                                <h3 className="text-lg font-semibold mb-2">Add Contact Information</h3>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleAddContact('phone')}
                                        className={`btn  btn-circle ${contacts.phone ? 'btn-neutral' : 'btn-warning'}`}
                                    >
                                        <Phone className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={() => handleAddContact('whatsapp')}
                                        className={`btn btn-circle ${contacts.whatsapp ? 'btn-neutral' : 'btn-warning'}`}
                                    >
                                        <MessageCircle className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={() => handleAddContact('instagram')}
                                        className={`btn btn-circle ${contacts.instagram ? 'btn-neutral' : 'btn-warning'}`}
                                    >
                                        <Instagram className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={() => handleAddContact('twitter')}
                                        className={`btn btn-circle  ${contacts.twitter ? 'btn-neutral' : 'btn-warning'}`}
                                    >
                                        <Twitter className="w-6 h-6" />
                                    </button>
                                    <div className="form-control w-full mb-4 mt-2">

                                        <label className="input input-bordered flex items-center gap-2">
                                            <input
                                                type="text"
                                                placeholder={`Enter ${activeContact}`}
                                                className={`grow${locationError ? 'input-error' : ''}`}
                                                value={contacts[activeContact]}
                                                onChange={handleContactChange}
                                            />
                                        </label>
                                        {locationError && <label className="label"><span className="label-text-alt text-error">{locationError}</span></label>}
                                    </div>
                                </div>

                                {contactError && <p className="text-error text-sm mt-2">{contactError}</p>}
                            </div>
                            <button
                                onClick={handleContinue}
                                className="btn btn-primary w-full mt-6"
                            >
                                Continue
                            </button>

                        </div>
                    </div>
                    {showImageSelector && (
                        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-base-100 p-6 rounded-lg w-96">
                                <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-base-100 rounded-lg p-6 w-11/12 max-w-2xl">
                                        <h3 className="text-lg font-semibold mb-4">Select Background Image</h3>

                                        <div className="flex flex-wrap gap-4">
                                            {Object.entries(IMAGES).map(([key, src]) => (
                                                <div key={key} className="relative aspect-w-16 aspect-h-9 cursor-pointer h-16 w-16" onClick={() => handleImageSelect(src)}>
                                                    <img src={src} alt={key} className="object-cover rounded-lg hover:opacity-75 transition-opacity" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-6 flex justify-end">
                                            <button className="btn btn-sm btn-ghost" onClick={() => setShowImageSelector(false)}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProfileDetailsForm;