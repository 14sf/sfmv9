import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownLeft, DollarSign, Globe } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';
import { ALL_COUNTRIES } from '../../../types/countries';

interface TransferReceiveFormProps {
  onSubmit: (data: ReceiveData) => void;
  onCancel: () => void;
}

interface ReceiveData {
  amount: number;
  currency: string;
  senderName: string;
  senderPhone: string;
  senderCountry: string;
}

const TransferReceiveForm: React.FC<TransferReceiveFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<ReceiveData>({
    amount: 0,
    currency: 'SFM',
    senderName: '',
    senderPhone: '',
    senderCountry: 'US'
  });

  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formData);
  };

  const validateForm = () => {
    if (formData.amount <= 0) {
      showToast('Please enter a valid amount', 'error');
      return false;
    }
    if (!formData.senderName.trim()) {
      showToast('Please enter sender name', 'error');
      return false;
    }
    if (!formData.senderPhone.trim()) {
      showToast('Please enter sender phone', 'error');
      return false;
    }
    return true;
  };

  const getPhonePrefix = (countryCode: string) => {
    const country = ALL_COUNTRIES.find(c => c.code === countryCode);
    return country?.phoneCode || '';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <ArrowDownLeft className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Receive Transfer
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount and Currency */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Currency
            </label>
            <select
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="SFM">SFM Token</option>
              <option value="USD">US Dollar</option>
              <option value="EUR">Euro</option>
              <option value="RWF">Rwandan Franc</option>
            </select>
          </div>
        </div>

        {/* Sender Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sender Name
            </label>
            <input
              type="text"
              value={formData.senderName}
              onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sender Country
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.senderCountry}
                onChange={(e) => setFormData({ ...formData, senderCountry: e.target.value })}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              >
                {ALL_COUNTRIES.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sender Phone
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                +{getPhonePrefix(formData.senderCountry)}
              </span>
              <input
                type="tel"
                value={formData.senderPhone}
                onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
                className="flex-1 rounded-r-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-3 py-2"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Request Transfer
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransferReceiveForm;