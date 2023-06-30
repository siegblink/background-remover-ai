import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import { Sidebar } from './sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Background Remover AI',
  description: 'Remove the background from any image with a single click.',
  robots: 'index, follow',
  openGraph: {
    title: 'Background Remover AI',
    description: 'Remove the background from any image with a single click.',
    url: 'https://background-remover-ai.vercel.app',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://background-remover-ai.vercel.app/app-screenshot.png',
        width: 1200,
        height: 630,
        alt: 'Screenshot of the Background Remover AI app',
      },
    ],
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Sidebar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
