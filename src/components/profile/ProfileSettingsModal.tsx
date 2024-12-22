import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Mail, Phone, Shield, Key, Globe, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/useToast';
import { getUserProfile, updateUserProfile } from '../../services/auth';

interface ProfileSettingsModalProps {
  onClose: () => void;
}

const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    email: currentUser?.email || '',
    phone: '',
    country: 'RW',
    dateOfBirth: '1990-01-01',
    language: 'en'
  });
  const [profileImage, setProfileImage] = useState(currentUser?.photoURL || '');

  useEffect(() => {
    const loadProfile = async () => {
      if (!currentUser) return;
      
      try {
        const profile = await getUserProfile(currentUser.uid);
        if (profile) {
          setFormData(prev => ({
            ...prev,
            phone: profile.phone || '',
            dateOfBirth: profile.birthDate || '',
            country: profile.country || 'RW'
          }));
        }
        setIsLoading(false);
      } catch (error) {
        showToast('Failed to load profile', 'error');
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [currentUser, showToast]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        showToast('Profile photo updated successfully!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      await updateUserProfile(currentUser.uid, {
        phone: formData.phone,
        birthDate: formData.dateOfBirth,
        country: formData.country
      });
      showToast('Profile updated successfully!', 'success');
      onClose();
    } catch (error) {
      showToast('Failed to update profile', 'error');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Settings</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={profileImage}
                  alt={currentUser?.displayName || 'Profile'}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <label className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {currentUser?.displayName || 'User'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Update your profile photo</p>
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={currentUser?.email || ''}
                    readOnly
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Country
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  >
                    <option value="RW">Rwanda</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Change Password</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Update your password</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                    Update
                  </button>
                </div>
              </div>
            </div>

            {/* Save Changes */}
            <div className="flex justify-end gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProfileSettingsModal;