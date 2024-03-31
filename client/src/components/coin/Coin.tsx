// components/Coin.tsx
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Coin: React.FC = () => {
    const [coins, setCoins] = useState<number | null>(null);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/count_coins", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ wallet: "0xb3ebA584B5DD1F2eF5270e937c8248ac38F48727"}),
                
                });
                const data = await response.json();
                setCoins(data);
            } catch (error) {
                console.error("Failed to fetch coins", error);
                setCoins(null);
            }
        };

        fetchCoins();
    }, []);

    return (
        <div className="flex items-center space-x-2 p-2 bg-teal-500 text-white rounded-lg shadow-md">
            <span>{coins !== null ? coins : 'Loading...'}</span>
            {/* Ensure the image path is correctly set for static import */}
            <Image src={require("../../../assets/slocoin.png")} alt="Coin" width={24} height={24} /> {/* Update path & add width/height */}
        </div>
    );
};

export default Coin;
