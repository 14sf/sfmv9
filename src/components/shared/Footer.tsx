import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 pb-16 md:pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
          <span>Made with</span>
          <Heart className="w-4 h-4 mx-1 text-red-500" />
          <span>by Songa Finance Manager Team</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;