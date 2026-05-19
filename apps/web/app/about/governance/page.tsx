import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaBalanceScale, FaClipboardCheck, FaHandsHelping, FaShieldAlt, FaUserTie, FaUsers, FaCogs } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Governance - Care for Nature Zambia',
  description: 'Learn about our governance structure, board of directors, policies, and organizational framework.',
};

const governancePolicies = [
  {
    title: 'Code of Conduct',
    description: 'Ethical standards and professional conduct expected from staff, board members, and partners.',
    icon: FaClipboardCheck,
  },
  {
    title: 'Financial Management',
    description: 'Transparent financial policies, audit procedures, and fiscal responsibility frameworks.',
    icon: FaBalanceScale,
  },
  {
    title: 'Risk Management',
    description: 'Strategies to identify, assess, and mitigate organizational risks.',
    icon: FaShieldAlt,
  },
  {
    title: 'Anti-Corruption',
    description: 'Protocols to prevent corruption, fraud, and misconduct in all operations.',
    icon: FaHandsHelping,
  },
  {
    title: 'Data Protection',
    description: 'Privacy and confidentiality policies to protect sensitive information.',
    icon: FaShieldAlt,
  },
  {
    title: 'Stakeholder Engagement',
    description: 'Meaningful engagement with partners, communities, and beneficiaries.',
    icon: FaUsers,
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
    description: 'Supporting the board chair and ensuring strong governance practices.',
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

const governancePrinciples = [
  {
    title: 'Transparency',
    description: 'Clear communication of our operations, finances, and decisions.',
  },
  {
    title: 'Accountability',
    description: 'Responsible governance and stakeholder reporting at every level.',
  },
  {
    title: 'Integrity',
    description: 'Ethical conduct and strong moral principles in all activities.',
  },
  {
    title: 'Inclusivity',
    description: 'Diverse perspectives are included in the decision-making process.',
  },
  {
    title: 'Efficiency',
    description: 'Smart use of resources to maximize impact and sustainability.',
  },
  {
    title: 'Sustainability',
    description: 'Long-term thinking to ensure organizational viability and continued mission delivery.',
  },
];

const accountabilityMechanisms = [
  {
    title: 'Internal Audits',
    description: 'Regular reviews of financial and operational procedures for compliance and efficiency.',
  },
  {
    title: 'External Audits',
    description: 'Independent audit reviews to verify financial accuracy and organizational performance.',
  },
  {
    title: 'Stakeholder Feedback',
    description: 'Channels for beneficiaries and partners to share input and improve our work.',
  },
  {
    title: 'Annual Reporting',
    description: 'Clear reporting on performance, finances, and impact for all stakeholders.',
  },
];

export default function GovernancePage() {
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

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <Image src="/partnership.jpg" alt="Governance leadership" fill className="object-cover object-center opacity-80" />
          <div className="absolute inset-0 bg-slate-950/78" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300 mb-4">Governance</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">Strong leadership and transparent systems.</h1>
          <p className="mt-6 text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Our governance framework ensures accountability, ethical practice, and inclusive decision-making across the organization.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 shadow-sm">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Organizational Structure</h2>
          <div className="grid gap-8 lg:grid-cols-3">
            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-700 text-white">
                <FaUserTie className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Executive Director</h3>
              <p className="text-gray-600 leading-relaxed">Operational and strategic leadership for the organization’s mission and programs.</p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-700 text-white">
                <FaUsers className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Board of Directors</h3>
              <p className="text-gray-600 leading-relaxed">Governance, oversight, and strategic guidance for long-term organizational sustainability.</p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-700 text-white">
                <FaCogs className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Management Team</h3>
              <p className="text-gray-600 leading-relaxed">Programmes, finance, partnerships, and operations teams delivering day-to-day activities.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900">Board Leadership</h2>
          <p className="text-gray-600 mt-4">The directors who guide our strategy and ensure accountability.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {boardMembers.map((member) => (
            <article key={member.name} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-emerald-700 mb-2">{member.name}</h3>
              <p className="text-gray-900 font-semibold mb-4">{member.role}</p>
              <p className="text-gray-600 leading-relaxed">{member.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-gray-900">Governance Principles</h2>
            <p className="text-gray-600 mt-4">Core values that guide how we govern people and resources.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {governancePrinciples.map((principle) => (
              <article key={principle.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h3 className="text-2xl font-semibold text-emerald-700 mb-3">{principle.title}</h3>
                <p className="text-gray-600 leading-relaxed">{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900">Policies & Frameworks</h2>
          <p className="text-gray-600 mt-4">The policies that keep our organization ethical, compliant, and effective.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {governancePolicies.map((policy) => {
            const Icon = policy.icon;
            return (
              <article key={policy.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{policy.title}</h3>
                <p className="text-gray-600 leading-relaxed">{policy.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-950 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold">Accountability Mechanisms</h2>
            <p className="text-slate-300 mt-4">How we make sure our governance is effective and transparent.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {accountabilityMechanisms.map((item) => (
              <article key={item.title} className="rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-sm shadow-sm">
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-slate-200 leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Pages</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: 'Our Team & Leadership', href: '/about/team' },
            { title: 'Annual Reports', href: '/about/reports' },
            { title: 'Our Programs', href: '/about/programs' },
          ].map((page) => (
            <Link key={page.href} href={page.href}>
              <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-xl font-semibold text-gray-900">{page.title}</h3>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
