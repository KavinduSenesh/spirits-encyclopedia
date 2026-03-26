import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Category } from '@/lib/data';
import { getCategoryIcon } from '@/lib/categoryIcons';

export default function CategoryCard({ category }: { category: Category }) {
  const locale = useLocale() as 'en' | 'si';

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative block overflow-hidden rounded-xl border border-border-amber bg-bg-card/80 p-7 transition-all duration-300 hover:border-amber/25 hover:bg-bg-card hover:-translate-y-0.5"
    >
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="w-9 h-9 text-amber mb-4">
        {getCategoryIcon(category.id)}
      </div>
      <h2 className="text-text-primary text-[16px] font-normal mb-2">
        {category.name[locale]}
      </h2>
      <p className="text-text-muted text-[12px] line-clamp-2 leading-relaxed">
        {category.description[locale]}
      </p>
      <span className="absolute bottom-5 right-5 text-amber text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        &#8594;
      </span>
    </Link>
  );
}
