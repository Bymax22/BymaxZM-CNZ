// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Hero from './components/home/Hero';
import UpcomingEventsSection from './components/home/UpcomingEventsSection';
import Programs from './components/home/Programs';
import ImpactBand from './components/home/ImpactBand';

import OurStories from './components/home/OurStories';
import CTASection from './components/home/CTA';
import NewsGrid from './components/home/NewsGrid';
import Partners from './components/home/Partners';
import Footer from './components/Footer';

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#008000] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Hero />
      <UpcomingEventsSection />
      <Programs />
      <ImpactBand />
     
      <OurStories />
      <CTASection />
      <NewsGrid />
      <Partners />
      <Footer />

      {/* Smooth Scroll + basic observers script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
              anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              });
            });
          `,
        }}
      />
    </div>
  );
}