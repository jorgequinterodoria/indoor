import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_KEY = 'bike_sim_pro_auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem(AUTH_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Mock login - Replace with actual API call
    if (email === 'admin@example.com' && password === 'password') {
      const userData = {
        id: '1',
        email,
        name: 'Admin User',
        role: 'admin'
      };
      setUser(userData);
      localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}