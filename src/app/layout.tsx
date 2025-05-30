// src/app/layout.tsx
import './globals.css';
import Header from '@/components/Header';
import BackToTop from '@/components/BackToTop'
import StickerClient from '@/components/StickerClient';
import BackHomeButton from '@/components/BackHomeButton'
import Footer from '@/components/Footer';
import { satoshi } from '@/fonts';

export default function Qfeng5Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={satoshi.variable}>
      <head>
        {/* 响应式视口 meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {/* 固定导航 */}
        <Header />

        {/* 主内容，给 header 留高 */}
        <main className="pt-20">
          {/* 贴纸——现在它会跟随 main 滚动 */}
          <StickerClient />
          {children}
        </main>

        {/* 页脚 */}
        <BackHomeButton />
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}

