'use client'
import React, { useState } from 'react';

const Header: React.FC = () => {
  // State to control the visibility of modals
  const [isLeftModalOpen, setLeftModalOpen] = useState(false);
  const [isRightModalOpen, setRightModalOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-x-0 top-0 p-4 bg-gray-200 shadow-md">
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => setLeftModalOpen(true)}
          >
            Left Modal
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={() => setRightModalOpen(true)}
          >
            Right Modal
          </button>
        </div>
      </div>

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
            <h2 className="text-xl mb-4">Right Modal Content</h2>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={() => setRightModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
