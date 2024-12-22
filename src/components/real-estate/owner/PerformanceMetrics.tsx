import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Percent, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const PerformanceMetrics: React.FC = () => {
  const metrics = [
    {
      label: 'Return on Investment',
      value: '8.5%',
      change: '+1.2%',
      trend: 'up',
      color: 'blue'
    },
    {
      label: 'Occupancy Rate',
      value: '95%',
      change: '+2.5%',
      trend: 'up',
      color: 'green'
    },
    {
      label: 'Monthly Income',
      value: '$12,500',
      change: '-3.1%',
      trend: 'down',
      color: 'purple'
    },
    {
      label: 'Property Value',
      value: '$450,000',
      change: '+5.2%',
      trend: 'up',
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 bg-${metric.color}-100 dark:bg-${metric.color}-900 rounded-lg`}>
                {metric.label.includes('Return') ? (
                  <Percent className={`w-5 h-5 text-${metric.color}-600 dark:text-${metric.color}-400`} />
                ) : (
                  <DollarSign className={`w-5 h-5 text-${metric.color}-600 dark:text-${metric.color}-400`} />
                )}
              </div>
              <div className={`flex items-center ${
                metric.trend === 'up'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {metric.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                <span className="text-sm">{metric.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {metric.value}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {metric.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Performance Overview
          </h3>
          <select className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700">
            <option value="year">Last 12 months</option>
            <option value="quarter">Last 3 months</option>
            <option value="month">Last month</option>
          </select>
        </div>
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            Chart visualization will be implemented here
          </p>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
        >
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Investment Insights
          </h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <TrendingUp className="w-4 h-4 text-green-600" />
              Property value increased by 5.2% this year
            </li>
            <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <TrendingUp className="w-4 h-4 text-green-600" />
              Rental income growth of 3.1% quarter-over-quarter
            </li>
          </ul>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
        >
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Market Analysis
          </h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Area property values up 7.5% on average
            </li>
            <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Local rental demand increased by 12%
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};