import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { getAllCategories } from '@/lib/data';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale() as 'en' | 'si';
  const categories = getAllCategories();
  const half = Math.ceil(categories.length / 2);
  const firstHalf = categories.slice(0, half);
  const secondHalf = categories.slice(half);

  return (
    <footer className="bg-bg-primary/95 border-t border-amber/10">
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <p className="text-text-primary text-[16px] font-light">
              The Spirits Encyclopedia
            </p>
            <p className="text-text-muted text-[12px] leading-relaxed max-w-[280px] mt-3">
              {t('description')}
            </p>
          </div>

          {/* Categories col 1 */}
          <div>
            <h3 className="text-amber text-[10px] tracking-[2px] uppercase font-medium mb-4">
              {t('categories')}
            </h3>
            {firstHalf.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="text-text-muted text-[13px] hover:text-text-primary transition-colors block mb-2"
              >
                {cat.name[locale]}
              </Link>
            ))}
          </div>

          {/* Categories col 2 */}
          <div>
            <h3 className="text-amber text-[10px] tracking-[2px] uppercase font-medium mb-4">
              {t('more')}
            </h3>
            {secondHalf.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="text-text-muted text-[13px] hover:text-text-primary transition-colors block mb-2"
              >
                {cat.name[locale]}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-amber text-[10px] tracking-[2px] uppercase font-medium mb-4">
              {t('legal')}
            </h3>
            <span className="text-text-muted text-[13px] block mb-2">{t('about')}</span>
            <span className="text-text-muted text-[13px] block mb-2">{t('disclaimer')}</span>
            <span className="text-text-muted text-[13px] block mb-2">{t('privacy')}</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-5 border-t border-amber/[0.06] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-text-faint text-[11px]">{t('copyright')}</p>
          <div className="bg-amber-glow border border-border-amber rounded-md px-3 py-1.5 text-text-muted text-[10px] tracking-wide">
            {t('nataBadge')}
          </div>
        </div>
      </div>
    </footer>
  );
}
