'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { processPayment } from '../../actions/processPayments';

interface Dictionary {
  payment: {
    success: string;
  };
}

export function PaymentSuccess({ dictionary }: { dictionary: Dictionary }) {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      processPayment(sessionId)
        .then((result) => {
          if (result.error) {
            setError(result.error);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center bg-white dark:bg-black">
        <div className="max-w-md w-full mx-auto text-center p-8">
          <p className="text-gray-700 dark:text-gray-300 text-3xl">
            Loading...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 flex items-center justify-center bg-white dark:bg-black">
        <div className="max-w-md w-full mx-auto text-center p-8">
          <p className="text-red-500">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex items-center justify-center bg-white dark:bg-black">
      <div className="max-w-md w-full mx-auto text-center p-8">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
          {dictionary.payment.success}
        </h1>
      </div>
    </main>
  );
}
