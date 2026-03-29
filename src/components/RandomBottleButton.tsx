'use client';

import { useState, useCallback } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import type { Bottle } from '@/lib/data';

interface RandomBottleButtonProps {
  bottles: Bottle[];
  categorySlug?: string;
}

export default function RandomBottleButton({ bottles, categorySlug }: RandomBottleButtonProps) {
  const [spinning, setSpinning] = useState(false);
  const router = useRouter();
  const t = useTranslations('random');

  const handleClick = useCallback(() => {
    if (spinning || bottles.length === 0) return;
    setSpinning(true);

    const idx = Math.floor(Math.random() * bottles.length);
    const bottle = bottles[idx];

    const slug = categorySlug ?? bottle.categoryId;

    setTimeout(() => {
      router.push(`/category/${slug}/${bottle.slug}`);
    }, 400);
  }, [spinning, bottles, categorySlug, router]);

  if (bottles.length === 0) return null;

  return (
    <button
      onClick={handleClick}
      disabled={spinning}
      className="group relative inline-flex items-center gap-2.5 rounded-full
        bg-gradient-to-r from-amber-600 to-amber-500
        px-6 py-3 text-sm font-medium text-white
        shadow-lg shadow-amber-600/20
        transition-all duration-300
        hover:shadow-xl hover:shadow-amber-600/30 hover:scale-[1.03]
        active:scale-95
        disabled:opacity-70 disabled:cursor-wait"
    >
      <svg
        className={`h-4 w-4 transition-transform duration-300 ${spinning ? 'animate-spin' : 'group-hover:rotate-180'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 3h5v5" />
        <path d="M4 20 21 3" />
        <path d="M21 16v5h-5" />
        <path d="M15 15 3 21" />
        <path d="M4 4l5 5" />
      </svg>
      <span>{spinning ? t('exploring') : t('explore')}</span>
    </button>
  );
}
