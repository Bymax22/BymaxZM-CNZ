import { Metadata } from 'next';
import Link from 'next/link';
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
    icon: '📖',
    href: '/about/story',
    color: 'from-blue-500 to-blue-600',
    darkColor: 'from-blue-600 to-blue-700',
  },
  {
    title: 'Mission & Vision',
    description: 'Explore our strategic mission, vision, and core values that guide our work.',
    icon: '🎯',
    href: '/about/mission-vision',
    color: 'from-[#F79021] to-orange-600',
    darkColor: 'from-orange-600 to-orange-700',
  },
  {
    title: 'Our Programs',
    description: 'Learn about our four thematic areas and strategic initiatives for environmental conservation.',
    icon: '🌱',
    href: '/about/programs',
    color: 'from-[#029346] to-green-700',
    darkColor: 'from-green-700 to-green-800',
  },
  {
    title: 'Team & Leadership',
    description: 'Meet our board, executive team, and the dedicated staff driving our mission forward.',
    icon: '👥',
    href: '/about/team',
    color: 'from-purple-500 to-purple-600',
    darkColor: 'from-purple-600 to-purple-700',
  },
  {
    title: 'Governance',
    description: 'Understand our organizational structure, policies, and governance framework.',
    icon: '⚖️',
    href: '/about/governance',
    color: 'from-red-500 to-red-600',
    darkColor: 'from-red-600 to-red-700',
  },
  {
    title: 'Impact Reports',
    description: 'Explore our achievements, annual reports, and measurable impact on communities.',
    icon: '📊',
    href: '/about/reports',
    color: 'from-teal-500 to-teal-600',
    darkColor: 'from-teal-600 to-teal-700',
  },
];

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionVision />
      <OurValues />
      <AboutDetails />
      
      {/* About Sections Hub */}
      <section className="bg-gradient-to-b from-white to-[#F0F9F4] py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Explore Our Organization</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dive deeper into different aspects of Care for Nature Zambia and our commitment to environmental conservation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group h-full"
              >
                <div className="h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-gray-100">
                  {/* Color Header */}
                  <div className={`h-32 bg-gradient-to-br ${section.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0 bg-pattern"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{section.icon}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#029346] transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {section.description}
                    </p>
                    
                    {/* Arrow Button */}
                    <div className="flex items-center text-[#029346] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      <span>Explore</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <QuickStats />
    </>
  );
}