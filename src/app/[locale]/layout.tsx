import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Noto_Sans, Noto_Sans_Sinhala } from 'next/font/google';
import { routing } from '@/i18n/routing';
import AgeGate from '@/components/AgeGate';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ThemeProvider from '@/components/ThemeProvider';
import '../globals.css';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-noto-sans',
  display: 'swap',
});

const notoSansSinhala = Noto_Sans_Sinhala({
  subsets: ['sinhala'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-noto-sans-sinhala',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL('https://srilankaspirits.com'),
  title: {
    template: '%s | The Spirits Encyclopedia',
    default: 'The Spirits Encyclopedia',
  },
  description: 'An encyclopedic guide to the world\'s spirits',
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${notoSans.variable} ${notoSansSinhala.variable} bg-bg-primary text-text-secondary antialiased font-sans`}
        style={{ fontFamily: 'var(--font-noto-sans), var(--font-noto-sans-sinhala), sans-serif' }}
      >
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <AgeGate>
              <Header />
              <main>{children}</main>
              <Footer />
              <BackToTop />
            </AgeGate>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
