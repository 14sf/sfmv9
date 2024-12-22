import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, Search, Wallet } from 'lucide-react';
import CryptoCarousel from './CryptoCarousel';
import ConnectWallet from '../wallet/ConnectWallet';
import AddFundsModal from './AddFundsModal';
import DodoExWidget from './DodoExWidget';
import { useToast } from '../../hooks/useToast';
import { useCryptoData } from '../../hooks/exchange/useCryptoData';

const ExchangeDashboard: React.FC = () => {
  const [showAddFunds, setShowAddFunds] = useState(false);
  const { showToast } = useToast();
  const { prices, priceHistory, isLoading } = useCryptoData();

  const handleTrade = (type: 'buy' | 'sell') => {
    showToast(`${type === 'buy' ? 'Buy' : 'Sell'} feature coming soon!`, 'info');
  };

  return (
    <div className="space-y-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Connect Wallet */}
        <div className="mb-8">
          <ConnectWallet />
        </div>

        {/* Crypto Carousel */}
        <CryptoCarousel
          cryptos={[
            {
              name: 'SFM Token',
              symbol: 'SFM',
              price: prices.sfm,
              change24h: 5.2,
              priceHistory
            },
            {
              name: 'Bitcoin',
              symbol: 'BTC',
              price: prices.btc,
              change24h: 3.1,
              priceHistory: priceHistory.map(p => ({ ...p, price: p.price * 40000 }))
            },
            {
              name: 'Ethereum',
              symbol: 'ETH',
              price: prices.eth,
              change24h: 2.5,
              priceHistory: priceHistory.map(p => ({ ...p, price: p.price * 2500 }))
            }
          ]}
        />

        {/* Header */}
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SFM Exchange</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage your crypto and fiat assets</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddFunds(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Add Funds
          </motion.button>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Portfolio Value', value: 'CHF 75,000', icon: DollarSign, color: 'green' },
            { label: 'Fiat Balance', value: 'CHF 50,000', icon: Wallet, color: 'blue' },
            { label: 'Crypto Holdings', value: 'CHF 25,000', icon: DollarSign, color: 'yellow' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-${stat.color}-100 dark:bg-${stat.color}-900 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DodoEx Widget */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <DodoExWidget />
        </div>

        {/* Trading Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleTrade('buy')}
            className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              <div>
                <h3 className="font-medium text-green-600 dark:text-green-400">Buy SFM</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current price: CHF {prices.sfm}</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleTrade('sell')}
            className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
              <div>
                <h3 className="font-medium text-red-600 dark:text-red-400">Sell SFM</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current price: CHF {prices.sfm}</p>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Add Funds Modal */}
        {showAddFunds && (
          <AddFundsModal onClose={() => setShowAddFunds(false)} />
        )}
      </div>
    </div>
  );
};

export default ExchangeDashboard;