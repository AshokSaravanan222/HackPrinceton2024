'use client'
import React, { use, useState, useEffect } from 'react';
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

  useEffect(() => {
    if (user) {
      
      const id = user.email? user.email : user.picture;

      console.log('User:', id);

      const fetchUser = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/get_user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: id }) 
          });

          const data = await response.json();
          if (data.none === "None") {
            await fetch('http://127.0.0.1:5000/add_user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email: id, name: user.name }) 
            });
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
      fetchUser();
    }}, [user]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 p-4 bg-gray-200 shadow-md z-50">
        <div className="flex justify-between items-center">
          {user ? (
            <>
              {renderIconForRoute()}
              <div className="flex items-center relative">
                <Coin />
                <div className="ml-4 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={user.picture || 'path/to/default/avatar'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  {isDropdownOpen && (
                    // Adjust the positioning of the dropdown here
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2">
                      <a href="/api/auth/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                    </div>
                  )}
                </div>
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
