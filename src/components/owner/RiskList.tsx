
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Eye, Shield } from 'lucide-react';
import { Risk } from '@/services/riskService';

interface RiskListProps {
  riskCategories: {
    category: string;
    risks: Risk[];
  }[];
}

const RiskList: React.FC<RiskListProps> = ({ riskCategories }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Eye className="h-4 w-4" />;
      case 'low': return <Shield className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>รายการความเสี่ยง</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {riskCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="font-semibold text-lg mb-3 text-gray-800">{category.category}</h3>
              <div className="space-y-3">
                {category.risks.map((risk) => (
                  <div key={risk.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getRiskIcon(risk.level)}
                      <div>
                        <p className="font-semibold">{risk.title}</p>
                        <p className="text-sm text-gray-600">
                          ผลกระทบ: {risk.impact} | ความน่าจะเป็น: {risk.probability}
                        </p>
                      </div>
                    </div>
                    <Badge className={getRiskColor(risk.level)}>
                      {risk.level === 'high' ? 'สูง' : risk.level === 'medium' ? 'ปานกลาง' : 'ต่ำ'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskList;
