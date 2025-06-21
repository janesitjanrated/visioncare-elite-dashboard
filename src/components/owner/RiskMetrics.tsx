
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown } from 'lucide-react';

interface RiskMetricsProps {
  metrics: {
    title: string;
    value: string;
    unit: string;
    trend: 'up' | 'down';
    change: string;
  }[];
}

const RiskMetrics: React.FC<RiskMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {metric.value}
                  <span className="text-sm font-normal text-gray-500 ml-1">{metric.unit}</span>
                </p>
                <div className="flex items-center mt-1">
                  <TrendingDown className={`h-4 w-4 mr-1 ${metric.trend === 'up' ? 'text-red-600' : 'text-green-600'}`} />
                  <span className={`text-sm font-semibold ${metric.trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RiskMetrics;
