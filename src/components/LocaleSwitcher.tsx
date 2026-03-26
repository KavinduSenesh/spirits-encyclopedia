'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = locale === 'en' ? 'si' : 'en';

  const handleSwitch = () => {
    router.replace(pathname, { locale: switchTo });
  };

  return (
    <div className="flex items-center gap-1 bg-amber-glow rounded-full p-[3px]">
      <button
        onClick={locale === 'en' ? undefined : handleSwitch}
        className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
          locale === 'en'
            ? 'bg-amber text-bg-primary'
            : 'text-text-muted/70 hover:text-text-primary'
        }`}
      >
        EN
      </button>
      <button
        onClick={locale === 'si' ? undefined : handleSwitch}
        className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
          locale === 'si'
            ? 'bg-amber text-bg-primary'
            : 'text-text-muted/70 hover:text-text-primary'
        }`}
      >
        SI
      </button>
    </div>
  );
}
