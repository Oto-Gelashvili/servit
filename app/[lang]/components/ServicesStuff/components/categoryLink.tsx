'use client';
import { useRouter } from 'next/navigation';
import { Locale } from '../../../../../get-dictionaries';
import { Database } from '../../../utils/database.types';
import React from 'react';
interface CategoryLinkProps {
  lang: Locale;

  categoryData: Database['public']['Tables']['categories']['Row'];
}
export default function CategoryLink({
  lang,
  categoryData,
}: CategoryLinkProps) {
  const router = useRouter();
  function changeSearchParams(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    router.push(`/${lang}/services?category=${categoryData.id}`);
  }
  return (
    <button onClick={changeSearchParams} className="category-button">
      {lang === 'en' ? categoryData.category_en : categoryData.category_ka}
    </button>
  );
}
