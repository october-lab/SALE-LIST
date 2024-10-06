import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemUploader = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        name: '',
        price: '',
        image: null
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:5555/api/items');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prevItem => ({
            ...prevItem,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewItem(prevItem => ({
            ...prevItem,
            image: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newItem.name && newItem.price && newItem.image) {
            const formData = new FormData();
            formData.append('name', newItem.name);
            formData.append('price', newItem.price);
            formData.append('image', newItem.image);

            try {
                await axios.post('http://localhost:5555/api/items', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                fetchItems();
                setNewItem({ name: '', price: '', image: null });
            } catch (error) {
                console.error('Error adding item:', error);
                alert('Error adding item. Please try again.');
            }
        } else {
            alert('Please fill in all fields and upload an image.');
        }
    };

    return (
        <>
            <div className="container mx-auto max-w-3xl">
                <div className="w-full">
                    <h1 className="text-3xl font-bold mb-6">Move-Out Sale Item Uploader</h1>
                </div>

                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="form-control w-full max-w-xs mb-4">
                        <label className="label">
                            <span className="label-text">Item Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={newItem.name}
                            onChange={handleInputChange}
                            className="input input-bordered w-full max-w-xs"
                            required
                        />
                    </div>

                    <div className="form-control w-full max-w-xs mb-4">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={newItem.price}
                            onChange={handleInputChange}
                            className="input input-bordered w-full max-w-xs"
                            required
                        />
                    </div>

                    <div className="form-control w-full max-w-xs mb-4">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="file-input file-input-bordered w-full max-w-xs"
                            accept="image/*"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Add Item</button>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map(item => (
                        <div key={item._id} className="card w-96 bg-base-100 shadow-xl">
                            <figure>
                                <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.name}</h2>
                                <p>Price: ${item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
};

export default ItemUploader;