import React, { useState, useContext } from 'react';
import { Instagram, Phone, Twitter, SendIcon, MessageCircleCode } from 'lucide-react'; // Removed unused icons
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Input } from "@nextui-org/react";

const isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (error) {
        return false;
    }
    return true;
}

const getStoredData = () => {
    const storedData = sessionStorage.getItem('listing-info');
    return isJsonString(storedData) ? JSON.parse(storedData) : {};
};

const ContactDetails = () => {
    const { setCurrentPage } = useContext(AppContext);
    const [instagram, setInstagram] = useState('');
    const storedData = getStoredData();
    const [phone, setPhone] = useState(storedData?.phone || ''); // New phone state
    const [whatsapp, setWhatsapp] = useState(storedData?.whatsapp || ''); // New whatsapp state
    const [twitter, setTwitter] = useState(storedData?.twitter || ''); // New twitter state
    const [telegram, setTelegram] = useState(storedData?.telegram || ''); // New telegram state
    const [contactError, setContactError] = useState('');
    const navigate = useNavigate();

    const getListingPayload = () => {
        return {
            instagram,
            phone,
            whatsapp,
            twitter,
            telegram,
        };
    };

    const addListingSessionStorage = (eventData) => {
        sessionStorage.setItem('listing-info', JSON.stringify(eventData));
    };

    const getListingIdFromSessionStorage = () => {
        if (isJsonString(sessionStorage.getItem('listing-info'))) {
            const listingInfo = JSON.parse(sessionStorage.getItem('listing-info'));
            return listingInfo?.id;
        }
        return null;
    };

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
        if (!instagram && !phone && !whatsapp && !twitter && !telegram) {
            setContactError('At least one link is required.');
        } else {
            setContactError('');
            let currentPagePayload = getListingPayload();
            let currentSessionPayload = getStoredData();
            let combinedPayload = { ...currentSessionPayload, ...currentPagePayload };
            addListingSessionStorage(combinedPayload);
            await handleUpdateListing();
            navigate('/create/congrats'); // Replace with the actual next page route
        }
    };

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader className="flex flex-col items-center">
                <h1 className="text-3xl font-bold">Add your contact details</h1>
                <p className="text-default-500">
                    Add at least one contact detail so that people can contact you.
                </p>
            </CardHeader>

            <CardBody>
                <div className="space-y-4">
                    <Input
                        type="tel"
                        label="Phone number"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        startContent={<Phone className="text-blue-500" />}
                    />
                    <Input
                        type="tel"
                        label="WhatsApp number"
                        placeholder="Enter your WhatsApp number"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        startContent={<MessageCircleCode className="text-green-500" />}
                    />


                    <h2 className="text-xl font-semibold text-center">Suggested platforms</h2>

                    <Input
                        type="text"
                        label="Instagram username"
                        placeholder="Enter your Instagram username"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        startContent={<Instagram className="text-pink-500" />}
                    />
                    <Input
                        type="text"
                        label="Twitter handle"
                        placeholder="Enter your Twitter handle"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        startContent={<Twitter className="text-blue-400" />}
                    />
                    <Input
                        type="text"
                        label="Telegram username"
                        placeholder="Enter your Telegram username"
                        value={telegram}
                        onChange={(e) => setTelegram(e.target.value)}
                        startContent={<SendIcon className="text-blue-600" />}
                    />
                </div>

                {contactError && (
                    <p className="text-danger text-sm mt-2">{contactError}</p>
                )}
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

export default ContactDetails;