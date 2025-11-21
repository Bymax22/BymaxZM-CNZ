'use client';

import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaArrowRight,
  FaRegNewspaper,
  FaTree,
  FaUsers,
  FaHeart,
  FaShare,
  FaBookOpen,
  FaEnvelope
} from 'react-icons/fa';

const news = [
  {
    id: 1,
    title: 'Mass Tree Planting Campaign Reaches 10,000 Seedlings',
    excerpt: 'Our community-led reforestation initiative successfully planted 10,000 indigenous trees in the Luapula Province, engaging over 500 local volunteers in sustainable ecosystem restoration.',
    image: '/news/tree-planting.jpg',
    category: 'Conservation',
    date: '2024-01-15',
    author: 'Sarah Chibwe',
    readTime: '3 min read',
    icon: FaTree,
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-green-100',
    tags: ['Reforestation', 'Community', 'Ecosystem']
  },
  {
    id: 2,
    title: 'New Partnership with Zambia Wildlife Authority',
    excerpt: 'CNZ signs memorandum of understanding with ZAWA to enhance wildlife conservation and community anti-poaching efforts across national parks.',
    image: '/news/partnership.jpg',
    category: 'Partnership',
    date: '2024-01-12',
    author: 'David Mwansa',
    readTime: '4 min read',
    icon: FaUsers,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-gradient-to-br from-amber-50 to-orange-100',
    tags: ['Partnership', 'Wildlife', 'Collaboration']
  },
  {
    id: 3,
    title: 'Children Environmental Leadership Program Launched',
    excerpt: 'Empowering young Zambians with conservation skills and leadership training across 10 secondary schools in Copperbelt Province.',
    image: '/news/children-program.jpg',
    category: 'Education',
    date: '2024-01-08',
    author: 'Grace Banda',
    readTime: '5 min read',
    icon: FaRegNewspaper,
    color: 'from-green-600 to-emerald-700',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
    tags: ['Education', 'Youth', 'Leadership']
  }
];

export function LatestNews() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-amber-50/20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-200/10 rounded-full blur-3xl"></div>
        
        {/* Floating Icons */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 text-emerald-300/40"
        >
          <FaBookOpen className="w-16 h-16" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-32 left-20 text-amber-300/40"
        >
          <FaRegNewspaper className="w-12 h-12" />
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
              <FaRegNewspaper className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover inspiring updates, success stories, and breaking news from our conservation efforts and community initiatives across Zambia.
            </p>
          </motion.div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {news.map((item, index) => (
              <motion.article
                key={item.id}
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
                <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 overflow-hidden border border-white/50 backdrop-blur-sm h-full flex flex-col">
                  
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url('${item.image}')`,
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${item.color} bg-opacity-40`} />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <div className={`px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-sm text-gray-800 font-semibold text-sm shadow-lg flex items-center gap-2`}>
                        <item.icon className="w-3 h-3" />
                        {item.category}
                      </div>
                    </div>

                    {/* Hover Action Buttons */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="flex gap-2">
                        <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                          <FaHeart className="w-3 h-3 text-gray-600" />
                        </button>
                        <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                          <FaShare className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="w-3 h-3" />
                          {new Date(item.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
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
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300 line-clamp-2 leading-tight">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 flex-1">
                      {item.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
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
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <button className="w-full flex items-center justify-between group/btn text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-300">
                        <span>Read Full Story</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="flex items-center gap-2"
                        >
                          <FaArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </motion.span>
                      </button>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${item.color} bg-clip-padding opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}>
                    <div className="w-full h-full bg-white rounded-3xl" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* View All News */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 mx-auto group"
            >
              Explore All Articles
              <motion.span
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-12 text-white shadow-2xl overflow-hidden relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 border-2 border-white rounded-full transform translate-x-1/2 translate-y-1/2"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                >
                  <FaEnvelope className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Stay <span className="text-amber-200">Informed</span>, Make a <span className="text-amber-200">Difference</span>
                </h3>
                <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join our community of conservation champions. Receive monthly updates, success stories, and opportunities to get involved in protecting Zambia&apos;s natural heritage.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 rounded-2xl border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center"
                  >
                    <FaEnvelope className="w-4 h-4" />
                    Subscribe
                  </motion.button>
                </div>
                
                <p className="text-emerald-100/70 text-sm mt-4">
                  No spam, just impactful stories. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}