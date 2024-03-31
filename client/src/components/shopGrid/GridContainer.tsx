import React from 'react';
import GridItem from './GridItem'; // Import the GridItem component
import { GridItemProps } from '../../../types'; // Import the GridItemProps type

type GridContainerProps = {
  items: GridItemProps[];
};

const GridContainer: React.FC<GridContainerProps> = ({ items }) => {
  return (
    // Wrapper div with max-w and mx-auto to center
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <GridItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default GridContainer;
