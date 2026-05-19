import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineBook, AiOutlineEye, AiOutlineBulb, AiOutlineTeam, AiOutlineFileText, AiOutlineFileSearch } from 'react-icons/ai';
import { AboutHero } from '../components/pages/about/AboutHero';
import { MissionVision } from '../components/pages/about/MissionVision';
import { OurValues } from '../components/pages/about/OurValues';
import { QuickStats } from '../components/pages/about/QuickStats';
import { AboutDetails } from '../components/pages/about/AboutDetails';

export const metadata: Metadata = {
  title: 'About Us - Care for Nature Zambia',
  description: 'Learn about Care for Nature Zambia - Our mission, vision, values, and commitment to environmental conservation and community development.',
};

const aboutSections = [
  {
    title: 'Our Story',
    description: 'Discover our journey in conservation since 2008 and the milestones that shaped our mission.',
    icon: AiOutlineBook,
    href: '/about/story',
    image: '/images/community.jpg',
  },
  {
    title: 'Mission & Vision',
    description: 'Explore our strategic mission, vision, and core values that guide our work.',
    icon: AiOutlineEye,
    href: '/about/mission-vision',
    image: '/children.jpg',
  },
  {
    title: 'Our Programs',
    description: 'Learn about our thematic programs and the initiatives that support communities and nature.',
    icon: AiOutlineBulb,
    href: '/about/programs',
    image: '/tree-planting.jpg',
  },
  {
    title: 'Team & Leadership',
    description: 'Meet our leadership team and the experts driving our field work and governance.',
    icon: AiOutlineTeam,
    href: '/about/team',
    image: '/avatars/john-phiri.jpg',
  },
  {
    title: 'Governance',
    description: 'Understand our organizational structure, policy framework, and accountability systems.',
    icon: AiOutlineFileSearch,
    href: '/about/governance',
    image: '/partnership.jpg',
  },
  {
    title: 'Impact Reports',
    description: 'Read our annual reports and achievement summaries for transparency and progress.',
    icon: AiOutlineFileText,
    href: '/about/reports',
    image: '/children-program.jpg',
  },
];

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionVision />
      <OurValues />
      <AboutDetails />

      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Explore Our Organization</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dive deeper into the parts of Care for Nature Zambia that shape our work and impact.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {aboutSections.map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.href} href={section.href} className="group block">
                  <article className="h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative h-52 overflow-hidden">
                      <Image src={section.image} alt={section.title} fill className="object-cover object-center" />
                      <div className="absolute inset-0 bg-slate-950/30" />
                      <div className="absolute left-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-900 shadow">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">{section.description}</p>
                      <div className="inline-flex items-center gap-2 text-emerald-700 font-semibold">
                        <span>Explore</span>
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <QuickStats />
    </>
  );
}
