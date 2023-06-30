import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import { Sidebar } from './sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Background Remover AI',
  openGraph: {
    title: 'Background Remover AI',
    description: 'Remove the background from any image with a single click.',
    images: ['/app-screenshot.png'],
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
