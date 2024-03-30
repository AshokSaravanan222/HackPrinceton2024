import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 p-4 transparent shadow-lg">
      <div className="flex justify-around">
        {/* Recycle Button */}
        <Link
          href="/recycle"
          className="px-6 py-3 bg-blue-800 text-white rounded-lg shadow-md transition duration-150 ease-in-out hover:bg-blue-900"
        >
          Recycle
        </Link>
        
        {/* Wardrobe Button */}
        <Link
          href="/wardrobe"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md transition duration-150 ease-in-out hover:bg-green-700"
        >
          Wardrobe
        </Link>

        {/* Shop Button - Adjusted to dark blue for consistency */}
        <Link
          href="/shop"
          className="px-6 py-3 bg-blue-800 text-white rounded-lg shadow-md transition duration-150 ease-in-out hover:bg-blue-900"
        >
          Shop
        </Link>
      </div>
    </div>
  );
};

export default Footer;
