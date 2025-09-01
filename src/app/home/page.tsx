---

### Phase 2: Correct the `src/app/layout.tsx` File

This file defines your app's main layout and is the correct place to include the `Toaster` component, which is what actually displays the notifications.

```typescript:Layout with Toaster:src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

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
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
```eof
