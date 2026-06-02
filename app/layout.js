import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'VixLuxia — Smart bookmarks, beautifully kept',
  description: 'AI-powered smart bookmarking and knowledge management.',
};

const themeScript = `
try {
  var t = localStorage.getItem('vixluxia-theme');
  if (!t) { t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
  if (t === 'dark') document.documentElement.classList.add('dark');
} catch(e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased text-neutral-900 dark:text-neutral-100 selection:bg-violet-200/60 dark:selection:bg-violet-500/30">
        {children}
        <Toaster
          position="bottom-right"
          theme="system"
          toastOptions={{
            classNames: {
              toast: 'backdrop-blur-xl border rounded-2xl shadow-soft-lg',
            },
          }}
        />
      </body>
    </html>
  );
}
