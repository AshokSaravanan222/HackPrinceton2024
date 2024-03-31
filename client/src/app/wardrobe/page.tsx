'use client'
import React, {useState} from 'react';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const Wardrobe = () => {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview1, setImagePreview1] = useState<string | null>(null);
  const [imagePreview2, setImagePreview2] = useState<string | null>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImagePreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 lg:p-24">
      <h1 className="text-2xl font-bold mb-8">{user?.name}'s Wardrobe</h1>

      {/* Button to open modal */}
      <button
        className="mb-8 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={() => setIsModalOpen(true)}
      >
        Upload New Picture
      </button>

      {/* Modal for uploading pictures */}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-center">
        {/* Example of a card with a big image */}
        <Link
          href="/clothes/tops"
          className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <Image
            src={require("../../../assets/top.jpg")}
            alt="Tops"
            className="w-full h-64 object-cover"
          />
          <div className="p-5">
            <h2 className="mb-3 text-xl font-semibold">
              Tops <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
            </h2>
            <p className="text-sm opacity-75">
              Explore the tops that you have already scanned.
            </p>
          </div>
        </Link>

        {/* Repeat for other cards as needed, just change the href, img src, alt, and text as needed */}
        {/* Second card example */}
        <Link
          href="/clothes/bottoms"
          className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <Image
            src={require("../../../assets/bottom.jpg")}
            alt="Learn"
            className="w-full h-64 object-cover"
          />
          <div className="p-5">
            <h2 className="mb-3 text-xl font-semibold">
              Bottoms <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
            </h2>
            <p className="text-sm opacity-75">
              Explore some bottoms that you have already scanned.
            </p>
          </div>
        </Link>

        {/* Add more cards as needed */}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-4">Upload Pictures</h2>
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-4">
              <div className="flex-1">
                <h3 className="text-md font-medium mb-2">Clothing Image</h3>
                {imagePreview1 && (
                  <div className="flex flex-col items-center mb-2">
                    <img src={imagePreview1} alt="Clothing Preview" className="max-w-xs h-auto" />
                  </div>
                )}
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, setImagePreview1)}
                  className="mb-2"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-md font-medium mb-2">Tag Image</h3>
                {imagePreview2 && (
                  <div className="flex flex-col items-center mb-2">
                    <img src={imagePreview2} alt="Tag Preview" className="max-w-xs h-auto" />
                  </div>
                )}
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, setImagePreview2)}
                  className="mb-2"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  // Handle the upload logic for both images
                  setIsModalOpen(false);
                }}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Wardrobe;
