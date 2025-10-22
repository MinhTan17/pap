import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

// Can be imported from a shared config
export const locales = ['vi', 'en'] as const;
export const defaultLocale = 'vi';

export default getRequestConfig(async () => {
  // Get locale from cookie or header
  const cookieStore = await cookies();
  const headersList = await headers();
  
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
  const localeHeader = headersList.get('x-next-intl-locale');
  
  let locale = localeCookie || localeHeader || defaultLocale;

  // Ensure that a valid locale is used
  if (!locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
