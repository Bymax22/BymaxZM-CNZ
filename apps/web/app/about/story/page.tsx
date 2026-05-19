import { Metadata } from 'next';
import Link from 'next/link';
import { FaBookOpen, FaLeaf, FaUsers } from 'react-icons/fa';
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
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-4">
        <Link href="/about" className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900 font-semibold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to About Us
        </Link>
      </div>

      <StoryHero />
      <Timeline />
      <Milestones />

      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Pages</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: 'Our Mission & Vision', href: '/about/mission-vision', icon: FaLeaf },
            { title: 'Our Programs', href: '/about/programs', icon: FaBookOpen },
            { title: 'Our Team', href: '/about/team', icon: FaUsers },
          ].map((page) => (
            <Link key={page.href} href={page.href}>
              <div className="group rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                  <page.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{page.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 text-white py-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Join Us in Caring for Nature</h2>
          <p className="text-lg text-slate-200 max-w-3xl mx-auto mb-8">
            Help us build resilient communities and protect Zambia&apos;s natural resources for future generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-involved" className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition">
              Get Involved
            </Link>
            <Link href="/contact" className="border border-white/20 bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
