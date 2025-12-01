interface ClubForm {
  id?: string;
  name: string;
  description: string;
  location: string;
  province: string;
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED' | 'INACTIVE';
}
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
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [form, setForm] = useState<ClubForm>({ name: '', description: '', location: '', province: '', status: 'ACTIVE' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  // Handlers for create/edit
  const openCreateModal = () => {
    setForm({ name: '', description: '', location: '', province: '', status: 'ACTIVE' });
    setModalMode('create');
    setEditingId(null);
    setFormError(null);
    setShowModal(true);
  };
  const openEditModal = (club: Club) => {
    setForm({
      id: club.id,
      name: club.name,
      description: club.description,
      location: club.location,
      province: club.province,
      status: club.status
    });
    setModalMode('edit');
    setEditingId(club.id);
    setFormError(null);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    try {
      let res;
      if (modalMode === 'create') {
        res = await fetch('/api/admin/clubs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
      } else {
        res = await fetch('/api/admin/clubs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, id: editingId })
        });
      }
      if (!res.ok) {
        const data = await res.json();
        setFormError(data.error || 'Failed to save club');
        return;
      }
      closeModal();
      // Refresh clubs
      setIsLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filter) params.append('filter', filter);
      params.append('limit', '50');
      const clubsRes = await fetch(`/api/admin/clubs?${params.toString()}`);
      const clubsData = await clubsRes.json();
      setClubs(clubsData.clubs.map((c: any) => ({
        id: c.id,
        name: c.name,
        description: c.description,
        location: c.location,
        province: c.province,
        leader: c.leader?.firstName ? `${c.leader.firstName} ${c.leader.lastName}` : '',
        memberCount: c.members?.length || 0,
        status: c.status,
        createdDate: c.createdAt,
        lastActivity: c.updatedAt,
        projectsCount: c.projects?.length || 0
      })));
    } catch (err) {
      setFormError('Failed to save club');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this club?')) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/clubs?id=${id}`, { method: 'DELETE' });
      if (!res.ok) {
        alert('Failed to delete club');
      } else {
        setClubs(clubs => clubs.filter(c => c.id !== id));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (session && !(userRole === 'SUPER_ADMIN' || userRole === 'ADMIN')) {
      router.push('/portal/dashboard');
    }
  }, [status, session, router, userRole]);

  useEffect(() => {
    const fetchClubs = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (filter) params.append('filter', filter);
        params.append('limit', '50');
        const res = await fetch(`/api/admin/clubs?${params.toString()}`);
        const data = await res.json();
        if (res.ok) {
          setClubs(data.clubs.map((c: any) => ({
            id: c.id,
            name: c.name,
            description: c.description,
            location: c.location,
            province: c.province,
            leader: c.leader?.firstName ? `${c.leader.firstName} ${c.leader.lastName}` : '',
            memberCount: c.members?.length || 0,
            status: c.status,
            createdDate: c.createdAt,
            lastActivity: c.updatedAt,
            projectsCount: c.projects?.length || 0
          })));
        } else {
          setClubs([]);
        }
      } catch (e) {
        setClubs([]);
      } finally {
        setIsLoading(false);
      }
    };
    if (status === 'authenticated') fetchClubs();
  }, [status, searchTerm, filter]);

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
                      <button className="p-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors" onClick={() => openEditModal(club)}>
                        <FaEdit className="w-3 h-3" />
                      </button>
                      <button className="p-2 border border-gray-300 hover:bg-red-50 text-red-600 rounded-lg transition-colors" onClick={() => handleDelete(club.id)}>
                        <FaTimesCircle className="w-3 h-3" />
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
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors" onClick={openCreateModal}>
              Create New Club
            </button>
                {/* Club Modal */}
                {showModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
                      <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={closeModal}>&times;</button>
                      <h2 className="text-2xl font-bold mb-4">{modalMode === 'create' ? 'Add Club' : 'Edit Club'}</h2>
                      {formError && <div className="mb-2 text-red-600 text-sm">{formError}</div>}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Name</label>
                          <input name="name" value={form.name} onChange={handleFormChange} required className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Description</label>
                          <textarea name="description" value={form.description} onChange={handleFormChange} required className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Location</label>
                          <input name="location" value={form.location} onChange={handleFormChange} required className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Province</label>
                          <input name="province" value={form.province} onChange={handleFormChange} required className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Status</label>
                          <select name="status" value={form.status} onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2">
                            <option value="ACTIVE">Active</option>
                            <option value="PENDING">Pending</option>
                            <option value="SUSPENDED">Suspended</option>
                            <option value="INACTIVE">Inactive</option>
                          </select>
                        </div>
                        <div className="flex justify-end">
                          <button type="button" className="mr-2 px-4 py-2 rounded-lg border border-gray-300" onClick={closeModal}>Cancel</button>
                          <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold">
                            {modalMode === 'create' ? 'Create' : 'Save'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
          </motion.div>
        )}
      </div>
    </div>
  );
}