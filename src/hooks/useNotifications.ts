import { useCallback } from 'react';
import { sendNotification } from '../utils/novu';
import { useToast } from './useToast';

export const useNotifications = (userId: string) => {
  const { showToast } = useToast();

  const sendTransferNotification = useCallback(async (data: {
    amount: number;
    currency: string;
    recipient: string;
  }) => {
    const success = await sendNotification({
      userId,
      type: 'transfer',
      data: {
        amount: data.amount,
        currency: data.currency,
        recipient: data.recipient,
        timestamp: Date.now()
      }
    });

    if (!success) {
      showToast('Failed to send transfer notification', 'error');
    }
  }, [userId, showToast]);

  const sendPaymentNotification = useCallback(async (data: {
    amount: number;
    currency: string;
    type: 'received' | 'sent';
  }) => {
    const success = await sendNotification({
      userId,
      type: 'payment',
      data: {
        amount: data.amount,
        currency: data.currency,
        type: data.type,
        timestamp: Date.now()
      }
    });

    if (!success) {
      showToast('Failed to send payment notification', 'error');
    }
  }, [userId, showToast]);

  const sendDocumentNotification = useCallback(async (data: {
    documentType: string;
    name: string;
  }) => {
    const success = await sendNotification({
      userId,
      type: 'document',
      data: {
        documentType: data.documentType,
        name: data.name,
        timestamp: Date.now()
      }
    });

    if (!success) {
      showToast('Failed to send document notification', 'error');
    }
  }, [userId, showToast]);

  return {
    sendTransferNotification,
    sendPaymentNotification,
    sendDocumentNotification
  };
};

export default useNotifications;