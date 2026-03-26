import Image from 'next/image';
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
                className="group bg-bg-card/60 border border-border-amber rounded-lg overflow-hidden hover:border-amber/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                {rel.image && (
                  <div className="relative h-[140px] overflow-hidden bg-bg-elevated">
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(200,149,108,0.12) 0%, transparent 60%)' }}
                    />
                    <Image
                      src={rel.image}
                      alt={rel.name[loc]}
                      fill
                      className="object-contain p-4 drop-shadow-[0_4px_16px_rgba(200,149,108,0.1)] transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-bg-card to-transparent" />
                  </div>
                )}
                <div className="p-4">
                  <p className="text-text-primary text-sm font-normal">
                    {rel.name[loc]}
                  </p>
                  <p className="text-amber text-[12px] mt-1">{rel.abv}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <JsonLd bottle={bottle} locale={loc} />
    </div>
  );
}
