import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Share2 } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

interface TransferSuccessProps {
  data: {
    amount: number;
    currency: string;
    recipient: string;
    transactionId: string;
    timestamp: number;
  };
  onClose: () => void;
}

const TransferSuccess: React.FC<TransferSuccessProps> = ({ data, onClose }) => {
  const { showToast } = useToast();

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a receipt
    showToast('Receipt downloaded successfully!', 'success');
  };

  const handleShare = async () => {
    try {
      const shareData = {
        title: 'SFM Transfer',
        text: `Successfully transferred ${data.amount} ${data.currency} to ${data.recipient}`,
        url: `https://app.example.com/transfer/${data.transactionId}`
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        showToast('Transfer details copied to clipboard!', 'success');
      }
    } catch (error) {
      showToast('Failed to share transfer details', 'error');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm text-center">
      <div className="flex justify-center mb-6">
        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Transfer Successful!
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Your transfer has been completed successfully
      </p>

      <div className="space-y-4 mb-6">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Amount</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.amount} {data.currency}
          </p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Recipient</p>
          <p className="font-medium text-gray-900 dark:text-white">{data.recipient}</p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Transaction ID</p>
          <p className="font-medium text-gray-900 dark:text-white">{data.transactionId}</p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Date & Time</p>
          <p className="font-medium text-gray-900 dark:text-white">
            {new Date(data.timestamp).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownloadReceipt}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Download className="w-4 h-4" />
          Download Receipt
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          <Share2 className="w-4 h-4" />
          Share
        </motion.button>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClose}
        className="mt-4 text-gray-600 dark:text-gray-400 hover:text-gray-900"
      >
        Close
      </motion.button>
    </div>
  );
};

export default TransferSuccess;