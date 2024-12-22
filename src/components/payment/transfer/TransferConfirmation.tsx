import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

interface TransferConfirmationProps {
  data: {
    amount: number;
    currency: string;
    recipient: string;
    fee: number;
    total: number;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

const TransferConfirmation: React.FC<TransferConfirmationProps> = ({
  data,
  onConfirm,
  onCancel
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-center mb-6">
        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
          <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white mb-6">
        Confirm Transfer
      </h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span className="text-gray-600 dark:text-gray-400">Amount</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {data.amount} {data.currency}
          </span>
        </div>

        <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span className="text-gray-600 dark:text-gray-400">Recipient</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {data.recipient}
          </span>
        </div>

        <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span className="text-gray-600 dark:text-gray-400">Fee</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {data.fee} {data.currency}
          </span>
        </div>

        <div className="flex justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <span className="font-medium text-blue-600 dark:text-blue-400">Total</span>
          <span className="font-medium text-blue-600 dark:text-blue-400">
            {data.total} {data.currency}
          </span>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900"
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onConfirm}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Confirm
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default TransferConfirmation;