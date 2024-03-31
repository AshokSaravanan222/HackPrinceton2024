'use client'
import React, { use } from 'react';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';

const ShippingPage = () => {
    const { user, error, isLoading } = useUser();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="w-1/2 max-w-xs"> {/* Adjust these classes as needed */}
            <h1 className="text-2xl font-bold mb-4">{user?.name}'s Shipping Label</h1>
            <Image 
                src={require("../../../../assets/shipping_label.jpg")} alt="placeholder"
                width={1000}
                height={500}
                objectFit="contain"
            />
            </div>
        </div>
    );
};

export default ShippingPage;

