import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Input } from "@nextui-org/react";

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
        <Card className="max-w-md mx-auto" isBlurred>
            <CardHeader className="flex flex-col items-center">
                <h1 className="text-3xl font-bold">Congratulations!</h1>
                <p className="text-lg text-default-500">Your listing page is ready to share.</p>
            </CardHeader>

            <CardBody>
                <h2 className="text-lg font-semibold mb-3">Your Listing URL:</h2>
                <div className="flex items-center gap-2">
                    <Input
                        readOnly
                        value={listingUrl}
                        className="flex-grow"
                    />
                    <Button
                        onClick={handleCopyUrl}
                        color="secondary"
                        isIconOnly
                    >
                        <Share2 size={20} />
                    </Button>
                </div>
            </CardBody>

            <CardFooter>
                <Button
                    onClick={handleAddInventory}
                    color="primary"
                    className="w-full"
                >
                    Add Inventory
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CongratsPage;
