'use client'
import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isLeftModalOpen, setLeftModalOpen] = useState(false);
  const [isRightModalOpen, setRightModalOpen] = useState(false);
  const { user, error, isLoading } = useUser();

  return (
    <>
      <div className="fixed inset-x-0 top-0 p-4 bg-gray-200 shadow-md">
        <div className="flex justify-between items-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => setLeftModalOpen(true)}
          >
            About Us
          </button>
          {user ? (
            // If logged in, show profile picture or a placeholder if there's no picture
            <img
              src={user.picture || 'path/to/default/avatar'}
              alt="Profile"
              className="w-10 h-10 rounded-full"
              onClick={() => setRightModalOpen(true)} // Assuming you want the modal for some user-specific actions
            />
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
           className="px-4 py-2 bg-teal-500 text-white rounded-lg"
         >
           Logout
         </a>
         <button
           className="px-4 py-2 bg-red-500 text-white rounded-lg"
           onClick={() => setRightModalOpen(false)}
        >Close</button>
       </div>
     </div>
      )}

    </>
  );
};

export default Header;