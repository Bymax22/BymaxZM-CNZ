import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Governance - Care for Nature Zambia',
  description: 'Learn about our governance structure, board of directors, policies, and organizational framework.',
};

const governancePolicies = [
  {
    title: 'Code of Conduct',
    description: 'Ethical standards and professional conduct expected from all staff, board members, and partners.',
    icon: '📋',
  },
  {
    title: 'Financial Management',
    description: 'Transparent financial policies, audit procedures, and fiscal responsibility frameworks.',
    icon: '💰',
  },
  {
    title: 'Risk Management',
    description: 'Comprehensive strategies to identify, assess, and mitigate organizational risks.',
    icon: '🛡️',
  },
  {
    title: 'Anti-Corruption Policy',
    description: 'Strict protocols to prevent corruption, fraud, and misconduct in all operations.',
    icon: '🔐',
  },
  {
    title: 'Data Protection',
    description: 'Privacy and confidentiality policies ensuring protection of sensitive information.',
    icon: '🔒',
  },
  {
    title: 'Stakeholder Engagement',
    description: 'Framework for meaningful engagement with partners, communities, and beneficiaries.',
    icon: '🤝',
  },
];

const boardMembers = [
  {
    name: 'Chairperson',
    role: 'Board Leadership',
    description: 'Providing strategic direction and oversight of organizational activities.',
  },
  {
    name: 'Vice Chairperson',
    role: 'Deputy Leadership',
    description: 'Supporting board chair and ensuring smooth governance operations.',
  },
  {
    name: 'Finance & Audit Committee Chair',
    role: 'Financial Oversight',
    description: 'Overseeing financial management and ensuring accountability.',
  },
  {
    name: 'Programs Committee Chair',
    role: 'Program Oversight',
    description: 'Monitoring program implementation and impact delivery.',
  },
];

export default function GovernancePage() {
  return (
    <main className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#029346] to-[#0C4726] text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Governance</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Transparent, accountable, and ethical leadership guiding our mission for environmental conservation
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

      {/* Organizational Structure */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Organizational Structure</h2>
        
        <div className="bg-gradient-to-br from-[#F0F9F4] to-white rounded-2xl p-12 mb-16">
          <div className="flex flex-col items-center gap-6">
            {/* Level 1 */}
            <div className="text-center">
              <div className="inline-block bg-[#029346] text-white px-8 py-4 rounded-xl font-bold shadow-lg">
                GENERAL ASSEMBLY
              </div>
              <p className="text-sm text-gray-600 mt-2">All Members</p>
            </div>

            <div className="h-8 w-1 bg-gradient-to-b from-[#029346] to-[#F79021]"></div>

            {/* Level 2 */}
            <div className="text-center">
              <div className="inline-block bg-[#0C4726] text-white px-8 py-4 rounded-xl font-bold shadow-lg">
                BOARD OF DIRECTORS
              </div>
              <p className="text-sm text-gray-600 mt-2">Governance & Strategic Direction</p>
            </div>

            <div className="h-8 w-1 bg-gradient-to-b from-[#F79021] to-[#029346]"></div>

            {/* Level 3 */}
            <div className="text-center">
              <div className="inline-block bg-[#F79021] text-white px-8 py-4 rounded-xl font-bold shadow-lg">
                EXECUTIVE DIRECTOR
              </div>
              <p className="text-sm text-gray-600 mt-2">Organizational Leadership</p>
            </div>

            <div className="h-8 w-1 bg-gradient-to-b from-[#029346] to-[#0C4726]"></div>

            {/* Level 4 */}
            <div className="w-full">
              <p className="text-center text-sm text-gray-600 mb-4 font-semibold">Management Team</p>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  'Programmes Manager',
                  'Finance/HR Manager',
                  'Partnerships Officer',
                  'Admin Officer',
                ].map((position) => (
                  <div key={position} className="bg-white rounded-lg p-4 text-center border-l-4 border-[#029346] shadow-md">
                    <p className="font-semibold text-gray-900 text-sm">{position}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Board Members Overview */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Board of Directors</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {boardMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-xl shadow-md p-8 border-l-4 border-[#F79021] hover:shadow-lg transition-shadow">
                <h4 className="text-2xl font-bold text-[#029346] mb-2">{member.name}</h4>
                <p className="text-[#F79021] font-semibold mb-4">{member.role}</p>
                <p className="text-gray-700 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Principles */}
      <section className="bg-[#F0F9F4] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Governance Principles</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Transparency',
                description: 'Open and clear communication of our operations, finances, and decision-making processes.',
              },
              {
                title: 'Accountability',
                description: 'Responsible to our stakeholders for the use of resources and achievement of objectives.',
              },
              {
                title: 'Integrity',
                description: 'Maintaining ethical standards and moral principles in all organizational activities.',
              },
              {
                title: 'Inclusivity',
                description: 'Ensuring diverse perspectives are valued in decision-making processes.',
              },
              {
                title: 'Efficiency',
                description: 'Optimizing resource utilization to maximize impact on conservation and community development.',
              },
              {
                title: 'Sustainability',
                description: 'Long-term thinking to ensure organizational viability and continuous mission delivery.',
              },
            ].map((principle, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold text-[#029346] mb-4">{principle.title}</h3>
                <p className="text-gray-700 leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policies Framework */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Policies & Frameworks</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {governancePolicies.map((policy, idx) => (
            <div key={idx} className="bg-gradient-to-br from-white to-[#F0F9F4] rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg hover:border-[#029346] transition-all">
              <div className="text-5xl mb-4">{policy.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{policy.title}</h3>
              <p className="text-gray-700 leading-relaxed">{policy.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Accountability Mechanisms */}
      <section className="bg-gradient-to-br from-[#029346] to-[#0C4726] text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Accountability Mechanisms</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Internal Audits',
                description: 'Regular reviews of financial records and operational procedures to ensure compliance and efficiency.',
              },
              {
                title: 'External Audits',
                description: 'Independent audits conducted by qualified external auditors to verify financial accuracy and integrity.',
              },
              {
                title: 'Stakeholder Feedback',
                description: 'Mechanisms for receiving and responding to feedback from beneficiaries, partners, and community members.',
              },
              {
                title: 'Annual Reporting',
                description: 'Transparent reporting on organizational performance, financials, and impact metrics to all stakeholders.',
              },
            ].map((mechanism, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:border-white/50 transition-colors">
                <h3 className="text-2xl font-bold mb-3">{mechanism.title}</h3>
                <p className="text-white/90 leading-relaxed">{mechanism.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Pages</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Our Team & Leadership', href: '/about/team', icon: '👥' },
            { title: 'Annual Reports', href: '/about/reports', icon: '📊' },
            { title: 'Our Programs', href: '/about/programs', icon: '🌱' },
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