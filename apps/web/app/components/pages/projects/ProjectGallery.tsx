'use client';

import React from 'react';

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
  const images = project.images ?? ['/images/projects/reforestation.jpg', '/images/projects/slide1.jpg'];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <img src={src} alt={`${project.title} ${i + 1}`} className="w-full h-48 object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
