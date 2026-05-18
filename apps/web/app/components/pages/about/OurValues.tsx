'use client';

import { motion } from 'framer-motion';
import { 
  FaHandsHelping, 
  FaLeaf, 
  FaUsers, 
  FaShieldAlt, 
  FaLightbulb,
  FaHeart
} from 'react-icons/fa';

const values = [
  {
    icon: FaHandsHelping,
    title: 'Community First',
    description: 'We prioritize community needs and involve local people in every step of our conservation efforts.',
    color: 'bg-[#029346]'
  },
  {
    icon: FaLeaf,
    title: 'Environmental Stewardship',
    description: 'We are committed to protecting and restoring Zambia\'s natural heritage for future generations.',
    color: 'bg-[#029346]'
  },
  {
    icon: FaUsers,
    title: 'Collaboration',
    description: 'We believe in the power of partnerships and work together with communities, government, and organizations.',
    color: 'bg-[#F79021]'
  },
  {
    icon: FaShieldAlt,
    title: 'Transparency',
    description: 'We maintain open communication and accountability in all our operations and financial management.',
    color: 'bg-[#F79021]'
  },
  {
    icon: FaLightbulb,
    title: 'Innovation',
    description: 'We embrace creative solutions and adapt to new challenges in conservation and community development.',
    color: 'bg-[#029346]'
  },
  {
    icon: FaHeart,
    title: 'Compassion',
    description: 'We approach our work with empathy, respect, and genuine care for both people and the planet.',
    color: 'bg-[#F79021]'
  }
];

export function OurValues() {
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
            Our <span className="text-[#029346]">Values</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The principles that guide our work and define who we are as an organization
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${value.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                <value.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                {value.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="rounded-3xl border border-gray-200 bg-white p-12 text-gray-900 shadow-lg">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Make a <span className="text-[#029346]">Difference</span>?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join us in our mission to protect Zambia&apos;s environment and empower communities for a sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#029346] text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-[#027437] transition-all duration-300">
                Get Involved
              </button>
              <button className="border border-gray-300 text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}