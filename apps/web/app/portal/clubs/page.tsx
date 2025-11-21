// app/portal/clubs/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaMapMarkerAlt, 
  FaCalendar,
  FaPlus,
  FaSearch,
  FaFilter
} from 'react-icons/fa';

interface Club {
  id: string;
  name: string;
  description: string;
  location: string;
  province: string;
  memberCount: number;
  meetingDay: string;
  meetingTime: string;
  status: string;
}

export default function ClubsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockClubs: Club[] = [
      {
        id: '1',
        name: 'Lusaka Green Warriors',
        description: 'Dedicated to urban conservation and tree planting in Lusaka',
        location: 'Lusaka City',
        province: 'Lusaka',
        memberCount: 45,
        meetingDay: 'Saturday',
        meetingTime: '09:00',
        status: 'ACTIVE'
      },
      {
        id: '2',
        name: 'Copperbelt Conservation Club',
        description: 'Focusing on mining area rehabilitation and wildlife protection',
        location: 'Kitwe',
        province: 'Copperbelt',
        memberCount: 32,
        meetingDay: 'Sunday',
        meetingTime: '14:00',
        status: 'ACTIVE'
      },
      {
        id: '3',
        name: 'Livingstone Nature Guardians',
        description: 'Protecting Victoria Falls ecosystem and promoting eco-tourism',
        location: 'Livingstone',
        province: 'Southern',
        memberCount: 28,
        meetingDay: 'Wednesday',
        meetingTime: '17:00',
        status: 'ACTIVE'
      }
    ];

    setTimeout(() => {
      setClubs(mockClubs);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Care for Nature Clubs</h1>
              <p className="text-gray-600 mt-1">
                Manage and explore conservation clubs across Zambia
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors"
            >
              <FaPlus className="w-4 h-4" />
              <span>Create New Club</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search clubs by name, location, or province..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <button className="px-4 py-3 border border-gray-300 rounded-xl flex items-center space-x-2 text-gray-700 hover:bg-gray-50 transition-colors">
              <FaFilter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club, index) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-sm border overflow-hidden group cursor-pointer"
            >
              {/* Club Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{club.name}</h3>
                <p className="text-emerald-100 text-sm opacity-90">{club.description}</p>
              </div>

              {/* Club Details */}
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{club.location}</p>
                      <p className="text-xs text-gray-500">{club.province} Province</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FaUsers className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{club.memberCount} members</p>
                      <p className="text-xs text-gray-500">Active community</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FaCalendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{club.meetingDay}s at {club.meetingTime}</p>
                      <p className="text-xs text-gray-500">Weekly meetings</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex space-x-3">
                  <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    Join Club
                  </button>
                  <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </div>

              {/* Status Badge */}
              <div className="px-6 pb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  club.status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {club.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {clubs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUsers className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No clubs found</h3>
            <p className="text-gray-500 mb-6">
              There are no clubs matching your search criteria.
            </p>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
              Create the first club
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}