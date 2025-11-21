// app/admin/clubs/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlus, 
  FaSearch, 
  FaFilter,
  FaMapMarkerAlt,
  FaUsers,
  FaCalendar,
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
  FaEye,
  FaChartLine
} from 'react-icons/fa';

interface Club {
  id: string;
  name: string;
  description: string;
  location: string;
  province: string;
  leader: string;
  memberCount: number;
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED' | 'INACTIVE';
  createdDate: string;
  lastActivity: string;
  projectsCount: number;
}

export default function ClubsManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userRole = session?.user?.role as string | undefined;
  const [clubs, setClubs] = useState<Club[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (session && !(userRole === 'SUPER_ADMIN' || userRole === 'ADMIN')) {
      router.push('/portal/dashboard');
    }
  }, [status, session, router, userRole]);

  useEffect(() => {
    // Mock data
    const mockClubs: Club[] = [
      {
        id: '1',
        name: 'Lusaka Green Warriors',
        description: 'Urban conservation and tree planting initiatives',
        location: 'Lusaka City',
        province: 'Lusaka',
        leader: 'Sarah Chibwe',
        memberCount: 45,
        status: 'ACTIVE',
        createdDate: '2023-05-10',
        lastActivity: '2024-03-15',
        projectsCount: 8
      },
      {
        id: '2',
        name: 'Copperbelt Conservation Club',
        description: 'Mining area rehabilitation and wildlife protection',
        location: 'Kitwe',
        province: 'Copperbelt',
        leader: 'John Banda',
        memberCount: 32,
        status: 'ACTIVE',
        createdDate: '2023-08-15',
        lastActivity: '2024-03-14',
        projectsCount: 6
      },
      {
        id: '3',
        name: 'Green Future Youth',
        description: 'Youth-led environmental initiatives',
        location: 'Ndola',
        province: 'Copperbelt',
        leader: 'David Mwale',
        memberCount: 28,
        status: 'PENDING',
        createdDate: '2024-03-01',
        lastActivity: '2024-03-10',
        projectsCount: 2
      },
      {
        id: '4',
        name: 'Livingstone Nature Guardians',
        description: 'Victoria Falls ecosystem protection',
        location: 'Livingstone',
        province: 'Southern',
        leader: 'Grace Phiri',
        memberCount: 38,
        status: 'ACTIVE',
        createdDate: '2023-11-20',
        lastActivity: '2024-03-12',
        projectsCount: 5
      },
      {
        id: '5',
        name: 'Eastern Green Initiative',
        description: 'Rural community conservation projects',
        location: 'Chipata',
        province: 'Eastern',
        leader: 'Michael Kabwe',
        memberCount: 24,
        status: 'INACTIVE',
        createdDate: '2023-12-05',
        lastActivity: '2024-02-15',
        projectsCount: 3
      }
    ];

    setTimeout(() => {
      setClubs(mockClubs);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredClubs = clubs.filter(club => {
    const matchesFilter = filter === 'ALL' || club.status === filter;
    const matchesSearch = 
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.province.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'SUSPENDED': return 'bg-red-100 text-red-800';
      case 'INACTIVE': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (clubId: string) => {
    // Approval logic
    console.log('Approving club:', clubId);
  };

  const handleReject = (clubId: string) => {
    // Rejection logic
    console.log('Rejecting club:', clubId);
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session || !(userRole === 'SUPER_ADMIN' || userRole === 'ADMIN')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Clubs Management</h1>
              <p className="text-gray-600 mt-1">
                Manage and monitor conservation clubs
              </p>
            </div>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors"
              >
                <FaChartLine className="w-4 h-4" />
                <span>Analytics</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors"
              >
                <FaPlus className="w-4 h-4" />
                <span>Add Club</span>
              </motion.button>
            </div>
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
              placeholder="Search clubs by name, location, or province..."
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
            <option value="ALL">All Clubs</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="INACTIVE">Inactive</option>
          </select>
          <button className="px-4 py-3 border border-gray-300 rounded-xl flex items-center space-x-2 text-gray-700 hover:bg-gray-50 transition-colors">
            <FaFilter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClubs.map((club, index) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {/* Club Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{club.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(club.status)}`}>
                    {club.status}
                  </span>
                </div>
                <p className="text-emerald-100 text-sm opacity-90 line-clamp-2">
                  {club.description}
                </p>
              </div>

              {/* Club Details */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Location */}
                  <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{club.location}</p>
                      <p className="text-xs text-gray-500">{club.province} Province</p>
                    </div>
                  </div>

                  {/* Leader & Members */}
                  <div className="flex items-center space-x-3">
                    <FaUsers className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Led by {club.leader}</p>
                      <p className="text-xs text-gray-500">{club.memberCount} members</p>
                    </div>
                  </div>

                  {/* Activity */}
                  <div className="flex items-center space-x-3">
                    <FaCalendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{club.projectsCount} projects</p>
                      <p className="text-xs text-gray-500">
                        Last activity: {new Date(club.lastActivity).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Created Date */}
                  <div className="text-xs text-gray-500">
                    Created: {new Date(club.createdDate).toLocaleDateString()}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 mt-6">
                  {club.status === 'PENDING' ? (
                    <>
                      <button
                        onClick={() => handleApprove(club.id)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <FaCheckCircle className="w-3 h-3" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleReject(club.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <FaTimesCircle className="w-3 h-3" />
                        <span>Reject</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                        <FaEye className="w-3 h-3" />
                        <span>View</span>
                      </button>
                      <button className="p-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors">
                        <FaEdit className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredClubs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaMapMarkerAlt className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No clubs found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? 'No clubs match your search criteria.' : 'Get started by creating your first club.'}
            </p>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
              Create New Club
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}