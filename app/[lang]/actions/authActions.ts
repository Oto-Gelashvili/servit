'use server';

import { encodedRedirect } from '../../../utils/utils';
import { createClient } from '../../../utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Provider } from '@supabase/supabase-js';
import { getDictionary, Locale } from '../../../get-dictionaries';

export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  if (!email || !password) {
    return encodedRedirect(
      'error',
      '/sign-up',
      'Email and password are required'
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return encodedRedirect('error', '/sign-up', error.message);
  }

  // Check if the user was actually created or if they already existed
  if (data?.user?.identities?.length === 0) {
    return encodedRedirect(
      'error',
      '/sign-up',
      'This email is already registered. Please sign in instead.'
    );
  }

  return encodedRedirect(
    'success',
    `/sign-up/verify?email=${encodeURIComponent(email)}`,
    'Please check your email for a verification code.'
  );
};
export const verifyOTP = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const OTP = formData.get('OTP')?.toString();
  const supabase = await createClient();

  if (!email || !OTP) {
    return encodedRedirect('error', '/sign-up', 'Email and OTP required');
  }

  const { error } = await supabase.auth.verifyOtp({
    email: email,
    token: OTP,
    type: 'email',
  });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return encodedRedirect('error', '/sign-up', error.message);
  } else {
    return encodedRedirect('success', '/', 'welcome!');
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const locale = formData.get('locale') as Locale;
  const supabase = await createClient();
  const dictionary = await getDictionary(locale);
  const signInTexts = dictionary.signIn;

  if (!email || !password) {
    return redirect(
      `/${locale}/sign-in?error=${encodeURIComponent(
        signInTexts.requiredFields
      )}`
    );
  }

  if (password.length < 6) {
    return redirect(
      `/${locale}/sign-in?error=${encodeURIComponent(
        signInTexts.shortPassword
      )}`
    );
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    let errorMessage: string;

    switch (error.message) {
      case 'Invalid login credentials':
        errorMessage = signInTexts.invalidCredentials;
        break;
      case 'Email not confirmed':
        errorMessage = signInTexts.emailNotConfirmed;
        break;
      case 'User not found':
        errorMessage = signInTexts.userNotFound;
        break;
      case 'Too many requests':
        errorMessage = signInTexts.tooManyRequests;
        break;
      default:
        errorMessage = signInTexts.defaultError;
    }

    return redirect(
      `/${locale}/sign-in?error=${encodeURIComponent(errorMessage)}`
    );
  }

  return redirect(`/${locale}/`);
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');
  const callbackUrl = formData.get('callbackUrl')?.toString();

  if (!email) {
    return encodedRedirect('error', '/forgot-password', 'Email is required');
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      'error',
      '/forgot-password',
      'Could not reset password'
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    'success',
    '/forgot-password',
    'Check your email for a link to reset your password.'
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Password and confirm password are required'
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Passwords do not match'
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Password update failed'
    );
  }

  encodedRedirect('success', '/protected/reset-password', 'Password updated');
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect('/sign-in');
};
export const signInWithProviderAction = async (provider: Provider) => {
  const origin = headers().get('origin');
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return encodedRedirect('error', '/sign-in', error.message);
  }

  // Redirect to provider's authorization page
  if (data?.url) {
    redirect(data.url);
  }

  return encodedRedirect(
    'error',
    '/sign-in',
    'Could not authenticate with provider'
  );
};
