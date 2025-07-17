import React from 'react';
import ReactECharts from 'echarts-for-react';

// Mock data for 6m (Distance)
const data6m = [
  { value: [0, 1], symbol: 'circle', name: '6m Blur', color: '#2563eb' },
  { value: [5, 1], symbol: 'rect', name: '6m Break', color: '#2563eb' },
  { value: [10, 1], symbol: 'triangle', name: '6m Recovery', color: '#2563eb' },
  { value: [0, 3], symbol: 'x', name: '6m Vert.Phoria', color: '#2563eb' },
  { value: [5, 3], symbol: 'triangle', name: '6m BD-res Sup1', color: '#2563eb' },
];

// Mock data for 40cm (Near)
const data40cm = [
  { value: [0, 1], symbol: 'circle', name: '40cm Blur', color: '#fb923c' },
  { value: [10, 1], symbol: 'rect', name: '40cm Break', color: '#fb923c' },
  { value: [15, 1], symbol: 'triangle', name: '40cm Recovery', color: '#fb923c' },
  { value: [0, 3], symbol: 'x', name: '40cm Vert.Phoria', color: '#fb923c' },
  { value: [10, 3], symbol: 'triangle', name: '40cm BU-res Inf2', color: '#fb923c' },
];

const option = {
  title: {
    text: 'Vergence/Accommodation Demand Plot',
    left: 'center',
    textStyle: { fontSize: 18 },
  },
  tooltip: {
    trigger: 'item',
    formatter: function(params) {
      return `${params.seriesName}<br/>${params.data.name}<br/>Prism: ${params.data.value[0]}Δ<br/>Accom: ${params.data.value[1]}D`;
    },
  },
  legend: {
    data: ['6m (Distance)', '40cm (Near)'],
    top: 30,
    left: 'right',
    orient: 'vertical',
    textStyle: { fontSize: 14 },
  },
  grid: {
    left: 60,
    right: 60,
    top: 70,
    bottom: 40,
  },
  xAxis: [
    {
      name: 'Prism Diopters (Δ) 6m',
      min: -25,
      max: 25,
      position: 'bottom',
      axisLine: { lineStyle: { color: '#2563eb' } },
      axisLabel: { color: '#2563eb' },
      splitLine: { lineStyle: { color: '#e5e7eb' } },
    },
    {
      name: 'Prism Diopters (Δ) 40cm',
      min: -25,
      max: 25,
      position: 'top',
      axisLine: { lineStyle: { color: '#fb923c' } },
      axisLabel: { color: '#fb923c' },
      splitLine: { show: false },
    },
  ],
  yAxis: {
    name: 'Accommodative Demand (D)',
    min: 0,
    max: 10,
    splitLine: { lineStyle: { color: '#e5e7eb' } },
  },
  series: [
    {
      name: '6m (Distance)',
      type: 'scatter',
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: data6m,
      symbol: function(params) {
        const symbol = params?.data?.symbol;
        if (symbol === 'circle') return 'circle';
        if (symbol === 'rect') return 'rect';
        if (symbol === 'triangle') return 'triangle';
        if (symbol === 'x') return 'path://M-8,0 L8,0 M0,-8 L0,8';
        return 'circle';
      },
      symbolSize: 24,
      itemStyle: {
        color: function(params) { return params.data.color; },
        borderColor: '#2563eb',
        borderWidth: 2,
      },
      label: {
        show: true,
        position: 'right',
        formatter: function(params) { return params.data.name; },
        color: '#2563eb',
        fontSize: 12,
      },
    },
    {
      name: '40cm (Near)',
      type: 'scatter',
      xAxisIndex: 1,
      yAxisIndex: 0,
      data: data40cm,
      symbol: function(params) {
        const symbol = params?.data?.symbol;
        if (symbol === 'circle') return 'circle';
        if (symbol === 'rect') return 'rect';
        if (symbol === 'triangle') return 'triangle';
        if (symbol === 'x') return 'path://M-8,0 L8,0 M0,-8 L0,8';
        return 'circle';
      },
      symbolSize: 24,
      itemStyle: {
        color: function(params) { return params.data.color; },
        borderColor: '#fb923c',
        borderWidth: 2,
      },
      label: {
        show: true,
        position: 'right',
        formatter: function(params) { return params.data.name; },
        color: '#fb923c',
        fontSize: 12,
      },
    },
  ],
};

const VergenceAccommodationDemandPlot = () => (
  <div className="bg-white rounded-lg p-4 border mb-6">
    <ReactECharts option={option} style={{ height: 400 }} />
    <div className="text-xs text-muted-foreground mt-2">
      <span className="text-blue-600">■</span> 6m (Distance), <span className="text-orange-500">■</span> 40cm (Near)
    </div>
  </div>
);

export default VergenceAccommodationDemandPlot; 