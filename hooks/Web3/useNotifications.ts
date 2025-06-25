// src/utils/hooks/useNotifications.ts
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationOptions {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export const useNotifications = () => {
  const showNotification = useCallback((
    type: NotificationType,
    message: string,
    options: NotificationOptions = {}
  ) => {
    const { duration = 4000, position = 'top-right' } = options;

    const config = {
      duration,
      position,
      style: {
        background: '#1e293b',
        color: '#ffffff',
        border: '1px solid #334155',
      },
    };

    switch (type) {
      case 'success':
        return toast.success(message, config);
      case 'error':
        return toast.error(message, config);
      case 'info':
        return toast(message, { ...config, icon: 'ℹ️' });
      case 'warning':
        return toast(message, { ...config, icon: '⚠️' });
      default:
        return toast(message, config);
    }
  }, []);

  const success = useCallback((message: string, options?: NotificationOptions) => {
    return showNotification('success', message, options);
  }, [showNotification]);

  const error = useCallback((message: string, options?: NotificationOptions) => {
    return showNotification('error', message, options);
  }, [showNotification]);

  const info = useCallback((message: string, options?: NotificationOptions) => {
    return showNotification('info', message, options);
  }, [showNotification]);

  const warning = useCallback((message: string, options?: NotificationOptions) => {
    return showNotification('warning', message, options);
  }, [showNotification]);

  const dismiss = useCallback((toastId?: string) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  }, []);

  return {
    showNotification,
    success,
    error,
    info,
    warning,
    dismiss,
  };
};