'use client';

import { motion } from 'framer-motion';
import { 
  FaHandshake, 
  FaUniversity, 
  FaGlobeAfrica,
  FaSchool,
  FaIndustry,
  FaSeedling,
  FaArrowRight,
  FaPlus,
  FaRocket,
  FaHeart
} from 'react-icons/fa';

interface Partner {
  name: string;
  logo: string;
  type: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  since: string;
  focus: string[];
}

const partners: Partner[] = [
  {
    name: 'Ministry of Green Economy',
    logo: '/partners/ministry-green-economy.png',
    type: 'Government',
    description: 'Strategic partnership for national conservation policies and sustainable development frameworks',
    icon: FaGlobeAfrica,
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-green-100',
    since: '2018',
    focus: ['Policy', 'Conservation', 'Sustainability']
  },
  {
    name: 'Save The Children Zambia',
    logo: '/partners/save-children.png',
    type: 'NGO',
    description: 'Collaborating on child-focused environmental education and community resilience programs',
    icon: FaUniversity,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-gradient-to-br from-amber-50 to-orange-100',
    since: '2020',
    focus: ['Education', 'Children', 'Community']
  },
  {
    name: 'Zambia Wildlife Authority',
    logo: '/partners/zawa.png',
    type: 'Conservation',
    description: 'Joint wildlife protection initiatives and anti-poaching operations across national parks',
    icon: FaSeedling,
    color: 'from-green-600 to-emerald-700',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
    since: '2015',
    focus: ['Wildlife', 'Protection', 'Anti-poaching']
  },
  {
    name: 'Keepers Zambia Foundation',
    logo: '/partners/keepers-foundation.png',
    type: 'Foundation',
    description: 'Renewable energy projects and sustainable technology implementation in rural communities',
    icon: FaIndustry,
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-gradient-to-br from-orange-50 to-amber-100',
    since: '2019',
    focus: ['Energy', 'Technology', 'Innovation']
  },
  {
    name: 'Local Community Schools',
    logo: '/partners/community-schools.png',
    type: 'Education',
    description: 'Environmental curriculum development and youth empowerment programs across Zambia',
    icon: FaSchool,
    color: 'from-teal-500 to-green-600',
    bgColor: 'bg-gradient-to-br from-teal-50 to-green-100',
    since: '2016',
    focus: ['Youth', 'Education', 'Empowerment']
  },
  {
    name: 'International Conservation Fund',
    logo: '/partners/international-fund.png',
    type: 'International',
    description: 'Global partnership driving climate action and biodiversity conservation initiatives',
    icon: FaHandshake,
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-gradient-to-br from-rose-50 to-pink-100',
    since: '2017',
    focus: ['Climate', 'Biodiversity', 'Global']
  }
];

export function Partners() {
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
          <FaHandshake className="w-16 h-16" />
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
              <FaRocket className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">Alliance</span> for Change
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Together with government, private sector, and community partners, we&apos;re creating lasting environmental impact across Zambia through strategic collaborations.
            </p>
          </motion.div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {partners.map((partner, index) => (
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
                <div className={`relative p-8 rounded-3xl ${partner.bgColor} border border-white/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full flex flex-col overflow-hidden`}>
                  
                  {/* Animated Background Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${partner.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Partner Logo */}
                  <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-2xl bg-white flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 overflow-hidden border border-gray-100">
                    <div 
                      className="w-16 h-16 bg-contain bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url('${partner.logo}')`,
                      }}
                    />
                  </div>

                  {/* Partner Icon & Type */}
                  <div className="relative z-10 flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${partner.color} flex items-center justify-center text-white shadow-lg`}>
                      {partner.icon && <partner.icon className="w-5 h-5" />}
                    </div>
                    
                    {/* Partnership Duration */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 + 0.3 }}
                      className="text-xs font-semibold px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 border border-white/50"
                    >
                      Since {partner.since}
                    </motion.div>
                  </div>

                  {/* Partner Info */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300 leading-tight">
                      {partner.name}
                    </h3>
                    
                    <div className="badge badge-primary mb-4 self-start">
                      {partner.type}
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed text-sm flex-1">
                      {partner.description}
                    </p>

                    {/* Focus Areas */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {partner.focus.map((area, areaIndex) => (
                        <span 
                          key={areaIndex}
                          className="px-2 py-1 bg-white/50 backdrop-blur-sm text-gray-700 text-xs rounded-full border border-white/50 font-medium"
                        >
                          {area}
                        </span>
                      ))}
                    </div>

                    {/* Learn More Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 px-4 rounded-2xl font-semibold text-white bg-gradient-to-r ${partner.color} shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn`}
                    >
                      <span>View Partnership</span>
                      <motion.span
                        initial={{ x: -5 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <FaArrowRight className="w-3 h-3" />
                      </motion.span>
                    </motion.button>
                  </div>

                  {/* Corner Accent */}
                  <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${partner.color} rounded-bl-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                </div>

                {/* Connection Line (for visual flow) */}
                {index < partners.length - 1 && (
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

          {/* Partnership CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
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
                  transition={{ delay: 0.8, type: "spring" }}
                  className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                >
                  <FaPlus className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Join Our <span className="text-amber-200">Growing Network</span>
                </h3>
                <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Become part of our collaborative ecosystem and help drive meaningful environmental change through strategic partnerships.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 group"
                  >
                    Explore Partnership Opportunities
                    <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 group"
                  >
                    <FaHandshake className="w-4 h-4" />
                    Contact Our Team
                  </motion.button>
                </div>

                {/* Partnership Stats */}
                <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
                  {[
                    { value: '50+', label: 'Active Partnerships' },
                    { value: '10', label: 'Years Collaborating' },
                    { value: '15M+', label: 'Lives Impacted' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-3xl font-bold text-amber-200 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-emerald-100 text-sm">
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