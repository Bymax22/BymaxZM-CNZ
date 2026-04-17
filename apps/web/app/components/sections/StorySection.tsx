'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaIndustry, FaHeart } from 'react-icons/fa';
import { MdOutlinePeople } from 'react-icons/md';
import { Caveat, Pacifico, Great_Vibes, Kalam } from 'next/font/google';

const caveat = Caveat({ subsets: ['latin'], weight: '400' });
const pacifico = Pacifico({ subsets: ['latin'], weight: '400' });
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' });
const kalam = Kalam({ subsets: ['latin'], weight: '400' });

// Array of handwriting fonts for more realistic variety
const handwritingFonts = [caveat.className, pacifico.className, greatVibes.className, kalam.className];

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

// Realistic handwriting component with variable speed and natural pauses
const HandwritingText = ({ text, onComplete }: { text: string; onComplete: () => void }) => {
  // Randomly select a handwriting font for this story
  const [selectedFont] = useState(() => handwritingFonts[Math.floor(Math.random() * handwritingFonts.length)]);
  const [isComplete, setIsComplete] = useState(false);

  // Split text into segments for more natural pauses (commas, periods create longer pauses)
  const getSequences = () => {
    const sequences: (string | number)[] = [];
    let currentSegment = '';
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      currentSegment += char;
      
      // Add natural delays after punctuation
      if (char === '.' || char === '!' || char === '?') {
        sequences.push(currentSegment);
        sequences.push(400); // Longer pause after sentence end
        currentSegment = '';
      } else if (char === ',' || char === ';') {
        sequences.push(currentSegment);
        sequences.push(250); // Medium pause after comma
        currentSegment = '';
      } else if (char === ' ') {
        sequences.push(currentSegment);
        sequences.push(40); // Small pause after words
        currentSegment = '';
      }
    }
    
    if (currentSegment) {
      sequences.push(currentSegment);
    }
    
    return sequences;
  };

  const sequences = getSequences();

  return (
    <div className="mt-4">
      <TypeAnimation
        sequence={[
          ...sequences,
          () => {
            setIsComplete(true);
            setTimeout(() => onComplete(), 600);
          }
        ]}
        wrapper="div"
        speed={65} // Base speed (slower for more realistic writing)
        className={`text-white/90 leading-relaxed text-xl md:text-2xl tracking-wide ${selectedFont}`}
        repeat={0}
        cursor={true}
        style={{
          fontFamily: 'inherit',
          textRendering: 'geometricPrecision',
          letterSpacing: '0.02em',
        }}
      />
      {!isComplete && (
        <span className="inline-block ml-1 animate-pulse text-orange-400 text-2xl">✍️</span>
      )}
    </div>
  );
};

// Single story card component
const StoryCard = ({ story, onComplete }: { story: typeof sections[0]; onComplete: () => void }) => {
  const Icon = story.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20"
    >
      <div className="flex items-center gap-4 mb-6">
        <Icon className="text-3xl text-orange-400" />
        <div className="h-[2px] w-12 bg-orange-400" />
      </div>

      {/* Title with original font */}
      <h2 className={`text-3xl md:text-4xl font-light text-orange-400 mb-6 ${caveat.className}`}>
        {story.title}
      </h2>

      <HandwritingText text={story.text} onComplete={onComplete} />
    </motion.div>
  );
};

export default function StorySection() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const handleStoryComplete = () => {
    setIsActive(false);
    setTimeout(() => {
      if (currentStoryIndex + 1 < sections.length) {
        setCurrentStoryIndex(prev => prev + 1);
        setIsActive(true);
      }
    }, 800);
  };

  const currentStory = sections[currentStoryIndex];

  return (
    <section className="relative bg-gradient-to-b from-green-900 to-[var(--primary-green)] text-white overflow-hidden min-h-screen flex items-center justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-orange-400 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-56 h-56 rounded-full bg-green-400 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-yellow-500/20 blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-24 w-full relative z-10">
        <AnimatePresence mode="wait">
          {isActive && currentStory && (
            <StoryCard
              key={currentStory.id}
              story={currentStory}
              onComplete={handleStoryComplete}
            />
          )}
        </AnimatePresence>

        {/* Progress indicators */}
        <div className="mt-12 flex justify-center gap-3">
          {sections.map((_, idx) => (
            <motion.div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentStoryIndex
                  ? 'w-10 bg-orange-400'
                  : idx < currentStoryIndex
                  ? 'w-6 bg-orange-400/40'
                  : 'w-6 bg-white/20'
              }`}
              animate={{
                scale: idx === currentStoryIndex ? [1, 1.2, 1] : 1,
              }}
              transition={{
                repeat: idx === currentStoryIndex ? Infinity : 0,
                duration: 1.5,
              }}
            />
          ))}
        </div>
        
        {/* Story counter */}
        <div className="text-center mt-4 text-white/40 text-sm font-mono">
          {currentStoryIndex + 1} / {sections.length}
        </div>
      </div>
    </section>
  );
}