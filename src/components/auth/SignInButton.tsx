import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, ExternalLink } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/useToast';
import { isInIframe, canUsePopups } from '../../utils/iframe';
import { AUTH_ERRORS } from '../../utils/errors';

interface SignInButtonProps {
  className?: string;
}

const SignInButton: React.FC<SignInButtonProps> = ({ className = '' }) => {
  const { signInWithGoogle } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const inIframe = isInIframe();

  const handleSignIn = async () => {
    if (isLoading) return;
    
    if (inIframe && !canUsePopups()) {
      window.open(window.location.href, '_blank');
      return;
    }

    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error: any) {
      console.error('Sign in error:', error);
      if (error?.code === 'auth/iframe-blocked') {
        showToast('Authentication is not available in iframes', 'error');
      } else if (error?.code === 'auth/popup-blocked' || error?.code === 'auth/popup-closed-by-user') {
        showToast('Please enable popups to sign in', 'error');
      } else if (error?.code === 'auth/cancelled-popup-request') {
        showToast('Sign in cancelled', 'info');
      } else if (error?.code === 'auth/network-request-failed') {
        showToast('Network error. Please check your connection.', 'error');
      } else {
        showToast('Failed to sign in. Please try again.', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={inIframe ? () => window.open(window.location.href, '_blank') : handleSignIn}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {inIframe ? (
        <>
          <ExternalLink className="w-5 h-5" />
          <span>Open in New Window</span>
        </>
      ) : (
        <>
          <LogIn className="w-5 h-5" />
          <span>{isLoading ? 'Signing in...' : 'Sign In with Google'}</span>
        </>
      )}
    </motion.button>
  );
};

export default SignInButton;