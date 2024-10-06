/* eslint-disable react/prop-types */
import React from 'react';
import { ArrowLeft, PlusCircle, X } from 'lucide-react';

const Page2Form = ({ items, handleBack, handleRemoveItem, setIsPopupOpen }) => (
    <div className="mb-6 w-full">
        <div className="flex justify-between mb-4">
            <button className="btn btn-ghost" onClick={handleBack}>
                <ArrowLeft size={18} className="mr-2" /> Back
            </button>
            <button
                className="btn btn-primary"
                onClick={() => console.log('Form submitted', { items })}
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items && items.map((item, index) => (
                <div key={index} className="bg-white  text-black rounded-lg shadow-md overflow-hidden">
                    {item.imageUrl && (
                        <div className="h-48 overflow-hidden">
                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="p-4">
                        <h2 className="text-lg font-semibold mb-2 truncate">{item.name}</h2>
                        <p className=" text-black mb-2">₹{item.price}</p>
                        <button
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleRemoveItem(index)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default Page2Form;