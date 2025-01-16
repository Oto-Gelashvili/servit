import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/middleware';
import { i18n } from './i18n.config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { createClient } from './utils/supabase/server';

// Public routes that don't require authentication
const publicRoutes = [
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/auth/callback',
  '/verify',
];

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = i18n.locales;
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );
  return matchLocale(languages, locales, i18n.defaultLocale);
}

export async function middleware(request: NextRequest) {
  try {
    // Create response with session handling
    const response = await updateSession(request);

    const pathname = request.nextUrl.pathname;

    // Skip locale redirect for API routes
    if (pathname.startsWith('/api/')) {
      return response;
    }

    // Get the current locale from the pathname
    const currentLocale = i18n.locales.find(
      (locale) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    // Get the pathname without the locale prefix
    const pathnameWithoutLocale = currentLocale
      ? pathname.replace(`/${currentLocale}`, '')
      : pathname;

    // Check if the route is public
    const isPublicRoute = publicRoutes.some((route) =>
      pathnameWithoutLocale.startsWith(route)
    );

    // Create Supabase client and check session
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Redirect unauthenticated users to sign-in page
    if (!user && !isPublicRoute) {
      const locale = currentLocale || getLocale(request);
      return NextResponse.redirect(new URL(`/${locale}/sign-in`, request.url));
    }

    // Redirect authenticated users away from auth pages
    if (user && isPublicRoute && pathnameWithoutLocale !== '/auth/callback') {
      const locale = currentLocale || getLocale(request);
      return NextResponse.redirect(
        new URL(`/${locale}/protected`, request.url)
      );
    }

    // Handle locale redirect
    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) =>
        !pathname.startsWith(`/${locale}`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
      const locale = getLocale(request);
      const newUrl = new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      );
      newUrl.search = request.nextUrl.search;
      return NextResponse.redirect(newUrl);
    }

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    // In case of error, redirect to sign-in page
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}/sign-in`, request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /_next/ (Next.js internals)
     * 2. /api/ (API routes)
     * 3. /static (public static files)
     * 4. .*\\..*$ (files with extensions, e.g. favicon.ico)
     */
    '/((?!_next|api|static|.*\\..*$).*)',
    // Include paths that might have files but shouldn't be excluded
    '/services/:path*',
  ],
};
