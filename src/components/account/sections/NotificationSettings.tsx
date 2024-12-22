import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, MessageSquare, Shield, DollarSign } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    email: {
      transfers: true,
      payments: true,
      security: true,
      marketing: false
    },
    push: {
      transfers: true,
      payments: true,
      security: true,
      marketing: false
    },
    sms: {
      transfers: false,
      payments: false,
      security: true,
      marketing: false
    }
  });

  const { showToast } = useToast();

  const handleToggle = (channel: keyof typeof settings, type: string) => {
    setSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [type]: !prev[channel][type]
      }
    }));
  };

  const handleSave = async () => {
    try {
      // In a real app, this would make an API call
      showToast('Notification settings updated!', 'success');
    } catch (error) {
      showToast('Failed to update settings', 'error');
    }
  };

  const notificationTypes = [
    { id: 'transfers', icon: DollarSign, label: 'Transfers' },
    { id: 'payments', icon: MessageSquare, label: 'Payments' },
    { id: 'security', icon: Shield, label: 'Security Alerts' },
    { id: 'marketing', icon: Mail, label: 'Marketing' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Notification Settings
        </h2>
      </div>

      <div className="space-y-8">
        {Object.entries(settings).map(([channel, types]) => (
          <div key={channel} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white capitalize">
              {channel} Notifications
            </h3>

            <div className="space-y-4">
              {notificationTypes.map(({ id, icon: Icon, label }) => (
                <div
                  key={id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-600 rounded-lg">
                      <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {label}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive notifications about {label.toLowerCase()}
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={types[id as keyof typeof types]}
                      onChange={() => handleToggle(channel as keyof typeof settings, id)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;