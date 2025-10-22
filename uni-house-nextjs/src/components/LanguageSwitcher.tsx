'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchLanguage = (newLocale: string) => {
    startTransition(() => {
      // Set cookie for locale
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
      
      // Refresh the page to apply new locale
      router.refresh();
    });
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLanguage('vi')}
        disabled={isPending || locale === 'vi'}
        className={`px-3 py-1 rounded ${
          locale === 'vi'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        } disabled:opacity-50`}
      >
        VI
      </button>
      <button
        onClick={() => switchLanguage('en')}
        disabled={isPending || locale === 'en'}
        className={`px-3 py-1 rounded ${
          locale === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        } disabled:opacity-50`}
      >
        EN
      </button>
    </div>
  );
}
