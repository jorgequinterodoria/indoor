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

  const login = async (user: string, password: string) => {
    // Llamada a la API para verificar las credenciales
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`);
    const users = await response.json();
  
    const userData = users.find((userData: { user: string; pass: string; rol: string }) => 
      userData.user === user && userData.pass === password
    );
  
    if (userData) {
      const { id, nombre, rol } = userData;
      setUser({ id, email: user, name: nombre, role: rol });
      localStorage.setItem(AUTH_KEY, JSON.stringify({ id, email: user, name: nombre, role: rol }));
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