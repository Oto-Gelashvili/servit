'use client';
import { CheckCircle, XCircle } from 'lucide-react';
import { Dictionary } from '../../../../get-dictionaries';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '../../../../utils/supabase/client';
import LoadingComponent from '../../loading';

export default function PaymentResult(dictionary: Dictionary['payment']) {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'success' | 'failure' | 'loading'>(
    'loading'
  );

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      const supabase = createClient();
      const userResponse = await supabase.auth.getUser();
      const user_id = userResponse.data?.user?.id;

      const { data, error } = await supabase
        .from('profiles')
        .select('subscription_id')
        .eq('id', user_id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching subscription status:', error);
        setStatus('failure');
      } else if (data?.subscription_id) {
        setStatus('success');
      } else {
        setStatus('failure');
      }
    };

    const checkPaymentStatus = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('usedServices')
        .select('session_id')
        .eq('session_id', sessionId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching payment status:', error);
        setStatus('failure');
      } else if (data) {
        setStatus('success');
      } else {
        setStatus('failure');
      }
    };

    if (sessionId) {
      checkPaymentStatus();
    } else {
      checkSubscriptionStatus();
    }
  }, [sessionId]);

  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto text-center p-8">
        {status === 'loading' ? (
          <LoadingComponent />
        ) : status === 'success' ? (
          <>
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="mt-6 text-3xl font-bold">{dictionary.success}</h1>
          </>
        ) : (
          <>
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
            <h1 className="mt-6 text-3xl font-bold">{dictionary.failure}</h1>
          </>
        )}
      </div>
    </main>
  );
}
