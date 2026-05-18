'use client';

const sections = [
  {
    title: 'Why We Exist',
    items: [
      'To restore and protect Zambia’s natural heritage through practical conservation and community-led action.',
      'To defend children’s rights and expand meaningful participation in climate, education and health decisions.',
      'To advance social justice in mining, land rights and public resource governance for women, youth and rural households.',
    ],
  },
  {
    title: 'Our Objectives',
    items: [
      'Build resilient, nature-based livelihoods and climate-adaptive communities.',
      'Promote child-centred development, education and safe environments for children.',
      'Increase transparency, accountability and sector reforms in sustainable mining and extractives.',
      'Strengthen governance, institutional capacity and civil society leadership across Zambia.',
    ],
  },
  {
    title: 'What We Do and How We Work',
    items: [
      'Community-driven conservation, policy advocacy and natural resources governance.',
      'Research, training and locally-led campaigns that advance rights for children, women and youth.',
      'Collaborative partnerships with communities, government, civil society and donors.',
      'Practical field programs that combine environmental restoration, livelihoods and rights education.',
    ],
  },
  {
    title: 'Governance and Management',
    items: [
      'Board-led oversight that ensures transparency, accountability and ethical practice.',
      'Experienced management teams delivering programs on environment, children’s rights, mining and health.',
      'Strong financial controls, donor reporting and community accountability mechanisms.',
      'Independent monitoring, evaluation and learning across all projects.',
    ],
  },
  {
    title: 'Where We Work and Thematic Areas',
    items: [
      'Across 10 provinces with a focus on environmental conservation, children, mining, water, health and livelihoods.',
      'Key thematic work includes climate action, conservation education, sustainable mining, community nutrition and gender justice.',
      'Local partnerships with schools, community groups and traditional leadership to scale impact.',
    ],
  },
  {
    title: 'Why We Are Unique',
    items: [
      'Bridging environment, children’s rights and extractives accountability in integrated community action.',
      'Deep experience in participatory research, multi-stakeholder advocacy and practical field delivery.',
      'A strong focus on youth, women and children as agents of change in climate justice and natural resource management.',
      'A proven track record of delivering measurable conservation and social impact results across Zambia.',
    ],
  },
];

export function AboutDetails() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {sections.map((section) => (
            <article key={section.title} className="rounded-3xl bg-white border border-gray-200 p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-3 text-gray-600 list-disc list-inside">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
