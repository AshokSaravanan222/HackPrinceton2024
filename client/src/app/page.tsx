'use client'
import Link from "next/link";
import Header from "@/components/header/header";
import { useUser } from '@auth0/nextjs-auth0/client';

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
              <img src="/images/sustainable-fashion.jpg" alt="Sustainable Fashion" className="w-full h-auto transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black opacity-40 transition-opacity group-hover:opacity-60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-xl font-semibold text-white transition-opacity opacity-0 group-hover:opacity-100">Sustainable Fashion</h2>
              </div>
            </text>
          </Link>

          {/* Recycling Initiatives */}
          <Link href="/recycling-initiatives">
            <text className="group rounded-lg overflow-hidden relative">
              <img src="/images/recycling-initiatives.jpg" alt="Recycling Initiatives" className="w-full h-auto transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black opacity-40 transition-opacity group-hover:opacity-60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-xl font-semibold text-white transition-opacity opacity-0 group-hover:opacity-100">Recycling Initiatives</h2>
              </div>
            </text>
          </Link>

          {/* Eco-friendly Products */}
          <Link href="/eco-friendly-products">
            <text className="group rounded-lg overflow-hidden relative">
              <img src="/images/eco-friendly-products.jpg" alt="Eco-friendly Products" className="w-full h-auto transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black opacity-40 transition-opacity group-hover:opacity-60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-xl font-semibold text-white transition-opacity opacity-0 group-hover:opacity-100">Eco-friendly Products</h2>
              </div>
            </text>
          </Link>
          </div>
          </main>

      {/* <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
          
        </a>
      </div> */}

    </main>
  );
}
