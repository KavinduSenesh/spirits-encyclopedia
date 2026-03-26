import type { Bottle } from '@/lib/data';

export default function JsonLd({
  bottle,
  locale,
}: {
  bottle: Bottle;
  locale: 'en' | 'si';
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: bottle.name[locale],
    description: bottle.history[locale].slice(0, 160),
    inLanguage: locale === 'en' ? 'en-US' : 'si-LK',
    about: {
      '@type': 'Thing',
      name: bottle.name[locale],
    },
    author: {
      '@type': 'Organization',
      name: 'The Spirits Encyclopedia',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
