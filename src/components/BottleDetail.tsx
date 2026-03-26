import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Bottle } from '@/lib/data';

export default function BottleDetail({
  bottle,
  locale,
}: {
  bottle: Bottle;
  locale: 'en' | 'si';
}) {
  const t = useTranslations('bottleDetail');

  const sections = [
    { label: t('ingredients'), content: bottle.ingredients[locale] },
    { label: t('productionMethod'), content: bottle.productionMethod[locale] },
    { label: t('history'), content: bottle.history[locale] },
  ];

  return (
    <article className="mx-auto max-w-4xl">
      {/* Hero image with spotlight */}
      {bottle.image && (
        <div className="relative h-[450px] rounded-2xl overflow-hidden mb-10 bg-bg-elevated">
          {/* Ambient spotlight */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 50% 70%, rgba(200,149,108,0.12) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 30%, rgba(200,149,108,0.06) 0%, transparent 40%)
              `,
            }}
          />
          {/* Reflection surface */}
          <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-amber/[0.04] to-transparent" />
          <Image
            src={bottle.image}
            alt={bottle.name[locale]}
            fill
            className="object-contain p-6 drop-shadow-[0_12px_32px_rgba(200,149,108,0.15)] scale-110"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
          />
          {/* Top and bottom vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(to bottom, rgba(13,17,23,0.3) 0%, transparent 20%, transparent 85%, rgba(13,17,23,0.5) 100%)',
          }} />
        </div>
      )}

      <h1 className="text-text-primary text-[36px] font-extralight">
        {bottle.name[locale]}
      </h1>

      <div className="flex items-center gap-3 mt-4">
        <span className="bg-amber-glow border border-border-amber text-amber text-[12px] px-3 py-0.5 rounded-full">
          {bottle.abv}
        </span>
        <span className="text-text-muted text-[13px]">
          {bottle.origin[locale]}
        </span>
      </div>

      {sections.map((section, i) => (
        <section
          key={i}
          className={`mt-9 ${i < sections.length - 1 ? 'border-b border-amber/[0.06] pb-9' : ''}`}
        >
          <h2 className="text-amber text-[11px] tracking-[3px] uppercase font-medium">
            {section.label}
          </h2>
          <p className="text-text-secondary text-[15px] leading-[1.8] mt-3">
            {section.content}
          </p>
        </section>
      ))}
    </article>
  );
}
