import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaEnvelope, FaLinkedin, FaPhoneAlt, FaUsers, FaHandsHelping, FaUserTie, FaCogs } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Our Team & Leadership - Care for Nature Zambia',
  description: 'Meet the board, leadership team, and staff driving our mission for environmental conservation and sustainable development.',
};

const executiveTeam = [
  {
    name: 'Nsama Musonda',
    role: 'Executive Director',
    image: '/avatars/john-phiri.jpg',
    bio: 'Leading Care for Nature Zambia’s strategic vision, partnerships, and program delivery across environment and community development.',
    email: 'nsama@carefornature.org.zm',
    phone: '+260 97 123 4567',
    linkedin: 'https://www.linkedin.com/in/nsama-musonda',
  },
];

const leadershipTeam = [
  {
    name: 'Grace Banda',
    role: 'Programs Manager',
    image: '/avatars/grace-banda.jpg',
    bio: 'Guides program design, implementation, and community engagement for conservation and child rights projects.',
    email: 'grace@carefornature.org.zm',
    linkedin: 'https://www.linkedin.com/in/grace-banda',
  },
  {
    name: 'Chipo Mwansa',
    role: 'Finance & Operations Lead',
    image: '/avatars/chipo-mwansa.jpg',
    bio: 'Oversees finance, compliance, and operational systems to keep our programs efficient and accountable.',
    email: 'chipo@carefornature.org.zm',
    linkedin: 'https://www.linkedin.com/in/chipo-mwansa',
  },
  {
    name: 'Victor Tembo',
    role: 'Partnerships Coordinator',
    image: '/avatars/john-phiri.jpg',
    bio: 'Builds strategic partnerships with donors, community leaders, and civil society networks.',
    email: 'victor@carefornature.org.zm',
    linkedin: 'https://www.linkedin.com/in/victor-tembo',
  },
];

const committeeGoals = [
  'Board of Directors',
  'Finance & Audit Committee',
  'Programs Committee',
  'Safeguarding Committee',
];

const lessonsLearnt = [
  'Strong relationships with government, traditional leaders, and civil society create a powerful voice for nature.',
  'Children are change makers when they are given safe spaces and opportunities to lead.',
  'Local knowledge is the foundation of sustainable conservation and community wellbeing.',
  'Nature-based actions help communities respond to climate change and humanitarian shocks.',
];

export default function TeamPage() {
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
          <Image src="/children-program.jpg" alt="Team leadership" fill className="object-cover object-center opacity-80" />
          <div className="absolute inset-0 bg-slate-950/75" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 text-center">
          <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-600 text-white shadow-xl">
            <FaUsers className="h-10 w-10" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">Meet the leadership driving our mission.</h1>
          <p className="mt-6 text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Discover the executive leadership, program team, and governance structure that shape Care for Nature Zambia’s work.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 shadow-sm">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Organizational Structure</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-700 text-white">
                <FaUserTie className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Executive Director</h3>
              <p className="text-gray-600 leading-relaxed">The central leadership role for strategy, field delivery, and organizational direction.</p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-700 text-white">
                <FaUsers className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Board of Directors</h3>
              <p className="text-gray-600 leading-relaxed">Governance oversight and strategic guidance for mission-aligned decisions.</p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-700 text-white">
                <FaCogs className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Management Team</h3>
              <p className="text-gray-600 leading-relaxed">Programmes, finance, partnerships, and operations teams who execute our work.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-gray-900">Executive Leadership</h2>
            <p className="text-gray-600 mt-4">Meet the executive team responsible for delivering our mission.</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {executiveTeam.map((member) => (
              <article key={member.name} className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="relative h-96 w-full">
                  <Image src={member.image} alt={member.name} fill className="object-cover object-center" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-emerald-700 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed mb-6">{member.bio}</p>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center gap-3">
                      <FaEnvelope className="h-5 w-5 text-emerald-700" />
                      <a href={`mailto:${member.email}`} className="hover:text-emerald-900">{member.email}</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaPhoneAlt className="h-5 w-5 text-emerald-700" />
                      <span>{member.phone}</span>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-emerald-700 hover:text-emerald-900">
                      <FaLinkedin className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-gray-900">Our Leadership Team</h2>
          <p className="text-gray-600 mt-4">Technical experts and coordinators supporting our programs across Zambia.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {leadershipTeam.map((member) => (
            <article key={member.name} className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="relative h-80 w-full">
                <Image src={member.image} alt={member.name} fill className="object-cover object-center" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-emerald-700 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed mb-6">{member.bio}</p>
                <div className="flex items-center gap-3 text-gray-600">
                  <a href={`mailto:${member.email}`} className="flex items-center gap-2 hover:text-emerald-900">
                    <FaEnvelope className="h-4 w-4" />
                    <span>{member.email}</span>
                  </a>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-emerald-700 hover:text-emerald-900">
                    <FaLinkedin className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-gray-900">Board & Committee Focus</h2>
            <p className="text-gray-600 mt-4">Our governance committees keep programs aligned, compliant, and impact-driven.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {committeeGoals.map((goal) => (
              <article key={goal} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-white">
                  <FaHandsHelping className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{goal}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-gray-900">Key Learnings</h2>
          <p className="text-gray-600 mt-4">What our experience has taught us about working in conservation and community development.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {lessonsLearnt.map((lesson, idx) => (
            <article key={idx} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-gray-700 leading-relaxed">{lesson}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Pages</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: 'Governance', href: '/about/governance' },
            { title: 'Impact Reports', href: '/about/reports' },
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
