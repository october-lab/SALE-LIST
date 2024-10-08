/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Card, CardBody, Button, Image } from "@nextui-org/react";
import { CustomerSaleItemComponent } from './SaleItemComponent';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';

const CustomerLanding = () => {
    const [listingDetails, setListingDetails] = useState({});
    const { eventIdentifier } = useParams();



    const fetchListingDetails = async (eventIdentifier) => {
        try {
            const response = axios.get(`http://localhost:5555/api/listing/${eventIdentifier}`)
            return response
        } catch (error) {
            console.error('Error fetching listing details:', error);
        }
    };





    const getLitingDetails = async () => {
        try {
            const allItem = await fetchListingDetails(eventIdentifier);
            setListingDetails(allItem.data)
        } catch (error) {
            console.error('Error fetching listing details:', error);
        }
    }


    useEffect(() => {
        getLitingDetails();
    }, []);


    return (
        !isEmpty(listingDetails) ?
            <>
                <div className="bg-gray-900 text-white p-4 max-w-sm md:max-w-lg mx-auto rounded-xl">
                    <Card className="mb-6 ">
                        <CardBody>
                            <h1 className="text-3xl font-bold mb-2">{listingDetails.eventDetails.name}</h1>
                            <p className="text-sm ">{listingDetails.eventDetails.location}</p>
                            <p className="mt-2 ">
                                {listingDetails.eventDetails.description}
                            </p>
                        </CardBody>
                    </Card>

                    <div className="mb-4 flex flex-col items-start">
                        <h2 className="text-2xl font-bold mb-2">Listed Items</h2>
                    </div>

                    <div className='space-y-4'>
                        <div className="grid grid-cols-2 gap-4">
                            {listingDetails.items.map((item, index) => (
                                <div key={index}>
                                    <CustomerSaleItemComponent item={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </> : <></>
    );
};

export default CustomerLanding;
