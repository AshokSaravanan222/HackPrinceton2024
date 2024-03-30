'use client'
import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const Header: React.FC = () => {
  const [isLeftModalOpen, setLeftModalOpen] = useState(false);
    const [isRightModalOpen, setRightModalOpen] = useState(false);
  const { user } = useUser();
  const pathname = usePathname()

  // Function to render different icons based on the current route
  const renderIconForRoute = () => {
    // Example paths, adjust according to your application's routes
    switch (pathname) {
      case '/':
        return (<div>
            <Link href="/wardrobe">
              <text className="px-4 py-2 bg-blue-500 text-white rounded-lg">Wardrobe</text>
            </Link></div>);
      case '/wardrobe':
        return (<div>
            <Link href="/">
              <text className="px-4 py-2 bg-blue-500 text-white rounded-lg">Home</text>
            </Link></div>);
      // Add more cases as needed
      default:
        return null;
    }
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 p-4 bg-gray-200 shadow-md">
        <div className="flex justify-between items-center">
          {/* Left button or icon */}
          

          {/* Right button: Conditional rendering based on user login status */}
          {user ? (
            <>
            {renderIconForRoute()}
              {/* If logged in, show Home button or user profile picture */}
              <img
                src={user.picture || 'path/to/default/avatar'}
                alt="Profile"
                className="w-10 h-10 rounded-full ml-4"
                onClick={() => setRightModalOpen(true)}
              />
            </>
          ) : (
            // If not logged in, show login button
            <Link href="/api/auth/login">
              <text className="px-4 py-2 bg-green-500 text-white rounded-lg">Login</text>
            </Link>
          )}
        </div>
      </div>

      {/* Modals here */}
      {/* Left Modal */}
      {isLeftModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl mb-4">Left Modal Content</h2>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={() => setLeftModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Right Modal */}
      {isRightModalOpen && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
       <div className="bg-white p-8 rounded-lg">
         <h2 className="text-xl mb-4">User Actions</h2>
         {/* Direct <a> tag for logout to cause a full page reload */}
         <a
           href="/api/auth/logout"
           className="px-4 py-2 bg-red-500 text-white rounded-lg"
         >
           Logout
         </a>
       </div>
     </div>
      )}
    </>
  );
};

export default Header;
