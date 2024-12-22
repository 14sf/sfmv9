import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AuthErrorProps {
  message: string;
}

const AuthError: React.FC<AuthErrorProps> = ({ message }) => {
  return (
    <div className="flex items-center gap-2 p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg animate-shake">
      <AlertCircle className="w-5 h-5" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default AuthError;