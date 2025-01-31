'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dictionary } from '../../../../../get-dictionaries';

interface SorterProps {
  dictionary: Dictionary['sorter'];
}

const Sorter = ({ dictionary }: SorterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Get current sort from URL or default to 'Sort Options'
  const currentSort: string | null = searchParams.get('sort');
  const currentSortOption = currentSort || 'Sort Options';

  const sortOptions: { [key: string]: string } = {
    'price-high-to-low': dictionary.prhigh,
    'price-low-to-high': dictionary.prlow,
    'rating-high-to-low': dictionary.trhigh,
    'rating-low-to-high': dictionary.trlow,
  };

  const handleSortChange = (option: string) => {
    setIsOpen(false);
    const params = new URLSearchParams(searchParams);
    params.set('sort', option);

    // Update URL with the sort parameter (no need to encode manually)
    router.push(`${window.location.pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="sorter">
      <button onClick={() => setIsOpen(!isOpen)} className="SortButton">
        {sortOptions[currentSortOption] || dictionary.options}

        <div
          className={`sortMenu ${isOpen ? 'h-[185px] border border-[#e1e1e1]' : 'h-0'}`}
        >
          {Object.keys(sortOptions).map((option) => (
            <div
              key={option}
              className="sortOption"
              onClick={() => handleSortChange(option)}
            >
              {sortOptions[option]}
            </div>
          ))}
        </div>
      </button>
    </div>
  );
};

export default Sorter;
