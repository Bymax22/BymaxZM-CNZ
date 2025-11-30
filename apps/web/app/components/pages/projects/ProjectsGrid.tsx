'use client';

import { motion } from 'framer-motion';
import { 
  FaTree, 
  FaUsers, 
  FaSchool, 
  FaSun,
  FaHandHoldingHeart,
  FaRecycle,
  FaWater,
  FaSeedling
} from 'react-icons/fa';
import Link from 'next/link';

const projects = [
  {
    icon: FaTree,
    title: 'Forest Conservation',
    description: 'Protecting and restoring Zambia\'s forests through sustainable management and community-led reforestation initiatives.',
    href: '/projects/conservation',
    color: 'from-[#029346] to-[#0C4726]',
    stats: ['50K+ Trees Planted', '10 Protected Areas', '25+ Species Protected'],
    progress: 85
  },
  {
    icon: FaUsers,
    title: 'Community Development',
    description: 'Empowering local communities through sustainable livelihoods, clean energy, and economic empowerment programs.',
    href: '/projects/community',
    color: 'from-[#F79021] to-[#AA5D26]',
    stats: ['100+ Communities', '5K+ Jobs Created', '10K+ Lives Improved'],
    progress: 70
  },
  {
    icon: FaSchool,
    title: 'Environmental Education',
    description: 'Teaching future generations about conservation through school programs and youth leadership development.',
    href: '/projects/education',
    color: 'from-[#029346] to-[#0C4726]',
    stats: ['5K+ Students', '50+ Schools', '100+ Teachers Trained'],
    progress: 90
  },
  {
    icon: FaSun,
    title: 'Climate Action',
    description: 'Combating climate change through renewable energy, sustainable agriculture, and carbon reduction initiatives.',
    href: '/projects/climate',
    color: 'from-[#F79021] to-[#AA5D26]',
    stats: ['15K+ Solar Lights', '200+ Farms', '50K+ Tons CO2 Reduced'],
    progress: 65
  },
  {
    icon: FaHandHoldingHeart,
    title: 'Wildlife Protection',
    description: 'Safeguarding Zambia\'s diverse wildlife through anti-poaching efforts and habitat conservation.',
    href: '/projects/wildlife',
    color: 'from-[#029346] to-[#0C4726]',
    stats: ['15 Species', '5 National Parks', '100+ Rangers Trained'],
    progress: 75
  },
  {
    icon: FaRecycle,
    title: 'Waste Management',
    description: 'Promoting recycling and proper waste disposal to keep Zambia\'s environment clean and healthy.',
    href: '/projects/waste',
    color: 'from-[#F79021] to-[#AA5D26]',
    stats: ['20+ Communities', '50 Tons Recycled', '10 Cleanup Campaigns'],
    progress: 60
  },
  {
    icon: FaWater,
    title: 'Water Conservation',
    description: 'Ensuring access to clean water and promoting sustainable water management practices.',
    href: '/projects/water',
    color: 'from-[#029346] to-[#0C4726]',
    stats: ['50 Boreholes', '10K+ People', '5 Watersheds Protected'],
    progress: 80
  },
  {
    icon: FaSeedling,
    title: 'Sustainable Agriculture',
    description: 'Promoting climate-smart farming techniques that protect the environment while improving food security.',
    href: '/projects/agriculture',
    color: 'from-[#F79021] to-[#AA5D26]',
    stats: ['1K+ Farmers', '5K+ Hectares', '20+ Crops'],
    progress: 70
  }
];

export function ProjectsGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#029346] to-[#0C4726]">Project Portfolio</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive environmental conservation and community development initiatives across Zambia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={project.href}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100 h-full flex flex-col overflow-hidden">
                  {/* Header */}
                  <div className={`p-6 bg-gradient-to-br ${project.color} text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <project.icon className="w-8 h-8" />
                      <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                        {project.progress}% Complete
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="px-6 pt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${project.color}`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="p-6 flex-1">
                    <div className="space-y-3">
                      {project.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="flex items-center gap-3 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-[#029346] rounded-full flex-shrink-0"></div>
                          {stat}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 pb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Learn More</span>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#029346] group-hover:text-white transition-all duration-300">
                        →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-[#029346] to-[#0C4726] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Want to See <span className="text-[#F79021]">More Projects</span>?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Explore our complete project portfolio with detailed reports, impact metrics, and success stories.
            </p>
            <button className="bg-white text-[#029346] px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              View Full Project Database
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}