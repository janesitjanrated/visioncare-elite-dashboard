import React from 'react';
import ReactECharts from 'echarts-for-react';

const option = {
  title: {
    text: 'Horizontal Vergence (Binocular Cross Graph)',
    left: 'center',
    textStyle: { fontSize: 18 }
  },
  tooltip: {
    trigger: 'item',
    formatter: function(params) {
      return `${params.seriesName}: (${params.value[0]}, ${params.value[1]})`;
    }
  },
  legend: {
    top: 30,
    data: ['Phoria', 'BI (Base-In)', 'BO (Base-Out)', 'NRA', 'PRA'],
    orient: 'horizontal',
    left: 'center',
  },
  xAxis: {
    name: 'CONVERGENCE (Δ)',
    min: -20,
    max: 20,
    splitLine: { lineStyle: { color: '#e5e7eb' } },
  },
  yAxis: {
    name: 'ACCOMMODATION (STIMULUS)',
    min: -5,
    max: 5,
    splitLine: { lineStyle: { color: '#e5e7eb' } },
  },
  series: [
    {
      name: 'Phoria',
      type: 'scatter',
      data: [[0, 0]],
      symbol: 'diamond',
      symbolSize: 18,
      itemStyle: { color: '#2563eb' },
    },
    {
      name: 'BI (Base-In)',
      type: 'scatter',
      data: [[-10, 0]],
      symbol: 'rect',
      symbolSize: 18,
      itemStyle: { color: '#22c55e' },
    },
    {
      name: 'BO (Base-Out)',
      type: 'scatter',
      data: [[15, 0]],
      symbol: 'roundRect',
      symbolSize: 18,
      itemStyle: { color: '#f59e42' },
    },
    {
      name: 'NRA',
      type: 'scatter',
      data: [[0, 2]],
      symbol: 'circle',
      symbolSize: 18,
      itemStyle: { color: '#38bdf8' },
    },
    {
      name: 'PRA',
      type: 'scatter',
      data: [[0, -2.5]],
      symbol: 'circle',
      symbolSize: 18,
      itemStyle: { color: '#ef4444' },
    },
  ],
};

const HorizontalVergenceGraph = () => (
  <div className="bg-white rounded-lg p-4 border mb-6">
    <ReactECharts option={option} style={{ height: 320 }} />
    <div className="text-xs text-muted-foreground mt-2">
      <span className="text-blue-600">◆</span> Phoria, <span className="text-green-600">■</span> BI, <span className="text-orange-500">■</span> BO, <span className="text-cyan-500">●</span> NRA, <span className="text-red-500">●</span> PRA
    </div>
  </div>
);

export default HorizontalVergenceGraph; 