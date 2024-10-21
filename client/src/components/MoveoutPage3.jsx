/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import axios from 'axios';
import AddItemPopup from './AddItemPopup';
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
        <div className="card max-w-lg mx-auto bg-base-100 shadow-xl border-2 border-neutral">
            <div className="card-body">
                <h1 className="card-title text-2xl font-bold text-center">Add Products to listing</h1>

                <button
                    onClick={() => setIsPopupOpen(true)}
                    className="btn btn-outline mb-4 mx-auto"
                >
                    <PlusCircle size={20} />
                    Add Product
                </button>

                <div className="grid grid-cols-2 gap-4">
                    {items.map((item, index) => (
                        <div key={index}>
                            <SaleItemComponent item={item} handleRemoveItem={handleRemoveItem} />
                        </div>
                    ))}
                </div>
            </div>

            <AddItemPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onAddItem={handleAddItem}
            />
        </div>
    );
};

export default MoveoutPage3;