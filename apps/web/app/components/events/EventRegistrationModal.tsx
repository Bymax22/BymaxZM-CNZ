'use client';

import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  onSuccess?: () => void;
}

type RegistrationType = 'individual' | 'organization' | 'company';

export default function EventRegistrationModal({
  isOpen,
  onClose,
  eventId,
  eventTitle,
  eventDate,
  onSuccess,
}: EventRegistrationModalProps) {
  const [registrationType, setRegistrationType] = useState<RegistrationType>('individual');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organizationName: '',
    position: '',
    companyName: '',
    industry: '',
  });
  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({
    type: 'idle',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setStatus({
        type: 'error',
        message: 'Full name is required',
      });
      return false;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({
        type: 'error',
        message: 'Valid email is required',
      });
      return false;
    }

    if (!formData.phone.trim()) {
      setStatus({
        type: 'error',
        message: 'Phone number is required',
      });
      return false;
    }

    if (registrationType === 'organization' && !formData.organizationName.trim()) {
      setStatus({
        type: 'error',
        message: 'Organization name is required',
      });
      return false;
    }

    if (registrationType === 'company' && !formData.companyName.trim()) {
      setStatus({
        type: 'error',
        message: 'Company name is required',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'idle', message: '' });

    if (!validateForm()) return;

    setStatus({ type: 'loading', message: 'Registering...' });

    try {
      const payload = {
        eventId,
        email: formData.email.toLowerCase().trim(),
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        registrationType,
        ...(registrationType === 'organization' && {
          organizationName: formData.organizationName.trim(),
          position: formData.position.trim(),
        }),
        ...(registrationType === 'company' && {
          companyName: formData.companyName.trim(),
          position: formData.position.trim(),
          industry: formData.industry.trim(),
        }),
      };

      console.log('📤 Registering for event:', { eventId, email: payload.email, registrationType });
      console.log('📋 Full payload:', payload);

      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      console.log('📥 Registration response:', { status: response.status, ok: response.ok, data });

      if (response.ok) {
        setStatus({
          type: 'success',
          message:
            'Successfully registered! A confirmation email has been sent to ' +
            formData.email,
        });
        setSubmitted(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          organizationName: '',
          position: '',
          companyName: '',
          industry: '',
        });

        setTimeout(() => {
          if (onSuccess) onSuccess();
          handleClose();
        }, 3000);
      } else {
        console.error('❌ Registration failed:', {
          status: response.status,
          statusText: response.statusText,
          errorData: data,
        });
        setStatus({
          type: 'error',
          message:
            data.error ||
            `Registration failed (${response.status}). Please try again or contact support.`,
        });
      }
    } catch (error) {
      console.error('❌ Registration request error:', error);
      setStatus({
        type: 'error',
        message: 'Unable to register at this time. Please try again later.',
      });
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setStatus({ type: 'idle', message: '' });
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      organizationName: '',
      position: '',
      companyName: '',
      industry: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Register for Event</h2>
            <p className="text-sm text-gray-600 mt-1">{eventTitle}</p>
            {eventDate && (
              <p className="text-xs text-gray-500 mt-1">{eventDate}</p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {status.message && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                status.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200'
                  : status.type === 'error'
                  ? 'bg-red-50 border border-red-200'
                  : 'bg-blue-50 border border-blue-200'
              }`}
            >
              {status.type === 'success' && (
                <CheckCircle
                  size={20}
                  className="text-emerald-600 flex-shrink-0 mt-0.5"
                />
              )}
              {status.type === 'error' && (
                <AlertCircle
                  size={20}
                  className="text-red-600 flex-shrink-0 mt-0.5"
                />
              )}
              {status.type === 'loading' && (
                <Loader
                  size={20}
                  className="text-blue-600 flex-shrink-0 mt-0.5 animate-spin"
                />
              )}
              <p
                className={`text-sm ${
                  status.type === 'success'
                    ? 'text-emerald-700'
                    : status.type === 'error'
                    ? 'text-red-700'
                    : 'text-blue-700'
                }`}
              >
                {status.message}
              </p>
            </div>
          )}

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Registration Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registering as
                </label>
                <select
                  value={registrationType}
                  onChange={(e) => {
                    setRegistrationType(e.target.value as RegistrationType);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      organizationName: '',
                      position: '',
                      companyName: '',
                      industry: '',
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008000] focus:border-transparent"
                >
                  <option value="individual">Individual</option>
                  <option value="organization">Organization Representative</option>
                  <option value="company">Company Representative</option>
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008000] focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008000] focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008000] focus:border-transparent"
                  placeholder="+260 965 638 175"
                />
              </div>

              {/* Organization Fields */}
              {registrationType === 'organization' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008000] focus:border-transparent"
                      placeholder="Organization name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008000] focus:border-transparent"
                      placeholder="e.g., Manager, Director"
                    />
                  </div>
                </>
              )}

              {/* Company Fields */}
              {registrationType === 'company' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008000] focus:border-transparent"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008000] focus:border-transparent"
                      placeholder="e.g., Business Development"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry
                    </label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008000] focus:border-transparent"
                      placeholder="e.g., Technology, Finance"
                    />
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="w-full mt-6 px-4 py-3 bg-[#008000] text-white rounded-lg font-semibold hover:bg-[#006400] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status.type === 'loading' && (
                  <Loader size={18} className="animate-spin" />
                )}
                {status.type === 'loading' ? 'Registering...' : 'Register for Event'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                A confirmation email will be sent to your provided email address
              </p>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
}
