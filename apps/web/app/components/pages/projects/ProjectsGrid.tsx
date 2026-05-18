'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { projects } from '../../sections/projectsData';
import Image from 'next/image';

export function ProjectsGrid() {
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
            Our <span className="text-[#029346]">Project Portfolio</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive environmental conservation and community development initiatives across Zambia
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
                    {project.image.includes('cloudinary') || project.image.includes('http') ? (
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
              Want to See <span className="text-[#029346]">More Projects</span>?
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