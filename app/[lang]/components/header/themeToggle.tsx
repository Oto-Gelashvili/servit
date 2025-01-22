'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Sun className="text-gray-600 dark:text-white" />;
  }

  return (
    <div className="themeToggle">
      <button onClick={() => setTheme('light')}>
        <Sun
          className={`text-black dark:text-white sun ${theme === 'light' ? 'active' : ''}`}
        />
      </button>
      <button onClick={() => setTheme('dark')}>
        <Moon
          className={`text-black dark:text-white moon ${theme === 'dark' ? 'active' : ''}`}
        />
      </button>
    </div>
  );
};

export default ThemeToggle;
