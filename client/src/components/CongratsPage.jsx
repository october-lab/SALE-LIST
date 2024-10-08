import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2 } from 'lucide-react';

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
    const listingUrl = eventIdentifier ? `https://yourdomain.com/listing/${eventIdentifier}` : '';

    const handleAddInventory = () => {
        navigate('/add-items');
    };

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(listingUrl)
            .then(() => alert('Listing URL copied to clipboard!'))
            .catch(err => console.error('Failed to copy: ', err));
    };

    return (
        <div className="card bg-base-100 shadow-xl max-w-md mx-auto">
            <div className="card-body items-center text-center">
                <h1 className="card-title text-3xl font-bold">Congratulations!</h1>
                <p className="text-lg">Your listing page is ready to share.</p>
                
                <div className="w-full">
                    <h2 className="text-lg font-semibold mb-3">Your Listing URL:</h2>
                    <div className="join w-full">
                        <input 
                            type="text" 
                            readOnly 
                            value={listingUrl}
                            className="input input-bordered join-item flex-grow"
                        />
                        <button 
                            onClick={handleCopyUrl}
                            className="btn btn-secondary join-item"
                        >
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
                
                <div className="card-actions justify-end mt-4">
                    <button
                        onClick={handleAddInventory}
                        className="btn btn-primary w-full"
                    >
                        Add Inventory
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CongratsPage;
