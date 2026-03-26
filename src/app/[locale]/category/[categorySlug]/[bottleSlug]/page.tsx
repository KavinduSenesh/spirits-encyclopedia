import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import {
  getAllCategories,
  getCategoryBySlug,
  getBottlesByCategory,
  getBottleBySlug,
  getRelatedBottles,
} from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import BottleDetail from '@/components/BottleDetail';
import JsonLd from '@/components/JsonLd';

export const dynamicParams = false;

export function generateStaticParams() {
  const categories = getAllCategories();
  return routing.locales.flatMap((locale) =>
    categories.flatMap((cat) =>
      getBottlesByCategory(cat.id).map((bottle) => ({
        locale,
        categorySlug: cat.slug,
        bottleSlug: bottle.slug,
      }))
    )
  );
}

export async function generateMetadata({
  params: { locale, bottleSlug },
}: {
  params: { locale: string; categorySlug: string; bottleSlug: string };
}): Promise<Metadata> {
  const bottle = getBottleBySlug(bottleSlug);
  if (!bottle) return {};

  const loc = locale as 'en' | 'si';

  return {
    title: bottle.name[loc],
    description: bottle.history[loc].slice(0, 160),
    alternates: {
      languages: {
        en: `/en/category/${bottle.categoryId}/${bottleSlug}`,
        si: `/si/category/${bottle.categoryId}/${bottleSlug}`,
      },
    },
  };
}

export default function BottlePage({
  params: { locale, categorySlug, bottleSlug },
}: {
  params: { locale: string; categorySlug: string; bottleSlug: string };
}) {
  setRequestLocale(locale);
  const loc = locale as 'en' | 'si';
  const t = useTranslations('relatedBottles');

  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const bottle = getBottleBySlug(bottleSlug);
  if (!bottle || bottle.categoryId !== category.id) notFound();

  const related = getRelatedBottles(bottle.id, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumb
        items={[
          { label: category.name[loc], href: `/category/${categorySlug}` },
          { label: bottle.name[loc] },
        ]}
      />
      <BottleDetail bottle={bottle} locale={loc} />

      {related.length > 0 && (
        <div className="mt-16 pt-10 border-t border-amber/10">
          <h2 className="text-text-primary text-[16px] font-light tracking-wide mb-5">
            {t('heading')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/category/${rel.categoryId}/${rel.slug}`}
                className="bg-bg-card/60 border border-border-amber rounded-lg p-5 hover:border-amber/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                <p className="text-text-primary text-sm font-normal">
                  {rel.name[loc]}
                </p>
                <p className="text-amber text-[12px] mt-1">{rel.abv}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <JsonLd bottle={bottle} locale={loc} />
    </div>
  );
}
