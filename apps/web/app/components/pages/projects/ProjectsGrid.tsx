'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { projects as staticProjects } from '../../sections/projectsData';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function isVideoUrl(url: string) {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);
}

function formatRelativeTime(value?: string) {
  if (!value) return ''; 
  const date = new Date(value);
  if (isNaN(date.getTime())) return '';
  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  const absSeconds = Math.abs(seconds);
  const formatter = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' });
  if (absSeconds < 60) return formatter.format(-seconds, 'second');
  if (absSeconds < 3600) return formatter.format(-Math.round(seconds / 60), 'minute');
  if (absSeconds < 86400) return formatter.format(-Math.round(seconds / 3600), 'hour');
  if (absSeconds < 2592000) return formatter.format(-Math.round(seconds / 86400), 'day');
  return formatter.format(-Math.round(seconds / 2592000), 'month');
}

export function ProjectsGrid() {
  const [projects, setProjects] = useState(staticProjects);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch('/api/communications/cards?cardType=PROJECT&take=6');
        if (!res.ok) return;
        const data = await res.json();
        const cards = data.cards || data.contentCards || [];
        if (!mounted) return;
        const mapped = cards.map((c: any, i: number) => {
          const gallery = Array.isArray(c.metadata?.gallery) ? c.metadata.gallery : [];
          const heroImage = c.imageUrl || gallery.find((item: any) => item.type === 'image')?.url || '';
          const heroVideo = gallery.find((item: any) => item.type === 'video')?.url || (isVideoUrl(c.imageUrl || '') ? c.imageUrl : undefined);

          return {
            id: c.id || c.slug || String(i),
            title: c.title,
            shortDescription: c.description || c.subtitle || '',
            description: c.description || c.subtitle || '',
            location: c.metadata?.location || 'Zambia',
            status: c.metadata?.status || 'ongoing',
            image: heroImage,
            video: heroVideo,
            publishedAt: c.publishedAt || c.createdAt,
            category: (c.category || 'conservation').toLowerCase(),
            sdgs: c.metadata?.sdgs || [],
          };
        });
        if (mapped.length) setProjects(mapped);
      } catch (e) {
        // keep static projects
      }
    }
    void load();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Project Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Environmental conservation and community development initiatives across Zambia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const categoryColors: Record<string, string> = {
              'conservation': 'bg-[#029346] text-white',
              'climate': 'bg-[#00bcd4] text-white',
              'education': 'bg-[#9c27b0] text-white',
              'mining': 'bg-[#F79021] text-white',
              'livelihoods': 'bg-[#4caf50] text-white',
            };

            return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={`/projects/${project.id}`}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100 h-full flex flex-col overflow-hidden">
                  {/* Image */}
                  <div className={`relative h-48 ${categoryColors[project.category]} overflow-hidden flex items-center justify-center`}>
                    {project.video ? (
                      <video src={project.video} controls muted loop playsInline className="w-full h-full object-cover" />
                    ) : project.image && (project.image.includes('cloudinary') || project.image.includes('http')) ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <div className="text-white text-center">
                        <p className="text-4xl mb-2">🌍</p>
                        <p className="text-sm font-semibold">{project.category}</p>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${categoryColors[project.category]}`}>
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${project.status === 'ongoing' ? 'bg-green-100 text-green-700' : project.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{project.title}</h3>
                    {project.publishedAt && (
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Published {formatRelativeTime(project.publishedAt)}</p>
                    )}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">{project.shortDescription}</p>
                    
                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <span>📍</span>
                      <span className="line-clamp-1">{project.location}</span>
                    </div>

                    {/* SDGs */}
                    {project.sdgs.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-600 mb-2">SDG Goals:</p>
                        <div className="flex flex-wrap gap-1">
                          {project.sdgs.map((sdg) => (
                            <span key={sdg} className="inline-block bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded">
                              SDG {sdg}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Learn More */}
                    <div className="flex items-center justify-between text-sm mt-auto pt-4 border-t">
                      <span className="text-gray-500 font-medium">Learn More</span>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#029346] group-hover:text-white transition-all duration-300">
                        →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Want to See <span className="text-[#351a05]">More Projects</span>?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Explore our complete project portfolio with detailed reports, impact metrics, and success stories.
            </p>
            <button className="bg-[#029346] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-[#027437] transition-all duration-300">
              View Full Project Database
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}