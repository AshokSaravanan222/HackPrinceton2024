'use client'
import Link from "next/link";
import Header from "@/components/header/header";
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from "next/image";

export default function Home() {
  const { user, error, isLoading } = useUser();

  return (
    
    //<main className="flex min-h-screen flex-col items-center justify-between p-24">
   
    <main className="bg-gray-100 min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Sustainable Fashion */}
          <Link href="/sustainable-fashion">
            <text className="group rounded-lg overflow-hidden relative">
              <Image src={require("../../assets/sustainable-fashion.jpg")} alt="Sustainable Fashion" className="w-full h-auto transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black opacity-40 transition-opacity group-hover:opacity-60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-xl font-semibold text-white transition-opacity opacity-0 group-hover:opacity-100">Sustainable Fashion</h2>
              </div>
            </text>
          </Link>

          {/* Recycling Initiatives */}
          <Link href="/recycling-initiatives">
            <text className="group rounded-lg overflow-hidden relative">
              <Image src={require("../../assets/recycling-initiative.jpg")} alt="Recycling Initiatives" className="w-full h-auto transition-transform group-hover:scale-105" />
    
              <div className="absolute inset-0 bg-black opacity-40 transition-opacity group-hover:opacity-60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-xl font-semibold text-white transition-opacity opacity-0 group-hover:opacity-100">Recycling Initiatives</h2>
              </div>
            </text>
          </Link>

          {/* Eco-friendly Products */}
          <Link href="/eco-friendly-products">
            <text className="group rounded-lg overflow-hidden relative">
              <Image src={require("../../assets/Eco-friendly-fashion.jpg")} alt="Eco-friendly Fashion" className="w-full h-auto transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black opacity-40 transition-opacity group-hover:opacity-60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-xl font-semibold text-white transition-opacity opacity-0 group-hover:opacity-100">Eco-friendly Products</h2>
              </div>
            </text>
          </Link>
          </div>
          </main>

    </main>
  );
}
