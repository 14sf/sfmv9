import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, FileText, Mail } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

const AutomatedTasks: React.FC = () => {
  const { showToast } = useToast();

  const automatedTasks = [
    {
      id: 'rent-reminders',
      title: 'Rent Payment Reminders',
      description: 'Automatically notify tenants about upcoming rent payments',
      icon: Bell,
      enabled: true
    },
    {
      id: 'lease-renewals',
      title: 'Lease Renewal Notifications',
      description: 'Send reminders when leases are approaching expiration',
      icon: Calendar,
      enabled: true
    },
    {
      id: 'auto-receipts',
      title: 'Automatic Receipts',
      description: 'Generate and send receipts when payments are received',
      icon: FileText,
      enabled: true
    },
    {
      id: 'maintenance-updates',
      title: 'Maintenance Updates',
      description: 'Send status updates for maintenance requests',
      icon: Mail,
      enabled: false
    }
  ];

  const handleToggleTask = (id: string) => {
    showToast(`Task automation ${id} toggled`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {automatedTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <task.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {task.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {task.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {task.enabled ? 'Enabled' : 'Disabled'}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={task.enabled}
                  onChange={() => handleToggleTask(task.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Task History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Automated Actions
        </h3>
        <div className="space-y-4">
          {[
            { action: 'Rent reminder sent to John Doe', time: '2h ago' },
            { action: 'Receipt generated for payment #1234', time: '1d ago' },
            { action: 'Lease renewal notice sent to Jane Smith', time: '2d ago' }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <span className="text-gray-900 dark:text-white">{item.action}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutomatedTasks;