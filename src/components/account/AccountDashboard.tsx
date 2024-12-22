import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Shield, Bell } from 'lucide-react';
import ProfileSection from './sections/ProfileSection';
import SecuritySection from './sections/SecuritySection';
import NotificationSettings from './sections/NotificationSettings';
import PreferencesSection from './sections/PreferencesSection';

const AccountDashboard: React.FC = () => {
  const sections = [
    { id: 'profile', icon: User, label: 'Profile', component: ProfileSection },
    { id: 'security', icon: Shield, label: 'Security', component: SecuritySection },
    { id: 'notifications', icon: Bell, label: 'Notifications', component: NotificationSettings },
    { id: 'preferences', icon: Settings, label: 'Preferences', component: PreferencesSection }
  ];

  const [activeSection, setActiveSection] = React.useState('profile');

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || ProfileSection;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-2">
            {sections.map(({ id, icon: Icon, label }) => (
              <motion.button
                key={id}
                whileHover={{ x: 4 }}
                onClick={() => setActiveSection(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === id
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </motion.button>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;