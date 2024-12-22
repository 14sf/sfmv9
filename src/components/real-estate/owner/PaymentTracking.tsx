import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, AlertTriangle, Bell, Download } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

const PaymentTracking: React.FC = () => {
  const { showToast } = useToast();

  const handleGenerateReceipt = () => {
    showToast('Receipt generated and sent automatically', 'success');
  };

  const handleSendReminder = () => {
    showToast('Payment reminder sent to tenant', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Payment Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Payment Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Rent Collected</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">$12,500</p>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Outstanding Payments</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">$2,300</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Next Due Date</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">Mar 1</p>
          </div>
        </div>
      </div>

      {/* Payment Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Payment Reminders</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Send automated reminders</p>
            </div>
          </div>
          <button
            onClick={handleSendReminder}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send Reminder
          </button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Download className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Generate Receipt</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Create and send receipts</p>
            </div>
          </div>
          <button
            onClick={handleGenerateReceipt}
            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Generate Receipt
          </button>
        </motion.div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Payments
        </h3>
        <div className="space-y-4">
          {[
            { tenant: 'John Doe', amount: 1500, status: 'paid', date: '2024-02-15' },
            { tenant: 'Jane Smith', amount: 1200, status: 'pending', date: '2024-02-14' },
            { tenant: 'Mike Johnson', amount: 1800, status: 'overdue', date: '2024-02-01' }
          ].map((payment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  payment.status === 'paid'
                    ? 'bg-green-100 dark:bg-green-900'
                    : payment.status === 'pending'
                    ? 'bg-yellow-100 dark:bg-yellow-900'
                    : 'bg-red-100 dark:bg-red-900'
                }`}>
                  <DollarSign className={`w-4 h-4 ${
                    payment.status === 'paid'
                      ? 'text-green-600 dark:text-green-400'
                      : payment.status === 'pending'
                      ? 'text-yellow-600 dark:text-yellow-400'
                      : 'text-red-600 dark:text-red-400'
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{payment.tenant}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{payment.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 dark:text-white">
                  ${payment.amount}
                </p>
                <p className={`text-sm ${
                  payment.status === 'paid'
                    ? 'text-green-600 dark:text-green-400'
                    : payment.status === 'pending'
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};