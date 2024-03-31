import React from 'react';
import Image from 'next/image';
import GridContainer from "../../components/shopGrid/GridContainer";

const Shop = () => {
  const items = [
    {
      href: '/clothes/tops',
      imgSrc: require("../../../assets/bottom.jpg"),
      altText: 'Tops',
      title: 'Tops',
      description: 'Explore the tops that you have already scanned.'
    },
    {
      href: '/clothes/tops',
      imgSrc: require("../../../assets/top.jpg"),
      altText: 'Tops',
      title: 'Tops',
      description: 'Explore the tops that you have already scanned.'
    },
    {
      href: '/clothes/tops',
      imgSrc: require("../../../assets/top.jpg"),
      altText: 'Tops',
      title: 'Tops',
      description: 'Explore the tops that you have already scanned.'
    },
    {
      href: '/clothes/tops',
      imgSrc: require("../../../assets/top.jpg"),
      altText: 'Tops',
      title: 'Tops',
      description: 'Explore the tops that you have already scanned.'
    },
    {
      href: '/clothes/tops',
      imgSrc: require("../../../assets/top.jpg"),
      altText: 'Tops',
      title: 'Tops',
      description: 'Explore the tops that you have already scanned.'
    },
    {
      href: '/clothes/tops',
      imgSrc: require("../../../assets/top.jpg"),
      altText: 'Tops',
      title: 'Tops',
      description: 'Explore the tops that you have already scanned.'
    },
    {
      href: '/clothes/tops',
      imgSrc: require("../../../assets/top.jpg"),
      altText: 'Tops',
      title: 'Tops',
      description: 'Explore the tops that you have already scanned.'
    },
    {
      href: '/clothes/tops',
      imgSrc: require("../../../assets/top.jpg"),
      altText: 'Tops',
      title: 'Tops',
      description: 'Explore the tops that you have already scanned.'
    },
    {
      href: '/clothes/tops',
      imgSrc: require("../../../assets/top.jpg"),
      altText: 'Tops',
      title: 'Tops',
      description: 'Explore the tops that you have already scanned.'
    },
    // Add more items as needed
  ];


  return (
    <div className="flex flex-col min-h-screen"> {/* This div wraps your entire page content */}

      {/* Header (Top content) */}
      <div className="flex justify-between items-center p-4 shadow-md"> {/* Adjust styling as needed */}
        {/* Header content here */}
      </div>

      {/* Grid Container (Main content) */}
      {/* Apply flex-grow for this section to take up all available space */}
      <div className="flex-grow overflow-auto">
        <GridContainer items={items} />
      </div>

      {/* Bottom Buttons (Footer content) */}
      <div className="flex justify-around items-center p-4 shadow-md"> {/* Adjust styling as needed */}
        {/* Bottom buttons here */}
      </div>

    </div>
  );
}

export default Shop;

