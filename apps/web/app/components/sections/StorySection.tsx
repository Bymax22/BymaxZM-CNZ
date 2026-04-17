'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaIndustry, FaHeart } from 'react-icons/fa';
import { MdOutlinePeople } from 'react-icons/md';
import { Caveat } from 'next/font/google';

const caveat = Caveat({ subsets: ['latin'], weight: '400' });

const sections = [
  {
    id: 0,
    title: 'A NATIONAL CHALLENGE',
    text: "Zambia's natural resources are under pressure from climate change and unsustainable practices. Deforestation, mining impacts, and water scarcity threaten our communities and future generations.",
    icon: FaIndustry,
  },
  {
    id: 1,
    title: 'WE EMPOWER COMMUNITIES',
    text: 'We work with vulnerable communities, especially women, youth, and children, to promote sustainable livelihoods and defend their rights to natural resources.',
    icon: MdOutlinePeople,
  },
  {
    id: 2,
    title: 'DRIVING REAL IMPACT',
    text: 'Through partnerships with global and local organizations, we protect ecosystems, advocate for children’s rights, and build climate resilience across Zambia.',
    icon: FaHeart,
  },
];

// Handwriting component with realistic letter-by-letter animation and pen cursor
const HandwritingText = ({ text, onComplete }: { text: string; onComplete: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [penPosition, setPenPosition] = useState({ x: 0, y: 0 });
  const textRef = useRef<HTMLParagraphElement>(null);
  const penRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        // Add next character
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
        
        // Update pen position based on text metrics
        if (textRef.current && penRef.current) {
          const range = document.createRange();
          const selection = window.getSelection();
          if (textRef.current.firstChild) {
            range.setStart(textRef.current.firstChild, currentIndex);
            range.setEnd(textRef.current.firstChild, currentIndex + 1);
            const rect = range.getBoundingClientRect();
            const containerRect = textRef.current.parentElement?.getBoundingClientRect();
            if (containerRect) {
              setPenPosition({
                x: rect.right - containerRect.left,
                y: rect.bottom - containerRect.top - 4,
              });
            }
          }
        }
      }, 60 + Math.random() * 40); // Random timing for realistic effect
      return () => clearTimeout(timer);
    } else {
      // Animation complete
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(completeTimer);
    }
  }, [currentIndex, text, onComplete]);

  return (
    <div className="relative mt-4">
      <p
        ref={textRef}
        className={`text-white/80 leading-relaxed text-xl md:text-2xl ${caveat.className}`}
        style={{ minHeight: '120px' }}
      >
        {displayedText}
        {currentIndex < text.length && (
          <span className="animate-pulse inline-block w-0.5 h-6 bg-orange-400 ml-0.5 align-middle" />
        )}
      </p>
      {/* Pen cursor that follows writing */}
      {currentIndex < text.length && (
        <motion.div
          ref={penRef}
          className="absolute pointer-events-none"
          animate={{
            x: penPosition.x,
            y: penPosition.y,
          }}
          transition={{ type: 'tween', duration: 0.05 }}
          style={{
            left: 0,
            top: 0,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-orange-400 drop-shadow-lg"
            style={{ transform: 'rotate(-45deg)' }}
          >
            <path
              d="M17 3L21 7L7 21L3 21L3 17L17 3Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 6L18 10"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      )}
    </div>
  );
};

// Single story card component
const StoryCard = ({ story, onComplete }: { story: typeof sections[0]; onComplete: () => void }) => {
  const Icon = story.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-white/10"
    >
      <div className="flex items-center gap-4 mb-6">
        <Icon className="text-3xl text-orange-400" />
        <div className="h-[2px] w-12 bg-orange-400" />
      </div>

      <h2 className={`text-3xl md:text-4xl font-light text-orange-400 mb-6 ${caveat.className}`}>
        {story.title}
      </h2>

      <HandwritingText text={story.text} onComplete={onComplete} />
    </motion.div>
  );
};

export default function StorySection() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isWriting, setIsWriting] = useState(true);

  const handleStoryComplete = () => {
    setIsWriting(false);
    // Wait a moment before showing the next story
    setTimeout(() => {
      if (currentStoryIndex + 1 < sections.length) {
        setCurrentStoryIndex(prev => prev + 1);
        setIsWriting(true);
      } else {
        // All stories completed, you could loop or show a completion message
        console.log('All stories completed');
      }
    }, 500);
  };

  return (
    <section className="relative bg-gradient-to-b from-green-900 to-[var(--primary-green)] text-white overflow-hidden min-h-screen flex items-center justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-orange-400 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-green-400 blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-24 w-full">
        <AnimatePresence mode="wait">
          {isWriting && sections[currentStoryIndex] && (
            <StoryCard
              key={sections[currentStoryIndex].id}
              story={sections[currentStoryIndex]}
              onComplete={handleStoryComplete}
            />
          )}
        </AnimatePresence>

        {/* Progress indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {sections.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentStoryIndex
                  ? 'w-8 bg-orange-400'
                  : idx < currentStoryIndex
                  ? 'w-4 bg-orange-400/50'
                  : 'w-4 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}