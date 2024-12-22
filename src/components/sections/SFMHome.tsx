import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, BookOpen, Building, Store, Shield, DollarSign, TrendingUp, Settings, CreditCard, User } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

const SFMHome: React.FC = () => {
  const { showToast } = useToast();

  const handleAction = (action: string) => {
    showToast(`${action} feature coming soon!`, 'info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Welcome to SFM
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 mb-8"
          >
            Your complete financial management solution
          </motion.p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Balance', value: '75,000 CHF', icon: Wallet, change: '+5.2%', trend: 'up' },
            { label: 'Fiat Balance', value: '50,000 CHF', icon: DollarSign, change: '+3.1%', trend: 'up' },
            { label: 'Crypto Holdings', value: '25,000 CHF', icon: TrendingUp, change: '-2.3%', trend: 'down' },
            { label: 'Active Cards', value: '3', icon: CreditCard, change: '0', trend: 'neutral' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 p-6 rounded-xl border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <stat.icon className="w-6 h-6 text-gray-300" />
                </div>
                {stat.change !== '0' && (
                  <span className={`text-sm ${
                    stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { title: 'SFMPay', description: 'Secure payment solutions', icon: Wallet, color: 'blue' },
            { title: 'SFMBook', description: 'Financial tracking & management', icon: BookOpen, color: 'green' },
            { title: 'SFMRealEstate', description: 'Property management platform', icon: Building, color: 'purple' }
          ].map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-${service.color}-500 transition-colors group`}
            >
              <div className={`p-3 bg-${service.color}-900/20 rounded-lg inline-block mb-4 group-hover:bg-${service.color}-900/30 transition-colors`}>
                <service.icon className={`w-6 h-6 text-${service.color}-500`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAction(service.title)}
                className={`w-full py-2 bg-${service.color}-600 text-white rounded-lg hover:bg-${service.color}-700 transition-colors`}
              >
                Access {service.title}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 p-6 rounded-xl border border-gray-700"
          >
            <Store className="w-8 h-8 text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">SFMarket</h3>
            <p className="text-gray-400 mb-4">
              Your one-stop marketplace for everything SFM
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAction('SFMarket')}
              className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Explore Market
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 p-6 rounded-xl border border-gray-700"
          >
            <Shield className="w-8 h-8 text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Security Center</h3>
            <p className="text-gray-400 mb-4">
              Manage your security settings and preferences
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAction('Security Center')}
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Security Settings
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SFMHome;