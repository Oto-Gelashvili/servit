'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Sun className=" text-gray-600 dark:text-white" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 toggle"
    >
      {theme === 'dark' ? (
        <Sun className=" text-gray-600 dark:text-white" />
      ) : (
        <Moon className=" text-gray-600 dark:text-white" />
      )}
    </button>
  );
};

export default ThemeToggle;
