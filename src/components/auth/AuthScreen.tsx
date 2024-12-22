import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/useToast';
import SignInButton from './SignInButton';
import SignUpForm from './SignUpForm';

const AuthScreen: React.FC = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const { signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, this would sign in with email/password
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('Successfully signed in!', 'success');
    } catch (error) {
      showToast('Failed to sign in', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to continue to SFM
            </p>
          </div>

          {showSignUp ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <SignUpForm />
              <button
                onClick={() => setShowSignUp(false)}
                className="w-full text-center mt-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              >
                Already have an account? Sign in
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Sign In */}
              <SignInButton className="w-full" />

              {/* Sign Up Link */}
              <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <button
                  onClick={() => setShowSignUp(true)}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Sign up
                </button>
              </p>
            </>
          )}

          <p className="mt-8 text-sm text-center text-gray-500 dark:text-gray-400">
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1")'
      }}>
        <div className="h-full w-full backdrop-blur-sm backdrop-brightness-50 flex items-center justify-center p-12">
          <div className="max-w-xl text-white text-center">
            <h2 className="text-4xl font-bold mb-6">
              Welcome to SFM
            </h2>
            <p className="text-xl">
              Your complete financial management solution
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;