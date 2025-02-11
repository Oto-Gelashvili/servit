import React, { useState, useEffect, useRef } from 'react';

interface CustomScrollbarProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function CustomScrollbar({
  containerRef,
}: CustomScrollbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScrollProgress = () => {
      const maxScroll = container.scrollWidth;
      const progress = (container.scrollLeft / maxScroll) * 100;
      setScrollProgress(progress);
    };

    container.addEventListener('scroll', updateScrollProgress);
    return () => {
      container.removeEventListener('scroll', updateScrollProgress);
    };
  }, [containerRef]);

  return (
    <>
      {containerRef.current?.clientWidth !==
        containerRef.current?.scrollWidth && (
        <div className="custom-scrollbar-container">
          <div ref={scrollbarRef} className="custom-scrollbar-track">
            <div
              className="custom-scrollbar-thumb"
              style={{
                width: `${!containerRef.current ? 10 : Math.max(10, (containerRef.current.clientWidth / containerRef.current.scrollWidth) * 100)}%`,
                left: `${scrollProgress}%`,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
