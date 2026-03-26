import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getAllCategories } from '@/lib/data';
import CategoryCard from '@/components/CategoryCard';
import Hero from '@/components/Hero';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      languages: {
        en: '/en',
        si: '/si',
      },
    },
  };
}

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('home');
  const categories = getAllCategories();

  return (
    <>
      <Hero />
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-text-primary text-[18px] font-light tracking-wide whitespace-nowrap">
            {t('title')}
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-border-amber to-transparent" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </>
  );
}
