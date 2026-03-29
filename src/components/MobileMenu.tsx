'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from './LocaleSwitcher';
import ThemeToggle from './ThemeToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Array<{ slug: string; name: { en: string; si: string } }>;
  onSearchOpen?: () => void;
}

export default function MobileMenu({ isOpen, onClose, categories, onSearchOpen }: MobileMenuProps) {
  const locale = useLocale() as 'en' | 'si';

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-bg-primary/[0.98] animate-slide-in-right">
      <div className="flex justify-end p-5">
        <button onClick={onClose} className="text-amber text-2xl hover:opacity-70 transition-opacity">
          &#10005;
        </button>
      </div>
      {onSearchOpen && (
        <div className="px-8">
          <button
            onClick={onSearchOpen}
            className="w-full flex items-center gap-2.5 rounded-lg bg-surface-card px-4 py-3
              text-sm text-text-muted ring-1 ring-border-subtle
              hover:ring-border-amber transition-all"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <span>Search spirits…</span>
          </button>
        </div>
      )}
      <nav className="px-8 mt-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            onClick={onClose}
            className="block text-[18px] font-light text-text-secondary py-4 border-b border-border-default/30 hover:text-amber transition-colors"
          >
            {cat.name[locale]}
          </Link>
        ))}
      </nav>
      <div className="px-8 mt-8 flex items-center gap-4">
        <ThemeToggle />
        <LocaleSwitcher />
      </div>
    </div>
  );
}
