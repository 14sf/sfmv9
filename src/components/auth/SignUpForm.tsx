import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, Lock } from 'lucide-react';
import { signUp } from '../../services/auth';
import { useToast } from '../../hooks/useToast';
import { AUTH_ERROR_MESSAGES } from '../../utils/auth/errorMessages';
import { validateEmail, validatePassword, validatePhone, validateBirthDate } from '../../utils/auth/validation';
import AuthError from './AuthError';

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    birthDate: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const validateForm = (): boolean => {
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!validatePassword(formData.password)) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    if (!validatePhone(formData.phone)) {
      setError('Please enter a valid phone number');
      return false;
    }
    
    if (!validateBirthDate(formData.birthDate)) {
      setError('You must be at least 18 years old');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    setError(null);
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // Check if email exists first
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setError(AUTH_ERROR_MESSAGES['auth/email-already-in-use']);
        showToast(AUTH_ERROR_MESSAGES['auth/email-already-in-use'], 'error');
        return;
      }

      const userCredential = await signUp(
        formData.email,
        formData.password,
        formData.phone,
        formData.birthDate,
        formData.address
      );
      
      showToast('Account created successfully!', 'success');
    } catch (error: any) {
      console.error('Sign up error:', error);
      let errorMessage = AUTH_ERROR_MESSAGES.default;
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = AUTH_ERROR_MESSAGES['auth/email-already-in-use'];
      } else if (error.code && AUTH_ERROR_MESSAGES[error.code as keyof typeof AUTH_ERROR_MESSAGES]) {
        errorMessage = AUTH_ERROR_MESSAGES[error.code as keyof typeof AUTH_ERROR_MESSAGES];
      }
      
      setError(errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500"
            placeholder="Create a password"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500"
            placeholder="Enter your phone number"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Date of Birth
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Address
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500"
            placeholder="Enter your address"
            required
          />
        </div>
      </div>

      {error && <AuthError message={error} />}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </motion.button>
    </form>
  );
};

export default SignUpForm;