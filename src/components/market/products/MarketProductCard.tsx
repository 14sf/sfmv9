import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Clock } from 'lucide-react';
import { Product } from '../../../types/market';
import { formatCurrency, formatDate } from '../../../utils/format';
import MarketProductActions from './MarketProductActions';

interface MarketProductCardProps {
  product: Product;
}

const MarketProductCard: React.FC<MarketProductCardProps> = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative h-48">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 px-2 py-1 bg-blue-600 text-white text-sm rounded">
          {product.category}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {product.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-blue-600 dark:text-blue-400">
            <DollarSign className="w-5 h-5 mr-1" />
            <span className="font-bold">{formatCurrency(product.price)}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>{formatDate(product.createdAt)}</span>
          </div>
        </div>

        <MarketProductActions product={product} />
      </div>
    </motion.div>
  );
};

export default MarketProductCard;