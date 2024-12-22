import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CreditCard, Smartphone, Wallet, DollarSign } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface AddFundsModalProps {
  onClose: () => void;
}

const AddFundsModal: React.FC<AddFundsModalProps> = ({ onClose }) => {
  const [amount, setAmount] = useState('');
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }
    
    // Redirect to SFMPay with the amount
    window.location.href = `/sfmpay?amount=${amount}&redirect=exchange`;
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: CreditCard, description: 'Pay with credit or debit card' },
    { id: 'momo', name: 'Mobile Money', icon: Smartphone, description: 'Pay with MTN/Airtel Money' },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet, description: 'Pay with Google Pay' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add Funds
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Amount (CHF)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Payment Method
            </label>
            {paymentMethods.map((method) => (
              <motion.button
                key={method.id}
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center gap-4 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500"
              >
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <method.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">{method.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{method.description}</p>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Continue to Payment
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddFundsModal;