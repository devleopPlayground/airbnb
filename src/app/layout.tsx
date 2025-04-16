import type { Metadata } from 'next';
import './globals.css';
import { pretendard } from './fonts';
import LayoutProvider from '@/providers/LayoutProvider';

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
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
