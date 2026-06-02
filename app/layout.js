import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'VixLuxia — Smart bookmarks, beautifully kept',
  description: 'AI-powered smart bookmarking and knowledge management.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-[#fafaf9] text-neutral-900 selection:bg-violet-200/60">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: '14px',
              boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15)',
              color: '#0a0a0a',
            },
          }}
        />
      </body>
    </html>
  );
}
