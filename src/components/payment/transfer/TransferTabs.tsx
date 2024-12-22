import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface TransferTabsProps {
  activeTab: 'send' | 'receive';
  onTabChange: (tab: 'send' | 'receive') => void;
}

const TransferTabs: React.FC<TransferTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex gap-4 mb-6">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onTabChange('send')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          activeTab === 'send'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
        }`}
      >
        <ArrowUpRight className="w-4 h-4" />
        <span>Send</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onTabChange('receive')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          activeTab === 'receive'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
        }`}
      >
        <ArrowDownLeft className="w-4 h-4" />
        <span>Receive</span>
      </motion.button>
    </div>
  );
};

export default TransferTabs;