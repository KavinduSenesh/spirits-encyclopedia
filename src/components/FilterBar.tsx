'use client';

import { useTranslations } from 'next-intl';

export type SortOption = 'name-asc' | 'name-desc' | 'abv-asc' | 'abv-desc';

interface FilterBarProps {
  origins: string[];
  selectedOrigin: string | null;
  onOriginChange: (origin: string | null) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function FilterBar({
  origins,
  selectedOrigin,
  onOriginChange,
  sortBy,
  onSortChange,
}: FilterBarProps) {
  const t = useTranslations('filter');

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
      {/* Origin pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 flex-1">
        <button
          onClick={() => onOriginChange(null)}
          className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200
            ${selectedOrigin === null
              ? 'bg-amber-600 text-white shadow-sm shadow-amber-600/20'
              : 'bg-bg-card text-text-muted ring-1 ring-border-default/40 hover:ring-border-amber hover:text-text-primary'
            }`}
        >
          {t('allOrigins')}
        </button>
        {origins.map((origin) => (
          <button
            key={origin}
            onClick={() => onOriginChange(origin === selectedOrigin ? null : origin)}
            className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200
              ${selectedOrigin === origin
                ? 'bg-amber-600 text-white shadow-sm shadow-amber-600/20'
                : 'bg-bg-card text-text-muted ring-1 ring-border-default/40 hover:ring-border-amber hover:text-text-primary'
              }`}
          >
            {origin}
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="rounded-lg bg-bg-card text-text-secondary text-xs
          ring-1 ring-border-default/40 px-3 py-2
          focus:outline-none focus:ring-border-amber
          transition-colors cursor-pointer"
      >
        <option value="name-asc">{t('nameAsc')}</option>
        <option value="name-desc">{t('nameDesc')}</option>
        <option value="abv-asc">{t('abvAsc')}</option>
        <option value="abv-desc">{t('abvDesc')}</option>
      </select>
    </div>
  );
}
