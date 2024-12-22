import { useState, useEffect } from 'react';
import axios from 'axios';

interface CryptoPrices {
  sfm: number;
  btc: number;
  eth: number;
}

export const useCryptoData = () => {
  const [prices, setPrices] = useState<CryptoPrices>({
    sfm: 1.2,
    btc: 40000,
    eth: 2500
  });
  const [priceHistory, setPriceHistory] = useState<{ timestamp: number; price: number; }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchPrices = () => {
      try {
        // For demo purposes, we'll use mock data
        const mockHistory = Array.from({ length: 30 }, (_, i) => ({
          timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
          price: 1.2 + Math.random() * 0.1
        }));

        if (isMounted) {
          setPriceHistory(mockHistory);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Update every 30 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { prices, priceHistory, isLoading };
};