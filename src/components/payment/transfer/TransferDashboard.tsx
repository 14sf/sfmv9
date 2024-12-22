import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import TransferForm from './TransferForm';
import TransferHistory from './TransferHistory';
import { useToast } from '../../../hooks/useToast';

const TransferDashboard: React.FC = () => {
  const [showTransferForm, setShowTransferForm] = useState(false);
  const { showToast } = useToast();

  // Mock transfer history
  const transfers = [
    {
      id: '1',
      type: 'send' as const,
      amount: 1000,
      currency: 'SFM',
      recipient: 'John Doe',
      status: 'completed' as const,
      timestamp: Date.now() - 3600000
    },
    {
      id: '2',
      type: 'receive' as const,
      amount: 500,
      currency: 'SFM',
      recipient: 'Jane Smith',
      status: 'completed' as const,
      timestamp: Date.now() - 86400000
    }
  ];

  const handleTransfer = async (data: any) => {
    try {
      // In a real app, this would make an API call
      showToast('Processing transfer...', 'info');
      await new Promise(resolve => setTimeout(resolve, 2000));
      showToast('Transfer completed successfully!', 'success');
      setShowTransferForm(false);
    } catch (error) {
      showToast('Transfer failed. Please try again.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Send className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Money Transfer
          </h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowTransferForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          New Transfer
        </motion.button>
      </div>

      {showTransferForm ? (
        <TransferForm
          onSubmit={handleTransfer}
          onCancel={() => setShowTransferForm(false)}
        />
      ) : (
        <TransferHistory transfers={transfers} />
      )}
    </div>
  );
};

export default TransferDashboard;