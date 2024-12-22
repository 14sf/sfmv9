import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { PriceData } from '../../types/exchange';
import MiniPriceChart from './MiniPriceChart';

interface CryptoCarouselProps {
  cryptos: {
    name: string;
    symbol: string;
    price: number;
    change24h: number;
    priceHistory: PriceData[];
  }[];
}

const CryptoCarousel: React.FC<CryptoCarouselProps> = ({ cryptos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? cryptos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === cryptos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Market Overview
        </h3>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <div className="mb-4">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                {cryptos[currentIndex].name} ({cryptos[currentIndex].symbol})
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  CHF {cryptos[currentIndex].price.toLocaleString()}
                </span>
                <span className={`flex items-center ${
                  cryptos[currentIndex].change24h >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {cryptos[currentIndex].change24h >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {Math.abs(cryptos[currentIndex].change24h)}%
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">24h Volume</span>
                <span className="font-medium text-gray-900 dark:text-white">CHF 1.2M</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Market Cap</span>
                <span className="font-medium text-gray-900 dark:text-white">CHF 25M</span>
              </div>
            </div>
          </div>

          <div className="h-48">
            <MiniPriceChart data={cryptos[currentIndex].priceHistory} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {cryptos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-6 bg-blue-600 dark:bg-blue-400'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CryptoCarousel;