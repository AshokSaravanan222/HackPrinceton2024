'use client'
import Link from "next/link";
import Header from "@/components/header/header";
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from "next/image";

export default function Home() {
  const { user, error, isLoading } = useUser();

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-12 bg-cover bg-center bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8">Seamlessly connecting consumers to suppliers for eco-friendly clothing recycling.</h1>
        <Header />
    

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Sustainable Fashion */}
          <Link href="/sustainable-fashion">
            <div className="group rounded-full overflow-hidden relative w-64 h-64" style={{ position: 'relative', left: '50px', top: '-50px' }}>
              <Image src={require("../../assets/sustainable-fashion.jpg")} alt="Sustainable Fashion" className="w-full h-auto transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black opacity-40 transition-opacity group-hover:opacity-60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-xl font-semibold text-white transition-opacity opacity-0 group-hover:opacity-100">Sustainable Fashion</h2>
              </div>
            </div>
          </Link>

          {/* Recycling Initiatives */}
          <Link href="/recycling-initiatives">
            <div className="group rounded-full overflow-hidden relative w-64 h-64" style={{ position: 'relative', left: '20px', top: '40px' }}>
              <Image src={require("../../assets/recycling-initiative.jpg")} alt="Recycling Initiatives" className="w-full h-auto transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black opacity-40 transition-opacity group-hover:opacity-60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-xl font-semibold text-white transition-opacity opacity-0 group-hover:opacity-100">Recycling Initiatives</h2>
              </div>
            </div>
          </Link>

          {/* Eco-friendly Products */}
          <Link href="/eco-friendly-products">
            <div className="group rounded-full overflow-hidden relative w-64 h-64" style={{ position: 'relative', left: '10', top: '30' }}>
              <Image src={require("../../assets/Eco-friendly-fashion.jpg")} alt="Eco-friendly Fashion" className="w-full h-auto transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black opacity-40 transition-opacity group-hover:opacity-60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-xl font-semibold text-white transition-opacity opacity-0 group-hover:opacity-100">Eco-friendly Products</h2>
              </div>
            </div>
          </Link>
          </div>
          </main>

    <div className="bg-white w-full py-4 px-6 rounded-lg">
      <div className="container mx-auto text-center">
        <h2 className="text-xl text-black font-bold mb-2">About Us</h2>
            <p className="text-base text-gray-700">Meet four enthusiast college students finding environmental, economical solution to the textile waste that is generated every year .</p>
          </div>
          </div>
      </div>
      </div>


  
  );
}
