'use client'
import React, { useState } from 'react';

interface ClothingItem {
  id: number;
  name: string;
  cost: number;
  type: 'top' | 'bottom' | 'other';
}

// Define the type for a clothing item

const Recycle = () => {
  // Sample array of clothing items
  const clothingItems: ClothingItem[] = [
    { id: 1, name: "Cotton T-Shirt", cost: Math.floor(Math.random() * 20) + 1, type: "top" },
    { id: 2, name: "Denim Jeans", cost: Math.floor(Math.random() * 20) + 1, type: "bottom" },
    { id: 3, name: "Linen Blouse", cost: Math.floor(Math.random() * 20) + 1, type: "top" },
    { id: 4, name: "Running Shorts", cost: Math.floor(Math.random() * 20) + 1, type: "bottom" },
    { id: 5, name: "Wool Scarf", cost: Math.floor(Math.random() * 20) + 1, type: "other" },
  ];

  // State to keep track of selected items' IDs
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Toggle selection state for an item
  const toggleItemSelection = (id: number) => {
    setSelectedIds((currentSelectedIds) =>
      currentSelectedIds.includes(id)
        ? currentSelectedIds.filter((selectedId) => selectedId !== id)  // Deselect
        : [...currentSelectedIds, id]  // Select
    );
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
          </tr>
        </thead>
        <tbody>
          {clothingItems.map((item) => (
            <tr
              key={item.id}
              className={`cursor-pointer ${selectedIds.includes(item.id) ? "bg-gray-300" : ""}`}
              onClick={() => toggleItemSelection(item.id)}
            >
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{`$${item.cost}`}</td>
              <td className="px-6 py-4 capitalize">{item.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Recycle;
