import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Impact Reports - Care for Nature Zambia',
  description: 'Explore our annual reports, impact metrics, achievements, and progress towards environmental conservation goals.',
};

const annualReports = [
  {
    year: '2024',
    title: 'Annual Report 2024',
    description: 'Our latest achievements in environmental conservation, community development, and organizational growth.',
    highlights: [
      'Expanded programs to 5 new districts',
      'Engaged 15,000+ community members',
      'Protected 2,500 hectares of natural resources',
      'Trained 500+ youth in environmental stewardship',
    ],
  },
  {
    year: '2023',
    title: 'Annual Report 2023',
    description: 'Significant progress in nature-based actions and child-led conservation initiatives.',
    highlights: [
      'Launched strategic plan 2023-2027',
      'Implemented 25+ community projects',
      'Reached 12,000+ beneficiaries',
      'Established 8 new conservation zones',
    ],
  },
  {
    year: '2022',
    title: 'Annual Report 2022',
    description: 'Post-pandemic recovery and strengthened organizational partnerships.',
    highlights: [
      'Rebuilt community networks',
      'Secured strategic partnerships',
      'Expanded mining accountability work',
      'Enhanced digital engagement',
    ],
  },
];

const impactMetrics = [
  {
    number: '15+',
    label: 'Years of Service',
    description: 'Continuous environmental conservation work since 2008',
  },
  {
    number: '50K+',
    label: 'Lives Impacted',
    description: 'Direct and indirect beneficiaries of our programs',
  },
  {
    number: '10K+',
    label: 'Hectares Protected',
    description: 'Natural resources under community-based conservation',
  },
  {
    number: '100+',
    label: 'Projects Implemented',
    description: 'Community-driven conservation and development initiatives',
  },
  {
    number: '1000+',
    label: 'Youth Trained',
    description: 'Environmental leaders and change-makers developed',
  },
  {
    number: '8',
    label: 'Districts Served',
    description: 'Geographic reach across Zambia',
  },
];

const thematicAreas = [
  {
    title: 'Nature Conservation',
    image: '🌳',
    achievements: [
      'Community-based conservation zones established',
      'Biodiversity monitoring programs',
      'Sustainable resource management training',
      'Habitat restoration initiatives',
    ],
  },
  {
    title: 'Child Rights & Participation',
    image: '👶',
    achievements: [
      'Child-led conservation projects',
      'Environmental education programs',
      'Youth climate action networks',
      'Child safeguarding frameworks',
    ],
  },
  {
    title: 'Sustainable Mining',
    image: '⛏️',
    achievements: [
      'Mining accountability monitoring',
      'Community feedback mechanisms',
      'Environmental impact assessments',
      'Stakeholder engagement forums',
    ],
  },
  {
    title: 'Organizational Strengthening',
    image: '🏢',
    achievements: [
      'Capacity building programs',
      'Digital systems implementation',
      'Financial management systems',
      'Staff professional development',
    ],
  },
];

export default function ReportsPage() {
  return (
    <main className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#029346] to-[#0C4726] text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Impact & Reports</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Transparent reporting on our achievements, progress, and commitment to environmental conservation and community development
          </p>
        </div>
      </section>

      {/* Back Navigation */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
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

      {/* Key Impact Metrics */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Impact At A Glance</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">Measurable outcomes and achievements from our conservation and development work</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {impactMetrics.map((metric, idx) => (
            <div key={idx} className="bg-gradient-to-br from-[#F0F9F4] to-white rounded-xl p-8 text-center border-t-4 border-[#029346] shadow-md hover:shadow-lg transition-shadow">
              <div className="text-5xl font-bold text-[#F79021] mb-3">{metric.number}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{metric.label}</h3>
              <p className="text-gray-600">{metric.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Thematic Areas Achievements */}
      <section className="bg-[#F0F9F4] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Achievements by Thematic Area</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {thematicAreas.map((area, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-32 bg-gradient-to-br from-[#029346] to-[#0C4726] flex items-center justify-center">
                  <span className="text-6xl">{area.image}</span>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{area.title}</h3>
                  <ul className="space-y-3">
                    {area.achievements.map((achievement, aidx) => (
                      <li key={aidx} className="flex gap-3 text-gray-700">
                        <svg className="w-5 h-5 flex-shrink-0 text-[#029346] mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Reports */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Annual Reports</h2>
        
        <div className="space-y-8">
          {annualReports.map((report, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-[#F79021]">
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="inline-block bg-[#029346] text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                      {report.year}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">{report.title}</h3>
                    <p className="text-gray-600 text-lg mb-6">{report.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Highlights:</h4>
                      <ul className="space-y-2">
                        {report.highlights.map((highlight, hidx) => (
                          <li key={hidx} className="flex gap-3 text-gray-700">
                            <svg className="w-5 h-5 flex-shrink-0 text-[#F79021]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="inline-flex items-center gap-2 bg-[#029346] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0C4726] transition-colors">
                      <span>Download Full Report</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2m0 0v-8m0 8l-4-2m4 2l4-2" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex-shrink-0">
                    <div className="w-32 h-40 bg-gradient-to-br from-[#029346] to-[#0C4726] rounded-lg flex items-center justify-center text-6xl">
                      📄
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SDG Alignment */}
      <section className="bg-gradient-to-br from-[#F0F9F4] to-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">UN Sustainable Development Goals</h2>
          <p className="text-center text-gray-600 text-lg mb-12">Our programs contribute to achieving these global development goals</p>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { sdg: '4', title: 'Quality Education', color: 'from-red-500 to-red-600' },
              { sdg: '5', title: 'Gender Equality', color: 'from-yellow-500 to-yellow-600' },
              { sdg: '8', title: 'Decent Work & Growth', color: 'from-purple-500 to-purple-600' },
              { sdg: '10', title: 'Reduced Inequalities', color: 'from-red-600 to-red-700' },
              { sdg: '12', title: 'Responsible Consumption', color: 'from-amber-600 to-amber-700' },
              { sdg: '13', title: 'Climate Action', color: 'from-green-700 to-green-800' },
              { sdg: '14', title: 'Life Below Water', color: 'from-blue-600 to-blue-700' },
              { sdg: '15', title: 'Life on Land', color: 'from-green-500 to-green-600' },
            ].map((goal) => (
              <div key={goal.sdg} className={`bg-gradient-to-br ${goal.color} rounded-lg p-6 text-white text-center shadow-md hover:shadow-lg transition-shadow`}>
                <div className="text-4xl font-bold mb-3">SDG {goal.sdg}</div>
                <p className="font-semibold">{goal.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reporting & Transparency */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Commitment to Transparency</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '📊',
              title: 'Financial Transparency',
              description: 'Regular audited financial statements and transparent reporting on resource allocation.',
            },
            {
              icon: '📈',
              title: 'Impact Measurement',
              description: 'Rigorous monitoring and evaluation frameworks to track progress towards objectives.',
            },
            {
              icon: '🔍',
              title: 'Accountability',
              description: 'Regular stakeholder engagement and feedback mechanisms to ensure organizational accountability.',
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Pages */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Pages</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Our Programs', href: '/about/programs', icon: '🌱' },
            { title: 'Governance', href: '/about/governance', icon: '⚖️' },
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
    </main>
  );
}