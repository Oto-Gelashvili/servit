'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Dictionary } from '../../../../../get-dictionaries';

export function CategorySelector({
  dictionary,
  categories,
  selectedCategory,
}: {
  dictionary: Dictionary['addService'];
  categories: string[];
  selectedCategory: string | undefined;
}) {
  const [category, setCategory] = useState(
    selectedCategory ? selectedCategory : dictionary.selectCategory
  );
  const [open, setOpen] = useState(false);

  return (
    <div className="category-selector">
      <input type="hidden" name="category" value={category} />
      <div
        data-cy="category"
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
            data-cy="categoryLi"
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
