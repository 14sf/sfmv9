import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

interface Transfer {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  currency: string;
  recipient: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: number;
}

interface TransferHistoryProps {
  transfers: Transfer[];
}

const TransferHistory: React.FC<TransferHistoryProps> = ({ transfers }) => {
  return (
    <div className="space-y-4">
      {transfers.map((transfer, index) => (
        <motion.div
          key={transfer.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                transfer.type === 'send'
                  ? 'bg-red-100 dark:bg-red-900'
                  : 'bg-green-100 dark:bg-green-900'
              }`}>
                {transfer.type === 'send' ? (
                  <ArrowUpRight className={`w-4 h-4 ${
                    transfer.type === 'send'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-green-600 dark:text-green-400'
                  }`} />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-green-600 dark:text-green-400" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {transfer.type === 'send' ? 'Sent to' : 'Received from'} {transfer.recipient}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(transfer.timestamp).toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-medium ${
                transfer.type === 'send'
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-green-600 dark:text-green-400'
              }`}>
                {transfer.type === 'send' ? '-' : '+'}{transfer.amount} {transfer.currency}
              </p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                transfer.status === 'completed'
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                  : transfer.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'
                  : 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TransferHistory;