import React from 'react';
import Footer from "@/components/footer/footer"; // Import the Footer component

export default function UploadLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>
      {children} {/* This is where the content of the page will be injected */}
      <Footer /> {/* Footer added here, so it appears below the content */}
    </section>
  )
}
