'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Dictionary, Locale } from '../../../../../get-dictionaries';
import { useTransition } from 'react';
import LoadingComponent from '../../../utils/loadingForPagination';

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const getHref = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleNavigation = (page: number) => {
    startTransition(() => {
      router.push(getHref(page));
    });
  };

  return (
    <div className="pagination relative">
      {isPending && <LoadingComponent />}

      {currentPage > 1 && (
        <button
          onClick={() => handleNavigation(currentPage - 1)}
          className="pagination-link"
          disabled={isPending}
        >
          {dictionary.prev}
        </button>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handleNavigation(page)}
          className={`pagination-link ${currentPage === page ? 'active' : ''}`}
          disabled={currentPage === page || isPending}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          onClick={() => handleNavigation(currentPage + 1)}
          className="pagination-link"
          disabled={isPending}
        >
          {dictionary.next}
        </button>
      )}
    </div>
  );
}
