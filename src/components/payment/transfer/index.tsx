import React, { useState } from 'react';
import TransferTabs from './TransferTabs';
import TransferForm from './TransferForm';
import TransferReceiveForm from './TransferReceiveForm';
import TransferHistory from './TransferHistory';
import { useToast } from '../../../hooks/useToast';
import useNotifications from '../../../hooks/useNotifications';

const TransferSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'send' | 'receive'>('send');
  const [showForm, setShowForm] = useState(false);
  const { showToast } = useToast();
  const { sendTransferNotification } = useNotifications('current-user');

  const handleTransfer = async (data: any) => {
    try {
      showToast('Processing transfer...', 'info');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await sendTransferNotification({
        amount: data.amount,
        currency: data.currency,
        recipient: data.recipientName
      });
      
      showToast('Transfer completed successfully!', 'success');
      setShowForm(false);
    } catch (error) {
      showToast('Transfer failed. Please try again.', 'error');
    }
  };

  const handleReceive = async (data: any) => {
    try {
      showToast('Processing receive request...', 'info');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await sendTransferNotification({
        amount: data.amount,
        currency: data.currency,
        recipient: 'You'
      });
      
      showToast('Receive request completed successfully!', 'success');
      setShowForm(false);
    } catch (error) {
      showToast('Receive request failed. Please try again.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <TransferTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {showForm ? (
        activeTab === 'send' ? (
          <TransferForm
            onSubmit={handleTransfer}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <TransferReceiveForm
            onSubmit={handleReceive}
            onCancel={() => setShowForm(false)}
          />
        )
      ) : (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {activeTab === 'send' ? 'New Transfer' : 'Request Transfer'}
            </button>
          </div>
          <TransferHistory />
        </>
      )}
    </div>
  );
};

export default TransferSection;