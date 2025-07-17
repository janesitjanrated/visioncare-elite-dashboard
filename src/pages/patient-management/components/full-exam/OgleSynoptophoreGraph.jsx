import React from 'react';
import ReactECharts from 'echarts-for-react';

const option = {
  title: {
    text: "Ogle's Synoptophore Graph (AC/A)",
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
    data: ['NRC', 'PRC', 'Phoria', 'Amplitude'],
    orient: 'horizontal',
    left: 'center',
  },
  xAxis: {
    name: 'CONVERGENCE (Δ)',
    min: -20,
    max: 80,
    splitLine: { lineStyle: { color: '#e5e7eb' } },
  },
  yAxis: {
    name: 'ACCOMMODATION (STIMULUS)',
    min: 0,
    max: 14,
    splitLine: { lineStyle: { color: '#e5e7eb' } },
  },
  series: [
    {
      name: 'NRC',
      type: 'scatter',
      data: [[-10, 0]],
      symbol: 'rect',
      symbolSize: 18,
      itemStyle: { color: '#a3a3a3' },
    },
    {
      name: 'PRC',
      type: 'scatter',
      data: [[20, 0]],
      symbol: 'circle',
      symbolSize: 18,
      itemStyle: { color: '#38bdf8' },
    },
    {
      name: 'Phoria',
      type: 'scatter',
      data: [[0, 0]],
      symbol: 'diamond',
      symbolSize: 20,
      itemStyle: { color: '#2563eb' },
    },
    {
      name: 'Amplitude',
      type: 'scatter',
      data: [[20, 14]],
      symbol: 'circle',
      symbolSize: 22,
      itemStyle: { color: '#000' },
    },
  ],
};

const OgleSynoptophoreGraph = () => (
  <div className="bg-white rounded-lg p-4 border mb-6">
    <ReactECharts option={option} style={{ height: 320 }} />
    <div className="text-xs text-muted-foreground mt-2">
      <span className="inline-block mr-2">■ NRC</span>
      <span className="inline-block mr-2">● PRC</span>
      <span className="inline-block mr-2">◆ Phoria</span>
      <span className="inline-block mr-2">● Amplitude</span>
    </div>
  </div>
);

export default OgleSynoptophoreGraph; 