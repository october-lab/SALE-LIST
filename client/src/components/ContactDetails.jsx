import React, { useState, useContext } from 'react';
import { Instagram, Phone, Twitter, SendIcon, MessageCircleCode } from 'lucide-react'; // Removed unused icons
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <div className="card bg-base-100 shadow-xl max-w-md mx-auto">
            <div className="card-body">
                <h1 className="card-title text-3xl font-bold text-center">Add your contact details</h1>
                <p className="text-center">
                    Add at least one contact detail so that people can contact you.
                </p>

                <div className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone number</span>
                        </label>
                        <label className="input-group">
                            <span><Phone className="text-blue-500" /></span>
                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                className="input input-bordered w-full"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">WhatsApp number</span>
                        </label>
                        <label className="input-group">
                            <span><MessageCircleCode className="text-green-500" /></span>
                            <input
                                type="tel"
                                placeholder="Enter your WhatsApp number"
                                className="input input-bordered w-full"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                            />
                        </label>
                    </div>

                    <h2 className="text-xl font-semibold text-center mt-6">Suggested platforms</h2>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Instagram username</span>
                        </label>
                        <label className="input-group">
                            <span><Instagram className="text-pink-500" /></span>
                            <input
                                type="text"
                                placeholder="Enter your Instagram username"
                                className="input input-bordered w-full"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Twitter handle</span>
                        </label>
                        <label className="input-group">
                            <span><Twitter className="text-blue-400" /></span>
                            <input
                                type="text"
                                placeholder="Enter your Twitter handle"
                                className="input input-bordered w-full"
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Telegram username</span>
                        </label>
                        <label className="input-group">
                            <span><SendIcon className="text-blue-600" /></span>
                            <input
                                type="text"
                                placeholder="Enter your Telegram username"
                                className="input input-bordered w-full"
                                value={telegram}
                                onChange={(e) => setTelegram(e.target.value)}
                            />
                        </label>
                    </div>
                </div>

                {contactError && (
                    <p className="text-error text-sm mt-2">{contactError}</p>
                )}

                <div className="card-actions justify-end mt-6">
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

export default ContactDetails;