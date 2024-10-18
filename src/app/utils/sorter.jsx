'use client';

import { useState } from 'react';

export default function Sorter({ onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sortType, setSortType] = useState('Sort Options');

  const options = [
    'Price High to Low',
    'Price Low to High',
    'Tier High to Low',
    'Tier Low to High',
  ];

  const handleSortChange = (option) => {
    setSortType(option);
    setIsOpen(false);
    onSortChange(option);
  };

  return (
    <div className="sorter">
      <button onClick={() => setIsOpen(!isOpen)} className="SortButton">
        {sortType}
        {isOpen && (
          <div className="sortMenu">
            {options.map((option) => (
              <button
                key={option}
                className="sortOption"
                onClick={() => handleSortChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </button>
    </div>
  );
}
