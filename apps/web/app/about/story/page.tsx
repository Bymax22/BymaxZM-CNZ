import { Metadata } from 'next';
import Link from 'next/link';
import { StoryHero } from '../../components/pages/about/StoryHero';
import { Timeline } from '../../components/pages/about/Timeline';
import { Milestones } from '../../components/pages/about/Milestones';

export const metadata: Metadata = {
  title: 'Our Story - Care for Nature Zambia',
  description: 'Discover our journey in conservation since 2008. Learn how Care for Nature Zambia started and our impact over the years.',
};

export default function StoryPage() {
  return (
    <main className="pt-24 pb-16">
      {/* Back Navigation */}
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-4">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-[#029346] hover:text-[#0C4726] font-semibold transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to About Us
        </Link>
      </div>

      <StoryHero />
      <Timeline />
      <Milestones />

      {/* Related Pages */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Pages</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Our Mission & Vision', href: '/about/mission-vision', icon: '🎯' },
            { title: 'Our Programs', href: '/about/programs', icon: '🌱' },
            { title: 'Our Team', href: '/about/team', icon: '👥' },
          ].map((page) => (
            <Link key={page.href} href={page.href}>
              <div className="bg-gradient-to-br from-[#F0F9F4] to-white rounded-xl p-8 text-center border border-gray-100 hover:border-[#029346] hover:shadow-lg transition-all cursor-pointer">
                <div className="text-5xl mb-4">{page.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 hover:text-[#029346] transition-colors">{page.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#029346] text-white py-12 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Us in Caring for Nature</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Help us build resilient communities and protect Zambia's natural resources for future generations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-involved" className="bg-[#F79021] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e67e1a] transition">
              Get Involved
            </Link>
            <Link href="/contact" className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition border border-white/50">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}