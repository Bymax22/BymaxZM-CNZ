'use client';

import { motion } from 'framer-motion';
import { 
  FaTree, 
  FaSolarPanel, 
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
    description: 'Empowering young environmental champions through school-based conservation clubs and eco-education programs that inspire the next generation of planet protectors.',
    icon: FaGraduationCap,
    image: '/green-schools.jpg',
    progress: 85,
    donors: 234,
    goal: 50000,
    raised: 42500,
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-green-100',
    impact: '50+ Schools',
    duration: '12 Months'
  },
  {
    id: 2,
    title: 'Community Reforestation',
    description: 'Planting indigenous trees and promoting sustainable forest management practices that restore ecosystems while supporting rural community livelihoods.',
    icon: FaTree,
    image: '/reforestation.jpg',
    progress: 70,
    donors: 156,
    goal: 75000,
    raised: 52500,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-gradient-to-br from-amber-50 to-orange-100',
    impact: '10,000+ Trees',
    duration: '18 Months'
  },
  {
    id: 3,
    title: 'Children\'s Rights & Education',
    description: 'Creating safe spaces for children to learn about their rights while engaging in environmental conservation activities that build leadership skills.',
    icon: FaSolarPanel,
    image: '/children.jpg',
    progress: 60,
    donors: 189,
    goal: 100000,
    raised: 60000,
    color: 'from-green-600 to-emerald-700',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
    impact: '2,000 Children',
    duration: '24 Months'
  },
  {
    id: 4,
    title: 'Women in Conservation',
    description: 'Empowering women through conservation enterprise training, creating sustainable income sources while protecting natural resources.',
    icon: FaHandsHelping,
    image: '/women-conservation.jpg',
    progress: 90,
    donors: 312,
    goal: 40000,
    raised: 36000,
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-gradient-to-br from-rose-50 to-pink-100',
    impact: '150 Women',
    duration: '15 Months'
  }
];

export function FeaturedProjects() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-200/10 rounded-full blur-3xl"></div>
        
        {/* Floating Icons */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 text-emerald-300/40"
        >
          <FaSeedling className="w-16 h-16" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-32 right-20 text-amber-300/40"
        >
          <FaHeart className="w-12 h-12" />
        </motion.div>
      </div>

      <div className="relative section-padding">
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl"
            >
              <FaChartLine className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Transforming <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">Communities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our flagship initiatives that combine environmental conservation with community development, creating sustainable impact across Zambia.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Main Card */}
                <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 overflow-hidden border border-white/50 backdrop-blur-sm">
                  
                  {/* Project Image with Overlay */}
                  <div className="relative h-56 overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url('${project.image}')`,
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} bg-opacity-40`} />
                    
                    {/* Project Badge */}
                    <div className="absolute top-4 left-4">
                      <div className={`px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-sm text-gray-800 font-semibold text-sm shadow-lg`}>
                        {project.impact}
                      </div>
                    </div>

                    {/* Progress Section */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-between text-white text-sm mb-2 font-semibold">
                        <span className="flex items-center gap-1">
                          <FaUsers className="w-3 h-3" />
                          {project.donors} Supporters
                        </span>
                        <span>{project.progress}% Funded</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${project.progress}%` }}
                          transition={{ duration: 1.5, delay: index * 0.15 + 0.3 }}
                          className={`h-3 rounded-full bg-gradient-to-r ${project.color} shadow-lg`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${project.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                          <project.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <span>⏱️ {project.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Funding Progress */}
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-medium">Progress</span>
                        <span className="font-bold text-gray-800">
                          ZMW {project.raised.toLocaleString()} / {project.goal.toLocaleString()}
                        </span>
                      </div>
                      
                      {/* Impact Stats */}
                      <div className="flex gap-4 text-center">
                        <div className="flex-1 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                          <div className="text-2xl font-bold text-emerald-600">{project.progress}%</div>
                          <div className="text-xs text-gray-500">Completed</div>
                        </div>
                        <div className="flex-1 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                          <div className="text-2xl font-bold text-amber-600">{project.donors}</div>
                          <div className="text-xs text-gray-500">Supporters</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 py-4 px-6 rounded-2xl font-semibold text-white bg-gradient-to-r ${project.color} shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2`}
                      >
                        <FaHeart className="w-4 h-4" />
                        Support Project
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600 font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
                      >
                        Learn More
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <FaArrowRight className="w-4 h-4" />
                        </motion.span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${project.color} bg-clip-padding opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}>
                    <div className="w-full h-full bg-white rounded-3xl" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-12 text-white shadow-2xl overflow-hidden relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 border-2 border-white rounded-full transform translate-x-1/2 translate-y-1/2"></div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Make a <span className="text-amber-200">Bigger Impact</span>?
                </h3>
                <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                  Explore all our projects and discover more opportunities to support conservation and community development across Zambia.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-emerald-600 px-12 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 mx-auto group"
                >
                  Explore All Projects
                  <motion.span
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaArrowRight className="w-5 h-5" />
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