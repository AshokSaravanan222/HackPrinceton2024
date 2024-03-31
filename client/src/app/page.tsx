'use client'
import Link from "next/link";
import Header from "@/components/header/header";
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from "next/image";

export default function Home() {
  const { user, error, isLoading } = useUser();

  return (
    <div>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center pt-[4rem]">
      <Header />
      


      <div className="container mx-auto px-4 py-12 bg-cover bg-center bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-center mb-8">Seamlessly connecting consumers to suppliers for eco-friendly clothing recycling.</h2>
        

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
              <Image src={require("../../assets/recycling-initiative.jpg")} alt="Recycling Initiatives" layout="fill" objectFit="cover" className="transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black opacity-40 transition-opacity group-hover:opacity-60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-xl font-semibold text-white transition-opacity opacity-0 group-hover:opacity-100">Recycling Initiatives</h2>
              </div>
            </div>
          </Link>

          {/* Eco-friendly Products */}
          <Link href="/eco-friendly-products">
            <div className="group rounded-full overflow-hidden relative w-64 h-64" style={{ position: 'relative', left: '10', top: '30' }}>
              <Image src={require("../../assets/Eco-friendly-fashion.jpg")} alt="Eco-friendly Fashion" layout="fill" objectFit="cover" className="transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black opacity-40 transition-opacity group-hover:opacity-60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-xl font-semibold text-white transition-opacity opacity-0 group-hover:opacity-100">Eco-friendly Products</h2>
              </div>
            </div>
          </Link>
          </div>
          </main>
      </div>
      </div>

      <div className="bg-white py-12">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl text-black font-bold mb-6">About Us</h2>
            <p className="text-gray-700 mb-6">Slo-Fashion, created by four enthusiastic college students, is dedicated to solve the fashion landfill waste problem and making recycling more convenient. We've made it our mission to collect your used outfits and get them into the hands of eco-friendly brands that give them a second chance. And here's the cool part: for every piece you send our way, we thank you with some cryptocurrency.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Image src={require("../../assets/Ashok1.jpeg")} alt="Gallery Image 1" className="rounded-lg shadow-lg"/>
            <Image src={require("../../assets/Simi.jpeg")} alt="Gallery Image 2" className="rounded-lg shadow-lg"/>
            <Image src={require("../../assets/Naomi.jpeg")} alt="Gallery Image 3" className="rounded-lg shadow-lg"/>
            <Image src={require("../../assets/Steven.jpeg")} alt="Gallery Image 4" className="rounded-lg shadow-lg"/>
            </div>
          </div>
        </div>

        <div className="bg-white py-12">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl text-black font-bold mb-6">Why Slo</h2>
            <Image src={require("../../assets/why-slo.jpeg")} alt="Why Slo" layout="responsive" width={700} height={400} className="rounded-lg mb-6"/>
            <p className="text-gray-700">According to TheRoundUp.org " Between 80 and 100 billion new clothing garments are produced globally every year. 87% of the materials and fibers used to make clothing will end up in either incinerators or landfills. Only 20% of discarded textiles are collected. Only 1% of clothes will get recycled into new garments." The alarming rate of landfill waste produced by the fast fashion industry is concerning. The environmental degradation and the fashion industry's significant carbon footprint inspired us to make an effort for change. We discovered a gap between consumer intentions and actions towards sustainability. Fashion brands are trying to become more sustainable by providing discounts to customers for recycling clothes, but we all know how hard it is to physically go to a store to give up on old clothes to earn some discounts in our busy schedules. Inspired to bridge this gap, we set out to create a platform that makes sustainable living accessible and rewarding.</p>
          </div>
        </div>
  </div>

  );
}
