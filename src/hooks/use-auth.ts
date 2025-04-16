'use client';

import {useState, useEffect, createContext, useContext, ReactNode} from 'react';
import {auth} from '@/lib/firebase';
import {onAuthStateChanged, User} from 'firebase/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    }).catch((error) => {
      console.error('Firebase Auth error:', error);
    });

    return () => unsubscribe();
  }, []);

  const authContextValue: AuthContextType = {
    isAuthenticated,
    user,
  };

  return (
    
      {children}
    
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

