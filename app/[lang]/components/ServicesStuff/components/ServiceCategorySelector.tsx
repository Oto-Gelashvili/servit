'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Locale } from '../../../../../get-dictionaries';
import { Database } from '../../../utils/database.types';
import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Dictionary } from '../../../../../get-dictionaries';

export default function CategorySelector({
  categories,
  dictionary,
  lang,
}: {
  categories: Database['public']['Tables']['categories']['Row'][];
  dictionary: Dictionary['services'];
  lang: Locale;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(dictionary.selectCategory);
  const [open, setOpen] = useState(false);
  const handleCategoryChange = (categoryId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('category', categoryId.toString());
    params.delete('page');
    router.push(`${window.location.pathname}?${params.toString()}`, {
      scroll: false,
    });
  };
  const resetCategory = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('category');
    setCategory(dictionary.selectCategory);
    router.push(`${window.location.pathname}?${params.toString()}`, {
      scroll: false,
    });
  };
  return (
    <div className="category-selector">
      <div
        className="selector-title flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        {category}
        {/* <ChevronDown className="w-6" /> */}
      </div>
      <ul
        className={`category-list ${open ? 'h-[185px] border border-[#e1e1e1]' : 'h-0'}`}
      >
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => {
              setCategory(
                `${lang === 'en' ? category.category_en : category.category_ka}`
              );
              setOpen(false);
              handleCategoryChange(category.id);
            }}
          >
            {lang === 'en' ? category.category_en : category.category_ka}
          </li>
        ))}
      </ul>
      {category === dictionary.selectCategory ? (
        <div className="resetBtn" onClick={() => setOpen(!open)}>
          <ChevronDown className="w-7" />
        </div>
      ) : (
        <div
          className="resetBtn"
          onClick={() => {
            resetCategory();
          }}
        >
          <X className="w-7 " />
        </div>
      )}
    </div>
  );
}
