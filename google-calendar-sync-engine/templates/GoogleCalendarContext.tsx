import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useTranslation } from 'react-i18next';
// Abstracted dependencies
// import { googleCalendarService } from '../services/googleCalendar.service';
// import { useAuth } from './AuthContext';
// import { logger, analyticsService } from '../utils';

export interface GoogleCalendarContextType {
  isConnected: boolean;
  isSyncing: boolean;
  calendarId: string | null;
  calendarName: string | null;
  isPrimaryCalendar: boolean;
  syncStatus: string;
  connectToGoogle: () => Promise<void>;
  disconnect: () => Promise<void>;
  syncSingleEntity: (entityId: string) => Promise<any>;
  syncMultipleEntities: (entityIds: string[]) => Promise<any>;
  createCalendar: (name: string) => Promise<{ calendarId: string; calendarName: string }>;
  updateCalendarSelection: (id: string, name: string) => Promise<void>;
  // ... other abstracted methods
}

const GoogleCalendarContext = createContext<GoogleCalendarContextType | undefined>(undefined);

export const useGoogleCalendar = () => {
  const context = useContext(GoogleCalendarContext);
  if (!context) throw new Error('useGoogleCalendar must be used within a GoogleCalendarProvider');
  return context;
};

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export const GoogleCalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  // const { user } = useAuth(); // Assume user context exists

  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [calendarId, setCalendarId] = useState<string | null>(null);
  const [calendarName, setCalendarName] = useState<string | null>(null);
  const [isPrimaryCalendar, setIsPrimaryCalendar] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<'IDLE' | 'IN_PROGRESS' | 'DELETING'>('IDLE');

  // Generic connect method
  const connectToGoogle = async () => {
    // Basic validation & OAuth flow abstraction
    setIsSyncing(true);
    try {
      // const tokenResponse = await googleCalendarService.initiateGoogleOAuth();
      // await refreshStatus();
      setIsConnected(true);
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const syncSingleEntity = async (entityId: string) => {
    if (!isConnected) throw new Error('Not connected');
    if (calendarId === 'primary' || !calendarId) {
      throw new Error('Cannot sync to primary calendar. Please choose a dedicated calendar.');
    }

    setIsSyncing(true);
    try {
      // await googleCalendarService.syncEntityToCalendar(entityId);
    } finally {
      setIsSyncing(false);
    }
  };

  const syncMultipleEntities = async (entityIds: string[]) => {
    if (!isConnected) throw new Error('Not connected');
    if (calendarId === 'primary' || !calendarId) {
      throw new Error('Cannot sync to primary calendar. Please choose a dedicated calendar.');
    }

    setIsSyncing(true);
    try {
      setSyncStatus('IN_PROGRESS'); // Optimistic update
      // await googleCalendarService.syncMultipleEntities(entityIds);
      // tracking bulk transactions here...
    } finally {
      setIsSyncing(false);
    }
  };

  // ... implementation of createCalendar, updateCalendarSelection, disconnect, etc.

  const value: GoogleCalendarContextType = {
    isConnected,
    isSyncing,
    calendarId,
    calendarName,
    isPrimaryCalendar,
    syncStatus,
    connectToGoogle,
    syncSingleEntity,
    syncMultipleEntities,
    createCalendar: async () => ({ calendarId: '', calendarName: '' }), // dummy implementation for template
    updateCalendarSelection: async () => { }, // dummy implementation for template
    disconnect: async () => { }, // dummy implementation for template
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleCalendarContext.Provider value={value}>
        {children}
      </GoogleCalendarContext.Provider>
    </GoogleOAuthProvider>
  );
};
