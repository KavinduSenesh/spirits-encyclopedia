import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { getAllCategories, getCategoryBySlug, getBottlesByCategory } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import RandomBottleButton from '@/components/RandomBottleButton';
import FilterableBottleGrid from '@/components/FilterableBottleGrid';

export const dynamicParams = false;

export function generateStaticParams() {
  const categories = getAllCategories();
  return routing.locales.flatMap((locale) =>
    categories.map((cat) => ({
      locale,
      categorySlug: cat.slug,
    }))
  );
}

export async function generateMetadata({
  params: { locale, categorySlug },
}: {
  params: { locale: string; categorySlug: string };
}): Promise<Metadata> {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return {};

  const loc = locale as 'en' | 'si';
  return {
    title: category.name[loc],
    description: category.description[loc],
    alternates: {
      languages: {
        en: `/en/category/${categorySlug}`,
        si: `/si/category/${categorySlug}`,
      },
    },
  };
}

export default function CategoryPage({
  params: { locale, categorySlug },
}: {
  params: { locale: string; categorySlug: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('category');
  const loc = locale as 'en' | 'si';

  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const bottles = getBottlesByCategory(category.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumb items={[{ label: category.name[loc] }]} />

      <div className="mb-8">
        <h1 className="text-text-primary text-3xl font-light">{category.name[loc]}</h1>
        <p className="text-text-muted mt-2">{category.description[loc]}</p>
      </div>

      {bottles.length > 1 && (
        <div className="mb-6 flex justify-end">
          <RandomBottleButton bottles={bottles} categorySlug={categorySlug} />
        </div>
      )}

      {bottles.length > 0 ? (
        <FilterableBottleGrid bottles={bottles} categorySlug={categorySlug} />
      ) : (
        <p className="text-text-muted/60 italic">{t('noEntries')}</p>
      )}
    </div>
  );
}
