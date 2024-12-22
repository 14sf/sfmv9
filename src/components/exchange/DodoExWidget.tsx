import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft } from 'lucide-react';
import { TOP_50_CRYPTOS } from '../../utils/constants/cryptos';
import { useToast } from '../../hooks/useToast';

const DodoExWidget: React.FC = () => {
  const { showToast } = useToast();
  const [fromAmount, setFromAmount] = React.useState('');
  const [toAmount, setToAmount] = React.useState('');
  const [fromToken, setFromToken] = React.useState('sfm');
  const [toToken, setToToken] = React.useState('eth');

  const handleSwap = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }

    const moonWalletFee = parseFloat(fromAmount) * 0.015;
    showToast(`Swap initiated! Moon Wallet fee: ${moonWalletFee.toFixed(6)} ${fromToken.toUpperCase()}`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Swap Tokens
          </h3>
        </div>
      </div>

      <div className="space-y-4">
        {/* From Token */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            From
          </label>
          <div className="flex gap-4">
            <select
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
            >
              {TOP_50_CRYPTOS.map(crypto => (
                <option key={crypto.symbol} value={crypto.symbol.toLowerCase()}>
                  {crypto.name} ({crypto.symbol})
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => {
                setFromAmount(e.target.value);
                // Simple mock conversion
                setToAmount((parseFloat(e.target.value) * 0.00025).toString());
              }}
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
            />
          </div>
        </div>

        {/* Swap Icon */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full"
          >
            <ArrowRightLeft className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </motion.button>
        </div>

        {/* To Token */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            To
          </label>
          <div className="flex gap-4">
            <select
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
              value={toToken}
              onChange={(e) => setToToken(e.target.value)}
            >
              {TOP_50_CRYPTOS.filter(crypto => 
                crypto.symbol.toLowerCase() !== fromToken
              ).map(crypto => (
                <option key={crypto.symbol} value={crypto.symbol.toLowerCase()}>
                  {crypto.name} ({crypto.symbol})
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="0.0"
              value={toAmount}
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
              readOnly
            />
          </div>
        </div>

        {/* Exchange Rate */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Exchange Rate</span>
            <span className="font-medium text-gray-900 dark:text-white">
              1 {fromToken.toUpperCase()} = 0.00025 {toToken.toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-600 dark:text-gray-400">Moon Wallet Fee (1.5%)</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {fromAmount ? (parseFloat(fromAmount) * 0.015).toFixed(6) : '0'} {fromToken.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Swap Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSwap}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Swap Tokens
        </motion.button>
      </div>
    </div>
  );
};

export default DodoExWidget;