'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLeaf, 
  FaHandsHelping, 
  FaTree, 
  FaHeart,
  FaArrowRight,
  FaPlay,
  FaPause,
  FaSeedling,
  FaUsers,
  FaMountain
} from 'react-icons/fa';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  color: string;
  accent: string;
  icon: React.ComponentType<{ className?: string }>;
  stats: string[];
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides: Slide[] = [
    {
      image: '/slide1.jpg',
      title: 'Protecting Zambia\'s Natural Heritage',
      subtitle: 'Join us in conserving our environment and wildlife for future generations through sustainable practices',
      color: 'from-emerald-600 to-green-800',
      accent: 'text-amber-400',
      icon: FaMountain,
      stats: ['50K+ Trees Planted', '10 Protected Areas']
    },
    {
      image: '/slide2.jpg',
      title: 'Empowering Local Communities',
      subtitle: 'Building sustainable livelihoods through environmental conservation and community-led initiatives',
      color: 'from-amber-600 to-orange-700',
      accent: 'text-emerald-400',
      icon: FaUsers,
      stats: ['100+ Communities', '5K+ Lives Transformed']
    },
    {
      image: '/slide3.jpg',
      title: 'Climate Action for Our Future',
      subtitle: 'Leading the charge against climate change through education, innovation, and collective action',
      color: 'from-green-700 to-emerald-900',
      accent: 'text-amber-300',
      icon: FaSeedling,
      stats: ['15+ Years of Impact', '200+ Projects']
    }
  ];

  React.useEffect(() => {
    if (slides.length === 0 || !isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length, isPlaying]);

  if (slides.length === 0) return null;

  const safeIndex = currentSlide % slides.length;
  const currentSlideData = slides[safeIndex]!;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides with Smooth Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image with Parallax Effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
            style={{
              backgroundImage: `url('${currentSlideData.image}')`,
            }}
          />
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${currentSlideData.color} bg-opacity-85`} />
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-white rounded-full animate-pulse delay-2000"></div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
        <div className="container-custom px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-6xl mx-auto"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 mx-auto mb-8 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl"
              >
                {currentSlideData.icon && (
                  <currentSlideData.icon className="w-12 h-12 text-white" />
                )}
              </motion.div>

              {/* Main Title */}
              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                <span className="block">Care for Nature</span>
                <motion.span 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`block ${currentSlideData.accent} drop-shadow-lg`}
                >
                  Zambia
                </motion.span>
              </h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed font-light"
              >
                {currentSlideData.subtitle}
              </motion.p>

              {/* Dynamic Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap justify-center gap-6 mb-8 max-w-2xl mx-auto"
              >
                {currentSlideData.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-sm font-medium"
                  >
                    {stat}
                  </div>
                ))}
              </motion.div>

              {/* Impact Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-4xl mx-auto"
              >
                {[
                  { icon: FaTree, number: '50K+', label: 'Trees Planted' },
                  { icon: FaHandsHelping, number: '100+', label: 'Communities' },
                  { icon: FaHeart, number: '10K+', label: 'Lives Impacted' },
                  { icon: FaLeaf, number: '15+', label: 'Years Serving' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 1.2 }}
                    className="text-center group"
                  >
                    <div className="w-16 h-16 mx-auto mb-3 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                      <stat.icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="text-2xl font-bold text-amber-400 mb-1">{stat.number}</div>
                    <div className="text-sm opacity-90 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-10 py-5 rounded-2xl text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 group"
                >
                  Join Our Mission
                  <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-bold px-10 py-5 rounded-2xl text-lg backdrop-blur-sm transition-all duration-300 flex items-center gap-3 group"
                >
                  <FaPlay className="w-4 h-4" />
                  Watch Our Story
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6">
        {/* Slide Indicators */}
        <div className="flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-amber-400 scale-125 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          {isPlaying ? (
            <FaPause className="w-4 h-4 text-white" />
          ) : (
            <FaPlay className="w-4 h-4 text-white" />
          )}
        </button>

        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <FaArrowRight className="w-4 h-4 text-white rotate-180" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <FaArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/70"
        >
          <span className="text-sm font-medium">Scroll to Explore</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}