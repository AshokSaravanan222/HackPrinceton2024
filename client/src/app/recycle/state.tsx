'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { ClothingItem as ImportedClothingItem } from '../../../types';

// Extend the ClothingItem type locally if needed
interface ClothingItem extends ImportedClothingItem {
  isRecycled: boolean;
}

const Recycle = () => {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([
    { id: 1, name: "Cotton T-Shirt", cost: Math.floor(Math.random() * 20) + 1, type: "top", isRecycled: false },
    { id: 2, name: "Denim Jeans", cost: Math.floor(Math.random() * 20) + 1, type: "bottom", isRecycled: false },
    { id: 3, name: "Linen Blouse", cost: Math.floor(Math.random() * 20) + 1, type: "top", isRecycled: false },
    { id: 4, name: "Running Shorts", cost: Math.floor(Math.random() * 20) + 1, type: "bottom", isRecycled: false },
    { id: 5, name: "Wool Scarf", cost: Math.floor(Math.random() * 20) + 1, type: "other", isRecycled: false },
  ]);

  const toggleRecycled = (id: number) => {
    setClothingItems(clothingItems.map(item =>
      item.id === id ? { ...item, isRecycled: !item.isRecycled } : item
    ));
  };

  return (
    <main className="flex flex-col items-center justify-center w-full p-24">
      <h1 className="text-4xl mb-8">Clothing Items</h1>
      <table className="w-full table-auto bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Cost ($)</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Recycle</th>
          </tr>
        </thead>
        <tbody>
          {clothingItems.map((item) => (
            <tr 
              key={item.id} 
              className={`cursor-pointer ${item.isRecycled ? "bg-gray-300" : ""}`}
              onClick={() => toggleRecycled(item.id)}
            >
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{`$${item.cost}`}</td>
              <td className="px-6 py-4 capitalize">{item.type}</td>
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={item.isRecycled}
                  onChange={(e) => {
                    e.stopPropagation(); // Prevent the row click event
                    toggleRecycled(item.id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/post/shipping" className={'mt-4 px-6 py-2 rounded-full text-lg bg-teal-700 text-white'}>
        <text>Process</text>
      </Link>
    </main>
  );
};

export default Recycle;

