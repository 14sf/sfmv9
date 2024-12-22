import React, { useRef, useEffect } from 'react';
import { PriceData } from '../../types/exchange';

interface MiniPriceChartProps {
  data: PriceData[];
}

const MiniPriceChart: React.FC<MiniPriceChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !data.length) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate price range
    const prices = data.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;

    // Calculate scaling factors
    const xScale = width / (data.length - 1);
    const yScale = height / priceRange;

    // Draw price line
    ctx.beginPath();
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;

    data.forEach((point, i) => {
      const x = i * xScale;
      const y = height - ((point.price - minPrice) * yScale);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Add gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.fillStyle = gradient;
    ctx.fill();

  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={200}
      className="w-full h-full"
    />
  );
};

export default MiniPriceChart;