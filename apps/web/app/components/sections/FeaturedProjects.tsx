'use client';

import { motion } from 'framer-motion';
import { 
  FaTree, 
  FaGraduationCap, 
  FaHandsHelping,
  FaArrowRight,
  FaHeart,
  FaUsers,
  FaChartLine,
  FaSeedling
} from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: 'Green Schools Initiative',
    description: 'Empowering young environmental champions through school-based conservation clubs and eco-education programs.',
    icon: FaGraduationCap,
    image: '/images/green-schools.jpg',
    progress: 85,
    donors: 234,
    goal: 50000,
    raised: 42500,
    color: 'from-[#029346] to-[#0C4726]',
    bgColor: 'bg-gradient-to-br from-[#029346]/10 to-[#0C4726]/10',
    impact: '50+ Schools',
    duration: '12 Months'
  },
  {
    id: 2,
    title: 'Community Reforestation',
    description: 'Planting indigenous trees and promoting sustainable forest management practices that restore ecosystems.',
    icon: FaTree,
    image: '/images/reforestation.jpg',
    progress: 70,
    donors: 156,
    goal: 75000,
    raised: 52500,
    color: 'from-[#F79021] to-[#AA5D26]',
    bgColor: 'bg-gradient-to-br from-[#F79021]/10 to-[#AA5D26]/10',
    impact: '10K+ Trees',
    duration: '18 Months'
  },
  {
    id: 3,
    title: 'Children\'s Rights & Education',
    description: 'Creating safe spaces for children to learn about their rights while engaging in environmental conservation.',
    icon: FaHandsHelping,
    image: '/images/children.jpg',
    progress: 60,
    donors: 189,
    goal: 100000,
    raised: 60000,
    color: 'from-[#029346] to-[#0C4726]',
    bgColor: 'bg-gradient-to-br from-[#029346]/10 to-[#0C4726]/10',
    impact: '2,000 Children',
    duration: '24 Months'
  },
  {
    id: 4,
    title: 'Women in Conservation',
    description: 'Empowering women through conservation enterprise training and sustainable income sources.',
    icon: FaUsers,
    image: '/images/women-conservation.jpg',
    progress: 90,
    donors: 312,
    goal: 40000,
    raised: 36000,
    color: 'from-[#F79021] to-[#AA5D26]',
    bgColor: 'bg-gradient-to-br from-[#F79021]/10 to-[#AA5D26]/10',
    impact: '150 Women',
    duration: '15 Months'
  }
];

export function FeaturedProjects() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white to-[#F0F9F4]">
      {/* Background Elements - Simplified */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#029346]/10 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#F79021]/10 rounded-full blur-2xl sm:blur-3xl"></div>
      </div>

      <div className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-[#029346] to-[#0C4726] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg"
            >
              <FaChartLine className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#029346] to-[#0C4726]">Projects</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
              Discover our key initiatives that combine environmental conservation with community development across Zambia.
            </p>
          </motion.div>

          {/* Projects Grid - Mobile First */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative"
              >
                {/* Main Card - Mobile Optimized */}
                <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 overflow-hidden border border-gray-100 backdrop-blur-sm">
                  
                  {/* Project Image with Overlay */}
                  <div className="relative h-40 sm:h-48 lg:h-56 overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('${project.image}')`,
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} bg-opacity-30`} />
                    
                    {/* Project Badge */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <div className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/90 backdrop-blur-sm text-gray-800 font-semibold text-xs sm:text-sm shadow-md`}>
                        {project.impact}
                      </div>
                    </div>

                    {/* Progress Section */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                      <div className="flex justify-between text-white text-xs sm:text-sm mb-1.5 sm:mb-2 font-semibold">
                        <span className="flex items-center gap-1">
                          <FaUsers className="w-3 h-3" />
                          {project.donors}
                        </span>
                        <span>{project.progress}%</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-white/30 rounded-full h-2 sm:h-2.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${project.progress}%` }}
                          transition={{ duration: 1.2, delay: index * 0.1 + 0.2 }}
                          viewport={{ once: true }}
                          className={`h-full rounded-full bg-gradient-to-r ${project.color} shadow-sm`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${project.color} flex items-center justify-center text-white shadow-md flex-shrink-0`}>
                        <project.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 leading-tight">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <span>⏱️ {project.duration}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Funding Progress - Simplified */}
                    <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-medium">Progress</span>
                        <span className="font-bold text-gray-800">
                          ZMW {project.raised.toLocaleString()}
                        </span>
                      </div>
                      
                      {/* Impact Stats - Simplified */}
                      <div className="flex gap-2 sm:gap-3 text-center">
                        <div className="flex-1 p-2 sm:p-3 rounded-xl bg-gray-50 border border-gray-100">
                          <div className="text-base sm:text-lg font-bold text-[#029346]">{project.progress}%</div>
                          <div className="text-xs text-gray-500">Funded</div>
                        </div>
                        <div className="flex-1 p-2 sm:p-3 rounded-xl bg-gray-50 border border-gray-100">
                          <div className="text-base sm:text-lg font-bold text-[#F79021]">{project.donors}</div>
                          <div className="text-xs text-gray-500">Supporters</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons - Stacked on Mobile */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`py-3 px-4 sm:py-3 sm:px-6 rounded-xl font-semibold text-white bg-gradient-to-r ${project.color} shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base`}
                      >
                        <FaHeart className="w-3 h-3 sm:w-4 sm:h-4" />
                        Support
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="py-3 px-4 sm:py-3 sm:px-6 rounded-xl border border-gray-200 text-gray-600 hover:border-[#029346] hover:text-[#029346] font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base group"
                      >
                        Learn More
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </motion.span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All CTA - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-[#029346] to-[#0C4726] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white shadow-xl overflow-hidden relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-20 h-20 sm:w-32 sm:h-32 border border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 border border-white rounded-full transform translate-x-1/2 translate-y-1/2"></div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 leading-tight">
                  Ready to Make a <span className="text-[#F79021]">Bigger Impact</span>?
                </h3>
                <p className="text-white/80 text-sm sm:text-base mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
                  Explore all our projects and discover more opportunities to support conservation and community development.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-[#029346] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto group"
                >
                  Explore All Projects
                  <motion.span
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaArrowRight className="w-4 h-4" />
                  </motion.span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}