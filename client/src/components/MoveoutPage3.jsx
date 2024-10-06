/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import axios from 'axios';
import AddItemPopup from './AddItemPopup';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Image } from "@nextui-org/react";
import SaleItemComponent from './SaleItemComponent';

const MoveoutPage3 = () => {
    const [items, setItems] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const fetchItemsByListingId = async (listingId) => {
        try {

            const response = axios.get('http://localhost:5555/api/items', {
                params: {
                    listingId: listingId
                }
            });

            return response
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const getListingIdFromSessionStorage = () => {
        let currentListing = sessionStorage.getItem('listing-info');
        if (currentListing) {
            let listing = JSON.parse(currentListing);
            let id = listing?.id;
            return id
        } else {
            return null
        }
    }
    const intialListingFetch = async () => {
        let currentListingId = getListingIdFromSessionStorage()
        if (currentListingId !== null) {
            const allItem = await fetchItemsByListingId(currentListingId);
            setItems(allItem.data)
        }
    }

    useEffect(() => {
        intialListingFetch();
    }, []);

    const handleItemsForListing = async (newItem) => {
        if (newItem.name && newItem.price && newItem.image) {
            const formData = new FormData();
            let listingId = getListingIdFromSessionStorage();
            formData.append('name', newItem.name);
            formData.append('price', newItem.price);
            formData.append('image', newItem.image);
            formData.append('listingId', listingId);
            try {
                let addeditem = await axios.post('http://localhost:5555/api/items', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                let allItems = await fetchItemsByListingId(listingId);
                setItems(allItems.data)
            } catch (error) {
                console.error('Error adding item:', error);
            }
        } else {
            alert('Please fill in all fields and upload an image.');
        }
    };

    const handleAddItem = async (newItem) => {
        if (newItem.name && newItem.price && newItem.image) {
            await handleItemsForListing(newItem);
        }
    };

    const handleRemoveItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <Card className="max-w-lg mx-auto">
            <CardHeader className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">Add Products to listing</h1>

            </CardHeader>

            <CardBody>
                <Button
                    onClick={() => setIsPopupOpen(true)}
                    color="secondary"
                    startContent={<PlusCircle size={20} />}
                    className="mb-4 mx-auto"
                >
                    Add Product
                </Button>
                <div className="grid grid-cols-2 gap-4">
                    {items.map((item, index) => (
                        <div key={index}>
                            <SaleItemComponent item={item} handleRemoveItem={handleRemoveItem} />
                        </div>
                    ))}
                </div>
            </CardBody>

            <CardFooter>
                {/* You can add a footer here if needed */}
            </CardFooter>

            <AddItemPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onAddItem={handleAddItem}
            />
        </Card>
    );
};

export default MoveoutPage3;