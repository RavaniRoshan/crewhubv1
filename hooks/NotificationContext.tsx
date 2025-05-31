"use client";

import { createContext, useContext, ReactNode, useState } from 'react';
import { type ToastAction } from '@/components/ui/toast'; // Assuming shadcn/ui toast component is used
import React from 'react';

interface Notification {
  id: string;
  title?: string;
  description?: string;
  severity?: 'info' | 'success' | 'warning' | 'error';
  action?: React.ReactElement<typeof ToastAction>;
  duration?: number; // in milliseconds
}

interface NotificationContextType {
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  // Potentially add functions to remove or update notifications
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  // TODO: Implement state to hold notifications and logic to display/manage them (e.g., using shadcn/ui toast)
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    console.log('Adding notification:', notification); // Placeholder
    // Example: useToast hook from shadcn/ui
    // toast({
    //   title: notification.title,
    //   description: notification.description,
    //   variant: notification.severity === 'error' ? 'destructive' : 'default', // Map severity to variant
    //   action: notification.action,
    //   duration: notification.duration,
    // });
  };

  const value = {
    addNotification,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}; 