import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface PriceChartProps {
  data: {
    timestamp: number;
    price: number;
  }[];
  width?: number;
  height?: number;
}

const PriceChart: React.FC<PriceChartProps> = ({ 
  data,
  width = 800,
  height = 400
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !data.length) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate price range
    const prices = data.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;

    // Calculate scaling factors
    const xScale = width / (data.length - 1);
    const yScale = (height - 40) / priceRange;

    // Draw price line
    ctx.beginPath();
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;

    data.forEach((point, i) => {
      const x = i * xScale;
      const y = height - ((point.price - minPrice) * yScale) - 20;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw price labels
    ctx.font = '12px Inter';
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'right';
    
    const steps = 5;
    for (let i = 0; i <= steps; i++) {
      const price = minPrice + (priceRange * (i / steps));
      const y = height - ((price - minPrice) * yScale) - 20;
      ctx.fillText(price.toFixed(8), 50, y);
    }

  }, [data, width, height]);

  const priceChange = data.length >= 2 
    ? ((data[data.length - 1].price - data[0].price) / data[0].price) * 100
    : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <LineChart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            SFM Price Chart
          </h3>
        </div>
        <div className={`flex items-center gap-1 ${
          priceChange >= 0 
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'
        }`}>
          {priceChange >= 0 ? (
            <ArrowUpRight className="w-4 h-4" />
          ) : (
            <ArrowDownRight className="w-4 h-4" />
          )}
          <span className="font-medium">
            {Math.abs(priceChange).toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="w-full h-auto"
        />
      </div>

      <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
        <span>{new Date(data[0]?.timestamp).toLocaleDateString()}</span>
        <span>{new Date(data[data.length - 1]?.timestamp).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default PriceChart;