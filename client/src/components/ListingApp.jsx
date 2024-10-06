import React, { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import { Button } from '@nextui-org/react';
import ContactDetails from './ContactDetails';
import ProfileDetailsForm from './ProfileDetails';
export default function ListingApplication() {
    const { currentPage, setCurrentPage } = useContext(AppContext);
    return (
        <>
            <div className="flex justify-center items-center pr-4 pt-10 pl-4 font-mono">
                Test

            </div>
        </>




    );
}
