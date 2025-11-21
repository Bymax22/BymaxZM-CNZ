// contexts/CNZContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CNZContextType {
  // User state
  user: Record<string, unknown> | null;
  setUser: (user: Record<string, unknown> | null | ((prev: Record<string, unknown> | null) => Record<string, unknown> | null)) => void;
  isAuthenticated: boolean;
  
  // Theme state
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Loading state
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Modal state
  activeModal: string | null;
  openModal: (modal: string) => void;
  closeModal: () => void;
  
  // Notification state
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

const CNZContext = createContext<CNZContextType | undefined>(undefined);

export function CNZProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Record<string, unknown> | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoading, setLoading] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      // Add authentication logic here
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('cnz-theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('cnz-theme', newTheme);
  };

  const openModal = (modal: string) => {
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };
    setNotifications(prev => [...prev, newNotification]);

    // Auto remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration || 5000);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const value: CNZContextType = {
    user,
    setUser,
    isAuthenticated: !!user,
    theme,
    toggleTheme,
    isLoading,
    setLoading,
    activeModal,
    openModal,
    closeModal,
    notifications,
    addNotification,
    removeNotification,
  };

  return (
    <CNZContext.Provider value={value}>
      <div className={theme}>
        {children}
      </div>
    </CNZContext.Provider>
  );
}

export function useCNZ() {
  const context = useContext(CNZContext);
  if (context === undefined) {
    throw new Error('useCNZ must be used within a CNZProvider');
  }
  return context;
}