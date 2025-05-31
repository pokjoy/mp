// src/app/layout.tsx
import './globals.css';
import Header from '@/components/Header';
import BackToTop from '@/components/BackToTop'
import BackHomeButton from '@/components/BackHomeButton'
import Footer from '@/components/Footer';
import { DarkModeProvider } from '@/components/DarkModeProvider';
import { satoshi } from '@/fonts';

export default function Qfeng5Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={satoshi.variable}>
      <head>
        {/* 响应式视口 meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* 防止黑暗模式闪烁的脚本 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('darkMode');
                if (saved !== null) {
                  if (JSON.parse(saved)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased transition-colors duration-300">
        <DarkModeProvider>
          {/* 固定导航 */}
          <Header />

          {/* 主内容，给 header 留高 */}
          <main className="pt-20">
            {children}
          </main>

          {/* 页脚 */}
          <BackHomeButton />
          <Footer />
          <BackToTop />
        </DarkModeProvider>
      </body>
    </html>
  );
}