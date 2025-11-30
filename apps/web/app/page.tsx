// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { HeroSection } from './components/sections/HeroSection';
import { ImpactStats } from './components/sections/ImpactStats';
import { FeaturedProjects } from './components/sections/FeaturedProjects';
import { HowToHelp } from './components/sections/HowToHelp';
import { LatestNews } from './components/sections/LatestNews';
import { Testimonials } from './components/sections/Testimonials';
import { Partners } from './components/sections/Partners';
import { CTASection } from './components/sections/CTASection';
import { LoadingScreen } from './components/ui/LoadingScreen';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Simulate loading time for animations and data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Care for Nature Zambia...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home">
        <HeroSection />
      </section>
      
      {/* Impact Statistics */}
      <section id="impact">
        <ImpactStats />
      </section>
      
      {/* Featured Projects */}
      <section id="projects">
        <FeaturedProjects />
      </section>
      
      {/* How to Help */}
      <section id="get-involved">
        <HowToHelp />
      </section>
      
      {/* Latest News */}
      <section id="news">
        <LatestNews />
      </section>
      
      
      {/* Partners */}
      <section id="partners">
        <Partners />
      </section>
      
      {/* CTA Section */}
      <section id="contact">
        <CTASection />
      </section>

      {/* Smooth Scroll Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
              anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                  target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              });
            });

            // Intersection Observer for animations
            const observerOptions = {
              threshold: 0.1,
              rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('animate-fade-in');
                }
              });
            }, observerOptions);

            // Observe all sections for animation
            document.querySelectorAll('section').forEach(section => {
              observer.observe(section);
            });

            // Performance monitoring
            window.addEventListener('load', () => {
              const navigationTiming = performance.getEntriesByType('navigation')[0];
              if (navigationTiming) {
                const loadTime = navigationTiming.loadEventEnd - navigationTiming.navigationStart;
                console.log('Page fully loaded in:', loadTime + 'ms');
                
                // Send to analytics
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'timing_complete', {
                    'name': 'page_load',
                    'value': loadTime,
                    'event_category': 'Load Performance'
                  });
                }
              }
            });
          `,
        }}
      />
    </div>
  );
}