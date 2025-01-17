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
  const locale = formData.get('locale') as Locale;
  const dictionary = await getDictionary(locale);

  if (!email || !password) {
    return redirect(
      `/${locale}/sign-up?error=${encodeURIComponent(
        dictionary.auth.requiredFields
      )}`
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
    let errorMessage: string;

    switch (error.code) {
      case 'email_address_invalid':
        errorMessage = dictionary.auth.invalidEmail;
        break;
      case 'weak_password':
        errorMessage = dictionary.auth.weakPassword;
        break;
      case 'over_request_rate_limit':
        errorMessage = dictionary.auth.tooManyRequests;
        break;
      case 'signup_disabled':
        errorMessage = dictionary.auth.signupDisabled;
        break;
      case 'over_email_send_rate_limit':
        errorMessage = dictionary.auth.emailRateLimit;
        break;
      default:
        console.error('Unhandled auth error:', error.code, error.message);
        errorMessage = dictionary.auth.defaultErrorRegister;
    }

    return redirect(
      `/${locale}/sign-up?error=${encodeURIComponent(errorMessage)}`
    );
  }

  // Check if the user was actually created or if they already existed
  if (data?.user?.identities?.length === 0) {
    return encodedRedirect(
      'error',
      `/${locale}/sign-up`,
      `${dictionary.auth.duplicate}`
    );
  }
  // when OTP is on
  // return encodedRedirect(
  //   'success',
  //   `/${locale}/verify?email=${encodeURIComponent(email)}`,
  //   'Please check your email for a verification code.'
  // );
  //when otp is off
  return encodedRedirect('success', `/${locale}`, 'welcome');
};
export const verifyOTP = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const OTP = formData.get('OTP')?.toString();
  const supabase = await createClient();
  const locale = formData.get('locale') as Locale;
  const dictionary = await getDictionary(locale);
  if (!email || !OTP) {
    return encodedRedirect(
      'error',
      `/${locale}/verify`,
      `${dictionary.auth.emailReq}`
    );
  }

  const { error } = await supabase.auth.verifyOtp({
    email: email,
    token: OTP,
    type: 'email',
  });

  if (error) {
    redirect(
      `/${locale}/verify?email=${encodeURIComponent(
        email
      )}&error=${encodeURIComponent(dictionary.auth.verificationError)}`
    );
  } else {
    return encodedRedirect('success', `/${locale}/`, 'welcome!');
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const locale = formData.get('locale') as Locale;
  const supabase = await createClient();
  const dictionary = await getDictionary(locale);
  const signInTexts = dictionary.auth;

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

  const callbackUrl = formData.get('callbackUrl')?.toString();
  const locale = formData.get('locale') as Locale;
  const dictionary = await getDictionary(locale);
  if (!email) {
    return encodedRedirect(
      'error',
      `/${locale}/forgot-password`,
      'Email is required'
    );
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `https://servit.vercel.app/auth/callback?redirect_to=/${locale}/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      'error',
      `/${locale}/forgot-password`,
      `${dictionary.auth.invalidEmail}`
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    'success',
    `/${locale}/forgot-password`,
    `${dictionary.auth.checkMailForReset}`
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const locale = formData.get('locale') as Locale;
  const dictionary = await getDictionary(locale);

  if (!password || !confirmPassword) {
    encodedRedirect(
      'error',
      `/${locale}/protected/reset-password`,
      `${dictionary.auth.passReq}`
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      'error',
      `/${locale}/protected/reset-password`,
      `${dictionary.auth.passNotEqual}`
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      'error',
      `/${locale}/protected/reset-password`,
      `${dictionary.auth.passResetFail}`
    );
  }

  encodedRedirect(
    'success',
    `/${locale}/protected/reset-password`,
    `${dictionary.auth.passResetSuccess}`
  );
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
