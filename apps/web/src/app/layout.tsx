import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

import './globals.css';

const manrope = Manrope({ variable: '--font-manrope', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Asta Insite Admin',
  description: 'Administration for the Asta Insite marketplace.',
  // Admin tools must never appear in search results.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
