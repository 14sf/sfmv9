import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Send, Globe, Calculator } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';
import { AFRICAN_COUNTRIES, ALL_COUNTRIES } from '../../../types/countries';

interface TransferFormProps {
  onSubmit: (data: TransferData) => void;
  onCancel: () => void;
}

interface TransferData {
  amount: number;
  sourceCurrency: string;
  targetCurrency: string;
  recipientName: string;
  recipientPhone: string;
  recipientCountry: string;
}

const TransferForm: React.FC<TransferFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<TransferData>({
    amount: 0,
    sourceCurrency: 'SFM',
    targetCurrency: 'USD',
    recipientName: '',
    recipientPhone: '',
    recipientCountry: 'US'
  });

  const [exchangeRate, setExchangeRate] = useState(0.00815);
  const [fees, setFees] = useState(0);
  const { showToast } = useToast();

  useEffect(() => {
    // Calculate fees (0.008% of transaction amount)
    const baseFee = formData.amount * 0.00008;
    // Add international transfer fee if applicable
    const intlFee = formData.recipientCountry !== 'RW' ? 3 : 0;
    setFees(baseFee + intlFee);
  }, [formData.amount, formData.recipientCountry]);

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
    if (!formData.recipientName.trim()) {
      showToast('Please enter recipient name', 'error');
      return false;
    }
    if (!formData.recipientPhone.trim()) {
      showToast('Please enter recipient phone', 'error');
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
        <Send className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          International Transfer
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
              Target Currency
            </label>
            <select
              value={formData.targetCurrency}
              onChange={(e) => setFormData({ ...formData, targetCurrency: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            >
              {ALL_COUNTRIES.map(country => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code} ({country.name})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Recipient Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Recipient Name
            </label>
            <input
              type="text"
              value={formData.recipientName}
              onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Recipient Country
            </label>
            <select
              value={formData.recipientCountry}
              onChange={(e) => setFormData({ ...formData, recipientCountry: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            >
              {ALL_COUNTRIES.map(country => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name} (+{country.phoneCode})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Recipient Phone
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                +{getPhonePrefix(formData.recipientCountry)}
              </span>
              <input
                type="tel"
                value={formData.recipientPhone}
                onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
                className="flex-1 rounded-r-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-3 py-2"
                required
              />
            </div>
          </div>
        </div>

        {/* Transfer Summary */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Exchange Rate</span>
            <span className="font-medium text-gray-900 dark:text-white">
              1 SFM = {exchangeRate} {formData.targetCurrency}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Transfer Fee (0.008%)</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {fees.toFixed(3)} SFM
            </span>
          </div>
          <div className="flex justify-between text-sm font-medium pt-2 border-t border-gray-200 dark:border-gray-600">
            <span className="text-gray-900 dark:text-white">Total Amount</span>
            <span className="text-gray-900 dark:text-white">
              {(formData.amount + fees).toFixed(3)} SFM
            </span>
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
            Send Transfer
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransferForm;