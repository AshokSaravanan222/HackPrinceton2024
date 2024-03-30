'use client'
import React from 'react';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const Bottoms = () => {
  const { user } = useUser();
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 lg:p-24">
      <h1 className="text-2xl font-bold mb-8">Bottoms</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-center">
        {/* Example of a card with a big image */}
        <Link
          href="/clothes/tops"
          className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <Image
            src={require("../../../../assets/top.jpg")}
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
            src={require("../../../../assets/bottom.jpg")}
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
    </main>
  );
};

export default Bottoms;
