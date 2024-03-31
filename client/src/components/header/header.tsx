'use client'
import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Coin from '../coin/Coin';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useUser();
  const pathname = usePathname();

  const renderIconForRoute = () => {
    switch (pathname) {
      case '/':
        return (
          <Link href="/wardrobe" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Wardrobe</Link>
        );
      case '/shop':
        return (
          <Link href="/cart" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Cart</Link>
        );
      default:
        return (
          <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Home</Link>
        );
    }
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 p-4 bg-gray-200 shadow-md">
        <div className="flex justify-between items-center">
          {user ? (
            <>
              {renderIconForRoute()}
              <div className="flex items-center cursor-pointer relative" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <Coin />
                <img
                  src={user.picture || 'path/to/default/avatar'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full ml-2" // Added ml-2 for spacing between the coin and the profile image
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-12 w-48 bg-white shadow-md rounded-md py-2">
                    <a href="/api/auth/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link href="/api/auth/login" className="px-4 py-2 bg-green-500 text-white rounded-lg">Login</Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
