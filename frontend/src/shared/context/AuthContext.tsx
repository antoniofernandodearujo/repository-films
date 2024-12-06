"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import UserAPI from '@/api/User';
import { useRouter } from 'next/navigation'; // Altere a importação aqui

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter(); // Chama o useRouter aqui

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await UserAPI.login({ email, password });
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.id); // Armazenando o ID do usuário
        setIsAuthenticated(true);
        router.push('/painel'); // Redireciona para o painel após login
        return true; // Login bem-sucedido
      }
      return false; // Falha no login
    } catch (error) {
      console.error("Login failed:", error);
      return false; // Falha no login
    }
  };

  

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // Removendo o ID do usuário
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
