import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, BookOpen, Building, Store, Shield, DollarSign, TrendingUp, Settings, CreditCard, User, X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import AccountManager from '../account/AccountManager';

const Home: React.FC = () => {
  const { showToast } = useToast();
  const [showAccountManager, setShowAccountManager] = useState(false);

  const handleProfileSettings = () => {
    setShowAccountManager(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-start mb-16">
          <div>
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
            (Songa Finance Manager) Your complete financial management solution
          </motion.p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleProfileSettings}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <User className="w-5 h-5 text-gray-300" />
            <span className="text-gray-300">Profile Settings</span>
          </motion.button>
        </div>

        {/* Overview Section */}
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

        {/* Account Management Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: 'SFMPay',
              description: 'Secure payment solutions',
              icon: Wallet,
              color: 'blue',
              link: 'sfmpay'
            },
            {
              title: 'SFMBook',
              description: 'Financial tracking & management',
              icon: BookOpen,
              color: 'green',
              link: 'sfmbook'
            },
            {
              title: 'SFMRealEstate',
              description: 'Property management platform',
              icon: Building,
              color: 'purple',
              link: 'sfmrealestate'
            }
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
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Security Settings
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      {/* Account Manager Modal */}
      {showAccountManager && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-xl p-6 w-full max-w-4xl relative"
          >
            <button
              onClick={() => setShowAccountManager(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
            <AccountManager onClose={() => setShowAccountManager(false)} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Home;