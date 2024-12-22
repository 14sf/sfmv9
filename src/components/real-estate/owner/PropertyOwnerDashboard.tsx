import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, DollarSign, FileText, Bell, ChartBar, Settings } from 'lucide-react';
import RentalOverview from './RentalOverview';
import PaymentTracking from './PaymentTracking';
import DocumentManager from './DocumentManager';
import PerformanceMetrics from './PerformanceMetrics';
import AutomatedTasks from './AutomatedTasks';

const PropertyOwnerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'documents' | 'performance' | 'automation'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'performance', label: 'Performance', icon: ChartBar },
    { id: 'automation', label: 'Automation', icon: Settings }
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Property Management Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your rental properties efficiently
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === id
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && <RentalOverview />}
          {activeTab === 'payments' && <PaymentTracking />}
          {activeTab === 'documents' && <DocumentManager />}
          {activeTab === 'performance' && <PerformanceMetrics />}
          {activeTab === 'automation' && <AutomatedTasks />}
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyOwnerDashboard;