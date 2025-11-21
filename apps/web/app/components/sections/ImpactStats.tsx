'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  FaTree, 
  FaUsers, 
  FaSchool, 
  FaHandHoldingHeart,
  FaRecycle,
  FaSun
} from 'react-icons/fa';
import CountUp from 'react-countup';

const stats = [
  {
    icon: FaTree,
    end: 50000,
    suffix: '+',
    label: 'Trees Planted',
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-green-100',
    delay: 0.1
  },
  {
    icon: FaUsers,
    end: 100,
    suffix: '+',
    label: 'Communities Reached',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-gradient-to-br from-amber-50 to-orange-100',
    delay: 0.2
  },
  {
    icon: FaSchool,
    end: 5000,
    suffix: '+',
    label: 'Children Educated',
    color: 'from-brown-500 to-amber-800',
    bgColor: 'bg-gradient-to-br from-amber-50 to-brown-100',
    delay: 0.3
  },
  {
    icon: FaHandHoldingHeart,
    end: 10000,
    suffix: '+',
    label: 'Lives Impacted',
    color: 'from-green-700 to-emerald-900',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
    delay: 0.4
  },
  {
    icon: FaRecycle,
    end: 200,
    suffix: '+',
    label: 'Conservation Projects',
    color: 'from-teal-500 to-green-700',
    bgColor: 'bg-gradient-to-br from-teal-50 to-green-100',
    delay: 0.5
  },
  {
    icon: FaSun,
    end: 15000,
    suffix: '+',
    label: 'Solar Lights Installed',
    color: 'from-yellow-500 to-amber-600',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-amber-100',
    delay: 0.6
  }
];

export function ImpactStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-200/10 rounded-full blur-3xl"></div>
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
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center"
            >
              <FaHandHoldingHeart className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Creating <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">Lasting Change</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Through sustainable initiatives and community partnerships, we&apos;re building a greener, brighter future for Zambia—one project at a time.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: stat.delay,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Card */}
                <div className={`relative p-8 rounded-3xl ${stat.bgColor} border border-white/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 overflow-hidden`}>
                  
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className={`relative z-10 w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Counter */}
                  <div className={`relative z-10 text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-br ${stat.color} text-transparent bg-clip-text`}>
                    {isInView && (
                      <CountUp
                        end={stat.end}
                        suffix={stat.suffix}
                        duration={2.5}
                        separator=","
                      />
                    )}
                  </div>

                  {/* Label */}
                  <div className="relative z-10 text-gray-700 font-semibold text-lg">
                    {stat.label}
                  </div>

                  {/* Progress Bar */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2, delay: stat.delay + 0.5 }}
                    viewport={{ once: true }}
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color} rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Impact Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { label: "Provinces", value: "10", color: "text-emerald-600" },
                { label: "Years Active", value: "8", color: "text-amber-600" },
                { label: "Team Members", value: "50+", color: "text-green-600" },
                { label: "Partner NGOs", value: "25+", color: "text-brown-600" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg"
                >
                  <div className={`text-3xl font-bold ${item.color} mb-2`}>
                    {item.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Interactive Map Section */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-8 text-white shadow-2xl">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">Nationwide Impact</h3>
                <p className="text-emerald-100 text-lg">
                  Our reach extends across all 10 provinces of Zambia
                </p>
              </div>
              
              {/* Simplified Interactive Map */}
              <div className="relative h-64 bg-emerald-400/20 rounded-2xl border-2 border-white/20 backdrop-blur-sm overflow-hidden">
                {/* Map Background */}
                <div className="absolute inset-0 bg-emerald-300/10"></div>
                
                {/* Animated Impact Dots */}
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: 1 + i * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="absolute w-4 h-4 bg-yellow-400 rounded-full shadow-lg"
                    style={{
                      left: `${10 + (i % 5) * 20}%`,
                      top: `${15 + Math.floor(i / 5) * 25}%`,
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      className="w-full h-full bg-yellow-400 rounded-full"
                    />
                  </motion.div>
                ))}
                
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full">
                  {[...Array(8)].map((_, i) => (
                    <motion.line
                      key={i}
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 1.5 + i * 0.1 }}
                      x1="50%"
                      y1="50%"
                      x2={`${30 + (i % 4) * 15}%`}
                      y2={`${20 + Math.floor(i / 4) * 30}%`}
                      stroke="white"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="opacity-40"
                    />
                  ))}
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}