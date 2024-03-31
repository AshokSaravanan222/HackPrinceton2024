'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GridItemProps } from '../../../types';
import { useCart } from '../../context/CartContext'; // Adjust the path as needed

const GridItem: React.FC<GridItemProps> = ({ href, imgSrc, altText, title, description }) => {
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const item = { href, imgSrc, altText, title, description };
    addToCart(item);
    setIsAdded(true);

    // Optional: Reset button state after a few seconds
    setTimeout(() => setIsAdded(false), 3000);
  };

  return (
    <Link href={href} className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full">
      <div className="relative w-full pb-[100%]">
        <Image src={imgSrc} alt={altText} layout="fill" className="object-cover" />
      </div>
      <div className="bg-white p-5">
        <h2 className="text-xl font-semibold mb-3">{title}</h2>
        <p className="text-sm opacity-75">{description}</p>
        <p className="text-lg font-semibold mt-2">$29.99</p>
        <button
          className={`mt-4 text-white py-2 px-4 rounded transition-colors ${isAdded ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
          onClick={handleAddToCart}
          disabled={isAdded}
        >
          {isAdded ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </Link>
  );
};

export default GridItem;
