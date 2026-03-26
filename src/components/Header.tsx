'use client';

import { useState } from 'react';
import LocaleSwitcher from './LocaleSwitcher';
import SearchBar from './SearchBar';
import MobileMenu from './MobileMenu';
import { Link } from '@/i18n/navigation';
import { getAllCategories } from '@/lib/data';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const categories = getAllCategories();

  return (
    <>
      <header className="sticky top-0 z-40 bg-[rgba(13,17,23,0.85)] backdrop-blur-xl border-b border-border-amber h-16">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            <span className="text-amber font-medium">The</span>
            <span className="text-text-primary font-light">Spirits Encyclopedia</span>
          </Link>
          <div className="hidden md:flex items-center gap-3">
            <SearchBar />
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
      />
    </>
  );
}
