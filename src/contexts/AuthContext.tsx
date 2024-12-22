import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { useToast } from '../hooks/useToast';
import { canUsePopups } from '../utils/iframe';
import { AUTH_ERRORS } from '../utils/errors';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      if (!canUsePopups()) {
        throw AUTH_ERRORS.IFRAME_BLOCKED;
      }

      const result = await signInWithPopup(auth, googleProvider);
      showToast(`Welcome ${result.user.displayName}!`, 'success');
    } catch (error: any) {
      console.error('Sign in error:', error);
      if (error?.code === 'auth/popup-blocked') {
        showToast('Please enable popups to sign in', 'error');
      } else if (error?.code === 'auth/cancelled-popup-request') {
        showToast('Sign in cancelled', 'info');
      } else {
        showToast('Failed to sign in. Please try again.', 'error');
      }
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      showToast('Signed out successfully', 'success');
    } catch (error) {
      showToast('Failed to sign out', 'error');
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    signInWithGoogle,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};