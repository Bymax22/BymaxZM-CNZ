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
  const [isMobile, setIsMobile] = useState(false);

  const slides: Slide[] = [
    {
      image: '/images/hero-bg-1.jpg',
      video: '/videos/hero-nature.mp4',
      title: 'Protecting Zambia\'s Natural Heritage',
      subtitle: 'Join us in conserving our environment and wildlife for future generations through sustainable practices.',
      color: 'from-[#029346] to-[#0C4726]',
      accent: 'text-[#F79021]',
      icon: FaMountain,
      stats: ['50K+ Trees Planted', '100+ Protected Areas'],
      cta: {
        primary: 'Join Conservation',
        secondary: 'View Projects'
      }
    },
    {
      image: '/images/hero-bg-2.jpg',
      video: '/videos/hero-community.mp4',
      title: 'Empowering Local Communities',
      subtitle: 'Building sustainable livelihoods through environmental conservation and community-led initiatives.',
      color: 'from-[#F79021] to-[#AA5D26]',
      accent: 'text-[#029346]',
      icon: FaUsers,
      stats: ['150+ Communities', '10K+ Lives Transformed'],
      cta: {
        primary: 'Support Communities',
        secondary: 'Volunteer Today'
      }
    },
    {
      image: '/images/hero-bg-3.jpg',
      video: '/videos/hero-climate.mp4',
      title: 'Climate Action for Our Future',
      subtitle: 'Leading the charge against climate change through innovative solutions and collective environmental action.',
      color: 'from-[#0C4726] to-[#08331C]',
      accent: 'text-[#F79021]',
      icon: FaGlobeAfrica,
      stats: ['200+ Projects', '15+ Years of Impact'],
      cta: {
        primary: 'Take Action',
        secondary: 'Learn More'
      }
    }
  ];

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (slides.length === 0 || !isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsVideoLoaded(false);
    }, 8000);

    return () => clearInterval(interval);
  }, [slides.length, isPlaying]);

  if (slides.length === 0) return null;

  const currentSlideData = slides[currentSlide % slides.length]!;

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

  const handleVideoError = () => {
    setIsVideoLoaded(false);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Media */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Video Background */}
          {currentSlideData.video && (
            <motion.video
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                isVideoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              poster={currentSlideData.image}
            >
              <source src={currentSlideData.video} type="video/mp4" />
            </motion.video>
          )}
          
          {/* Image Fallback */}
          <motion.div
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              (!currentSlideData.video || !isVideoLoaded) ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${currentSlideData.image}')`,
            }}
          />
          
          {/* Enhanced Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.color} bg-opacity-70`} />
          
          {/* Subtle Animated Background Elements */}
          <div className="absolute inset-0 opacity-15">
            {[...Array(isMobile ? 8 : 12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -80, 0],
                  x: [0, Math.random() * 60 - 30, 0],
                  rotate: [0, 180, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 10 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
                className="absolute text-white/40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                <FaLeaf className="w-4 h-4 sm:w-6 sm:h-6" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Subtle Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(isMobile ? 15 : 20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -120, 0],
              x: [0, Math.random() * 60 - 30, 0],
              opacity: [0, 0.6, 0],
              scale: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content - Optimized for Mobile */}
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-4xl mx-auto"
            >
              {/* Organization Name - Simplified for Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6 sm:mb-8"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight">
                  Care for Nature
                </h1>
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className={`block text-2xl sm:text-3xl md:text-4xl font-bold ${currentSlideData.accent} drop-shadow-lg`}
                >
                  Zambia
                </motion.span>
              </motion.div>

              {/* Slide Icon - Smaller on Mobile */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 shadow-lg"
              >
                {currentSlideData.icon && (
                  <currentSlideData.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                )}
              </motion.div>

              {/* Slide Title */}
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white/95 px-2 leading-tight"
              >
                {currentSlideData.title}
              </motion.h2>

              {/* Subtitle - Shorter and Better Spaced */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 text-white/90 max-w-2xl mx-auto leading-relaxed font-light px-2"
              >
                {currentSlideData.subtitle}
              </motion.p>

              {/* Dynamic Stats - Simplified for Mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 max-w-xl mx-auto"
              >
                {currentSlideData.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-xs sm:text-sm font-medium hover:bg-white/15 transition-all duration-300"
                  >
                    {stat}
                  </motion.div>
                ))}
              </motion.div>

              {/* Impact Stats Grid - Responsive Layout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-2xl mx-auto"
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
                    transition={{ delay: 1.4 + index * 0.1 }}
                    className="text-center group p-2 sm:p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1 sm:mb-2 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                      <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 text-[#F79021]" />
                    </div>
                    <div className="text-sm sm:text-base md:text-lg font-bold text-[#F79021] mb-0.5">{stat.number}</div>
                    <div className="text-[10px] sm:text-xs opacity-90 font-medium leading-tight">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons - Stacked on Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="flex flex-col sm:flex-row gap-3 justify-center items-center px-2"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto bg-[#F79021] hover:bg-[#AA5D26] text-white font-bold px-6 py-3 sm:py-3 rounded-lg text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group min-w-[160px] sm:min-w-[180px]"
                >
                  {currentSlideData.cta.primary}
                  <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto bg-transparent border border-white text-white hover:bg-white hover:text-[#029346] font-bold px-6 py-3 sm:py-3 rounded-lg text-sm sm:text-base backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 group min-w-[160px] sm:min-w-[180px]"
                >
                  <FaPlay className="w-3 h-3 sm:w-4 sm:h-4" />
                  {currentSlideData.cta.secondary}
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls - Mobile Optimized */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 sm:gap-4">
        {/* Slide Indicators */}
        <div className="flex gap-1.5 sm:gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsVideoLoaded(false);
              }}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[#F79021] scale-125 shadow-md' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? (
            <FaPause className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
          ) : (
            <FaPlay className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
          )}
        </button>

        {/* Navigation Arrows */}
        <div className="flex gap-1.5 sm:gap-2">
          <button
            onClick={prevSlide}
            className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
            aria-label="Previous slide"
          >
            <FaArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white rotate-180" />
          </button>
          <button
            onClick={nextSlide}
            className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
            aria-label="Next slide"
          >
            <FaArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator - Only show if content continues below */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-white/60"
        >
          <span className="text-xs font-medium">Scroll to Explore</span>
          <div className="w-4 h-6 sm:w-5 sm:h-8 border border-white/40 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-0.5 h-1.5 sm:h-2 bg-white/50 rounded-full mt-1"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}