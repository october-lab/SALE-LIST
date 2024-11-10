/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';


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
            <div className="modal-box border-neutral space-y-6 bg-zinc-900 p-4 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-white">Create your listing</h1>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className="card mb-6 bg-neutral-800">
                        <div className="card-body p-2">
                            <label className="flex flex-col items-center justify-center w-full h-40 rounded-lg cursor-pointer">
                                {newItem.image ? (
                                    <img src={URL.createObjectURL(newItem.image)} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-8 h-8 mb-2 text-white opacity-60" />
                                        <p className="mb-1 text-sm  text-white"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs  opacity-60 text-white">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                )}
                                <input type="file" name="image" accept="image/*" onChange={handleItemChange} className="hidden" />
                            </label>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="form-control">
                            <Input
                                type="text"
                                name="name"
                                placeholder="Item Name"
                                value={newItem.name}
                                className="w-full p-3 rounded-lg bg-black border-0 text-white"
                                onChange={handleItemChange}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <Input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={newItem.price}
                                onChange={handleItemChange}
                                className="w-full p-3 rounded-lg bg-black border-0 text-white"
                            />
                        </div>
                        <div className="form-control">
                            <Input
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={newItem.age}
                                onChange={handleItemChange}
                                className="w-full p-3 rounded-lg bg-black border-0 text-white"
                            />
                        </div>
                        <div className="form-control">
            
                            <Textarea
                                name="description"
                                placeholder="Description"
                                value={newItem.description}
                                onChange={handleItemChange}
                                className="w-full p-3 rounded-lg bg-black text-white border-0"
                            />
                        </div>
                    </div>
                    <div className="modal-action">
                        <button type="button"  className="btn btn-sm bg-black border-0 text-red-300 hover:bg-gray-800 hover:text-white" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-sm bg-white border-0 text-black hover:bg-gray-100">
                            Add Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItemPopup;