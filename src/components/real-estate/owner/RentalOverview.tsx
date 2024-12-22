import React from 'react';
import { motion } from 'framer-motion';
import { Home, Users, AlertCircle, CheckCircle, Plus, Clock, Bell } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

const RentalOverview: React.FC = () => {
  const { showToast } = useToast();

  const stats = [
    { label: 'Total Properties', value: '5', icon: Home, color: 'blue' },
    { label: 'Active Tenants', value: '4', icon: Users, color: 'green' },
    { label: 'Pending Issues', value: '2', icon: AlertCircle, color: 'yellow' },
    { label: 'On-time Payments', value: '95%', icon: CheckCircle, color: 'purple' }
  ];

  const tasks = [
    { title: 'Rent Collection', description: 'Due in 5 days', priority: 'high' },
    { title: 'Property Inspection', description: 'Scheduled next week', priority: 'medium' },
    { title: 'Lease Renewal', description: 'Coming up in 2 weeks', priority: 'low' }
  ];

  const handleTaskComplete = (title: string) => {
    showToast(`Task "${title}" marked as complete`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <motion.div
            key={label}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 bg-${color}-100 dark:bg-${color}-900 rounded-lg`}>
                <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tasks and Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Upcoming Tasks
              </h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-sm text-blue-600 dark:text-blue-400"
            >
              View All
            </motion.button>
          </div>

          <div className="space-y-4">
            {tasks.map((task, index) => (
              <motion.div
                key={task.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {task.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {task.description}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTaskComplete(task.title)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    task.priority === 'high'
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/20'
                      : task.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20'
                      : 'bg-green-100 text-green-600 dark:bg-green-900/20'
                  }`}
                >
                  {task.priority}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Notifications
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { text: 'Rent payment received from John Doe', time: '2h ago', type: 'payment' },
              { text: 'New maintenance request submitted', time: '1d ago', type: 'maintenance' },
              { text: 'Lease renewal reminder sent', time: '2d ago', type: 'document' }
            ].map((notification, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <span className="text-gray-900 dark:text-white">{notification.text}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{notification.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalOverview;