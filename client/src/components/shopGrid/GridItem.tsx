// components/GridItem.tsx
import Image from 'next/image';
import Link from 'next/link';
import { GridItemProps } from '../../../types';

const GridItem: React.FC<GridItemProps> = ({ href, imgSrc, altText, title, description }) => {
  return (
    <Link href={href} className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full">
      {/* Container for the square image, ensuring aspect ratio 1:1 */}
      <div className="relative w-full pb-[100%]"> {/* Padding-bottom of 100% forces a square */}
        <Image src={imgSrc} alt={altText} layout="fill" objectFit="cover" />
      </div>
      {/* Rectangular section for additional information */}
      <div className="bg-white p-5">
        <h2 className="text-xl font-semibold mb-3">
          {title}
        </h2>
        <p className="text-sm opacity-75">
          {description}
        </p>
        {/* Example placeholders for price and add-to-cart button */}
        <p className="text-lg font-semibold mt-2">$29.99</p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default GridItem;
