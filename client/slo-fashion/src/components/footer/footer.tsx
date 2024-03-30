import React from 'react';
import Link from 'next/link'; // Import Link from next/navigation

const Footer: React.FC = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 p-4 bg-gray-200 shadow-md">
      <div className="flex justify-around">
        <Link href="/recycle" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Recycle</Link>
        <Link href="wardrobe" className="px-4 py-2 bg-green-500 text-white rounded-lg">Wardrobe</Link>
        <Link href="/shop" className="px-4 py-2 bg-red-500 text-white rounded-lg">Shop</Link>
      </div>
    </div>
  );
};

export default Footer;
