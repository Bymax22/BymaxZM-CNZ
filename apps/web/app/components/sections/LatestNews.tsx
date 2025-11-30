'use client';

import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaArrowRight,
  FaRegNewspaper,
  FaTree,
  FaUsers,
  FaEnvelope
} from 'react-icons/fa';
import Image from 'next/image';

const news = [
  {
    id: 1,
    title: 'Mass Tree Planting Reaches 10,000 Seedlings',
    excerpt: 'Community-led reforestation planted 10,000 indigenous trees in Luapula Province with 500 local volunteers.',
    image: '/images/news/tree-planting.jpg',
    category: 'Conservation',
    date: '2024-01-15',
    author: 'Sarah Chibwe',
    readTime: '3 min',
    icon: FaTree,
    color: 'from-[#029346] to-[#0C4726]',
    bgColor: 'bg-gradient-to-br from-[#029346]/10 to-[#0C4726]/10',
    tags: ['Reforestation', 'Community']
  },
  {
    id: 2,
    title: 'New Partnership with Zambia Wildlife Authority',
    excerpt: 'CNZ signs MOU with ZAWA to enhance wildlife conservation and anti-poaching efforts.',
    image: '/images/news/partnership.jpg',
    category: 'Partnership',
    date: '2024-01-12',
    author: 'David Mwansa',
    readTime: '4 min',
    icon: FaUsers,
    color: 'from-[#F79021] to-[#AA5D26]',
    bgColor: 'bg-gradient-to-br from-[#F79021]/10 to-[#AA5D26]/10',
    tags: ['Partnership', 'Wildlife']
  },
  {
    id: 3,
    title: 'Children Environmental Program Launched',
    excerpt: 'Empowering young Zambians with conservation skills across 10 schools in Copperbelt Province.',
    image: '/images/news/children-program.jpg',
    category: 'Education',
    date: '2024-01-08',
    author: 'Grace Banda',
    readTime: '5 min',
    icon: FaRegNewspaper,
    color: 'from-[#029346] to-[#0C4726]',
    bgColor: 'bg-gradient-to-br from-[#029346]/10 to-[#0C4726]/10',
    tags: ['Education', 'Youth']
  }
];

export function LatestNews() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white to-[#F0F9F4]">
      {/* Background Elements - Simplified */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#029346]/10 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-[#F79021]/10 rounded-full blur-2xl sm:blur-3xl"></div>
      </div>

      <div className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-[#029346] to-[#0C4726] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg"
            >
              <FaRegNewspaper className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#029346] to-[#0C4726]">News</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
              Stay updated with our conservation efforts and community initiatives across Zambia.
            </p>
          </motion.div>

          {/* News Grid - Mobile First */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
            {news.map((item, index) => (
              <motion.article
                key={item.id}
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
                <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 overflow-hidden border border-gray-100 h-full flex flex-col">
                  
                  {/* Image Container */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${item.color} bg-opacity-30`} />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <div className={`px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm text-gray-800 font-semibold text-xs sm:text-sm shadow-md flex items-center gap-1.5`}>
                        <item.icon className="w-3 h-3" />
                        {item.category}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="w-3 h-3" />
                          {new Date(item.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <FaUser className="w-3 h-3" />
                          {item.author}
                        </div>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{item.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-gray-900 transition-colors duration-300 line-clamp-2 leading-tight">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed line-clamp-2 flex-1">
                      {item.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4">
                      {item.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full border border-gray-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More */}
                    <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-100">
                      <button className="w-full flex items-center justify-between group/btn text-[#029346] font-semibold hover:text-[#0C4726] transition-colors duration-300 text-sm sm:text-base">
                        <span>Read Story</span>
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="flex items-center gap-1"
                        >
                          <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-1" />
                        </motion.span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* View All News */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-[#029346] to-[#0C4726] text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 sm:gap-3 mx-auto group"
            >
              View All Articles
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Newsletter Signup - Simplified */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-[#029346] to-[#0C4726] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white shadow-xl overflow-hidden">
              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm"
                >
                  <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>
                
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 leading-tight">
                  Stay <span className="text-[#F79021]">Informed</span>
                </h3>
                <p className="text-white/80 text-sm sm:text-base mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
                  Get monthly updates and opportunities to protect Zambia's natural heritage.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 sm:px-6 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm text-sm sm:text-base"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#F79021] hover:bg-[#AA5D26] text-white font-semibold px-6 sm:px-8 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 justify-center text-sm sm:text-base"
                  >
                    <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4" />
                    Subscribe
                  </motion.button>
                </div>
                
                <p className="text-white/70 text-xs sm:text-sm mt-3 sm:mt-4">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}