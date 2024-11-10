/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { PlusCircle, Plus } from 'lucide-react';
import axios from 'axios';
import AddItemPopup from './AddItemPopup';
import SaleItemComponent, { InventoryItemComponent } from './SaleItemComponent';

import { getStoredData, getEventIdentifierFromSessionStorage } from '../utils';

const SaleItemContainer = ({ handleSetListingItems, listingItems, existingItems }) => {
    const [items, setItems] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const fetchItemsByListingId = async (eventIdentifier) => {
        try {

            const response = axios.get('http://localhost:5555/api/items', {
                params: {
                    eventIdentifier: eventIdentifier
                }
            });

            return response
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };



    // useEffect(() => {
    //     intialListingFetch();
    // }, []);

    const handleItemsForListing = async (newItem) => {
        if (newItem.name && newItem.price && newItem.image) {
            const formData = new FormData();
            let eventIdentifier = getEventIdentifierFromSessionStorage();
            formData.append('name', newItem.name);
            formData.append('price', newItem.price);
            formData.append('image', newItem.image);
            formData.append('eventIdentifier', eventIdentifier);
            try {
                await axios.post('http://localhost:5555/api/items', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

            } catch (error) {
                console.error('Error adding item:', error);
            }
        } else {
            alert('Please fill in all fields and upload an image.');
        }
    };

    const handleAddItem = async (newItem) => {
        if (newItem.name && newItem.price && newItem.image) {
            handleSetListingItems(newItem);
            await handleItemsForListing(newItem);
        }
    };

    const handleRemoveItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <div className="">
            <div className="">


                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {
                        existingItems.map((item, index) => (
                            <div key={index}>
                                <InventoryItemComponent item={item} />
                            </div>
                        ))
                    }
                    {listingItems.map((item, index) => (
                        <div key={index}>
                            <InventoryItemComponent item={item} />
                        </div>
                    ))}
                    <div
                        className="aspect-square rounded-lg bg-gray-800 flex items-center justify-center"
                    >
                        <Plus className="text-gray-400 cursor-pointer" role='button' size={24} onClick={() => setIsPopupOpen(true)} />
                    </div>
                </div>
                <AddItemPopup
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    onAddItem={handleAddItem}
                />
            </div>


        </div>
    );
};

export default SaleItemContainer;