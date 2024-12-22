import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

const NotificationCenter: React.FC = () => {
  const { showToast } = useToast();
  const unseenCount = 0; // This would come from your notification system

  const handleClick = () => {
    showToast('Notifications coming soon!', 'info');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="relative cursor-pointer"
    >
      <Bell className="w-6 h-6 text-gray-400 hover:text-gray-300" />
      {unseenCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
          {unseenCount}
        </span>
      )}
    </motion.div>
  );
};

export default NotificationCenter;