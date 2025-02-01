'use server';

import { createClient } from '../../../utils/supabase/server';
import { headers } from 'next/headers';

export async function processPayment(sessionId: string) {
  if (!sessionId) {
    return { error: 'No session ID provided' };
  }

  try {
    const supabase = await createClient();

    // Get the host from headers
    const headersList = headers();
    const host = headersList.get('host');
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

    // Check if already processed
    const { data: existingData } = await supabase
      .from('usedServices')
      .select('session_id')
      .eq('session_id', sessionId)
      .maybeSingle();

    if (existingData) {
      return { success: true, message: 'Payment already processed' };
    }

    // Construct the full URL for the API endpoint
    const apiUrl = `${protocol}://${host}/api/get-sessions?session_id=${sessionId}`;

    // Fetch session metadata with the full URL
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch session metadata');
    }

    const data = await response.json();
    const metadata = data.metadata;

    // Insert into database
    const { error: insertError } = await supabase.from('usedServices').insert([
      {
        session_id: sessionId,
        service_id: metadata.service_id,
        date: metadata.Date,
        user_id: metadata.user_id,
      },
    ]);

    if (insertError) {
      throw insertError;
    }

    return { success: true, message: 'Payment processed successfully' };
  } catch (error) {
    console.error('Error processing payment:', error);
    return { error: 'Failed to process payment' };
  }
}
