import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative h-[65vh] flex items-center overflow-hidden">
      {/* Background layers */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 50%, rgba(200,149,108,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 30%, rgba(139,105,20,0.06) 0%, transparent 40%),
            linear-gradient(180deg, #0d1117, #161b22, #0d1117)
          `,
        }}
      />
      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-[120px] bg-gradient-to-b from-transparent to-bg-primary" />

      {/* Content */}
      <div className="relative z-10 max-w-[700px] px-8 md:px-16 animate-fade-in">
        <p className="text-amber text-[11px] tracking-[4px] uppercase mb-5">
          {t('label')}
        </p>
        <h1 className="text-text-primary text-[32px] md:text-[48px] font-extralight leading-tight">
          {t('titlePart1')}{' '}
          <strong className="font-normal text-amber">{t('titleAccent')}</strong>{' '}
          {t('titlePart2')}
        </h1>
        <p className="text-text-muted text-[16px] max-w-[500px] mt-4">
          {t('description')}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-amber/25 text-[10px] tracking-[2px] uppercase">
          {t('scrollHint')}
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-amber/20 to-transparent" />
      </div>
    </section>
  );
}
