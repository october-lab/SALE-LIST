/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { CustomerSaleItemComponent } from './SaleItemComponent';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Twitter } from 'lucide-react';
import { THEMES } from '../../constants';

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


    // useEffect(() => {
    //     document.querySelector('html').setAttribute('data-theme', 'cyberpunk');
    // }, []);

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

        <div className={`min-h-screen  flex flex-col ${THEMES[listingDetails.eventDetails.theme].bgColor}`}>
            <div className={`max-w-md md:max-w-xl mx-auto  overflow-hidden flex-grow ${THEMES[listingDetails.eventDetails.theme].mainColor}`}>
                <div className="relative">
                    {listingDetails.eventDetails.selectedImage ?
                        <img src={listingDetails.eventDetails.selectedImage} alt="Background" className="w-full h-64 object-cover" />
                        :
                        <></>
                    }
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                        <h1 className="text-4xl font-medium mb-2">{listingDetails.eventDetails.name}</h1>
                        <p className="mb-4">{listingDetails.eventDetails.description}</p>
                        <button className="btn glass btn-sm flex items-center text-white">
                            <MapPin className="w-4 h-4 mr-2" /> {listingDetails.eventDetails.location}
                        </button>
                    </div>
                </div>

                <div className="p-6 text-white ">

                    <h2 className="text-xl font-semibold mb-4">Contact Me</h2>

                    <div className="flex justify-center space-x-4 mb-6">
                        <Mail className="w-8 h-8 " />
                        <Facebook className="w-8 h-8" />
                        <Twitter className="w-8 h-8" />
                        <Instagram className="w-8 h-8" />
                    </div>

                    <h2 className="text-xl font-semibold mb-4">Listed Items</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {listingDetails.items.map((item, index) => (
                            <CustomerSaleItemComponent key={index} item={item} />
                        ))}
                    </div>
                </div>
                <footer className=" py-4 text-white">
                    <div className="max-w-md mx-auto flex flex-col items-center">
                        <div className="flex space-x-4 mb-2">
                            <a href="#" className="hover:text-gray-400">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-gray-400">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-gray-400">
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                        <p className="text-sm">&copy; 2023 Garage Sale</p>
                    </div>
                </footer>
            </div>


        </div>
    );
};

export default CustomerLanding;
