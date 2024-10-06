/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useRef } from 'react';
import { ArrowRight, ArrowLeft, PlusCircle,Instagram, Youtube , Phone, Twitter, SendIcon, MessageCircleCode } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Input, Button } from "@nextui-org/react";
import axios from 'axios';

export default function CreateListing() {

    const { currentListing, setListing } = useContext(AppContext);
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        name: currentListing ? currentListing.name : '',
        description: currentListing ? currentListing.description : '',
        email: currentListing ? currentListing.email : '',
        location: currentListing ? currentListing.location : '',
        bgColor: currentListing ? currentListing.bgColor : '',
        contact: currentListing ? currentListing.phoneNumber : ''
    });


    const firstInputRef = useRef(null);

    useEffect(() => {
        firstInputRef?.current?.focus();
    }, []);




    const getListingIdFromSessionStorage = () => {
        let currentListing = sessionStorage.getItem('listing-info');
        if (currentListing) {
            let listing = JSON.parse(currentListing);
            let id = listing?.id;
            return id
        } else {
            return null
        }
    }

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const formChanged = (src, target) => {
        // Check if both objects have the same keys and values
        for (let key in src) {
            if (src[key] !== target[key]) {
                return true; // If any value is different, return true
            }
        }
        return false; // If all values are the same, return false
    };

    const handleCreateListing = async () => {
        try {
            console.log('currentListing', currentListing);
            console.log('formData', formData)
            let currentListingId = getListingIdFromSessionStorage();
            if (!currentListingId) {
                const response = await axios.post('http://localhost:5555/api/createListing', formData);
                if (response?.data?.eventIdentifier) {
                    let eventData = response?.data;
                    setListing(eventData);
                    sessionStorage.setItem('listing-info', JSON.stringify(eventData))
                }
            } else {
                if (formChanged(formData, currentListing)) {
                    formData.id = currentListingId;
                    const response = await axios.post('http://localhost:5555/api/updateListing', formData);
                    if (response?.data?.eventIdentifier) {
                        let eventData = response?.data;
                        setListing(eventData);
                        sessionStorage.setItem('listing-info', JSON.stringify(eventData))
                    }
                }

            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleNext = async () => {
        await handleCreateListing()

    };
    return (
                <div className=" border min-w-full px-4 py-3 rounded-xl [&>p]:m-0 border-primary-100 bg-primary-50/20 my-2">
                    <Input
                        type="text"
                        label="Listing Name"
                        color={"primary"}
                        defaultValue=""
                        description="Add a name for your listing"
                        size="lg"
                        variant="bordered"
                        value={formData.name}
                        ref={firstInputRef}
                        name='name'
                        onChange={handleFormChange}

                    />
                    <Input
                        type="number"
                        label="Contact"
                        defaultValue=""
                        color={"primary"}
                        description="Add your contact"
                        className=" pt-2 pb-2"
                        size="lg"
                        variant="bordered"
                        value={formData.contact}
                        name='contact'
                        onChange={handleFormChange}

                    />
                    <Input
                        type="text"
                        label="Location"
                        color={"primary"}
                        defaultValue=""
                        description="Add your location"
                        className="w-full pt-2 pb-2"
                        name='location'
                        size="lg"
                        variant="bordered"
                        value={formData.location}
                        onChange={handleFormChange}
                    />
                    <div className="pt-1">
                        <Button color="primary" onClick={handleNext} variant="bordered">
                            Create Listing
                        </Button>
                    </div>
                </div>

    );
}
