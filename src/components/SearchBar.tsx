'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { getAllBottles } from '@/lib/data';
import type { Bottle } from '@/lib/data';

export default function SearchBar() {
  const t = useTranslations('search');
  const locale = useLocale() as 'en' | 'si';
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Bottle[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const allBottlesRef = useRef(getAllBottles());

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (query.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    timerRef.current = setTimeout(() => {
      const lower = query.toLowerCase();
      const filtered = allBottlesRef.current
        .filter((b) => b.name[locale].toLowerCase().includes(lower))
        .slice(0, 8);
      setResults(filtered);
      setIsOpen(true);
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, locale]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (bottle: Bottle) => {
    setQuery('');
    setIsOpen(false);
    router.push(`/category/${bottle.categoryId}/${bottle.slug}`);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center bg-amber-glow border border-border-amber rounded-full px-3 py-1.5">
        <svg
          className="mr-2 h-4 w-4 text-text-muted/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('placeholder')}
          className="w-32 bg-transparent text-sm text-text-primary placeholder-text-muted/50 outline-none sm:w-48"
        />
      </div>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-lg bg-bg-card border border-border-amber shadow-lg">
          {results.length > 0 ? (
            <ul>
              {results.map((bottle) => (
                <li key={bottle.id}>
                  <button
                    onClick={() => handleSelect(bottle)}
                    className="flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-bg-elevated transition-colors"
                  >
                    <span className="text-text-primary font-medium">
                      {bottle.name[locale]}
                    </span>
                    <span className="text-xs text-amber">{bottle.abv}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-text-muted italic">
              {t('noResults')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
