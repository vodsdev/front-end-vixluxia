import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: '21st Clone — Component Registry',
  description: 'A community-driven registry of high-quality React UI components powered by Tailwind CSS and Radix UI.',
  keywords: 'react, components, ui, tailwind, radix, shadcn',
  authors: [{ name: 'Vixluxia Team' }],
  openGraph: {
    title: '21st Clone — Component Registry',
    description: 'A community-driven registry of high-quality React UI components.',
    type: 'website',
  },
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75'>✨</text></svg>" />
      </head>
      <body className="font-sans antialiased text-foreground selection:bg-primary/20 dark:selection:bg-primary/30">
        {children}
        <Toaster
          position="bottom-right"
          theme="system"
          toastOptions={{
            classNames: {
              toast: 'backdrop-blur-xl border rounded-lg shadow-lg',
              success: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
              error: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800',
              loading: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
            },
          }}
        />
      </body>
    </html>
  );
}
