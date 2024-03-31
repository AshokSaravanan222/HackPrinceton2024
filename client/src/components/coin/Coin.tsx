// components/Coin.tsx
import React, { useEffect, useState } from 'react';

const Coin: React.FC = () => {
    const [coins, setCoins] = useState<number | null>(null);
    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch("http://localhost:5000/count_coins");
                const data = await response.json();
                console.log(data);
                setCoins(data.coins);
            } catch (error) {
                console.error("Failed to fetch coins", error);
                setCoins(null);
            }
        };

        fetchCoins();
    }, []);

    return (
        <div className="flex items-center space-x-2">
            <img src="/assets/coin-image.png" alt="Coin" className="w-6 h-6" /> {/* Adjust the image path as necessary */}
            <span>{coins !== null ? coins : 'Loading...'}</span>
        </div>
    );
};

export default Coin;
