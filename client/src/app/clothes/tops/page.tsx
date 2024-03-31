'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useUser, UserProfile } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const Tops = () => {
  const { user } = useUser();
  const [tops, setTops] = useState([]);

  useEffect(() => {
    const fetchUserClothes = async () => {
      if (user) {
        const id = user.email? user.email : user.picture;

        try {
          const res = await fetch(`http://localhost:5000/get_user`, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: id }), 
          });
          const userData = await res.json();
          const userClothes = userData.clothes || [];
          const topClothes = userClothes.filter((clothing: any) => clothing.type === 'top');
          setTops(topClothes);
        } catch (error) {
          console.error('Error fetching user clothes:', error);
        }
      }
    };

    fetchUserClothes();
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 lg:p-24">
      <h1 className="text-2xl font-bold mb-8">Tops</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-center">
        {tops.map((clothing : any, index) => (
          <div key={index} className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            
            <img
              src={clothing.image}
              alt={clothing.name}
        
              className="w-full h-64 object-cover"
            />
            <div className="p-5">
              <h2 className="mb-3 text-xl font-semibold">
                {clothing.name} <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
              </h2>
              <p className="text-sm opacity-75">
                {clothing.color}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Tops;
