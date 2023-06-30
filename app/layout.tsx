import './globals.css';
import { Inter } from 'next/font/google';
import { Sidebar } from './sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Background Remover AI',
  openGraph: {
    title: 'Background Remover AI',
    description: 'Remove the background from any image with a single click.',
    images: ['public/app-screenshot.png'],
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
      </body>
    </html>
  );
}
