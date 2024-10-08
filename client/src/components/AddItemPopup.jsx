/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const AddItemPopup = ({ isOpen, onClose, onAddItem }) => {
    const [newItem, setNewItem] = useState({ name: '', price: '', age: '', description: '', image: null });

    const handleItemChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setNewItem({ ...newItem, image: files[0] });
        } else {
            setNewItem({ ...newItem, [name]: value });
        }
    };

    const handleSubmit = () => {
        onAddItem(newItem);
        setNewItem({ name: '', price: '', age: '', description: '', image: null });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className="card mb-6 bg-base-200">
                        <div className="card-body p-2">
                            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-base-300">
                                {newItem.image ? (
                                    <img src={URL.createObjectURL(newItem.image)} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-8 h-8 mb-2 text-base-content opacity-60" />
                                        <p className="mb-1 text-sm text-base-content"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-base-content opacity-60">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                )}
                                <input type="file" name="image" accept="image/*" onChange={handleItemChange} className="hidden" />
                            </label>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Item Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={newItem.name}
                                onChange={handleItemChange}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={newItem.price}
                                onChange={handleItemChange}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Age</span>
                            </label>
                            <input
                                type="number"
                                name="age"
                                value={newItem.age}
                                onChange={handleItemChange}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                name="description"
                                value={newItem.description}
                                onChange={handleItemChange}
                                className="textarea textarea-bordered"
                                required
                            ></textarea>
                        </div>
                    </div>
                    <div className="modal-action">
                        <button type="button" className="btn btn-ghost" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Add Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItemPopup;