'use client';

import { useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaPhone,
  FaBuilding,
  FaInfoCircle,
  FaClipboardList,
  FaStar,
} from 'react-icons/fa';
import AuthErrorModal from './AuthErrorModal';
import { useAuthError } from '@/hooks/useAuthError';

export type RoleKey = 'member' | 'donor' | 'partner' | 'club-leader' | 'youth';

export const roleConfigMap: Record<RoleKey, {
  title: string;
  description: string;
  roleValue: string;
  cta: string;
  extraFields: {
    organization?: boolean;
    occupation?: boolean;
    bio?: boolean;
    interests?: boolean;
    skills?: boolean;
  };
}> = {
  member: {
    title: 'Member Registration',
    description: 'Create a general member account for portal access and community participation.',
    roleValue: 'USER',
    cta: 'Create member account',
    extraFields: {
      organization: true,
      occupation: true,
      bio: true,
    },
  },
  donor: {
    title: 'Donor Registration',
    description: 'Register as a donor to manage your donations, receipts, and giving history.',
    roleValue: 'DONOR',
    cta: 'Create donor account',
    extraFields: {
      organization: true,
      occupation: true,
      bio: true,
    },
  },
  partner: {
    title: 'Partner Registration',
    description: 'Register as a partner to collaborate on projects and initiatives.',
    roleValue: 'PARTNER',
    cta: 'Create partner account',
    extraFields: {
      organization: true,
      bio: true,
    },
  },
  'club-leader': {
    title: 'Club Leader Registration',
    description: 'Register as a club leader and manage club activities on the portal.',
    roleValue: 'CLUB_LEADER',
    cta: 'Create club leader account',
    extraFields: {
      organization: true,
      bio: true,
    },
  },
  youth: {
    title: 'Youth Registration',
    description: 'Create a youth account for program participation and event updates.',
    roleValue: 'YOUTH',
    cta: 'Create youth account',
    extraFields: {
      interests: true,
      skills: true,
    },
  },
};

interface RegisterFormProps {
  role: RoleKey;
}

function renderTextField(
  id: string,
  label: string,
  value: string,
  setValue: (value: string) => void,
  placeholder: string,
  icon: ReactNode,
  required = false,
  type: 'text' | 'email' | 'password' = 'text'
) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
          placeholder={placeholder}
          autoComplete={id === 'email' ? 'email' : 'off'}
        />
      </div>
    </div>
  );
}

export default function RegisterForm({ role }: RegisterFormProps) {
  const router = useRouter();
  const { error, isOpen, showError, showSuccess, clearError } = useAuthError();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [occupation, setOccupation] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const config = roleConfigMap[role];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      showError('Please complete all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      showError('Passwords do not match. Please check and try again.');
      return;
    }

    setIsLoading(true);

    const profile: Record<string, any> = {};
    if (organization) profile.organization = organization;
    if (occupation) profile.occupation = occupation;
    if (bio) profile.bio = bio;
    if (interests) profile.interests = interests.split(',').map((item) => item.trim()).filter(Boolean);
    if (skills) profile.skills = skills.split(',').map((item) => item.trim()).filter(Boolean);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password,
          role: config.roleValue,
          profile,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        showError(responseData?.message || responseData?.error || 'Registration failed. Please try again.');
        return;
      }

      showSuccess('Registration successful. Redirecting to login...');
      setTimeout(() => {
        router.push('/auth/login');
      }, 800);
    } catch (submitError) {
      showError(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to complete registration. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AuthErrorModal
        type={error?.type}
        title={error?.title}
        message={error?.message || ''}
        isOpen={isOpen}
        onClose={clearError}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full space-y-8 bg-white rounded-3xl shadow-2xl p-8"
      >
        <div className="space-y-3 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <FaUser className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{config.title}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{config.description}</p>
        </div>

        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 sm:grid-cols-2">
            {renderTextField('firstName', 'First name', firstName, setFirstName, 'Your first name', <FaUser />, true)}
            {renderTextField('lastName', 'Last name', lastName, setLastName, 'Your last name', <FaUser />, true)}
          </div>

          {renderTextField('email', 'Email address', email, setEmail, 'you@example.com', <FaEnvelope />, true, 'email')}

          {renderTextField('phone', 'Phone number', phone, setPhone, 'Optional phone number', <FaPhone />, false)}

          {config.extraFields.organization && renderTextField('organization', 'Organization', organization, setOrganization, 'Organization or company name', <FaBuilding />, false)}
          {config.extraFields.occupation && renderTextField('occupation', 'Occupation', occupation, setOccupation, 'Your role or occupation', <FaInfoCircle />, false)}
          {config.extraFields.bio && (
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                About you
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                placeholder="A short summary of your interests or experience"
              />
            </div>
          )}

          {config.extraFields.interests && renderTextField('interests', 'Interests', interests, setInterests, 'Comma-separated interests', <FaClipboardList />)}
          {config.extraFields.skills && renderTextField('skills', 'Skills', skills, setSkills, 'Comma-separated skills', <FaStar />)}

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaLock />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="Choose a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {renderTextField('confirmPassword', 'Confirm password', confirmPassword, setConfirmPassword, 'Repeat your password', <FaLock />, true, 'password')}
          </div>

          <motion.button
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              config.cta
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
