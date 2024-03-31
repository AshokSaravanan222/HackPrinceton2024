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
    <main className="flex flex-col items-center justify-center min-h-screen p-0 relative">
      <GridContainer items={items} />
      {/* Fixed or Absolute top content */}
      <div className="w-full absolute top-0 p-4 flex items-center justify-between">
      
        {/* <div className="flex space-x-4">
          <button className="p-2 bg-gray-400 text-black rounded text-3xl">Back</button>
          <button className="p-2 bg-gray-400 text-black rounded text-3xl">Cart</button>
        </div> */}
        <div className="flex space-x-10">
          {/* <Image src={require("../../../assets/coin.png")} alt="Coin" width={50} height={50} /> */}
          {/* <Image src={require("../../../assets/user_icon.png")} alt="User Icon" width={50} height={50} /> */}
        </div>
      </div>

      {/* Logo positioned within the flow but at the top, outside of the main centering context */}
      <div className="self-start pt-2 w-full flex justify-center absolute top-0">
        {/* <Image src={require("../../../assets/princeton_logo.png")} alt="logo" width={150} height={150} /> */}
      </div>

      {/* Spacer div to ensure grid centers in remaining space - Adjust 'h' value as needed based on header size */}
      <div className="flex-grow"></div>

      {/* Grid content - Automatically centered within main due to flex-grow on spacer div */}
      <div className="grid grid-cols-4 gap-10 w-full max-w-4xl">
        <div className="bg-gray-200 p-4 rounded">Item 1</div>
        <div className="bg-gray-200 p-4 rounded">Item 2</div>
        <div className="bg-gray-200 p-4 rounded">Item 3</div>
        <div className="bg-gray-200 p-4 rounded">Item 4</div>
        {/* Add more items as needed */}
      </div>

      {/* Additional spacer div to balance flex-grow */}
      <div className="flex-grow"></div>
    </main>
  );
}

export default Shop;

