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
  login: (email: string, password?: string) => Promise<void>;
  signup: (userData: Partial<User>) => Promise<void>;
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

  const login = async (email: string, password?: string) => {
    try {
      // Try to login via database
      const response = await fetch('/.netlify/functions/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          data: { email, password: password || 'defaultPassword123' }
        })
      });

      if (response.ok) {
        const dbUser = await response.json();
        // Convert database format to app format
        const userToLogin: User = {
          name: dbUser.name,
          email: dbUser.email,
          school: dbUser.school,
          city: dbUser.city,
          age: dbUser.age?.toString(),
          source: dbUser.source,
          avatar: dbUser.avatar,
          headline: dbUser.headline,
          bio: dbUser.bio,
          experience: dbUser.experience || [],
          education: dbUser.education || []
        };
        setUser(userToLogin);
        localStorage.setItem('datasphere_user', JSON.stringify(userToLogin));
        localStorage.setItem('datasphere_user_id', dbUser.user_id.toString());
        return;
      }
    } catch (error) {
      console.error('Database login failed, using demo mode:', error);
    }

    // Fallback to demo/local mode
    const existingUserStr = localStorage.getItem('datasphere_user_db_' + email);
    let userToLogin: User;

    if (existingUserStr) {
      userToLogin = JSON.parse(existingUserStr);
    } else {
      // Create a default user for demo if not found
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

  const signup = async (userData: Partial<User>) => {
    try {
      // Try to signup via database
      const response = await fetch('/.netlify/functions/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'signup',
          data: {
            name: userData.name || 'Utilisateur',
            email: userData.email || '',
            password: 'defaultPassword123', // TODO: Add password field to signup form
            school: userData.school || '',
            age: userData.age ? parseInt(userData.age) : null,
            source: userData.source,
            city: userData.city || 'Maroc'
          }
        })
      });

      if (response.ok) {
        const dbUser = await response.json();
        // Convert database format to app format
        const newUser: User = {
          name: dbUser.name,
          email: dbUser.email,
          school: dbUser.school,
          city: dbUser.city,
          age: dbUser.age?.toString(),
          source: dbUser.source,
          avatar: dbUser.avatar,
          experience: [],
          education: []
        };
        setUser(newUser);
        localStorage.setItem('datasphere_user', JSON.stringify(newUser));
        localStorage.setItem('datasphere_user_id', dbUser.user_id.toString());
        return;
      }
    } catch (error) {
      console.error('Database signup failed, using local mode:', error);
    }

    // Fallback to local mode
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

    // Save to local "DB" and set as current session
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