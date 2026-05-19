'use client';

import React from 'react';
import Image from 'next/image';

interface Project {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
  color?: string;
  stats: {
    treesPlanted: number;
    areasProtected: number;
    communities: number;
    carbonReduced: number;
  };
  images?: string[];
}

export function ProjectGallery({ project }: { project: Project }) {
  const images = project.images ?? ['https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779053946/692938516_1446768550815747_5499726643162476941_n_nv4vge.jpg', 'https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779053097/677790147_1429823699176899_1661133342896079994_n_xhjbav.jpg'];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <Image src={src} alt={`${project.title} ${i + 1}`} width={400} height={192} className="w-full h-48 object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
