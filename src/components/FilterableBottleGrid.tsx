'use client';

import { useState, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { Bottle } from '@/lib/data';
import BottleCard from './BottleCard';
import FilterBar, { type SortOption } from './FilterBar';
import ScrollReveal from './ScrollReveal';

interface FilterableBottleGridProps {
  bottles: Bottle[];
  categorySlug: string;
}

export default function FilterableBottleGrid({ bottles, categorySlug }: FilterableBottleGridProps) {
  const locale = useLocale() as 'en' | 'si';
  const t = useTranslations('filter');
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  const origins = useMemo(() => {
    const set = new Set(bottles.map((b) => b.origin[locale]));
    return Array.from(set).sort();
  }, [bottles, locale]);

  const filtered = useMemo(() => {
    let result = bottles;

    if (selectedOrigin) {
      result = result.filter((b) => b.origin[locale] === selectedOrigin);
    }

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name[locale].localeCompare(b.name[locale]);
        case 'name-desc':
          return b.name[locale].localeCompare(a.name[locale]);
        case 'abv-asc':
          return parseFloat(a.abv) - parseFloat(b.abv);
        case 'abv-desc':
          return parseFloat(b.abv) - parseFloat(a.abv);
        default:
          return 0;
      }
    });

    return result;
  }, [bottles, selectedOrigin, sortBy, locale]);

  return (
    <>
      {bottles.length > 1 && (
        <FilterBar
          origins={origins}
          selectedOrigin={selectedOrigin}
          onOriginChange={setSelectedOrigin}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      )}

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((bottle, i) => (
            <ScrollReveal key={bottle.id} delay={i * 80}>
              <BottleCard bottle={bottle} categorySlug={categorySlug} />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <p className="text-text-muted/60 italic text-center py-8">{t('noResults')}</p>
      )}
    </>
  );
}
