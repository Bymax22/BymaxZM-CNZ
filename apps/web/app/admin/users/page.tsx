interface UserForm {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone?: string;
}
// app/admin/users/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlus, 
  FaSearch, 
  FaFilter,
  FaEdit,
  FaEye,
  FaUserShield,
  FaUser,
  FaClock,
  FaBan,
  FaCheckCircle
} from 'react-icons/fa';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  lastLogin: string;
  joinDate: string;
	club?: string;
}

export default function UsersManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userRole = session?.user?.role as string | undefined;
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [form, setForm] = useState<UserForm>({ firstName: '', lastName: '', email: '', role: 'CLUB_LEADER', phone: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (session && !(userRole === 'SUPER_ADMIN' || userRole === 'ADMIN')) {
      router.push('/portal/dashboard');
    }
  }, [status, session, router, userRole]);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (filter) params.append('filter', filter);
        params.append('limit', '50');
        const res = await fetch(`/api/admin/users?${params.toString()}`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users.map((u: any) => ({
            id: u.id,
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            role: u.role,
            status: u.isActive ? 'ACTIVE' : 'INACTIVE',
            lastLogin: u.lastLogin,
            joinDate: u.createdAt,
            club: u.memberships?.[0]?.clubId || ''
          })));
        } else {
          setUsers([]);
        }
      } catch (e) {
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };
    if (status === 'authenticated') fetchUsers();
  }, [status, searchTerm, filter]);

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'ALL' || user.status === filter || user.role === filter;
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'INACTIVE': return 'bg-red-100 text-red-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
      case 'ADMIN':
        return FaUserShield;
      case 'PENDING':
        return FaClock;
      default:
        return FaUser;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'bg-purple-100 text-purple-800';
      case 'ADMIN':
        return 'bg-blue-100 text-blue-800';
      case 'CLUB_LEADER':
        return 'bg-emerald-100 text-emerald-800';
      case 'PROJECT_MANAGER':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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

  // Handlers for create/edit
  const openCreateModal = () => {
    setForm({ firstName: '', lastName: '', email: '', role: 'CLUB_LEADER', phone: '' });
    setModalMode('create');
    setEditingId(null);
    setFormError(null);
    setShowModal(true);
  };
  const openEditModal = (user: User) => {
    setForm({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      phone: ''
    });
    setModalMode('edit');
    setEditingId(user.id);
    setFormError(null);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    try {
      let res;
      if (modalMode === 'create') {
        res = await fetch('/api/admin/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
      } else {
        res = await fetch('/api/admin/users', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, id: editingId })
        });
      }
      if (!res.ok) {
        const data = await res.json();
        setFormError(data.error || 'Failed to save user');
        return;
      }
      closeModal();
      // Refresh users
      setIsLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filter) params.append('filter', filter);
      params.append('limit', '50');
      const usersRes = await fetch(`/api/admin/users?${params.toString()}`);
      const usersData = await usersRes.json();
      setUsers(usersData.users.map((u: any) => ({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        role: u.role,
        status: u.isActive ? 'ACTIVE' : 'INACTIVE',
        lastLogin: u.lastLogin,
        joinDate: u.createdAt,
        club: u.memberships?.[0]?.clubId || ''
      })));
    } catch (err) {
      setFormError('Failed to save user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
      if (!res.ok) {
        alert('Failed to delete user');
      } else {
        setUsers(users => users.filter(u => u.id !== id));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ...existing code...
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-1">
                Manage system users and permissions
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors"
              onClick={openCreateModal}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add User</span>
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
              placeholder="Search users by name or email..."
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
            <option value="ALL">All Users</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="PENDING">Pending</option>
            <option value="ADMIN">Admins</option>
            <option value="CLUB_LEADER">Club Leaders</option>
          </select>
          <button className="px-4 py-3 border border-gray-300 rounded-xl flex items-center space-x-2 text-gray-700 hover:bg-gray-50 transition-colors">
            <FaFilter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Club
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user, index) => {
                  const RoleIcon = getRoleIcon(user.role);
                  return (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.firstName.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <RoleIcon className="w-4 h-4 text-gray-400" />
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                            {user.role.replace('_', ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.club || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 transition-colors">
                            <FaEye className="w-4 h-4" />
                          </button>
                          <button className="text-emerald-600 hover:text-emerald-900 transition-colors" onClick={() => openEditModal(user)}>
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 transition-colors" onClick={() => handleDelete(user.id)}>
                            <FaBan className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUser className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? 'No users match your search criteria.' : 'Get started by adding your first user.'}
              </p>
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors" onClick={openCreateModal}>
                Add New User
              </button>
            </motion.div>
          )}
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">{filteredUsers.length}</span> results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-3 py-2 border border-gray-300 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors">
                1
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      {/* User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={closeModal}>&times;</button>
            <h2 className="text-2xl font-bold mb-4">{modalMode === 'create' ? 'Add User' : 'Edit User'}</h2>
            {formError && <div className="mb-2 text-red-600 text-sm">{formError}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input name="firstName" value={form.firstName} onChange={handleFormChange} required className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input name="lastName" value={form.lastName} onChange={handleFormChange} required className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleFormChange} required className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" disabled={modalMode === 'edit'} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select name="role" value={form.role} onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="CLUB_LEADER">Club Leader</option>
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                  <option value="PROJECT_MANAGER">Project Manager</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input name="phone" value={form.phone} onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" />
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
    </div>
  );
}