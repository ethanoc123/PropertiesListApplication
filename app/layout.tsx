import { GeistSans } from 'geist/font/sans';
import './globals.css';
import Navbar from './common/layout/Navbar';

const defaultUrl = process.env.NETLIFY_URL
  ? `https://${process.env.NETLIFY_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'ETO Properties Application',
  description: 'ETO Properties Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={GeistSans.className}>
      <body className='flex flex-col h-screen bg-background text-foreground px-4 sm:px-8 lg:px-16'>
        <Navbar />
        <main className='flex flex-col h-full'>{children}</main>
      </body>
    </html>
  );
}
