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
