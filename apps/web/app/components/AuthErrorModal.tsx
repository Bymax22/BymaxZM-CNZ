'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationCircle, FaCheckCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

export type AuthErrorType = 'error' | 'success' | 'info' | 'warning';

interface AuthErrorModalProps {
  type?: AuthErrorType;
  title?: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDuration?: number;
}

const errorMessages: Record<string, { title: string; message: string }> = {
  'User already exists': {
    title: 'Account Already Registered',
    message: 'This email is already registered. Please login or use a different email.'
  },
  'Invalid email or password': {
    title: 'Login Failed',
    message: 'The email or password you entered is incorrect. Please try again.'
  },
  'Passwords do not match': {
    title: 'Password Mismatch',
    message: 'The passwords you entered do not match. Please try again.'
  },
  'Please agree to the terms and conditions': {
    title: 'Terms Required',
    message: 'Please agree to the terms and conditions to proceed.'
  },
  'User not found': {
    title: 'User Not Found',
    message: 'No account found with this email address.'
  },
  'User is not active': {
    title: 'Account Inactive',
    message: 'Your account is inactive. Please contact support.'
  },
  'User has no password set': {
    title: 'Authentication Error',
    message: 'This account does not have a password. Please use another login method.'
  },
  'Invalid or expired verification token': {
    title: 'Verification Failed',
    message: 'The verification link has expired or is invalid. Please request a new one.'
  },
  'Email already verified': {
    title: 'Already Verified',
    message: 'Your email is already verified. You can proceed to login.'
  },
  'Failed to send verification email': {
    title: 'Email Sending Failed',
    message: 'We could not send the verification email. Please try again.'
  },
  'Invalid or expired OTP': {
    title: 'OTP Invalid',
    message: 'The OTP you entered is invalid or has expired. Please request a new one.'
  },
  'Failed to send OTP email': {
    title: 'OTP Sending Failed',
    message: 'We could not send the OTP. Please try again.'
  },
};

export default function AuthErrorModal({
  type = 'error',
  title,
  message,
  isOpen,
  onClose,
  autoClose = type === 'success',
  autoCloseDuration = 3000,
}: AuthErrorModalProps) {
  const [displayMessage, setDisplayMessage] = useState(message);

  useEffect(() => {
    if (isOpen) {
      setDisplayMessage(message);
      if (autoClose && autoCloseDuration) {
        const timer = setTimeout(onClose, autoCloseDuration);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, message, autoClose, autoCloseDuration, onClose]);

  const errorInfo = errorMessages[message] || { title, message };
  const displayTitle = title || errorInfo.title || (type === 'success' ? 'Success' : 'Error');
  const displayMsg = errorInfo.message || message;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="w-6 h-6 text-green-600" />;
      case 'warning':
        return <FaExclamationCircle className="w-6 h-6 text-yellow-600" />;
      case 'info':
        return <FaInfoCircle className="w-6 h-6 text-blue-600" />;
      case 'error':
      default:
        return <FaExclamationCircle className="w-6 h-6 text-red-600" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'error':
      default:
        return 'bg-red-50 border-red-200';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-900';
      case 'warning':
        return 'text-yellow-900';
      case 'info':
        return 'text-blue-900';
      case 'error':
      default:
        return 'text-red-900';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={`fixed top-4 right-4 max-w-md w-full border rounded-lg shadow-lg ${getBackgroundColor()} z-50`}
        >
          <div className="p-4 flex gap-4">
            <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
            <div className="flex-1">
              <h3 className={`font-bold text-sm mb-1 ${getTextColor()}`}>{displayTitle}</h3>
              <p className={`text-sm ${getTextColor()}`}>{displayMsg}</p>
            </div>
            <button
              onClick={onClose}
              className={`flex-shrink-0 ${getTextColor()} hover:opacity-70 transition`}
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
