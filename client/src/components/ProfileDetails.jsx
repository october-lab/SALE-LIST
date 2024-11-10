/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { MapPin, Image } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import IMAGES from '../images/images';
import SaleItemContainer from './SaleItemContainer';
import { BASE_API_URL, THEMES } from '../../constants';
import { useQuery } from 'react-query';
import { useEffectOnce } from './hooks/useEffectOnce';


import { getStoredData, getEventIdentifierFromSessionStorage } from '../utils';



const CreateListing = () => {
    const navigate = useNavigate();
    const [showImageSelector, setShowImageSelector] = useState(false);
    const { eventIdentifier: eventIdentifierParam } = useParams();


    const storedData = getStoredData();
    const [selectedImage, setSelectedImage] = useState(storedData?.selectedImage || IMAGES.image1);
    const [theme, setTheme] = useState(storedData?.theme || 'theme1');
    const [name, setName] = useState(storedData?.name || '');
    const [description, setDescription] = useState(storedData?.description || '');
    const [location, setLocation] = useState(storedData?.location || '');
    const [contacts, setContacts] = useState({
        phone: storedData?.phone || '',
        whatsapp: storedData?.whatsapp || '',
        instagram: storedData?.instagram || '',
        twitter: storedData?.twitter || '',
    });
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [contactError, setContactError] = useState('');
    const [showLocationInput, setShowLocationInput] = useState(false);
    const [listingItems, setListingItems] = useState([]);
    const [existingItems, setExistingItems] = useState([]);
    const themes = [
        { id: 'black-zinc', bgColor: 'bg-black', mainColor: 'bg-zinc-900' },
        { id: 'black-green', bgColor: 'bg-black', mainColor: 'bg-green-500' },
        { id: 'black-red', bgColor: 'bg-black', mainColor: 'bg-red-500' },
        { id: 'black-purple', bgColor: 'bg-black', mainColor: 'bg-purple-500' },
    ];


    const getEventIdentifier = async () => {
        const response = await axios.get(`${BASE_API_URL}/getListingId`);
        return response?.data;
    };

    const getItemsByEventIdentifier = async () => {
        let eventIdentifier = getEventIdentifierFromSessionStorage();
        const response = await axios.get(`${BASE_API_URL}/items/${eventIdentifier}`);
        return response?.data;
    };

    const getListingDetailsByEventIdentier = async () => {
        const response = await axios.get(`${BASE_API_URL}/listing/${eventIdentifierParam}`);
        return response?.data;
    };



    const {
        refetch
    } = useQuery("getEventIdentifier", getEventIdentifier, {
        enabled: false,
        onSuccess: (data) => {
            let eventIdentifier = getEventIdentifierFromSessionStorage();
            if (eventIdentifier == null) {
                addListingSessionStorage({ ...getStoredData(), eventIdentifier: data?.eventIdentifier });
            }
        }
    });

    const {
        refetch: refetchExistingItems
    } = useQuery("getItemsByEventIdentifier", getItemsByEventIdentifier, {
        enabled: false,
        onSuccess: (data) => {
            setExistingItems(data);
        }
    });


    const {
        isLoading: detailsLoading,
        refetch: refetchDetails
    } = useQuery("getListingDetailsByEventIdentier", getListingDetailsByEventIdentier, {
        enabled: false,
        onSuccess: (data) => {
            addListingSessionStorage(data?.eventDetails);
            const storedData = getStoredData();
            setName(storedData.name || '');
            setDescription(storedData.description || '');
            setLocation(storedData.location || '');
            setTheme(storedData.theme || themes[0].id);
            setSelectedImage(storedData.selectedImage || '');
            setContacts({
                phone: storedData.phone || '',
                instagram: storedData.instagram || '',
                whatsapp: storedData.whatsapp || '',
                twitter: storedData.twitter || ''
            });
            setExistingItems(data?.items);

        }
    });




    const addListingSessionStorage = (eventData) => {
        sessionStorage.setItem('listing-info', JSON.stringify(eventData));
    }

    const getListingPayload = () => {
        return {
            name,
            description,
            location,
            theme,
            selectedImage,
            ...contacts
        }
    }

    const formChanged = (src, target) => {
        for (let key in src) {
            if (src[key] !== target[key]) {
                return true;
            }
        }
        return false;
    };

    const hasFieldChanges = () => {
        const storedData = getStoredData();
        const currentData = getListingPayload();
        return formChanged(storedData, currentData);
    };

    const handleUpdateListing = async () => {
        try {

            let eventIdentifier = getEventIdentifierFromSessionStorage();
            let payload = getListingPayload();


            if (eventIdentifier) {
                payload.eventIdentifier = eventIdentifier;
                const response = await axios.post(`${BASE_API_URL}/updateListing`, payload);
                if (response?.data?.eventIdentifier) {
                    let eventData = response?.data;
                    addListingSessionStorage(eventData);
                }

            }
        } catch (error) {
            console.error('Error updating listing:', error);
        }
    };

    const handleContinue = async () => {
        let hasError = false;
        setNameError('');
        setDescriptionError('');
        setLocationError('');
        setContactError('');

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
            await handleUpdateListing();
            navigate('/create/congrats');
        }
    };

    const handleContactChange = (type, value) => {
        setContacts(prev => ({ ...prev, [type]: value }));
        addListingSessionStorage({ ...getStoredData(), [type]: value });
    };

    const handleImageSelect = (image) => {
        setSelectedImage(image);
        addListingSessionStorage({ ...getStoredData(), selectedImage: image });
        setShowImageSelector(false);
    };

    useEffect(() => {
        handleImageSelect(selectedImage);
    }, []);



    useEffectOnce(() => {
        if (eventIdentifierParam) {
            refetchDetails()
        } else {
            let eventIdentifier = getEventIdentifierFromSessionStorage();
            if (eventIdentifier == null) {
                refetch();
            } else {
                refetchExistingItems();
            }
        }

    }, []);

    const handleSetListingItems = (items) => {
        setListingItems([...listingItems, items]);
    }

    const handleThemeChange = (theme) => {
        addListingSessionStorage({ ...getStoredData(), theme });
        setTheme(theme);
    }



    return (
        <div className={`min-h-screen ${THEMES[theme].bgColor} p-4 md:p-8`}>
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="relative">
                        <div className={`aspect-video rounded-lg`}>
                            <img src={selectedImage} alt="Selected" className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <button
                            className="btn btn-sm btn-circle absolute top-2 left-2"
                            onClick={() => setShowImageSelector(true)}
                        >
                            <Image className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex gap-4 items-center">
                        <span className="text-white">Select theme</span>
                        <div className="flex gap-2">
                            {
                                // Convert THEMES object into array of [key, value] pairs and map over them
                                // key is the theme id (e.g. 'black-zinc') and t is the theme object with bgColor and mainColor
                                Object.entries(THEMES).map(([key, t]) => (
                                    <button
                                        key={key}
                                        className={`w-8 h-8 rounded-full relative overflow-hidden ${theme === key ? 'ring-2 ring-white' : 'ring-2'}`}
                                        onClick={() => handleThemeChange(key)}
                                    >
                                        <div className="absolute inset-0 flex">
                                            <div className={`w-1/2 h-full ${t.bgColor}`}></div>
                                            <div className={`w-1/2 h-full ${t.mainColor} `}></div>
                                        </div>
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className={`space-y-6 ${THEMES[theme].mainColor} p-4 rounded-lg shadow-lg`}>
                    {detailsLoading ? (
                        <div className="flex justify-center items-center h-96">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-4 items-center">
                                <h1 className="text-xl font-bold text-white">Create your listing</h1>
                                <div>
                                    {
                                        !showLocationInput && (
                                            <button
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-thin text-sm justify-start bg-black"
                                                onClick={() => setShowLocationInput(true)}
                                            >
                                                <MapPin size={16} />
                                                {location ? location : 'Select Location'}
                                            </button>
                                        )
                                    }

                                    {showLocationInput && (
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-[50%] transform -translate-y-[50%] text-gray-400" size={16} />
                                            <Input
                                                type="text"
                                                placeholder="Enter location"
                                                className="w-full p-2 pl-10 mt-2 rounded-lg bg-black text-white"
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    {locationError && <p className="text-red-500 text-sm mt-1">{locationError}</p>}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="form-control">
                                    <Input
                                        type="text"
                                        placeholder="Title"
                                        className={`w-full p-3 rounded-lg bg-black text-white border-0 ${nameError ? 'border-red-500' : ''}`}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
                                </div>

                                <div className="form-control">
                                    <Textarea
                                        placeholder="Description"
                                        rows={4}
                                        className={`w-full p-3 rounded-lg bg-black text-white border-0 ${descriptionError ? 'border-red-500' : ''}`}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    {descriptionError && <p className="text-red-500 text-sm mt-1">{descriptionError}</p>}
                                </div>

                                <div>
                                    <div className="text-white mb-4">Contact Information</div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Input
                                                type="text"
                                                placeholder="Phone Number"
                                                className="w-full p-3 rounded-lg bg-black border-0 text-white"
                                                value={contacts.phone}
                                                onChange={(e) => handleContactChange('phone', e.target.value)}
                                            />
                                            <Input
                                                type="text"
                                                placeholder="Instagram"
                                                className="w-full p-3 rounded-lg bg-black border-0 text-white"
                                                value={contacts.instagram}
                                                onChange={(e) => handleContactChange('instagram', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Input
                                                type="text"
                                                placeholder="WhatsApp"
                                                className="w-full p-3 rounded-lg bg-black border-0 text-white"
                                                value={contacts.whatsapp}
                                                onChange={(e) => handleContactChange('whatsapp', e.target.value)}
                                            />
                                            <Input
                                                type="text"
                                                placeholder="Twitter"
                                                className="w-full p-3 rounded-lg bg-black border-0 text-white"
                                                value={contacts.twitter}
                                                onChange={(e) => handleContactChange('twitter', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {contactError && <p className="text-red-500 text-sm mt-2">{contactError}</p>}
                                </div>

                                <div className="space-y-4">
                                    <div className="text-white">Inventory Image(s)</div>
                                    <SaleItemContainer handleSetListingItems={handleSetListingItems} listingItems={listingItems} existingItems={existingItems} />
                                </div>

                                <button
                                    className="w-full py-3 bg-white rounded-lg text-black font-medium hover:bg-gray-100 transition-colors"
                                    onClick={handleContinue}
                                >
                                    Publish Listing
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {showImageSelector && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-base-100 p-6 rounded-lg w-96">
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
    );
};

export default CreateListing;
