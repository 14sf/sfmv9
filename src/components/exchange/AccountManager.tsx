import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Mail, Phone, Shield, Edit2, Key } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useProfile } from '../../contexts/ProfileContext';

const AccountManager: React.FC = () => {
  const { profileImage, setProfileImage, userName, setUserName } = useProfile();
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userName);

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

  const handleUpdateProfile = () => {
    showToast('Profile updated successfully!', 'success');
  };

  const handleSaveUsername = () => {
    if (editedName.trim()) {
      setUserName(editedName);
      setIsEditing(false);
      showToast('Username updated successfully!', 'success');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <img
            src={profileImage}
            alt="Profile"
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
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="px-2 py-1 text-xl font-bold text-gray-900 dark:text-white bg-transparent border-b-2 border-blue-500 focus:outline-none"
                autoFocus
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSaveUsername}
                className="text-blue-600 dark:text-blue-400"
              >
                Save
              </motion.button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{userName}</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Edit2 className="w-4 h-4" />
              </motion.button>
            </div>
          )}
          <p className="text-gray-600 dark:text-gray-400">Premium Member</p>
        </div>
      </div>

      {/* Account Details */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                defaultValue="john@example.com"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                readOnly
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
                defaultValue="+250789123456"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Security Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Secure your account with 2FA</p>
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">Update your password</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                Update
              </button>
            </div>
          </div>
        </div>

        {/* Save Changes */}
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpdateProfile}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AccountManager;