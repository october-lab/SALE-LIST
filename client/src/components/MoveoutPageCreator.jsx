import React, { useState } from 'react';
import { Calendar, Clock, MapPin, FileText, Phone, Palette, Mail } from 'lucide-react';
import axios from 'axios';

const EventCreationPage = () => {
    const [listingName, setListingName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [bgColor, setBgColor] = useState('bg-green-800');
    const [showItemForm, setShowItemForm] = useState(false);

    const themes = ['bg-blue-800', 'bg-red-800', 'bg-purple-800', 'bg-yellow-800'];

    const handleCreateEvent = async () => {
        try {
            const response = await axios.post('http://localhost:5555/api/createListing', { listingName, location, description, phoneNumber, email, bgColor });
            console.log(response)
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };


    return (
        <div className="min-h-screen p-4">
            <div className="max-w-3xl mx-auto">

                <div className={`${bgColor} rounded-lg p-6 text-white`}>
                    <div className="flex gap-6">
                        <div className="w-1/3">
                            <div className="bg-yellow-400 h-48 rounded-lg overflow-hidden mb-4">
                                {/* Placeholder for emoji image */}
                            </div>
                            <div className="mt-4">
                                <p className="text-sm mb-1">Theme</p>
                                <div className="flex space-x-2">
                                    {themes.map((color, index) => (
                                        <button
                                            key={index}
                                            className={`w-6 h-6 rounded-full ${color} border-2 border-sky-500`}
                                            onClick={() => setBgColor(color)}
                                        ></button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-2/3">
                            <input
                                type="text"
                                placeholder="Name your listing"
                                className="input input-ghost text-2xl font-bold w-full mb-4 bg-transparent border-none focus:outline-none"
                                value={listingName}
                                onChange={(e) => setListingName(e.target.value)}
                            />
                            <div className="mb-4">
                                <label className="flex items-center mb-2 text-sm">
                                    <MapPin className="mr-2" size={16} />
                                    Event Location
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter event location"
                                    className="input input-bordered w-full bg-opacity-30 bg-black"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="flex items-center mb-2 text-sm">
                                    <Phone className="mr-2" size={16} />
                                    Contact number
                                </label>
                                <input
                                    type="number"
                                    placeholder="enter you number"
                                    className="input  input-bordered w-full bg-opacity-30 bg-black"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="flex items-center mb-2 text-sm">
                                    <Mail className="mr-2" size={16} />
                                    Email
                                </label>
                                <input
                                    type="text"
                                    placeholder="enter you email"
                                    className="input  input-bordered w-full bg-opacity-30 bg-black"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="flex items-center mb-2 text-sm">
                                    <FileText className="mr-2" size={16} />
                                    Add Description
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full bg-opacity-30 bg-black"
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary w-full mt-4" onClick={handleCreateEvent}>Create Listing</button>
                </div>
            </div>

            {/* {showItemForm && <ItemSaleForm onClose={() => setShowItemForm(false)} />} */}
        </div>
    );
};

// const ItemSaleForm = ({ onClose }) => {
//     const [items, setItems] = useState([]);
//     const [currentItem, setCurrentItem] = useState({ name: '', price: '', description: '', image: null });

//     const handleAddItem = () => {
//         setItems([...items, currentItem]);
//         setCurrentItem({ name: '', price: '', description: '', image: null });
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setCurrentItem({ ...currentItem, image: reader.result });
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//             <div className="bg-green-800 p-6 rounded-lg text-white max-w-md w-full">
//                 <h2 className="text-2xl font-bold mb-4">Add Items to Sell</h2>
//                 <div className="mb-4">
//                     <input
//                         type="text"
//                         placeholder="Item Name"
//                         className="input input-bordered w-full mb-2 bg-opacity-30 bg-black"
//                         value={currentItem.name}
//                         onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
//                     />
//                     <input
//                         type="number"
//                         placeholder="Price"
//                         className="input input-bordered w-full mb-2 bg-opacity-30 bg-black"
//                         value={currentItem.price}
//                         onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })}
//                     />
//                     <textarea
//                         placeholder="Description"
//                         className="textarea textarea-bordered w-full mb-2 bg-opacity-30 bg-black"
//                         value={currentItem.description}
//                         onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
//                     ></textarea>
//                     <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="file-input file-input-bordered w-full bg-opacity-30 bg-black"
//                     />
//                 </div>
//                 <button className="btn btn-primary w-full mb-2" onClick={handleAddItem}>Add Item</button>
//                 <button className="btn btn-outline w-full" onClick={onClose}>Close</button>

//                 <div className="mt-4">
//                     <h3 className="text-xl font-semibold mb-2">Added Items:</h3>
//                     {items.map((item, index) => (
//                         <div key={index} className="mb-2 p-2 bg-green-700 rounded">
//                             <p><strong>{item.name}</strong> - ${item.price}</p>
//                             <p>{item.description}</p>
//                             {item.image && <img src={item.image} alt={item.name} className="mt-2 max-w-full h-auto" />}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

export default EventCreationPage;