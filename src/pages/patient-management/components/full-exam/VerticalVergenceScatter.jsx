import React from 'react';
import ReactECharts from 'echarts-for-react';

const option = {
  title: {
    text: 'Vertical Vergence (Scatter Plot)',
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
    data: ['Vert.Phoria', 'BD-res', 'BU-res', 'abnormal'],
    orient: 'horizontal',
    left: 'center',
  },
  xAxis: {
    type: 'category',
    name: '',
    data: ['Vert.Phoria', 'BD-res Sup L', 'BD-res Sup R', 'BU-res Sup L', 'BU-res Sup R', 'BU-res Inf L'],
    splitLine: { lineStyle: { color: '#e5e7eb' } },
  },
  yAxis: {
    name: 'Prism Diopters (Δ)',
    min: -2,
    max: 12,
    splitLine: { lineStyle: { color: '#e5e7eb' } },
  },
  series: [
    {
      name: 'Vert.Phoria',
      type: 'scatter',
      data: [[0, 0], [0, 0.5]],
      symbol: 'circle',
      symbolSize: 16,
      itemStyle: { color: '#2563eb' },
    },
    {
      name: 'BD-res',
      type: 'scatter',
      data: [[1, 3], [2, 4]],
      symbol: 'circle',
      symbolSize: 16,
      itemStyle: { color: '#22c55e' },
    },
    {
      name: 'BU-res',
      type: 'scatter',
      data: [[3, 7], [4, 8]],
      symbol: 'circle',
      symbolSize: 16,
      itemStyle: { color: '#facc15' },
    },
    {
      name: 'abnormal',
      type: 'scatter',
      data: [[5, 10]],
      symbol: 'circle',
      symbolSize: 16,
      itemStyle: { color: '#ef4444' },
    },
  ],
};

const VerticalVergenceScatter = () => (
  <div className="bg-white rounded-lg p-4 border mb-6">
    <ReactECharts option={option} style={{ height: 320 }} />
    <div className="text-xs text-muted-foreground mt-2">
      <span className="text-blue-600">●</span> Vert.Phoria, <span className="text-green-600">●</span> BD-res, <span className="text-yellow-500">●</span> BU-res, <span className="text-red-500">●</span> abnormal
    </div>
  </div>
);

export default VerticalVergenceScatter; 