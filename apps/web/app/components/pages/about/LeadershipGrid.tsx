'use client';

import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const teamMembers = [
  {
    name: 'Dr. Sarah Chibwe',
    role: 'Executive Director',
    image: '/images/team/sarah-chibwe.jpg',
    bio: 'Environmental scientist with 15+ years experience in conservation and community development.',
    expertise: ['Conservation Strategy', 'Community Engagement', 'Sustainable Development'],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'sarah@carefornaturezambia.org'
    }
  },
  {
    name: 'David Mwansa',
    role: 'Programs Director',
    image: '/images/team/david-mwansa.jpg',
    bio: 'Development specialist focused on creating sustainable livelihoods through environmental conservation.',
    expertise: ['Project Management', 'Livelihood Programs', 'Partnership Development'],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'david@carefornaturezambia.org'
    }
  },
  {
    name: 'Grace Banda',
    role: 'Education Coordinator',
    image: '/images/team/grace-banda.jpg',
    bio: 'Passionate educator developing environmental curriculum for schools and communities.',
    expertise: ['Environmental Education', 'Youth Programs', 'Curriculum Development'],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'grace@carefornaturezambia.org'
    }
  },
  {
    name: 'John Phiri',
    role: 'Field Operations Manager',
    image: '/images/team/john-phiri.jpg',
    bio: 'Field expert with deep knowledge of Zambian ecosystems and community dynamics.',
    expertise: ['Field Operations', 'Ecosystem Management', 'Community Mobilization'],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'john@carefornaturezambia.org'
    }
  }
];

export function LeadershipGrid() {
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
            Leadership <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#029346] to-[#0C4726]">Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experienced professionals dedicated to environmental conservation and community empowerment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-[#029346] to-[#0C4726] p-1 shadow-lg">
                  <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Photo</span>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[
                    { icon: FaLinkedin, href: member.social.linkedin, color: 'hover:bg-blue-600' },
                    { icon: FaTwitter, href: member.social.twitter, color: 'hover:bg-blue-400' },
                    { icon: FaEnvelope, href: `mailto:${member.social.email}`, color: 'hover:bg-[#029346]' }
                  ].map((social, socialIndex) => (
                    <a
                      key={socialIndex}
                      href={social.href}
                      className={`w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-600 shadow-md transition-all duration-300 ${social.color} hover:text-white hover:scale-110`}
                    >
                      <social.icon className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Member Info */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <div className="text-[#029346] font-semibold mb-4">{member.role}</div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
              
              {/* Expertise */}
              <div className="flex flex-wrap gap-2 justify-center">
                {member.expertise.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}