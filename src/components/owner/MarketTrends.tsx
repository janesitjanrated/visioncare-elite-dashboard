
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3 } from 'lucide-react';
import { MarketTrend } from '@/services/opportunityService';

interface MarketTrendsProps {
  trends: MarketTrend[];
}

const MarketTrends: React.FC<MarketTrendsProps> = ({ trends }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
          เทรนด์ตลาด
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trends.map((trend) => (
            <div key={trend.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-semibold">{trend.trend}</p>
                <p className="text-sm text-gray-600">โอกาส: {trend.opportunity}</p>
              </div>
              <Badge className={trend.impact === 'สูง' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {trend.impact}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketTrends;
