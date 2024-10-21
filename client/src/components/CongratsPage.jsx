import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';

const CongratsPage = () => {
    const navigate = useNavigate();

    const getEventIdentifier = () => {
        const storedData = sessionStorage.getItem('listing-info');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            return parsedData.eventIdentifier;
        }
        return null;
    };

    const eventIdentifier = getEventIdentifier();
    const listingUrl = eventIdentifier ? `http://localhost:5173/${eventIdentifier}` : '';

    const handleAddInventory = () => {
        navigate('/add-items');
    };

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(listingUrl)
            .then(() => alert('Listing URL copied to clipboard!'))
            .catch(err => console.error('Failed to copy: ', err));
    };

    return (
        <div className="bg-gray-900 text-white p-6 max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-red-800 to-red-900 rounded-lg p-6 mb-6">
                <div className="flex items-start">
                    <div className="w-1/3 mr-4">
                        <img src="/path-to-your-image.jpg" alt="Event" className="w-full rounded-lg" />
                    </div>
                    <div className="w-2/3">
                        <h1 className="text-2xl font-bold mb-2">Your Event Name</h1>
                        <p className="mb-2">Sunday 13 October</p>
                        <p className="mb-2">6:30 pm - 7:30 pm</p>
                        <p className="mb-4">Register to See Address</p>
                        <div className="bg-red-950 p-4 rounded-lg">
                            <p className="mb-2">Welcome! To join the event, please register below.</p>
                            <button className="bg-white text-red-900 w-full py-2 rounded-lg font-bold">
                                One-Click Register
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm">{listingUrl}</div>
                    <button onClick={handleCopyUrl} className="bg-red-950 px-3 py-1 rounded">COPY</button>
                </div>
            </div>


            <div className="flex space-x-4 mb-6">
                <button className="bg-gray-800 text-white px-4 py-2 rounded-lg flex-grow">Edit Event</button>
                <button className="bg-gray-800 text-white px-4 py-2 rounded-lg flex-grow">Change Photo</button>
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold">Invitations</h2>
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">+ Invite Guests</button>
                </div>
                <p className="text-gray-400">Invite subscribers, contacts and past guests via email or SMS.</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold mb-2">No Invitations Sent</h3>
                <p className="text-gray-400">You can invite subscribers, contacts and past guests to the event.</p>
            </div>

            <div className="mt-6">
                <button
                    onClick={handleAddInventory}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
                >
                    Add Inventory
                </button>
            </div>
        </div>
    );
};

export default CongratsPage;
