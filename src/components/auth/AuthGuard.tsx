import React, { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AuthScreen from './AuthScreen';
import { motion } from 'framer-motion';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </motion.div>
      </div>
    );
  }

  if (!currentUser) {
    return <AuthScreen />;
  }

  return <>{children}</>;
};

export default AuthGuard;