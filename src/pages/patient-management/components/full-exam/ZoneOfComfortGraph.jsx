import React from 'react';
import ReactECharts from 'echarts-for-react';

const option = {
  title: {
    text: "Sheard's & Percival's Zone of Comfort",
    left: 'center',
    textStyle: { fontSize: 18 }
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    top: 30,
    data: ["Sheard's zone of comfort", "Percival's zone of comfort", 'Patient Position'],
    orient: 'horizontal',
    left: 'center',
  },
  xAxis: {
    name: 'Vergence distance (D)',
    min: 0,
    max: 4,
    splitLine: { lineStyle: { color: '#e5e7eb' } },
  },
  yAxis: {
    name: 'Focal distance (D)',
    min: 0,
    max: 16,
    splitLine: { lineStyle: { color: '#e5e7eb' } },
  },
  series: [
    {
      name: "Sheard's zone of comfort",
      type: 'line',
      data: [1, 2, 3, 4, 5],
      lineStyle: { color: 'rgba(239,68,68,0.7)', width: 3 },
      areaStyle: { color: 'rgba(239,68,68,0.1)' },
      symbol: 'none',
    },
    {
      name: "Percival's zone of comfort",
      type: 'line',
      data: [0.5, 1.5, 2.5, 3.5, 4.5],
      lineStyle: { color: 'rgba(34,197,94,0.7)', width: 3 },
      areaStyle: { color: 'rgba(34,197,94,0.1)' },
      symbol: 'none',
    },
    {
      name: 'Patient Position',
      type: 'scatter',
      data: [[1, 14]],
      symbol: 'circle',
      symbolSize: 18,
      itemStyle: { color: '#6366f1' },
    },
  ],
};

const ZoneOfComfortGraph = () => (
  <div className="bg-white rounded-lg p-4 border mb-6">
    <ReactECharts option={option} style={{ height: 320 }} />
    <div className="text-xs text-muted-foreground mt-2">
      <span className="inline-block mr-2 text-red-500">▬</span> Sheard's zone
      <span className="inline-block mx-2 text-green-500">▬</span> Percival's zone
      <span className="inline-block mx-2 text-indigo-500">●</span> Patient Position
    </div>
  </div>
);

export default ZoneOfComfortGraph; 