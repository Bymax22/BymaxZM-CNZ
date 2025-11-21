'use client';

import { motion } from 'framer-motion';
import { 
  FaQuoteLeft, 
  FaQuoteRight,
  FaStar,
  FaLeaf,
  FaHandsHelping,
 
} from 'react-icons/fa';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating: number;
  project: string;
  location: string;
  color: string;
  bgColor: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Chipo Mwansa',
    role: 'Community Volunteer',
    quote: 'Joining CNZ transformed my perspective on conservation. I am proud to help protect our forests and teach children about environmental stewardship. The impact we are making in our community is truly inspiring.',
    avatar: '/avatars/chipo-mwansa.jpg',
    rating: 5,
    project: 'Green Schools Initiative',
    location: 'Lusaka Province',
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-green-100'
  },
  {
    name: 'John Phiri',
    role: 'School Teacher',
    quote: 'The education programs have ignited a passion for nature in my students. They are now environmental leaders in our school, organizing tree planting and recycling projects that benefit our entire community.',
    avatar: '/avatars/john-phiri.jpg',
    rating: 5,
    project: 'Youth Conservation Program',
    location: 'Copperbelt Province',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-gradient-to-br from-amber-50 to-orange-100'
  },
  {
    name: 'Grace Banda',
    role: 'Project Manager',
    quote: 'Working with CNZ has empowered our community in ways I never imagined. We have seen real change in our environment and livelihoods through sustainable practices and conservation efforts.',
    avatar: '/avatars/grace-banda.jpg',
    rating: 5,
    project: 'Women in Conservation',
    location: 'Eastern Province',
    color: 'from-green-600 to-emerald-700',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100'
  }
];

export function Testimonials() {
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
          <FaQuoteLeft className="w-16 h-16" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-32 left-20 text-amber-300/40"
        >
          <FaHandsHelping className="w-12 h-12" />
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
              className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-2xl"
            >
              <FaQuoteLeft className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Voices of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Impact</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hear inspiring stories from volunteers, educators, and community leaders who are creating lasting change with Care for Nature Zambia.
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
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
                <div className={`relative p-8 rounded-3xl ${testimonial.bgColor} border border-white/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full flex flex-col overflow-hidden`}>
                  
                  {/* Animated Background Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Quote Icon */}
                  <div className="relative z-10 flex justify-between items-start mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.15 + 0.2 }}
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white shadow-lg`}
                    >
                      <FaQuoteLeft className="w-4 h-4" />
                    </motion.div>
                    
                    {/* Rating */}
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.15 + i * 0.1 }}
                        >
                          <FaStar className="w-4 h-4 text-amber-400 fill-current" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Quote Text */}
                  <div className="relative z-10 flex-1 mb-6">
                    <p className="text-gray-700 leading-relaxed text-lg italic font-light">
                      &apos;{testimonial.quote}&apos;
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="relative z-10 flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden border-2 border-white shadow-lg">
                        <div 
                          className="w-14 h-14 bg-cover bg-center rounded-xl"
                          style={{
                            backgroundImage: `url('${testimonial.avatar}')`,
                          }}
                        />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center border-2 border-white`}>
                        <FaLeaf className="w-2 h-2 text-white" />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-1">
                        {testimonial.role}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-1 bg-white/50 rounded-full text-gray-700 border border-white/50">
                          {testimonial.project}
                        </span>
                        <span className="px-2 py-1 bg-white/50 rounded-full text-gray-700 border border-white/50">
                          {testimonial.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Quote Icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.15 + 0.5 }}
                    className="absolute bottom-4 right-4 opacity-20"
                  >
                    <FaQuoteRight className="w-8 h-8 text-gray-400" />
                  </motion.div>

                  {/* Corner Accent */}
                  <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${testimonial.color} rounded-bl-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                </div>

                {/* Connection Line (for visual flow) */}
                {index < testimonials.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
                    className="hidden lg:block absolute top-1/2 right-0 w-8 h-0.5 bg-gradient-to-r from-amber-200 to-emerald-200 transform translate-x-full -translate-y-1/2 z-0"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Testimonial Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-12 text-white shadow-2xl overflow-hidden relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 border-2 border-white rounded-full transform translate-x-1/2 translate-y-1/2"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Trusted by <span className="text-amber-200">Thousands</span>
                </h3>
                <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join the growing community of individuals and organizations who trust CNZ to deliver meaningful environmental impact.
                </p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { value: '5,000+', label: 'Volunteers', icon: '👥' },
                    { value: '98%', label: 'Satisfaction', icon: '⭐' },
                    { value: '100+', label: 'Communities', icon: '🏘️' },
                    { value: '15+', label: 'Years Trusted', icon: '⏳' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div className="text-3xl font-bold text-amber-200 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-amber-100 text-sm font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}