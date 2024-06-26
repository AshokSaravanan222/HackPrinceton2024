import { StaticImageData } from "next/image";

type GridItemProps = {
    href: string;
    imgSrc: StaticImageData;
    altText: string;
    title: string;
    description: string;
  };


type GridContainerProps = {
    items: GridItemProps[];
  };

  interface ClothingItem {
    id: number;
    name: string;
    cost: number;
    coins: number;
    type: 'top' | 'bottom' | 'other';
  }

  type CartItem = { 
    href: string,
     imgSrc: StaticImageData,
     altText: string,
     title: string,
     description: string}
  
  

export type { GridItemProps, GridContainerProps, ClothingItem, CartItem};