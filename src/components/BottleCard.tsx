import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Bottle } from '@/lib/data';

export default function BottleCard({
  bottle,
  categorySlug,
}: {
  bottle: Bottle;
  categorySlug: string;
}) {
  const locale = useLocale() as 'en' | 'si';

  return (
    <Link
      href={`/category/${categorySlug}/${bottle.slug}`}
      className="group relative block overflow-hidden rounded-xl border border-border-amber bg-bg-card/80 p-7 transition-all duration-300 hover:border-amber/25 hover:bg-bg-card hover:-translate-y-0.5"
    >
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <h3 className="text-text-primary font-normal mb-1">
        {bottle.name[locale]}
      </h3>
      <div className="flex items-center gap-2 mt-3">
        <span className="bg-amber-glow border border-border-amber text-amber text-[12px] px-3 py-0.5 rounded-full">
          {bottle.abv}
        </span>
        <span className="text-text-muted text-[12px]">
          {bottle.origin[locale]}
        </span>
      </div>
      <span className="absolute bottom-5 right-5 text-amber text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        &#8594;
      </span>
    </Link>
  );
}
