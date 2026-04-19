import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'sepia' | 'dark';

interface SettingsContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [fontSize, setFontSize] = useState<number>(0);

  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
  }, [theme]);

  // Read saved settings
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedTheme) setTheme(savedTheme);
    if (savedFontSize !== null) setFontSize(parseInt(savedFontSize, 10));
  }, []);

  // Save settings
  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('fontSize', fontSize.toString());
  }, [theme, fontSize]);

  return (
    <SettingsContext.Provider value={{ theme, setTheme, fontSize, setFontSize }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
