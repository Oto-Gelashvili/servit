'use client';
import { useState } from 'react';
import { Dictionary } from '../../../../get-dictionaries';
import { ChevronDown } from 'lucide-react';

export function CategorySelector({
  dictionary,
  categories,
}: {
  dictionary: Dictionary['addService'];
  categories: string[];
}) {
  const [category, setCategory] = useState(dictionary.selectCategory);
  const [open, setOpen] = useState(false);

  return (
    <div className="category-selector">
      <input type="hidden" name="category" value={category} />
      <div
        className="selector-title flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        {category}
        <ChevronDown className="w-6" />
      </div>
      <ul
        className={`category-list ${open ? 'h-[150px] border border-[#e1e1e1]' : 'h-0'}`}
      >
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => {
              setCategory(category);
              setOpen(false);
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
