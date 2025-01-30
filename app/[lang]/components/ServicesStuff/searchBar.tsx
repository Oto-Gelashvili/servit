'use client';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchQuery = useDebouncedCallback((typedStuff: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');

    if (typedStuff) {
      params.set('search', typedStuff);
    } else {
      params.delete('search');
    }
    router.push(`${window.location.pathname}?${params.toString()}`, {
      scroll: false,
    });
  }, 300);

  return (
    <form id="searchForm" action="" onSubmit={(e) => e.preventDefault()}>
      <input
        id="searchBar"
        type="text"
        name="search"
        placeholder="Search services"
        autoComplete="off"
        defaultValue={searchParams.get('search') || ''}
        onChange={(e) => updateSearchQuery(e.target.value)}
      />
      <FontAwesomeIcon icon={faSearch} id="searchIcon" />
    </form>
  );
}
