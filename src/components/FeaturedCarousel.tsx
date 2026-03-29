'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import SkeletonImage from './SkeletonImage';
import type { Bottle } from '@/lib/data';

interface FeaturedCarouselProps {
  bottles: Bottle[];
}

export default function FeaturedCarousel({ bottles }: FeaturedCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const locale = useLocale() as 'en' | 'si';
  const t = useTranslations('featured');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  // Drag-to-scroll
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollStart.current = scrollRef.current?.scrollLeft ?? 0;
    scrollRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const dx = e.clientX - startX.current;
    scrollRef.current.scrollLeft = scrollStart.current - dx;
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  if (bottles.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-text-primary text-[18px] font-light tracking-wide whitespace-nowrap">
          {t('heading')}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border-amber to-transparent" />
        <div className="flex gap-1.5">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="rounded-full p-2 text-text-muted transition-colors
              hover:bg-surface-card hover:text-text-primary
              disabled:opacity-30 disabled:cursor-default"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="rounded-full p-2 text-text-muted transition-colors
              hover:bg-surface-card hover:text-text-primary
              disabled:opacity-30 disabled:cursor-default"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory
          pb-4 -mb-4 cursor-grab active:cursor-grabbing
          scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {bottles.map((bottle) => (
          <Link
            key={bottle.id}
            href={`/${locale}/category/${bottle.categoryId}/${bottle.slug}`}
            className="group flex-shrink-0 snap-start w-[200px] sm:w-[220px]"
            draggable={false}
          >
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface-card
              ring-1 ring-border-subtle transition-all duration-300
              group-hover:ring-border-amber group-hover:shadow-lg group-hover:shadow-amber-900/10">
              <SkeletonImage
                src={bottle.image}
                alt={bottle.name[locale]}
                fill
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                sizes="220px"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 pt-8">
                <span className="inline-block rounded-full bg-amber-600/80 px-2 py-0.5 text-[10px] font-medium text-white mb-1.5 uppercase tracking-wider">
                  {bottle.categoryId}
                </span>
                <p className="text-white text-sm font-medium leading-tight line-clamp-2">
                  {bottle.name[locale]}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
