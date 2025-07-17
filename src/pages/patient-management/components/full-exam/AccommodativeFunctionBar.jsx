import React from 'react';
import ReactECharts from 'echarts-for-react';

const option = {
  title: {
    text: 'Accommodative Function (NRA, PRA, BCC, AA)',
    left: 'center',
    textStyle: { fontSize: 18 }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    formatter: function(params) {
      const d = params[0];
      return `${d.name}: ${d.value}`;
    }
  },
  xAxis: {
    type: 'category',
    data: ['NRA', 'PRA', 'BCC', 'AA'],
    axisLabel: { fontWeight: 'bold' },
    splitLine: { lineStyle: { color: '#e5e7eb' } },
  },
  yAxis: {
    name: 'Value',
    min: -5,
    max: 16,
    splitLine: { lineStyle: { color: '#e5e7eb' } },
  },
  series: [
    {
      name: 'Value',
      type: 'bar',
      data: [2.00, -2.50, 0.50, 14.0],
      itemStyle: {
        color: function(params) {
          const colors = ['#38bdf8', '#ef4444', '#facc15', '#22c55e'];
          return colors[params.dataIndex];
        },
        borderRadius: [6, 6, 6, 6],
      },
      barWidth: 40,
    },
  ],
};

const AccommodativeFunctionBar = () => (
  <div className="bg-white rounded-lg p-4 border mb-6">
    <ReactECharts option={option} style={{ height: 320 }} />
    <div className="text-xs text-muted-foreground mt-2">
      <span className="text-blue-500">■</span> NRA, <span className="text-red-500">■</span> PRA, <span className="text-yellow-500">■</span> BCC, <span className="text-green-500">■</span> AA
    </div>
  </div>
);

export default AccommodativeFunctionBar; 