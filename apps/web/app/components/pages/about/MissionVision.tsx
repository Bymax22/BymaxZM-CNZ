'use client';

import { motion } from 'framer-motion';
import { FaBullseye, FaEye, FaCircle } from 'react-icons/fa';

export function MissionVision() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#F0F9F4] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="w-20 h-20 mx-auto lg:mx-0 mb-6 bg-gradient-to-br from-[#029346] to-[#0C4726] rounded-2xl flex items-center justify-center shadow-lg">
              <FaBullseye className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              To protect and restore Zambia's natural environment through community-led conservation 
              initiatives, sustainable development practices, and environmental education that 
              empowers present and future generations.
            </p>
            
            <div className="space-y-3">
              {[
                'Environmental conservation and restoration',
                'Community empowerment and sustainable livelihoods',
                'Youth education and leadership development',
                'Climate change adaptation and mitigation',
                'Wildlife protection and habitat preservation'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-gray-600"
                >
                  <div className="w-2 h-2 bg-[#029346] rounded-full"></div>
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="w-20 h-20 mx-auto lg:mx-0 mb-6 bg-gradient-to-br from-[#F79021] to-[#AA5D26] rounded-2xl flex items-center justify-center shadow-lg">
              <FaEye className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              A Zambia where thriving ecosystems and empowered communities coexist in harmony, 
              where every citizen is an active steward of the environment, and where sustainable 
              development ensures prosperity for generations to come.
            </p>
            
            <div className="space-y-3">
              {[
                'Carbon-neutral communities by 2040',
                '100,000+ trees planted annually',
                'Environmental education in all schools',
                'Sustainable livelihoods for rural communities',
                'Nationwide conservation network'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-gray-600"
                >
                  <FaBullseye className="w-4 h-4 text-[#F79021] flex-shrink-0" />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}