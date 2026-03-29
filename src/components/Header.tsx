'use client';

import { useState, useEffect } from 'react';
import LocaleSwitcher from './LocaleSwitcher';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';
import CommandSearch from './CommandSearch';
import { Link } from '@/i18n/navigation';
import { getAllCategories } from '@/lib/data';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const categories = getAllCategories();

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[var(--color-bg-primary-alpha85)] backdrop-blur-xl border-b border-border-amber h-16">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            <span className="text-amber font-medium">The</span>
            <span className="text-text-primary font-light">Spirits Encyclopedia</span>
          </Link>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-surface-card px-3 py-1.5
                text-xs text-text-muted ring-1 ring-border-subtle
                hover:ring-border-amber hover:text-text-secondary transition-all"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <span>Search</span>
              <kbd className="ml-1 rounded bg-bg-primary/60 px-1.5 py-0.5 text-[10px] text-text-faint ring-1 ring-border-subtle">
                ⌘K
              </kbd>
            </button>
            <ThemeToggle />
            <LocaleSwitcher />
          </div>
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Open menu"
          >
            <span className="block w-5 h-[1.5px] bg-amber" />
            <span className="block w-5 h-[1.5px] bg-amber" />
            <span className="block w-5 h-[1.5px] bg-amber" />
          </button>
        </div>
      </header>
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        categories={categories.map((c) => ({ slug: c.slug, name: c.name }))}
        onSearchOpen={() => { setMenuOpen(false); setSearchOpen(true); }}
      />
      <CommandSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
