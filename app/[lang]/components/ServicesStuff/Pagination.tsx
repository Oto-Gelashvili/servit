// components/Pagination.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Dictionary, Locale } from '../../../../get-dictionaries';
import LoadingComponent from '../../(main)/loading';

export default function Pagination({
  totalPages,
  currentPage,
  dictionary,
}: {
  totalPages: number;
  currentPage: number;
  lang: Locale;
  dictionary: Dictionary['services'];
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(false);
  }, [currentPage]);

  const getHref = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleNavigation = (page: number) => {
    setIsLoading(true);
    router.push(getHref(page));
  };

  return (
    <div className="pagination">
      {isLoading && <LoadingComponent />}

      {currentPage > 1 && (
        <button
          onClick={() => handleNavigation(currentPage - 1)}
          className="pagination-link"
          disabled={isLoading}
        >
          {dictionary.prev}
        </button>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handleNavigation(page)}
          className={`pagination-link ${currentPage === page ? 'active' : ''}`}
          disabled={isLoading || currentPage === page}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          onClick={() => handleNavigation(currentPage + 1)}
          className="pagination-link"
          disabled={isLoading}
        >
          {dictionary.next}
        </button>
      )}
    </div>
  );
}
