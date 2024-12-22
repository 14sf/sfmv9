import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Moon, Sun, Globe, DollarSign } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

const PreferencesSection: React.FC = () => {
  const [preferences, setPreferences] = useState({
    theme: 'system',
    language: 'en',
    currency: 'SFM',
    timezone: 'Africa/Kigali'
  });

  const { showToast } = useToast();

  const handleSave = async () => {
    try {
      // In a real app, this would make an API call
      showToast('Preferences updated successfully!', 'success');
    } catch (error) {
      showToast('Failed to update preferences', 'error');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Account Preferences
        </h2>
      </div>

      <div className="space-y-6">
        {/* Theme */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Theme
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { id: 'light', icon: Sun, label: 'Light' },
              { id: 'dark', icon: Moon, label: 'Dark' },
              { id: 'system', icon: Settings, label: 'System' }
            ].map(({ id, icon: Icon, label }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPreferences({ ...preferences, theme: id })}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 ${
                  preferences.theme === id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Language
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={preferences.language}
              onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="rw">Kinyarwanda</option>
            </select>
          </div>
        </div>

        {/* Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Default Currency
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={preferences.currency}
              onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="SFM">SFM Token</option>
              <option value="USD">US Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="RWF">Rwandan Franc (RWF)</option>
            </select>
          </div>
        </div>

        {/* Timezone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Timezone
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={preferences.timezone}
              onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="Africa/Kigali">Kigali (GMT+2)</option>
              <option value="UTC">UTC</option>
              <option value="Europe/London">London (GMT+1)</option>
              <option value="America/New_York">New York (GMT-4)</option>
            </select>
          </div>
        </div>

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

export default PreferencesSection;