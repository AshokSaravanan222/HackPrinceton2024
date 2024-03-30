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

export type { GridItemProps, GridContainerProps};