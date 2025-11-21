// app/portal/events/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlus, 
  FaSearch, 
  FaFilter,
  FaCalendar,
  FaMapMarkerAlt,
  FaUsers,
  FaClock,
  FaEdit,
  FaEye
} from 'react-icons/fa';

interface Event {
  id: string;
  title: string;
  description: string;
  type: 'VOLUNTEERING' | 'TRAINING' | 'MEETING' | 'FUNDRAISER';
  startDate: string;
  endDate: string;
  location: string;
  maxAttendees: number;
  currentAttendees: number;
  club: string;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
}

export default function EventsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
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
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'Community Tree Planting',
        description: 'Join us for a day of tree planting in the community park',
        type: 'VOLUNTEERING',
        startDate: '2024-03-15T08:00:00',
        endDate: '2024-03-15T14:00:00',
        location: 'Lusaka City Park',
        maxAttendees: 50,
        currentAttendees: 35,
        club: 'Lusaka Green Warriors',
        status: 'UPCOMING'
      },
      {
        id: '2',
        title: 'Conservation Workshop',
        description: 'Learn about sustainable conservation practices',
        type: 'TRAINING',
        startDate: '2024-03-20T14:00:00',
        endDate: '2024-03-20T17:00:00',
        location: 'CNZ Headquarters',
        maxAttendees: 30,
        currentAttendees: 28,
        club: 'All Clubs',
        status: 'UPCOMING'
      },
      {
        id: '3',
        title: 'Monthly Club Meeting',
        description: 'Regular monthly meeting to discuss ongoing projects',
        type: 'MEETING',
        startDate: '2024-03-10T17:00:00',
        endDate: '2024-03-10T19:00:00',
        location: 'Community Hall',
        maxAttendees: 25,
        currentAttendees: 18,
        club: 'Copperbelt Conservation Club',
        status: 'COMPLETED'
      },
      {
        id: '4',
        title: 'Fundraising Gala',
        description: 'Annual fundraising event for conservation projects',
        type: 'FUNDRAISER',
        startDate: '2024-04-05T18:00:00',
        endDate: '2024-04-05T22:00:00',
        location: 'Garden Hotel',
        maxAttendees: 100,
        currentAttendees: 67,
        club: 'All Clubs',
        status: 'UPCOMING'
      }
    ];

    setTimeout(() => {
      setEvents(mockEvents);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'ALL' || event.status === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UPCOMING': return 'bg-green-100 text-green-800';
      case 'ONGOING': return 'bg-blue-100 text-blue-800';
      case 'COMPLETED': return 'bg-gray-100 text-gray-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'VOLUNTEERING': return 'bg-emerald-100 text-emerald-800';
      case 'TRAINING': return 'bg-blue-100 text-blue-800';
      case 'MEETING': return 'bg-purple-100 text-purple-800';
      case 'FUNDRAISER': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
              <h1 className="text-3xl font-bold text-gray-900">Events</h1>
              <p className="text-gray-600 mt-1">
                Manage and participate in conservation events
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors"
            >
              <FaPlus className="w-4 h-4" />
              <span>New Event</span>
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
              placeholder="Search events..."
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
            <option value="ALL">All Events</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <button className="px-4 py-3 border border-gray-300 rounded-xl flex items-center space-x-2 text-gray-700 hover:bg-gray-50 transition-colors">
            <FaFilter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {/* Event Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)} inline-block mb-2`}>
                  {event.type}
                </span>
                <p className="text-emerald-100 text-sm opacity-90 line-clamp-2">
                  {event.description}
                </p>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Date and Time */}
                  <div className="flex items-center space-x-3">
                    <FaCalendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Date & Time</p>
                      <p className="text-sm text-gray-600">{formatDate(event.startDate)}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Location</p>
                      <p className="text-sm text-gray-600">{event.location}</p>
                    </div>
                  </div>

                  {/* Attendance */}
                  <div className="flex items-center space-x-3">
                    <FaUsers className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Attendance</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-emerald-500 h-2 rounded-full"
                            style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {event.currentAttendees}/{event.maxAttendees}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Club */}
                  <div className="flex items-center space-x-3">
                    <FaClock className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Organizing Club</p>
                      <p className="text-sm text-gray-600">{event.club}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 mt-6">
                  {event.status === 'UPCOMING' && (
                    <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                      Register Now
                    </button>
                  )}
                  {event.status === 'COMPLETED' && (
                    <button className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                      View Photos
                    </button>
                  )}
                  <button className="p-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors">
                    <FaEye className="w-3 h-3" />
                  </button>
                  <button className="p-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors">
                    <FaEdit className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCalendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? 'No events match your search criteria.' : 'Get started by creating your first event.'}
            </p>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
              Create New Event
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}