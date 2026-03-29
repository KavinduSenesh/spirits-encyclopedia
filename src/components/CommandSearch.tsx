'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { getAllBottles, getAllCategories, type Bottle, type Category } from '@/lib/data';

interface CommandSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GroupedResult {
  category: Category;
  bottles: Bottle[];
}

export default function CommandSearch({ isOpen, onClose }: CommandSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const locale = useLocale() as 'en' | 'si';
  const t = useTranslations('commandSearch');

  const allBottles = useMemo(() => getAllBottles(), []);
  const allCategories = useMemo(() => getAllCategories(), []);

  const filtered = useMemo(() => {
    let bottles = allBottles;

    if (selectedCategory) {
      bottles = bottles.filter((b) => b.categoryId === selectedCategory);
    }

    if (query.trim()) {
      const lower = query.toLowerCase();
      bottles = bottles.filter(
        (b) =>
          b.name[locale].toLowerCase().includes(lower) ||
          b.origin[locale].toLowerCase().includes(lower)
      );
    }

    return bottles;
  }, [allBottles, query, selectedCategory, locale]);

  const grouped = useMemo(() => {
    const map = new Map<string, Bottle[]>();
    for (const bottle of filtered) {
      const list = map.get(bottle.categoryId) || [];
      list.push(bottle);
      map.set(bottle.categoryId, list);
    }

    const result: GroupedResult[] = [];
    for (const cat of allCategories) {
      const bottles = map.get(cat.id);
      if (bottles && bottles.length > 0) {
        result.push({ category: cat, bottles });
      }
    }
    return result;
  }, [filtered, allCategories]);

  const flatResults = useMemo(
    () => grouped.flatMap((g) => g.bottles),
    [grouped]
  );

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setSelectedCategory(null);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  // Scroll selected item into view
  useEffect(() => {
    if (!resultsRef.current) return;
    const selected = resultsRef.current.querySelector('[data-selected="true"]');
    selected?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  const navigate = useCallback(
    (bottle: Bottle) => {
      onClose();
      router.push(`/category/${bottle.categoryId}/${bottle.slug}`);
    },
    [onClose, router]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((i) => Math.min(i + 1, flatResults.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((i) => Math.max(i - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (flatResults[selectedIndex]) {
            navigate(flatResults[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    },
    [flatResults, selectedIndex, navigate, onClose]
  );

  if (!isOpen) return null;

  let flatIndex = -1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl mx-4 bg-bg-primary rounded-2xl shadow-2xl
          ring-1 ring-border-default/40 overflow-hidden animate-scale-in"
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 border-b border-border-default/40">
          <svg className="h-5 w-5 text-text-muted flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('placeholder')}
            className="flex-1 bg-transparent py-4 text-lg text-text-primary
              placeholder:text-text-faint focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded bg-bg-card px-1.5 py-0.5 text-[10px] text-text-muted ring-1 ring-border-default/40">
            ESC
          </kbd>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 px-5 py-3 overflow-x-auto scrollbar-none border-b border-border-default/20">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all
              ${selectedCategory === null
                ? 'bg-amber-600 text-white'
                : 'bg-bg-card text-text-muted ring-1 ring-border-default/40 hover:ring-border-amber'
              }`}
          >
            {t('allCategories')}
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
              className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all
                ${selectedCategory === cat.id
                  ? 'bg-amber-600 text-white'
                  : 'bg-bg-card text-text-muted ring-1 ring-border-default/40 hover:ring-border-amber'
                }`}
            >
              {cat.name[locale]}
            </button>
          ))}
        </div>

        {/* Results */}
        <div ref={resultsRef} className="max-h-[50vh] overflow-y-auto py-2">
          {grouped.length === 0 ? (
            <div className="px-5 py-10 text-center text-text-muted text-sm">
              {t('noResults')}
            </div>
          ) : (
            grouped.map((group) => (
              <div key={group.category.id}>
                <div className="px-5 py-2 text-[10px] font-semibold uppercase tracking-widest text-text-faint">
                  {group.category.name[locale]}
                </div>
                {group.bottles.map((bottle) => {
                  flatIndex++;
                  const idx = flatIndex;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={bottle.id}
                      data-selected={isSelected}
                      onClick={() => navigate(bottle)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors
                        ${isSelected ? 'bg-bg-card' : 'hover:bg-bg-card/50'}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm truncate ${isSelected ? 'text-amber' : 'text-text-primary'}`}>
                          {bottle.name[locale]}
                        </p>
                        <p className="text-xs text-text-muted truncate">
                          {bottle.origin[locale]} · {bottle.abv}% ABV
                        </p>
                      </div>
                      {isSelected && (
                        <kbd className="hidden sm:inline-flex text-[10px] text-text-faint">
                          ↵
                        </kbd>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
