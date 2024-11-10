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
        <div className="min-h-screen bg-black p-4 md:p-8">
            <div className="max-w-2xl mx-auto space-y-6 md:space-y-8">
                {/* Header */}
                <div className="space-y-3 md:space-y-4">
                    <p className="text-2xl md:text-3xl text-white">Congratulations, Your listing is now live.</p>
                </div>

                {/* Share Card */}
                <div className="bg-red-900 rounded-2xl md:rounded-3xl p-4 md:p-6 space-y-4 md:space-y-6">
                    <h2 className="text-lg md:text-xl text-white">Share the below link on your socials.</h2>

                    {/* URL Copy Section */}
                    <div className="flex items-center gap-2 bg-[#121212] rounded-lg md:rounded-xl p-3 md:p-4">
                        <span className="text-white flex-grow text-sm md:text-base overflow-x-auto">{listingUrl}</span>
                        <button onClick={handleCopyUrl} className="text-white flex-shrink-0">
                            <Share2 size={20} className="md:w-6 md:h-6" />
                        </button>
                    </div>

                    {/* Social Share Buttons */}
                    <div className="flex gap-2 md:gap-4 flex-wrap">
                        {[Facebook, Twitter, Linkedin, MessageCircle, Share2].map((Icon, index) => (
                            <button key={index} className="bg-[#121212] p-3 md:p-4 rounded-lg md:rounded-xl text-white">
                                <Icon size={20} className="md:w-6 md:h-6" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                    <button
                        onClick={() => navigate(`/create/listing-details/${eventIdentifier}`)}
                        className="py-2 px-4 text-white bg-neutral  rounded-xl text-sm font-medium md:flex-1"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => window.open(`/${eventIdentifier}`, '_blank')}
                        className="bg-white rounded-xl text-black text-sm font-medium py-2 px-4 md:flex-1"
                    >
                        View Listing
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CongratsPage;
