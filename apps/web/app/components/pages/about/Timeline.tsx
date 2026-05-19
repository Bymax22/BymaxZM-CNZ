'use client';

import { motion } from 'framer-motion';
import { FaSeedling, FaTree, FaSchool, FaGlobeAfrica, FaAward, FaUsers } from 'react-icons/fa';

const timelineEvents = [
  {
    year: '2008',
    title: 'Foundation',
    description: 'Founded by a small team of conservationists working with rural communities to stop deforestation and protect local livelihoods.',
    icon: FaSeedling,
  },
  {
    year: '2010',
    title: 'First Reforestation Project',
    description: 'Launched a community tree-planting initiative in Eastern Province, mobilizing volunteers and planting thousands of seedlings.',
    icon: FaTree,
  },
  {
    year: '2013',
    title: 'School Outreach',
    description: 'Introduced environmental education and child participation programs in local schools, reaching young leaders across Zambia.',
    icon: FaSchool,
  },
  {
    year: '2016',
    title: 'National Growth',
    description: 'Expanded into multiple provinces and strengthened partnerships with local government and civil society organizations.',
    icon: FaGlobeAfrica,
  },
  {
    year: '2019',
    title: 'Climate Initiatives',
    description: 'Added climate adaptation and sustainable mining accountability projects to our program portfolio for broader impact.',
    icon: FaAward,
  },
  {
    year: '2023',
    title: 'Digital Engagement',
    description: 'Launched better monitoring tools and community feedback systems to track results and respond faster to local needs.',
    icon: FaUsers,
  },
];

export function Timeline() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Journey</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fifteen years of growth, partnerships, and impact across Zambia’s conservation landscape.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-6 top-0 h-full w-1 bg-slate-200" />
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="relative pl-16"
              >
                <div className="absolute left-0 top-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700 text-white shadow">
                  <event.icon className="h-5 w-5" />
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <span className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">{event.year}</span>
                  <h3 className="mt-4 text-2xl font-semibold text-gray-900">{event.title}</h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
