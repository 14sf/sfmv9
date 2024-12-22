import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface ExchangeRate {
  currency: string;
  rate: number;
  change: number;
}

interface ExchangeRatesProps {
  rates: ExchangeRate[];
}

const ExchangeRates: React.FC<ExchangeRatesProps> = ({ rates }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rates.map((rate) => (
        <motion.div
          key={rate.currency}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  SFM/{rate.currency}
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {rate.rate.toFixed(8)}
                </p>
              </div>
            </div>
            <div className={`flex items-center ${
              rate.change >= 0
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {rate.change >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm font-medium">
                {Math.abs(rate.change).toFixed(2)}%
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ExchangeRates;