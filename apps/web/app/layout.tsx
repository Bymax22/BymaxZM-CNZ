// app/layout.tsx
export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { CNZProvider } from './contexts/CNZContext';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'Care for Nature Zambia - Protecting Environment, Empowering Communities',
    template: '%s | Care for Nature Zambia'
  },
  description: 'Care for Nature Zambia is a non-profit organization dedicated to environmental conservation, human rights, and community development across Zambia.',
  keywords: [
    'environment',
    'conservation',
    'Zambia',
    'climate change',
    'community development',
    'human rights',
    'tree planting',
    'sustainability'
  ],
  authors: [{ name: 'Care for Nature Zambia' }],
  creator: 'Care for Nature Zambia',
  publisher: 'Care for Nature Zambia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://carefornaturezambia.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZM',
    url: 'https://carefornaturezambia.org',
    siteName: 'Care for Nature Zambia',
    title: 'Care for Nature Zambia - Protecting Environment, Empowering Communities',
    description: 'Join us in protecting Zambia\'s environment and empowering communities through sustainable development and conservation efforts.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Care for Nature Zambia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Care for Nature Zambia',
    description: 'Protecting Environment, Empowering Communities',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification here
    // google: 'verification_token',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/hero-bg.jpg"
          as="image"
          type="image/jpeg"
          media="(min-width: 768px)"
        />
        
        {/* Preconnect to important origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Care for Nature Zambia',
              alternateName: 'CNZ',
              url: 'https://carefornaturezambia.org',
              logo: 'https://carefornaturezambia.org/logo.png',
              description: 'Non-profit organization dedicated to environmental conservation and community development in Zambia.',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'ZM',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+260-XXX-XXXXXX',
                contactType: 'customer service',
              },
              sameAs: [
                'https://facebook.com/carefornaturezambia',
                'https://twitter.com/carefornaturezm',
                'https://instagram.com/carefornaturezambia',
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-white min-h-screen flex flex-col`}>
        <CNZProvider>
          <div className="flex-1 flex flex-col">
            {/* Skip to main content for accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#029346] text-white px-4 py-2 rounded-lg z-50 focus:ring-4 focus:ring-[#029346]/50 focus:outline-none"
            >
              Skip to main content
            </a>

            {/* Navigation */}
            <Navigation />

            {/* Main content */}
            <main 
              id="main-content" 
              className="flex-1 w-full relative"
              role="main"
            >
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </div>

          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: '#0C4726',
                color: '#fff',
                borderRadius: '12px',
                fontSize: '14px',
                maxWidth: '400px',
              },
              success: {
                style: {
                  background: '#029346',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#029346',
                },
              },
              error: {
                style: {
                  background: '#DC2626',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#DC2626',
                },
              },
            }}
          />
        </CNZProvider>

        {/* Performance monitoring */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Basic performance monitoring
              window.addEventListener('load', function() {
                setTimeout(function() {
                  if (performance.getEntriesByType) {
                    const navEntry = performance.getEntriesByType('navigation')[0];
                    if (navEntry) {
                      const loadTime = navEntry.loadEventEnd - navEntry.fetchStart;
                      console.log('Page load time:', loadTime + 'ms');
                      
                      // Send to analytics
                      if (typeof gtag !== 'undefined') {
                        gtag('event', 'timing_complete', {
                          'name': 'page_load',
                          'value': loadTime,
                          'event_category': 'Load Performance'
                        });
                      }
                    }
                  }
                }, 0);
              });

              // Error boundary for better error handling
              window.addEventListener('error', function(e) {
                console.error('Global error caught:', e.error);
              });

              // Service Worker registration (if you add one later)
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js').catch(console.error);
              }
            `,
          }}
        />
      </body>
    </html>
  );
}