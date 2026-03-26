import Image from 'next/image';
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
      className="group relative block overflow-hidden rounded-xl border border-border-amber bg-bg-card/80 transition-all duration-300 hover:border-amber/25 hover:bg-bg-card hover:-translate-y-0.5"
    >
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      {/* Image with ambient glow */}
      <div className="relative aspect-[3/4] overflow-hidden bg-bg-elevated">
        {bottle.image ? (
          <>
            {/* Ambient spotlight glow */}
            <div
              className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(ellipse at 50% 60%, rgba(200,149,108,0.15) 0%, rgba(200,149,108,0.05) 40%, transparent 70%)',
              }}
            />
            {/* Subtle reflection surface */}
            <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-amber/[0.03] to-transparent" />
            <Image
              src={bottle.image}
              alt={bottle.name[locale]}
              fill
              className="object-contain p-3 drop-shadow-[0_8px_24px_rgba(200,149,108,0.12)] transition-transform duration-500 scale-110 group-hover:scale-[1.15]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Bottom fade into card content */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-bg-card to-transparent" />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-4xl text-text-faint/30 font-extralight">
              {bottle.name[locale].charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
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
      </div>

      <span className="absolute bottom-5 right-5 text-amber text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        &#8594;
      </span>
    </Link>
  );
}
