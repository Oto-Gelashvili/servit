'use client';
import React, { useState } from 'react';
import { signInWithProviderAction } from '../../actions/authActions';
import { LoaderCircle } from 'lucide-react';
import { Dictionary } from '../../../../get-dictionaries';

interface SocialLoginButtonsProps {
  dictionary: Dictionary;
}

export const SocialLoginButtons = ({ dictionary }: SocialLoginButtonsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubSignIn = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await signInWithProviderAction('github');
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`flex items-center justify-center gap-2 border border-black dark:border-white rounded-lg p-4 
        ${
          isLoading
            ? 'bg-gray-100 cursor-not-allowed dark:bg-purple-500'
            : 'hover:bg-gray-100 dark:hover:bg-purple-500'
        } 
        duration-300 relative`}
      onClick={handleGithubSignIn}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoaderCircle className="w-12 h-12 animate-spin" />
      ) : (
        <svg className="w-12 h-12" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.84 0 4.32-2.58 5.23-5.04 5.5.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"
          />
        </svg>
      )}
      <p className="text-2xl">
        {isLoading ? dictionary.signIn.loadingGithub : dictionary.signIn.github}
      </p>
    </button>
  );
};
