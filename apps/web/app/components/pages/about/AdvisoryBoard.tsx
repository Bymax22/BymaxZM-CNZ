'use client';

import { motion } from 'framer-motion';
import { FaUniversity, FaIndustry, FaGlobe } from 'react-icons/fa';

const advisors = [
  {
    name: 'Prof. James Mulenga',
    role: 'Environmental Science Professor',
    organization: 'University of Zambia',
    expertise: 'Climate Change & Biodiversity',
    icon: FaUniversity
  },
  {
    name: 'Dr. Lisa Bwalya',
    role: 'Sustainable Development Expert',
    organization: 'UNDP Zambia',
    expertise: 'Community Development',
    icon: FaGlobe
  },
  {
    name: 'Mr. Peter Chilufya',
    role: 'Corporate Sustainability Director',
    organization: 'Zambia Chamber of Commerce',
    expertise: 'Green Business',
    icon: FaIndustry
  }
];

export function AdvisoryBoard() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#F0F9F4] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Advisory <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F79021] to-[#AA5D26]">Board</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert guidance from leaders in environmental science, development, and business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advisors.map((advisor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#F79021] to-[#AA5D26] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <advisor.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{advisor.name}</h3>
              <div className="text-[#F79021] font-semibold mb-2">{advisor.role}</div>
              <div className="text-gray-600 mb-3">{advisor.organization}</div>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                {advisor.expertise}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Our Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our <span className="text-[#029346]">Mission</span>
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for passionate individuals to join our team and help drive 
              environmental conservation in Zambia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#029346] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                View Open Positions
              </button>
              <button className="border-2 border-[#029346] text-[#029346] hover:bg-[#029346] hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300">
                Volunteer With Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}