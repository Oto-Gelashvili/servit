'use client';

import { useState, useTransition } from 'react';
import { toggleBookmark } from '../../../actions/bookmarks';
import { Dictionary } from '../../../../../get-dictionaries';
import LoadingComponent from '../../../loading';

export default function BookmarkButton({
  serviceId,
  initialIsBookmarked,
  dictionary,
}: {
  serviceId: number;
  initialIsBookmarked: boolean;
  dictionary: Dictionary['services'];
}) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    setError(null);
    startTransition(async () => {
      try {
        const newState = await toggleBookmark(serviceId);
        setIsBookmarked(newState);
      } catch (error) {
        console.error(error);
        setIsBookmarked(!isBookmarked);
        setError(dictionary.bookmark_error);
        setTimeout(() => setError(null), 3000);
      }
    });
  };

  return (
    <div className="bookmark-container">
      <button
        onClick={handleClick}
        disabled={isPending}
        className={`bookmark-button ${isBookmarked ? 'bookmarked' : 'notBookmarked'}`}
      >
        {isBookmarked ? dictionary.removeBookmark : dictionary.addBookmark}
        {isPending && <LoadingComponent />}
      </button>

      {error && (
        <div className=" fixed top-[90%] left-1/2 translateMid bg-[var(--error)]  rounded-lg p-4  max-w-[280px] w-full text-2xl font-semibold  text-center gap-4 text-white">
          {error}
        </div>
      )}
    </div>
  );
}
