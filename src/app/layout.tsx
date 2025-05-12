import './globals.css';

import type { Metadata } from 'next';

import Modal from '@/components/Modal';
import LayoutProvider from '@/providers/LayoutProvider';
import TanstackQueryProvider from '@/providers/TanstackQueryProvider';

import { pretendard } from './fonts';

export const metadata: Metadata = {
  title: 'Fastcampus Nextbnb로 여행하기',
  description: 'Fastcampus Nextbnb로 여행을 해보세요.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pretendard.variable}>
        <TanstackQueryProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </TanstackQueryProvider>
        <Modal />
      </body>
    </html>
  );
}
