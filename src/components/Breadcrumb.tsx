import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const t = useTranslations('category');

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        <li>
          <Link href="/" className="text-text-muted hover:text-amber transition-colors">
            {t('breadcrumbHome')}
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <span className="text-border-default" aria-hidden="true">/</span>
            {item.href ? (
              <Link href={item.href} className="text-text-muted hover:text-amber transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-amber font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
