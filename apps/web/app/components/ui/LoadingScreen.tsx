'use client';

import { motion } from 'framer-motion';
import { FaLeaf, FaSeedling, FaTree, FaHeart } from 'react-icons/fa';

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gradient-to-br from-emerald-600 via-green-700 to-emerald-800 flex items-center justify-center z-50"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Leaves */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              y: '100vh',
              x: Math.random() * 100 - 50,
              rotate: Math.random() * 360,
              opacity: 0
            }}
            animate={{ 
              y: '-100vh',
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
            className="absolute text-white/20"
            style={{
              left: `${Math.random() * 100}%`,
            }}
          >
            <FaLeaf className="w-8 h-8" />
          </motion.div>
        ))}

        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1.5, 1, 1.5],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-2xl"
        />
      </div>

      {/* Main Content */}
      <div className="text-center text-white relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100
          }}
          className="relative mb-8"
        >
          {/* Animated Logo Container */}
          <div className="relative w-32 h-32 mx-auto">
            {/* Outer Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-white/20 rounded-full"
            />
            
            {/* Middle Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-3 border-4 border-white/40 rounded-full"
            />
            
            {/* Inner Icon */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl"
            >
              <FaTree className="w-12 h-12 text-white" />
            </motion.div>

            {/* Floating Icons */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg"
            >
              <FaSeedling className="w-4 h-4 text-white" />
            </motion.div>
            
            <motion.div
              animate={{ 
                rotate: -360,
                scale: [1.2, 1, 1.2]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-2 -left-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-lg"
            >
              <FaHeart className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h2
            animate={{ 
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-white to-amber-400 bg-[length:200%_auto] bg-clip-text text-transparent"
          >
            Care for Nature Zambia
          </motion.h2>
          
          <motion.p
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xl text-white/90 mb-8 font-light"
          >
            Preparing our conservation journey...
          </motion.p>
        </motion.div>

        {/* Animated Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-md mx-auto"
        >
          {/* Progress Bar */}
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full relative"
            >
              {/* Shine Effect */}
              <motion.div
                animate={{ x: ['0%', '100%'] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
            </motion.div>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="w-2 h-2 bg-amber-400 rounded-full"
              />
            ))}
          </div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-3 gap-4 mt-8 text-white/70 text-sm"
          >
            {[
              { value: '50K+', label: 'Trees' },
              { value: '100+', label: 'Communities' },
              { value: '15+', label: 'Years' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="font-bold text-amber-300">{stat.value}</div>
                <div>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/40 text-sm"
      >
        Protecting Zambia&apos;s Natural Heritage
      </motion.div>
    </motion.div>
  );
}