export interface Trade {
  id: string;
  type: 'buy' | 'sell';
  asset: string;
  amount: number;
  price: number;
  total: number;
  timestamp: number;
}

export interface Portfolio {
  totalValue: number;
  fiatBalance: number;
  cryptoHoldings: {
    [key: string]: {
      amount: number;
      value: number;
    };
  };
}

export interface PriceData {
  timestamp: number;
  price: number;
}