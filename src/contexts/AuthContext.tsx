import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Experience {
  id: string;
  role: string;
  company: string;
  year: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export interface User {
  name: string;
  email: string;
  school: string;
  city: string;
  age?: string;
  source?: string; // How did they hear about us
  avatar?: string;
  bio?: string;
  headline?: string; // e.g. "Data Science Student"
  experience: Experience[];
  education: Education[];
  links?: { label: string; url: string }[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => void;
  signup: (userData: Partial<User>) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('datasphere_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password?: string) => {
    // Simulate login - in real app, verify password
    const existingUserStr = localStorage.getItem('datasphere_user_db_' + email);
    
    let userToLogin: User;

    if (existingUserStr) {
      userToLogin = JSON.parse(existingUserStr);
    } else {
      // Create a default user for demo if not found via signup
      userToLogin = {
        name: 'Étudiant Data',
        email: email,
        school: 'ESTEM',
        city: 'Casablanca',
        experience: [],
        education: [],
        avatar: `https://ui-avatars.com/api/?name=Etudiant+Data&background=1E3A8A&color=fff`
      };
    }
    
    setUser(userToLogin);
    localStorage.setItem('datasphere_user', JSON.stringify(userToLogin));
  };

  const signup = (userData: Partial<User>) => {
    const newUser: User = {
      name: userData.name || 'Utilisateur',
      email: userData.email || '',
      school: userData.school || '',
      city: userData.city || 'Maroc',
      age: userData.age,
      source: userData.source,
      experience: [],
      education: [],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'User')}&background=1E3A8A&color=fff`,
      ...userData
    } as User;

    // Save to "DB" and set as current session
    localStorage.setItem('datasphere_user_db_' + newUser.email, JSON.stringify(newUser));
    localStorage.setItem('datasphere_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('datasphere_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('datasphere_user', JSON.stringify(updatedUser));
      // Also update the "DB" record
      localStorage.setItem('datasphere_user_db_' + user.email, JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateUser }}>
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