import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Key, Smartphone, History } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

const SecuritySection: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const { showToast } = useToast();

  const handlePasswordChange = async () => {
    try {
      // In a real app, this would open a password change modal
      showToast('Password updated successfully!', 'success');
    } catch (error) {
      showToast('Failed to update password', 'error');
    }
  };

  const handleTwoFactorToggle = async () => {
    try {
      // In a real app, this would handle 2FA setup/disable
      setTwoFactorEnabled(!twoFactorEnabled);
      showToast(
        `Two-factor authentication ${twoFactorEnabled ? 'disabled' : 'enabled'}!`,
        'success'
      );
    } catch (error) {
      showToast('Failed to update two-factor authentication', 'error');
    }
  };

  const loginHistory = [
    {
      timestamp: Date.now() - 3600000,
      device: 'Chrome on Windows',
      location: 'Kigali, Rwanda',
      ip: '196.12.34.56'
    },
    {
      timestamp: Date.now() - 86400000,
      device: 'Safari on iPhone',
      location: 'Kigali, Rwanda',
      ip: '196.12.34.57'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Password Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Key className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Password & Authentication
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Password</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Last changed 30 days ago
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePasswordChange}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Change Password
            </motion.button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Two-Factor Authentication
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTwoFactorToggle}
              className={`px-4 py-2 rounded-lg ${
                twoFactorEnabled
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              } text-white`}
            >
              {twoFactorEnabled ? 'Disable' : 'Enable'} 2FA
            </motion.button>
          </div>
        </div>
      </div>

      {/* Login History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <History className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Login History
          </h3>
        </div>

        <div className="space-y-4">
          {loginHistory.map((login, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {login.device}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>{login.location}</span>
                  <span>•</span>
                  <span>{login.ip}</span>
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(login.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;