import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaLeaf, FaChild, FaIndustry, FaChartLine, FaBalanceScale, FaSearch } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Impact Reports - Care for Nature Zambia',
  description: 'Explore our annual reports, impact metrics, achievements, and progress towards environmental conservation goals.',
};

const impactMetrics = [
  { number: '15+', label: 'Years of Service', description: 'Continuous conservation work since 2008' },
  { number: '50K+', label: 'Lives Impacted', description: 'Direct and indirect beneficiaries across Zambia' },
  { number: '10K+', label: 'Hectares Protected', description: 'Nature conserved through community-led action' },
  { number: '100+', label: 'Projects Completed', description: 'Focused conservation and development initiatives' },
  { number: '5K+', label: 'Youth Trained', description: 'Young leaders mobilized for environmental stewardship' },
  { number: '8', label: 'Provinces Served', description: 'A growing national footprint of positive impact' },
];

const thematicAreas = [
  {
    icon: FaLeaf,
    title: 'Nature Conservation',
    achievements: [
      'Community conservation zones established',
      'Biodiversity monitoring systems deployed',
      'Habitat restoration and tree planting',
      'Sustainable natural resource management training',
    ],
  },
  {
    icon: FaChild,
    title: 'Child Rights & Participation',
    achievements: [
      'Child-led environmental clubs founded',
      'School climate education programs delivered',
      'Youth advocacy and leadership training',
      'Child safeguarding frameworks applied',
    ],
  },
  {
    icon: FaIndustry,
    title: 'Sustainable Mining',
    achievements: [
      'Mining accountability monitoring launched',
      'Community feedback mechanisms established',
      'Environmental impact assessments supported',
      'Stakeholder engagement forums convened',
    ],
  },
  {
    icon: FaChartLine,
    title: 'Organizational Strengthening',
    achievements: [
      'Capacity building for partners and staff',
      'Digital systems for monitoring and reporting',
      'Improved financial management practices',
      'Stronger governance and donor accountability',
    ],
  },
];

const annualReports = [
  {
    year: '2024',
    title: 'Annual Report 2024',
    summary: 'A year of growth, partnerships, and measurable conservation results.',
    highlights: ['Expanded programs to five new districts', 'Engaged 15,000+ people', 'Protected 2,500 hectares of land', 'Trained 500 youth leaders'],
  },
  {
    year: '2023',
    title: 'Annual Report 2023',
    summary: 'Strengthening systems and building resilient community conservation initiatives.',
    highlights: ['Launched our 2023-2027 strategic plan', 'Delivered 25+ community projects', 'Reached 12,000 beneficiaries', 'Created eight new conservation zones'],
  },
  {
    year: '2022',
    title: 'Annual Report 2022',
    summary: 'Recovery and renewed partnerships after pandemic disruption.',
    highlights: ['Rebuilt community networks', 'Secured strategic partnerships', 'Expanded mining accountability work', 'Enhanced digital engagement'],
  },
];

const sdgGoals = [
  { number: '4', label: 'Quality Education' },
  { number: '5', label: 'Gender Equality' },
  { number: '8', label: 'Decent Work' },
  { number: '10', label: 'Reduced Inequalities' },
  { number: '12', label: 'Responsible Consumption' },
  { number: '13', label: 'Climate Action' },
  { number: '14', label: 'Life Below Water' },
  { number: '15', label: 'Life on Land' },
];

const transparencyItems = [
  {
    icon: FaChartLine,
    title: 'Impact Measurement',
    description: 'Robust monitoring and evaluation to track progress and improve outcomes.',
  },
  {
    icon: FaBalanceScale,
    title: 'Financial Transparency',
    description: 'Clear reporting on funding, expenditures, and operational impact.',
  },
  {
    icon: FaSearch,
    title: 'Accountability',
    description: 'Stakeholder feedback and reporting mechanisms that keep us accountable.',
  },
];

export default function ReportsPage() {
  return (
    <main className="pt-24 pb-16">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <Image src="/images/community.jpg" alt="Impact reviews" fill className="object-cover object-center opacity-80" />
          <div className="absolute inset-0 bg-slate-950/70" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-300 mb-4">Impact Reports</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">Transparent reporting on our progress and results</h1>
          <p className="mt-6 text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed">
            See how Care for Nature Zambia turns field action, community partnerships, and governance into measurable impact.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pt-8">
        <Link href="/about" className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900 font-semibold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to About Us
        </Link>
      </div>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact At A Glance</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">Key metrics that demonstrate the breadth and depth of our work.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {impactMetrics.map((metric) => (
            <article key={metric.label} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-4xl font-bold text-emerald-700 mb-3">{metric.number}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{metric.label}</h3>
              <p className="text-gray-600 leading-relaxed">{metric.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Achievements by Thematic Area</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">What we have delivered across our program pillars.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {thematicAreas.map((area) => {
              const Icon = area.icon;
              return (
                <article key={area.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{area.title}</h3>
                  <ul className="space-y-3 text-gray-600">
                    {area.achievements.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-700" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Annual Reports</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">Download the full detail behind our performance and strategic priorities.</p>
        </div>
        <div className="space-y-8">
          {annualReports.map((report) => (
            <article key={report.year} className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="grid gap-6 lg:grid-cols-[1fr_240px] items-center">
                <div className="p-8">
                  <div className="inline-flex items-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white mb-4">{report.year}</div>
                  <h3 className="text-3xl font-semibold text-gray-900 mb-4">{report.title}</h3>
                  <p className="text-gray-600 mb-6">{report.summary}</p>
                  <div className="space-y-3 mb-6">
                    {report.highlights.map((highlight) => (
                      <div key={highlight} className="flex gap-3 text-gray-700">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-700" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-2xl bg-emerald-700 px-6 py-3 text-white font-semibold hover:bg-emerald-800 transition">
                    Download Full Report
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                </div>
                <div className="h-72 bg-slate-100">
                  <Image src="/children-program.jpg" alt="Annual report" fill className="object-cover object-center" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">UN Sustainable Development Goals</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">Our reporting aligns with global goals that support people, planet and prosperity.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sdgGoals.map((goal) => (
              <div key={goal.number} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <div className="text-4xl font-bold text-emerald-700 mb-3">{goal.number}</div>
                <p className="font-semibold text-gray-900 mb-2">SDG {goal.number}</p>
                <p className="text-gray-600">{goal.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Reporting & Transparency</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">How we ensure every result is tracked and shared clearly.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {transparencyItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Pages</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: 'Our Programs', href: '/about/programs', icon: FaLeaf },
            { title: 'Governance', href: '/about/governance', icon: FaSearch },
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
    </main>
  );
}
