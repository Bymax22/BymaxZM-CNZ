// app/portal/projects/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlus, 
  FaSearch, 
  FaFilter,
  FaTree,
  FaUsers,
  FaCalendar,
  FaEdit,
  FaEye,
  FaTrash
} from 'react-icons/fa';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'ACTIVE' | 'COMPLETED' | 'PLANNING' | 'SUSPENDED';
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  location: string;
  memberCount: number;
  club: string;
}

export default function ProjectsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    // Mock data
    const mockProjects: Project[] = [
      {
        id: '1',
        title: 'Urban Greening Initiative',
        description: 'Planting trees in urban areas of Lusaka to improve air quality and biodiversity',
        status: 'ACTIVE',
        progress: 75,
        startDate: '2024-01-15',
        endDate: '2024-06-30',
        budget: 50000,
        location: 'Lusaka',
        memberCount: 24,
        club: 'Lusaka Green Warriors'
      },
      {
        id: '2',
        title: 'School Conservation Program',
        description: 'Environmental education and tree planting in local schools',
        status: 'ACTIVE',
        progress: 90,
        startDate: '2024-01-01',
        endDate: '2024-03-31',
        budget: 25000,
        location: 'Copperbelt',
        memberCount: 18,
        club: 'Copperbelt Conservation Club'
      },
      {
        id: '3',
        title: 'Wildlife Corridor Restoration',
        description: 'Restoring natural corridors for wildlife movement between protected areas',
        status: 'PLANNING',
        progress: 25,
        startDate: '2024-04-01',
        endDate: '2024-12-31',
        budget: 100000,
        location: 'Southern Province',
        memberCount: 32,
        club: 'Livingstone Nature Guardians'
      },
      {
        id: '4',
        title: 'Community Garden Project',
        description: 'Establishing sustainable community gardens for food security',
        status: 'COMPLETED',
        progress: 100,
        startDate: '2023-09-01',
        endDate: '2024-02-29',
        budget: 30000,
        location: 'Eastern Province',
        memberCount: 15,
        club: 'Chipata Green Club'
      }
    ];

    setTimeout(() => {
      setProjects(mockProjects);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'ALL' || project.status === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800';
      case 'PLANNING': return 'bg-yellow-100 text-yellow-800';
      case 'SUSPENDED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
              <p className="text-gray-600 mt-1">
                Manage and track conservation projects
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors"
            >
              <FaPlus className="w-4 h-4" />
              <span>New Project</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="PLANNING">Planning</option>
            <option value="COMPLETED">Completed</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
          <button className="px-4 py-3 border border-gray-300 rounded-xl flex items-center space-x-2 text-gray-700 hover:bg-gray-50 transition-colors">
            <FaFilter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {/* Project Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-emerald-100 text-sm opacity-90 line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <FaCalendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-600">Start Date</p>
                        <p className="font-medium">{project.startDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaTree className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-600">Location</p>
                        <p className="font-medium">{project.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaUsers className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-600">Members</p>
                        <p className="font-medium">{project.memberCount}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaTree className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-600">Club</p>
                        <p className="font-medium">{project.club}</p>
                      </div>
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="text-lg font-bold text-emerald-600">
                      ZMW {project.budget.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 mt-6">
                  <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                    <FaEye className="w-3 h-3" />
                    <span>View</span>
                  </button>
                  <button className="p-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors">
                    <FaEdit className="w-3 h-3" />
                  </button>
                  <button className="p-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors">
                    <FaTrash className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTree className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? 'No projects match your search criteria.' : 'Get started by creating your first project.'}
            </p>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
              Create New Project
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}