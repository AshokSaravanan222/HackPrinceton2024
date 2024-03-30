'use client'
import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useUser();
  const pathname = usePathname();

  // Function to render different icons based on the current route
  const renderIconForRoute = () => {
    switch (pathname) {
      case '/':
        return (
          <Link href="/wardrobe">
            <text className="px-4 py-2 bg-blue-500 text-white rounded-lg">Wardrobe</text>
          </Link>
        );
      default:
        return (
            <Link href="/">
              <text className="px-4 py-2 bg-blue-500 text-white rounded-lg">Home</text>
            </Link>
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
              <div className="relative" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <img
                  src={user.picture || 'path/to/default/avatar'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2">
                    {/* Dropdown items */}
                    <a href="/api/auth/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link href="/api/auth/login">
              <text className="px-4 py-2 bg-green-500 text-white rounded-lg">Login</text>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
