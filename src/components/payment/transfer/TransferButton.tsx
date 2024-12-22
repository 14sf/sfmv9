import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

interface TransferButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}

const TransferButton: React.FC<TransferButtonProps> = ({
  onClick,
  label = 'Transfer',
  disabled = false
}) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
        disabled
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
      } text-white`}
    >
      <Send className="w-4 h-4" />
      <span>{label}</span>
    </motion.button>
  );
};

export default TransferButton;