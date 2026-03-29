'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function AgeGate({ children }: { children: React.ReactNode }) {
  const t = useTranslations('ageGate');
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const isVerified = sessionStorage.getItem('ageVerified') === 'true';
    setVerified(isVerified);
    setChecking(false);
  }, []);

  const handleYes = () => {
    sessionStorage.setItem('ageVerified', 'true');
    setVerified(true);
  };

  const handleNo = () => {
    window.location.href = 'https://www.google.com';
  };

  if (checking) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      {!verified && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, var(--color-amber-radial-faint) 0%, transparent 60%)' }} />
          <div className="relative bg-bg-elevated/90 backdrop-blur-xl border border-border-amber rounded-2xl p-12 max-w-md w-full mx-4 text-center animate-scale-in">
            <div className="text-amber text-3xl mb-4">&#9670;</div>
            <h2 className="text-text-primary text-[22px] font-light mb-2">
              {t('title')}
            </h2>
            <p className="text-text-muted text-[13px] leading-relaxed mb-7">
              {t('message')}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleYes}
                className="bg-gradient-to-r from-amber to-amber-dark text-bg-primary rounded-full px-8 py-2.5 text-[13px] font-medium"
              >
                {t('yes')}
              </button>
              <button
                onClick={handleNo}
                className="border border-border-default text-text-muted rounded-full px-8 py-2.5 text-[13px]"
              >
                {t('no')}
              </button>
            </div>
            <p className="text-text-faint text-[10px] mt-5 leading-relaxed">
              {t('disclaimer')}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
