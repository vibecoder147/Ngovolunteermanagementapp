import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'superadmin' | 'admin' | 'member' | 'volunteer';
export type Theme = 'light' | 'dark';

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  currentUser: CurrentUser | null;
  setCurrentUser: (user: CurrentUser | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(p => p === 'light' ? 'dark' : 'light');

  return (
    <AppContext.Provider value={{ theme, toggleTheme, currentUser, setCurrentUser }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
