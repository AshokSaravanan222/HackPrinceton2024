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
  const [imageFile1, setImageFile1] = useState<File | null>(null);
  const [imageFile2, setImageFile2] = useState<File | null>(null);
  const [clothingName, setClothingName] = useState('');
  const [labelDetails, setLabelDetails] = useState('');
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImagePreview: React.Dispatch<React.SetStateAction<string | null>>,
    setImageFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file); // Save file for upload
    }
  };

  const uploadToAPI = async (file: File, visionApiUrl: string) => {
    const base64Data = await toBase64(file);
    const uploadResponse = await fetch('https://jeiq0otl56.execute-api.us-east-2.amazonaws.com/default/slo-images', {
      method: 'POST',
      body: JSON.stringify({ image: base64Data })
    });

    if (!uploadResponse.ok) throw new Error('Failed to upload to S3');
    const { id } = await uploadResponse.json();

    const visionResponse = await fetch(visionApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (!visionResponse.ok) throw new Error('Failed to process image');
    return await visionResponse.json();
  };

  const uploadImages = async () => {
    if (!imageFile1 || !imageFile2) {
      setUploadStatus('Both images must be selected for upload.');
      return;
    }

    setLoading(true);
    setUploadStatus('Uploading...');
    try {
      const [clothingData, labelData] = await Promise.all([
        uploadToAPI(imageFile1, 'http://127.0.0.1:5000/vision1'),
        uploadToAPI(imageFile2, 'http://127.0.0.1:5000/vision2'),
      ]);

      setClothingName(clothingData[0]?.clothing_name || 'Unknown');
      setLabelDetails(JSON.stringify(labelData) || 'No details');
      setUploadStatus('Upload complete.');
    } catch (error) {
      console.error(error);

      setUploadStatus('Error during upload.');
    } finally {
      setLoading(false);
    }
  };

    
  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString().split(',')[1] as any);
      reader.onerror = (error) => reject(error);
    });

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
        <Link
          href="/clothes/other"
          className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <Image
            src={require("../../../assets/other.jpg")}
            alt="Learn"
            className="w-full h-64 object-cover"
          />
          <div className="p-5">
            <h2 className="mb-3 text-xl font-semibold">
              Other <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
            </h2>
            <p className="text-sm opacity-75">
              Explore clothes that are miscellaneous.
            </p>
          </div>
        </Link>
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
                  onChange={(e) => handleImageChange(e, setImagePreview1, setImageFile1)}
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
                  onChange={(e) => handleImageChange(e, setImagePreview2, setImageFile2)}
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
              <button onClick={uploadImages} disabled={!imageFile1 || !imageFile2} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Upload
              </button>
              {loading ? <p>Loading...</p> : uploadStatus && <p>{uploadStatus}</p>}
              {clothingName && <p>Clothing Name: {clothingName}</p>}
              {labelDetails && <p>Label Details: {labelDetails}</p>}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Wardrobe;
