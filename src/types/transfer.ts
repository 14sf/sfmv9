export interface TransferData {
  amount: number;
  sourceCurrency: string;
  targetCurrency: string;
  recipientName: string;
  recipientPhone: string;
  recipientCountry: string;
}

export interface Transfer {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  currency: string;
  recipient: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: number;
}

export interface TransferFees {
  baseFee: number;
  internationalFee: number;
  exchangeRate: number;
  total: number;
}