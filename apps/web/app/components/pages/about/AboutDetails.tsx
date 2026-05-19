'use client';

import Image from 'next/image';
import { FaBullseye, FaUsers, FaShieldAlt, FaLeaf, FaHandsHelping, FaStar } from 'react-icons/fa';

const sections = [
  {
    title: 'Why We Exist',
    icon: FaBullseye,
    items: [
      'Restore and protect Zambia’s natural heritage through locally-led conservation.',
      'Defend children’s rights and expand meaningful participation in climate, education, and health decisions.',
      'Advance social justice in mining, land rights, and public resource governance.',
    ],
  },
  {
    title: 'Our Objectives',
    icon: FaLeaf,
    items: [
      'Build resilient, nature-based livelihoods and climate-adaptive communities.',
      'Promote child-centred development, education and safe environments for children.',
      'Increase transparency, accountability and sector reforms in sustainable mining.',
      'Strengthen governance, institutional capacity and civil society leadership.',
    ],
  },
  {
    title: 'How We Work',
    icon: FaUsers,
    items: [
      'Community-driven conservation, policy advocacy and natural resource governance.',
      'Research, training and campaigns that advance rights for children, women and youth.',
      'Collaborative partnerships with communities, government, civil society and donors.',
      'Practical field programs that combine restoration, livelihoods and rights education.',
    ],
  },
  {
    title: 'Governance & Management',
    icon: FaShieldAlt,
    items: [
      'Board-led oversight that ensures transparency, accountability and ethical practice.',
      'Experienced management teams delivering programs on environment, children’s rights, mining and health.',
      'Strong financial controls, donor reporting and community accountability mechanisms.',
      'Independent monitoring, evaluation and learning across all projects.',
    ],
  },
  {
    title: 'Where We Work',
    icon: FaHandsHelping,
    items: [
      'Across 10 provinces with a focus on conservation, children, mining, water, health and livelihoods.',
      'Thematic work in climate action, conservation education, sustainable mining, nutrition and gender justice.',
      'Local partnerships with schools, community groups and traditional leadership.',
    ],
  },
  {
    title: 'What Makes Us Unique',
    icon: FaStar,
    items: [
      'Bridging environment, children’s rights and extractives accountability in integrated action.',
      'Deep experience in participatory research, advocacy and practical field delivery.',
      'A strong focus on youth, women and children as agents of change.',
      'A proven track record of measurable conservation and social impact across Zambia.',
    ],
  },
];

export function AboutDetails() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-start">
          <div className="grid gap-6">
            {sections.map((section) => (
              <article key={section.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-white">
                  <section.icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{section.title}</h3>
                <ul className="space-y-3 text-gray-600 list-disc list-inside">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="relative h-96 w-full">
                <Image
                  src="/partnership.jpg"
                  alt="Partnership and community"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-slate-950/20 p-8 flex flex-col justify-end">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-200">Field partnership</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Working with communities and institutions to deliver lasting change.</h2>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Approach</h3>
              <p className="text-gray-600 leading-relaxed">
                We combine evidence-based planning with boots-on-the-ground implementation, ensuring every project includes local leadership, accountability and measurable impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
