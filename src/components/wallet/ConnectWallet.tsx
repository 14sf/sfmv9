import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, AlertCircle } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

const ConnectWallet: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { showToast } = useToast();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        showToast('Wallet connected successfully!', 'success');
      } else {
        showToast('Please install MetaMask to connect your wallet', 'error');
      }
    } catch (error) {
      showToast('Failed to connect wallet', 'error');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleConnect}
        disabled={isConnecting}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        <Wallet className="w-5 h-5" />
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </motion.button>
      
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <AlertCircle className="w-4 h-4" />
        <span>Connect your wallet to start trading</span>
      </div>
    </div>
  );
};

export default ConnectWallet;