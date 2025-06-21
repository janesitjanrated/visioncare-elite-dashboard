
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, Target } from 'lucide-react';
import { Opportunity } from '@/services/opportunityService';

interface OpportunityListProps {
  opportunities: Opportunity[];
  onViewDetails: (opportunityId: string) => void;
}

const OpportunityList: React.FC<OpportunityListProps> = ({ opportunities, onViewDetails }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'evaluating': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ready': return 'พร้อมดำเนินการ';
      case 'planning': return 'วางแผน';
      case 'evaluating': return 'ประเมิน';
      default: return 'รอพิจารณา';
    }
  };

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case 'สูง': return 'text-green-600';
      case 'ปานกลาง': return 'text-yellow-600';
      case 'ต่ำ': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
          โอกาสทางธุรกิจ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">{opportunity.title}</h3>
                  <p className="text-sm text-gray-600">{opportunity.description}</p>
                </div>
                <Badge className={getStatusColor(opportunity.status)}>
                  {getStatusText(opportunity.status)}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <p className="text-sm text-gray-600">ศักยภาพ</p>
                  <p className={`font-bold ${getPotentialColor(opportunity.potential)}`}>
                    {opportunity.potential}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">เงินลงทุน</p>
                  <p className="font-semibold">{parseInt(opportunity.investment).toLocaleString()} ฿</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">ROI คาดการณ์</p>
                  <p className="font-semibold text-green-600">{opportunity.roi}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">ระยะเวลา</p>
                  <p className="font-semibold">{opportunity.timeframe}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onViewDetails(opportunity.id)}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    รายละเอียด
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OpportunityList;
