// app/portal/settings/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser,
  FaBell,
  FaShieldAlt,
  FaPalette,
  FaDatabase,
  FaQuestionCircle,
  FaSave,
  FaTimes
} from 'react-icons/fa';

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    organization: '',
    location: ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    projectUpdates: true,
    eventReminders: true,
    clubAnnouncements: true,
    donationReceipts: true,
    securityAlerts: true
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      setProfile({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+260 97 123 4567',
        bio: 'Passionate about environmental conservation and community development.',
        organization: 'Green Future Corp',
        location: 'Lusaka, Zambia'
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save profile logic
    console.log('Saving profile:', profile);
  };

  const handleNotificationsSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save notifications logic
    console.log('Saving notifications:', notifications);
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: FaUser },
    { id: 'notifications', name: 'Notifications', icon: FaBell },
    { id: 'security', name: 'Security', icon: FaShieldAlt },
    { id: 'appearance', name: 'Appearance', icon: FaPalette },
    { id: 'data', name: 'Data & Privacy', icon: FaDatabase },
    { id: 'help', name: 'Help & Support', icon: FaQuestionCircle }
  ];

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
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">
              Manage your account settings and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-sm border p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                <form onSubmit={handleProfileSave}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organization
                      </label>
                      <input
                        type="text"
                        value={profile.organization}
                        onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        rows={4}
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3 mt-6">
                    <button
                      type="submit"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors"
                    >
                      <FaSave className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                    <button
                      type="button"
                      className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors"
                    >
                      <FaTimes className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-sm border p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                <form onSubmit={handleNotificationsSave}>
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                        <div>
                          <h3 className="font-medium text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Receive notifications about {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => setNotifications({
                              ...notifications,
                              [key]: e.target.checked
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-3 mt-6">
                    <button
                      type="submit"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors"
                    >
                      <FaSave className="w-4 h-4" />
                      <span>Save Preferences</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Other tabs would go here... */}
          </div>
        </div>
      </div>
    </div>
  );
}