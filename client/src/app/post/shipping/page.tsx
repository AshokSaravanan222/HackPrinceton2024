import React from 'react';
import Image from 'next/image';

const ShippingPage = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Image src={require("../../../../assets/shipping_label.png")} alt="placeholder" />
        </div>
    );
};

export default ShippingPage;

