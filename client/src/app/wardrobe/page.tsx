'use client'
import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import Footer from '@/components/footer/footer';

const Wardrobe = () => {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCongratsModalOpen, setIsCongratsModalOpen] = useState(false);
  const [imagePreview1, setImagePreview1] = useState<string | null>(null);
  const [imagePreview2, setImagePreview2] = useState<string | null>(null);
  const [imageFile1, setImageFile1] = useState<File | null>(null);
  const [imageFile2, setImageFile2] = useState<File | null>(null);
  const [clothingName, setClothingName] = useState('');
  const [labelInfo, setLabelInfo] = useState('');
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [label, setLabel] = useState<File | null>(null);
  const [itemDetails, setItemDetails] = useState([{ clothing_name: "", color: "", type: "", image_url: "" }]);
  const [labelDetails, setLabelDetails] = useState([{image_url: ""}]);




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
      setImageFile(file);
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


  // const uploadImages = async () => {
  //   if (!imageFile1 || !imageFile2) {
  //     setUploadStatus('Both images must be selected for upload.');
  //     return;
  //   }

  //   setLoading(true);
  //   setUploadStatus('Uploading...');
  //   try {
  //     const [clothingData, labelData] = await Promise.all([
  //       uploadToAPI(imageFile1, 'http://127.0.0.1:5000/vision1'),
  //       uploadToAPI(imageFile2, 'http://127.0.0.1:5000/vision2'),
  //     ]);

  //     setClothingName(clothingData[0]?.clothing_name || 'Unknown');
  //     setLabelInfo(JSON.stringify(labelData) || 'No Info');
  //     setUploadStatus('Upload complete.');
  //   } catch (error) {
  //     console.error(error);

  //     setUploadStatus('Error during upload.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString().split(',')[1] as any);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files && e.target.files[0];
    setFile(selected);

    if (selected) {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(selected);
        reader.onloadend = async () => {
          const base64Data = reader.result?.toString().split(',')[1];

          const s3_res = await fetch('https://jeiq0otl56.execute-api.us-east-2.amazonaws.com/default/slo-images', {
            method: 'POST',
            body: JSON.stringify({ image: base64Data })
          });

          const s3_data = await s3_res.json();

          const res = await fetch('http://127.0.0.1:5000/vision1', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: s3_data.id })
          });

          const data = await res.json();
          setItemDetails(data);
        };
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChangeLabel = async (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files && e.target.files[0];
    setLabel(selected);

    if (selected) {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(selected);
        reader.onloadend = async () => {
          const base64Data = reader.result?.toString().split(',')[1];

          const s3_res = await fetch('https://jeiq0otl56.execute-api.us-east-2.amazonaws.com/default/slo-images', {
            method: 'POST',
            body: JSON.stringify({ image: base64Data })
          });

          const s3_data = await s3_res.json();

          const res = await fetch('http://127.0.0.1:5000/vision2', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: s3_data.id })
          });

          const data = await res.json();
          setLabelDetails(data);
        };
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmitClothes = async () => {
    if (itemDetails[0].image_url == "" || labelDetails[0].image_url == "" || !user) return
    const formData = new FormData();
    const id = user.email ? user.email : user.picture;

    formData.append('email', id as string);
    formData.append('name', itemDetails[0].clothing_name);
    formData.append('color', itemDetails[0].color);
    formData.append('type', itemDetails[0].type);
    formData.append('image', itemDetails[0].image_url);
    formData.append('label', JSON.stringify(labelDetails));

    const res = await fetch('http://127.0.0.1:5000/add_clothes', {
      method: 'POST',
      body: formData
    });

    const get_coin = await fetch('http://127.0.0.1:5000/give_coin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ wallet: "0xb3ebA584B5DD1F2eF5270e937c8248ac38F48727" })
    });

    setIsModalOpen(false)
    setIsCongratsModalOpen(true);
  }


  return (
    <>
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
                  onChange={(e) => { handleImageChange(e, setImagePreview1, setImageFile1), handleChange(e) }}
                  className="mb-2"
                />
                <p>Status: {itemDetails[0].image_url != "" ? "Done" : "No image selected"}</p>
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
                  onChange={(e) => { handleImageChange(e, setImagePreview2, setImageFile2), handleChangeLabel(e) }}
                  className="mb-2"
                />

                <p>Status: {labelDetails[0].image_url != "" ? "Done" : "No image selected"}</p>


              </div>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button onClick={handleSubmitClothes} disabled={!imageFile1 || !imageFile2} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Upload
              </button>
              {loading ? <p>Loading...</p> : uploadStatus && <p>{uploadStatus}</p>}
              {clothingName && <p>Clothing Name: {clothingName}</p>}
              {labelInfo && <p>Label Details: {labelInfo}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Congrats Modal */}
{isCongratsModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
    <div className="bg-white p-4 rounded-lg flex flex-col items-center">
      <h2 className="font-bold text-lg mb-4">Congratulations!</h2>
      <Image src={require("../../../assets/slocoin.png")} alt="Coin" width={150} height={150} style={{margin:"20px"}} />
      
      <p><b>You earned +1 SloCoin.</b></p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => setIsCongratsModalOpen(false)}
      >
        Close
      </button>
    </div>
  </div>
)}
    </main>
    { isModalOpen? null : <Footer /> }
    </>
  );
};

export default Wardrobe;
