import React, { useState, useEffect, useContext, useRef } from 'react';
import { ArrowRight, ArrowLeft, PlusCircle } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Input, Button } from "@nextui-org/react";
import axios from 'axios';

export default function AddInventory() {




    const AddListing = () => {
        console.log('Lisitng Added')
    }



    return (
        <div className=" border min-w-full px-4 py-3 rounded-xl [&>p]:m-0 border-primary-100 bg-primary-50/20 my-2">

            <div className="pt-1">
                <Button color="primary" onClick={AddListing} variant="bordered">
                    Add Listing Item
                </Button>
            </div>


        </div>



    );
}
