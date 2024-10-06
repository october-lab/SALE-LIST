/* eslint-disable react/prop-types */
import React from 'react';
import { LocateIcon, MailIcon, PhoneCallIcon, ScrollTextIcon } from 'lucide-react';

const Page1Form = ({ formData, handleFormChange, firstInputRef }) => (
    <div className="mb-6 w-full">
        <div className="mb-4">
            <label className="flex items-center gap-2 w-full">
                <input
                    ref={firstInputRef}
                    type="text"
                    name="name"
                
                    placeholder='Listing Name'
                    onChange={handleFormChange}
                    className="input input-ghost text-3xl font-bold w-full mb-4 bg-transparent border-none focus:outline-none focus:border-yellow-500"
                />
            </label>
        </div>
        <div className="mb-4">
            <label className="flex items-center gap-2 w-full">
                <LocateIcon />
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    placeholder='location'
                    onChange={handleFormChange}
                    className="bg-transparent border-b-2 text-2xl font-bold w-full border-gray-300 focus:outline-none focus:border-yellow-500 mb-3"
                />
            </label>
        </div>
        <div className="mb-4">
            <label className="flex items-center gap-2 w-full">
                <MailIcon />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder='email'
                    onChange={handleFormChange}
                    className="bg-transparent border-b-2 text-2xl font-bold w-full border-gray-300 focus:outline-none focus:border-yellow-500 mb-3"
                />
            </label>
        </div>
        <div className="mb-4">
            <label className="flex items-center gap-2 w-full">
                <PhoneCallIcon />
                <input
                    type="number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    placeholder='contact'
                    onChange={handleFormChange}
                    className="bg-transparent border-b-2 text-2xl font-bold w-full border-gray-300 focus:outline-none focus:border-yellow-500 mb-3"
                />
            </label>
        </div>
        <div className="mb-4">
            <label className="flex items-center gap-2 w-full">
                <ScrollTextIcon />
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    placeholder='description'
                    onChange={handleFormChange}
                    className="bg-transparent border-b-2 text-2xl font-bold w-full border-gray-300 focus:outline-none focus:border-yellow-500 mb-3"
                />
            </label>
        </div>
    </div>
);

export default Page1Form;