'use client';

import React, { useState, useEffect } from 'react';
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
  FaMountain,
  FaGlobeAfrica
} from 'react-icons/fa';
import Image from 'next/image';

interface Slide {
  image: string;
  video?: string;
  title: string;
  subtitle: string;
  color: string;
  accent: string;
  icon: React.ComponentType<{ className?: string }>;
  stats: string[];
  cta: {
    primary: string;
    secondary: string;
  };
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const slides: Slide[] = [
    {
      image: '/images/hero-bg-1.jpg',
      video: '/videos/hero-nature.mp4',
      title: 'Protecting Zambia\'s Natural Heritage',
      subtitle: 'Join us in conserving our environment and wildlife for future generations through sustainable practices and community engagement.',
      color: 'from-[#029346] to-[#0C4726]',
      accent: 'text-[#F79021]',
      icon: FaMountain,
      stats: ['50K+ Trees Planted', '100+ Protected Areas', '25+ Wildlife Species'],
      cta: {
        primary: 'Join Conservation',
        secondary: 'View Projects'
      }
    },
    {
      image: '/images/hero-bg-2.jpg',
      video: '/videos/hero-community.mp4',
      title: 'Empowering Local Communities',
      subtitle: 'Building sustainable livelihoods through environmental conservation, education, and community-led development initiatives.',
      color: 'from-[#F79021] to-[#AA5D26]',
      accent: 'text-[#029346]',
      icon: FaUsers,
      stats: ['150+ Communities', '10K+ Lives Transformed', '500+ Jobs Created'],
      cta: {
        primary: 'Support Communities',
        secondary: 'Volunteer Today'
      }
    },
    {
      image: '/images/hero-bg-3.jpg',
      video: '/videos/hero-climate.mp4',
      title: 'Climate Action for Our Future',
      subtitle: 'Leading the charge against climate change through innovative solutions, education programs, and collective environmental action.',
      color: 'from-[#0C4726] to-[#08331C]',
      accent: 'text-[#F79021]',
      icon: FaGlobeAfrica,
      stats: ['200+ Projects', '15+ Years of Impact', '1M+ Tons CO2 Reduced'],
      cta: {
        primary: 'Take Action',
        secondary: 'Learn More'
      }
    }
  ];

  useEffect(() => {
    if (slides.length === 0 || !isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsVideoLoaded(false);
    }, 8000);

    return () => clearInterval(interval);
  }, [slides.length, isPlaying]);

  if (slides.length === 0) return null;

  const safeIndex = currentSlide % slides.length;
  const currentSlideData = slides[safeIndex]!; // safe because slides.length > 0

  // runtime guard (shouldn't trigger because slides.length > 0)
  if (!currentSlideData) return null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsVideoLoaded(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsVideoLoaded(false);
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides with Enhanced Media */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Video Background with Fallback */}
          {currentSlideData.video && (
            <motion.video
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={handleVideoLoad}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                isVideoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <source src={currentSlideData.video} type="video/mp4" />
            </motion.video>
          )}
          
          {/* Image Fallback */}
          <motion.div
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              !currentSlideData.video || isVideoLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              backgroundImage: `url('${currentSlideData.image}')`,
            }}
          />
          
          {/* Enhanced Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.color} bg-opacity-80`} />
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 100 - 50, 0],
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                className="absolute text-white/30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                <FaLeaf className="w-8 h-8" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 80 - 40, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -60, scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-6xl mx-auto"
            >
              {/* Animated Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl"
              >
                {currentSlideData.icon && (
                  <currentSlideData.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                )}
              </motion.div>

              {/* Main Title - Responsive */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight"
              >
                <span className="block">Care for Nature</span>
                <motion.span 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className={`block ${currentSlideData.accent} drop-shadow-lg`}
                >
                  Zambia
                </motion.span>
              </motion.h1>

              {/* Slide-specific Title */}
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white/95"
              >
                {currentSlideData.title}
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-4xl mx-auto leading-relaxed font-light px-4"
              >
                {currentSlideData.subtitle}
              </motion.p>

              {/* Dynamic Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
              >
                {currentSlideData.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    className="px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-sm sm:text-base font-medium hover:bg-white/20 transition-all duration-300"
                  >
                    {stat}
                  </motion.div>
                ))}
              </motion.div>

              {/* Impact Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto px-4"
              >
                {[
                  { icon: FaTree, number: '50K+', label: 'Trees Planted' },
                  { icon: FaHandsHelping, number: '150+', label: 'Communities' },
                  { icon: FaHeart, number: '10K+', label: 'Lives Impacted' },
                  { icon: FaLeaf, number: '15+', label: 'Years Serving' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 1.8 }}
                    className="text-center group p-3 sm:p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 sm:mb-3 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#F79021]" />
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#F79021] mb-1">{stat.number}</div>
                    <div className="text-xs sm:text-sm opacity-90 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons - Responsive */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-[#F79021] hover:bg-[#AA5D26] text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group min-w-[200px]"
                >
                  {currentSlideData.cta.primary}
                  <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#029346] font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group min-w-[200px]"
                >
                  <FaPlay className="w-4 h-4" />
                  {currentSlideData.cta.secondary}
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Enhanced Navigation Controls */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 sm:gap-6">
        {/* Slide Indicators */}
        <div className="flex gap-2 sm:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsVideoLoaded(false);
              }}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[#F79021] scale-125 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          {isPlaying ? (
            <FaPause className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          ) : (
            <FaPlay className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          )}
        </button>

        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white rotate-180" />
          </button>
          <button
            onClick={nextSlide}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/70"
        >
          <span className="text-xs sm:text-sm font-medium">Scroll to Explore</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 sm:h-3 bg-white/50 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}