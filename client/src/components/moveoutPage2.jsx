/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useRef } from 'react';
import { ArrowRight, ArrowLeft, Upload, X, PhoneCallIcon, LocateIcon, ScrollTextIcon, MailCheckIcon, MailIcon, PlusCircle } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const AddItemPopup = ({ isOpen, onClose, onAddItem }) => {
    const [newItem, setNewItem] = useState({ name: '', price: '', age: '', description: '', image: null });

    const handleItemChange = (e) => {
        if (e.target.name === 'image') {
            setNewItem({ ...newItem, image: URL.createObjectURL(e.target.files[0]) });
        } else {
            setNewItem({ ...newItem, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = () => {
        onAddItem(newItem);
        setNewItem({ name: '', price: '', age: '', description: '', image: null });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-white backdrop-blur-sm ">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
                <div className="mb-4">
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-black hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        {newItem.image ? (
                            <img src={newItem.image} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                            </div>
                        )}
                        <input type="file" name="image" onChange={handleItemChange} className="hidden" />
                    </label>
                </div>
                <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    placeholder='Item Name'
                    onChange={handleItemChange}
                    className="bg-transparent border-b-2 text-2xl font-bold w-full border-gray-300 focus:outline-none focus:border-yellow-500 mb-3"
                />
                <input
                    type="number"
                    name="price"
                    value={newItem.price}
                    placeholder='Price'
                    onChange={handleItemChange}
                    className="bg-transparent border-b-2 text-2xl font-bold w-full border-gray-300 focus:outline-none focus:border-yellow-500 mb-3"
                />
                <input
                    type="number"
                    name="age"
                    value={newItem.age}
                    placeholder='Age'
                    onChange={handleItemChange}
                    className="bg-transparent border-b-2 text-2xl font-bold w-full border-gray-300 focus:outline-none focus:border-yellow-500 mb-3"
                />
                <input
                    type="text"
                    name="description"
                    value={newItem.description}
                    placeholder='Description'
                    onChange={handleItemChange}
                    className="bg-transparent border-b-2 text-2xl font-bold w-full border-gray-300 focus:outline-none focus:border-yellow-500 mb-3"
                />
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="btn btn-ghost">Cancel</button>
                    <button onClick={handleSubmit} className="btn btn-primary">Add Item</button>
                </div>
            </div>
        </div>
    );
};




const MultiPageForm = () => {
    const [page, setPage] = useState(1);
    const [colorTheme, setColorTheme] = useState({
        color: "#ffffff",
        theme: 'black'
    },);
    const { setTheme } = useContext(AppContext);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        email: '',
        location: '',
        theme: '',
        contact: ''
    });
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', price: '', age: '', description: '', image: null });
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const colorOptions = [
        {
            color: "#000000",
            theme: 'black'
        },
        {
            color: "#fff248",
            theme: 'cyberpunk'
        },
        {
            color: '#171212',
            theme: 'forest'
        },
        {
            color: '#1a103d',
            theme: 'synthwave'
        },
        {
            color: '#09090b',
            theme: 'luxury'
        },
        {
            color: '#ebe2ca',
            theme: 'retro'

        },
        {
            color: '#f8def',
            theme: 'lemonade'
        }
    ];


    const firstInputRef = useRef(null);

    useEffect(() => {
        // Focus on the first input field when the component mounts
        firstInputRef?.current?.focus();
    }, []);


    useEffect(() => {
        //setTheme(colorTheme.theme)
        document.documentElement.setAttribute('data-theme', colorTheme.theme);
        setFormData({ ...formData, theme: colorTheme.theme });
    }, [colorTheme])


    const handleCreateEvent = async () => {
        try {
            const response = await axios.post('http://localhost:5555/api/createListing', formData);
            console.log(response)
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleNext = async () => {
        //await handleCreateEvent();
        setPage(prev => prev + 1)
    };
    const handleBack = () => setPage(prev => prev - 1);

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleItemChange = (e) => {
        if (e.target.name === 'image') {
            setNewItem({ ...newItem, image: URL.createObjectURL(e.target.files[0]) });
        } else {
            setNewItem({ ...newItem, [e.target.name]: e.target.value });
        }
    };

    const handleAddItem = (newItem) => {
        if (newItem.name && newItem.price && newItem.image) {
            setItems([...items, newItem]);
            setNewItem({ name: '', price: '', image: null });
        }
    };

    const handleRemoveItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };


    const Page1Form = () => (
        <div className="mb-6 w-full">
            <div className="mb-4">
                <label className="flex items-center gap-2 w-full">
                    <input
                        ref={firstInputRef}
                        type="text"
                        name={'name'}
                        value={formData['name']}
                        placeholder='Listing Name'
                        onChange={handleFormChange}
                        className="input input-ghost text-3xl font-bold w-full mb-4 bg-transparent border-none focus:outline-none focus:border-yellow-500" />
                </label>
            </div>
            <div className="mb-4">
                <label className="flex items-center gap-2 w-full">
                    <LocateIcon />
                    <input
                        type="text"
                        name={'location'}
                        value={formData['location']}
                        placeholder='location'
                        onChange={handleFormChange}
                        className="bg-transparent border-b-2 text-2xl font-bold w-full border-gray-300 focus:outline-none focus:border-yellow-500 mb-3" />
                </label>
            </div>
            <div className="mb-4">
                <label className="flex items-center gap-2 w-full">
                    <MailIcon />
                    <input
                        type="email"
                        name={'email'}
                        value={formData['email']}
                        placeholder='email'
                        onChange={handleFormChange}
                        className="bg-transparent border-b-2 text-2xl font-bold w-full border-gray-300 focus:outline-none focus:border-yellow-500 mb-3" />
                </label>
            </div>

            <div className="mb-4">
                <label className="flex items-center gap-2 w-full">
                    <PhoneCallIcon />
                    <input
                        type="number"
                        name={'contact'}
                        value={formData['contact']}
                        placeholder='contact'
                        onChange={handleFormChange}
                        className="bg-transparent border-b-2 text-2xl font-bold w-full border-gray-300 focus:outline-none focus:border-yellow-500 mb-3" />
                </label>
            </div>
            <div className="mb-4">
                <label className="flex items-center gap-2 w-full">
                    <ScrollTextIcon />
                    <input
                        type="text"
                        name={'description'}
                        value={formData['description']}
                        placeholder='description'
                        onChange={handleFormChange}
                        className="bg-transparent border-b-2 text-2xl font-bold w-full border-gray-300 focus:outline-none focus:border-yellow-500 mb-3" />
                </label>
            </div>


            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Choose your color theme</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                    {colorOptions.map((options) => (
                        <button
                            key={options.color}
                            className={`w-8 h-8 rounded-full ring-2 ring-offset-1 ring-white-500 ${options.color === colorTheme.color ? 'ring-2 ring-offset-1 ring-red-500' : ''}`}
                            style={{ backgroundColor: options.color }}
                            onClick={() => setColorTheme(options)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )

    const Page2Form = () => (
        <div className="mb-6 w-full">
            <div className="flex justify-between mb-4">
                <button
                    className="btn btn-ghost"
                    onClick={handleBack}
                >
                    <ArrowLeft size={18} className="mr-2" /> Back
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => console.log('Form submitted', { formData, items })}
                >
                    Submit
                </button>
            </div>
            <button
                onClick={() => setIsPopupOpen(true)}
                className="btn btn-secondary mb-4"
            >
                <PlusCircle size={18} className="mr-2" /> Add Item
            </button>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {items.map((item, index) => (
                    <div key={index} className="card bg-base-100 shadow-xl">
                        {item.image && <figure><img src={item.image} alt={item.name} className="w-full h-48 object-cover" /></figure>}
                        <div className="card-body">
                            <h2 className="card-title">{item.name}</h2>
                            <p>${item.price}</p>
                            <p>Age: {item.age}</p>
                            <p>{item.description}</p>
                            <div className="card-actions justify-end">
                                <button
                                    onClick={() => handleRemoveItem(index)}
                                    className="btn btn-sm btn-error"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )


    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col items-center w-full">
                <div className="text-center w-full">
                    <h1 className="text-3xl mt-3 font-semibold leading-tight tracking-tighter md:text-4xl">
                        Create A New Listing
                    </h1>
                </div>
                <div className="w-full md:w-3/4 mb-4 mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(page / 2) * 100}%` }}></div>
                    </div>
                </div>
                <div className='w-full md:w-3/4 pt-4'>
                    <div className="w-full">
                        {page === 1 && <Page1Form />}

                        {page === 2 && <Page2Form />}
                        <div className="flex gap-4">
                            {page < 2 && (
                                <button
                                    className="flex-1 btn btn-primary"
                                    onClick={handleNext}
                                >
                                    Next <ArrowRight size={18} className="ml-2" />
                                </button>
                            )}
                        </div>
                    </div>
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

export default MultiPageForm;