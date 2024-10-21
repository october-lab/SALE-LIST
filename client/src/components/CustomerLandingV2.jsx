/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { CustomerSaleItemComponent } from './SaleItemComponent';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';
import { MapPin, Instagram, Facebook, Twitter, PhoneCall, MessageCircle, Mail, Briefcase } from 'lucide-react';

const CustomerLanding = () => {
    const [listingDetails, setListingDetails] = useState({});
    const { eventIdentifier } = useParams();

    const fetchListingDetails = async (eventIdentifier) => {
        try {
            const response = await axios.get(`http://localhost:5555/api/listing/${eventIdentifier}`);
            return response;
        } catch (error) {
            console.error('Error fetching listing details:', error);
        }
    };

    const getListingDetails = async () => {
        try {
            const allItem = await fetchListingDetails(eventIdentifier);
            setListingDetails(allItem.data);
        } catch (error) {
            console.error('Error fetching listing details:', error);
        }
    };

    useEffect(() => {
        getListingDetails();
    }, []);

    if (isEmpty(listingDetails)) {
        return (
            <div className="flex justify-center items-center h-screen bg-base-200">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 p-4">
            <div className="max-w-md mx-auto bg-base-100 rounded-xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <div className="avatar mb-4">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto">
                            <img src={listingDetails.eventDetails.imageUrl || 'https://placeimg.com/192/192/people'} alt="Profile" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-normal text-center mb-2">{listingDetails.eventDetails.name}</h1>
                    <p className="text-center text-sm mb-4">{listingDetails.eventDetails.description}</p>
                    <div className="flex justify-center space-x-2 mb-6">
                        <Mail className="w-8 h-8 " />
                        <Facebook className="w-8 h-8" />
                        <Twitter className="w-8 h-8" />
                        <Instagram className="w-8 h-8" />
                    </div>
                    {/* <h3 className="text-center font-semibold mb-4">Message Sellar</h3>
                    <button className="btn btn-neutral btn-block">Buy me a coffee ☕</button> */}
                </div>
                <div className="bg-base-200 p-4">
                    <h2 className="text-xl font-semibold mb-4">Listed Items</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {listingDetails.items.map((item, index) => (
                            <CustomerSaleItemComponent key={index} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerLanding;
