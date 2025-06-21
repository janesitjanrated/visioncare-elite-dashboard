
import React, { useRef, useEffect } from 'react';
import { OptometricData, DataPoint } from '@/types/optometric';

interface OptometricChartProps {
  data: OptometricData;
  width?: number;
  height?: number;
}

const OptometricChart: React.FC<OptometricChartProps> = ({ 
  data, 
  width = 600, 
  height = 400 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mapDataToPoints = (data: OptometricData): DataPoint[] => {
    const points: DataPoint[] = [];
    const baseY = 2.5; // Near testing distance

    // Phoria Near (A)
    if (data.phoriaNear !== null) {
      points.push({
        x: data.phoriaNear,
        y: baseY,
        label: 'A',
        symbol: 'X',
        color: '#FF6B6B'
      });
    }

    // BI measurements (B, C, D)
    if (data.biBlur !== null) {
      points.push({
        x: -Math.abs(data.biBlur),
        y: baseY,
        label: 'B',
        symbol: '○',
        color: '#4ECDC4'
      });
    }

    if (data.biBreak !== null) {
      points.push({
        x: -Math.abs(data.biBreak),
        y: baseY,
        label: 'C',
        symbol: '□',
        color: '#45B7D1'
      });
    }

    if (data.biRecovery !== null) {
      points.push({
        x: -Math.abs(data.biRecovery),
        y: baseY,
        label: 'D',
        symbol: '△',
        color: '#96CEB4'
      });
    }

    // BO measurements (E, F, G)
    if (data.boBlur !== null) {
      points.push({
        x: Math.abs(data.boBlur),
        y: baseY,
        label: 'E',
        symbol: '○',
        color: '#FFEAA7'
      });
    }

    if (data.boBreak !== null) {
      points.push({
        x: Math.abs(data.boBreak),
        y: baseY,
        label: 'F',
        symbol: '□',
        color: '#DDA0DD'
      });
    }

    if (data.boRecovery !== null) {
      points.push({
        x: Math.abs(data.boRecovery),
        y: baseY,
        label: 'G',
        symbol: '△',
        color: '#98D8C8'
      });
    }

    // NRA (H)
    if (data.nra !== null) {
      points.push({
        x: 0,
        y: baseY + data.nra,
        label: 'H',
        symbol: '○',
        color: '#74B9FF'
      });
    }

    // PRA (I)
    if (data.pra !== null) {
      points.push({
        x: 0,
        y: baseY + Math.abs(data.pra),
        label: 'I',
        symbol: '○',
        color: '#FD79A8'
      });
    }

    // NPC
    if (data.npc !== null && data.npc > 0) {
      const npcPrism = 100 / data.npc;
      points.push({
        x: npcPrism,
        y: 0,
        label: 'NPC',
        symbol: 'X',
        color: '#E17055'
      });
    }

    return points;
  };

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set up coordinate system
    const margin = 60;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;

    // Transform coordinates
    const xRange = 60; // -30 to +30
    const yRange = 10; // 0 to 10D
    
    const scaleX = (x: number) => margin + ((x + 30) / xRange) * chartWidth;
    const scaleY = (y: number) => height - margin - (y / yRange) * chartHeight;

    // Draw grid
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 1;

    // Vertical grid lines
    for (let x = -30; x <= 30; x += 5) {
      ctx.beginPath();
      ctx.moveTo(scaleX(x), margin);
      ctx.lineTo(scaleX(x), height - margin);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let y = 0; y <= 10; y += 1) {
      ctx.beginPath();
      ctx.moveTo(margin, scaleY(y));
      ctx.lineTo(width - margin, scaleY(y));
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(margin, scaleY(0));
    ctx.lineTo(width - margin, scaleY(0));
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(scaleX(0), margin);
    ctx.lineTo(scaleX(0), height - margin);
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    // X-axis labels
    for (let x = -30; x <= 30; x += 10) {
      if (x !== 0) {
        ctx.fillText(x.toString(), scaleX(x), height - margin + 20);
      }
    }

    // Y-axis labels
    ctx.textAlign = 'right';
    for (let y = 0; y <= 10; y += 2) {
      ctx.fillText(y + 'D', margin - 10, scaleY(y) + 4);
    }

    // Axis titles
    ctx.textAlign = 'center';
    ctx.font = '14px Arial';
    ctx.fillText('Prism Diopters (BI ← → BO)', width / 2, height - 10);

    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Accommodative Demand (D)', 0, 0);
    ctx.restore();

    // Draw data points
    const points = mapDataToPoints(data);
    
    points.forEach(point => {
      const x = scaleX(point.x);
      const y = scaleY(point.y);

      ctx.fillStyle = point.color || '#333';
      ctx.strokeStyle = point.color || '#333';
      ctx.lineWidth = 2;

      // Draw symbol based on type
      switch (point.symbol) {
        case 'X':
          // Draw X
          ctx.beginPath();
          ctx.moveTo(x - 6, y - 6);
          ctx.lineTo(x + 6, y + 6);
          ctx.moveTo(x + 6, y - 6);
          ctx.lineTo(x - 6, y + 6);
          ctx.stroke();
          break;

        case '○':
          // Draw circle
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.stroke();
          break;

        case '□':
          // Draw square
          ctx.strokeRect(x - 5, y - 5, 10, 10);
          break;

        case '△':
          // Draw triangle
          ctx.beginPath();
          ctx.moveTo(x, y - 6);
          ctx.lineTo(x - 5, y + 4);
          ctx.lineTo(x + 5, y + 4);
          ctx.closePath();
          ctx.stroke();
          break;
      }

      // Draw label
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(point.label, x, y - 15);
    });
  };

  useEffect(() => {
    drawChart();
  }, [data, width, height]);

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-gray-300 rounded-lg shadow-sm"
      />
    </div>
  );
};

export default OptometricChart;
