/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { CustomerSaleItemComponent } from './SaleItemComponent';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';

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

    return (
        !isEmpty(listingDetails) ? (
            <div className="card bg-base-100 shadow-xl max-w-sm md:max-w-lg mx-auto mb-6">
                <div className="card-body">
                    <div className="card bg-base-200">
                        <div className="card-body">
                            <h1 className="card-title text-3xl">{listingDetails.eventDetails.name}</h1>
                            <p className="text-sm">{listingDetails.eventDetails.location}</p>
                            <p className="mt-2">{listingDetails.eventDetails.description}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-2xl font-bold mb-2">Listed Items</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {listingDetails.items.map((item, index) => (
                                <CustomerSaleItemComponent key={index} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    );
};

export default CustomerLanding;
