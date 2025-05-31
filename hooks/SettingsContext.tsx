"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  // Add other user preference settings here
  // 예를 들어: defaultModel: string;
}

interface SettingsContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  // Potentially add functions to load/save settings from/to local storage or backend
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  // TODO: Load initial settings from local storage or backend
  const [settings, setSettings] = useState<UserSettings>({
    theme: 'system',
    // Set default values for other settings
  });

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
    // TODO: Save updated settings to local storage or backend
  };

  const value = {
    settings,
    updateSettings,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}; 