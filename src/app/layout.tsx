// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Your global styles
import { Toaster } from 'sonner'; // Import the Toaster component

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LumaClone App',
  description: 'A clone of Luma.com for event management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="bottom-right" richColors /> {/* Add the Toaster component here */}
      </body>
    </html>
  );
}
