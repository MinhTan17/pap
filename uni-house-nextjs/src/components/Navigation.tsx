'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Navigation() {
  const t = useTranslations('nav');

  return (
    <nav className="flex gap-4 p-4">
      <Link href="/" className="hover:text-blue-600">
        {t('home')}
      </Link>
      <Link href="/gioi-thieu" className="hover:text-blue-600">
        {t('about')}
      </Link>
      <Link href="/san-pham" className="hover:text-blue-600">
        {t('product')}
      </Link>
      <Link href="/dich-vu" className="hover:text-blue-600">
        {t('service')}
      </Link>
      <Link href="/tin-tuc" className="hover:text-blue-600">
        {t('news')}
      </Link>
      <Link href="/lien-he" className="hover:text-blue-600">
        {t('contact')}
      </Link>
    </nav>
  );
}
