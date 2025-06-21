
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target } from 'lucide-react';
import { MitigationPlan } from '@/services/riskService';

interface MitigationPlansProps {
  plans: MitigationPlan[];
}

const MitigationPlans: React.FC<MitigationPlansProps> = ({ plans }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>แผนป้องกันและแก้ไข</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {plans.map((plan) => (
            <div key={plan.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{plan.risk}</h3>
                <Badge className={plan.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                  {plan.status === 'in-progress' ? 'ดำเนินการ' : plan.status === 'completed' ? 'เสร็จสิ้น' : 'รอดำเนินการ'}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">มาตรการป้องกัน:</p>
                  <ul className="text-sm space-y-1">
                    {plan.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="flex items-center">
                        <Target className="h-3 w-3 mr-2 text-green-600" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm text-gray-600">ผู้รับผิดชอบ</p>
                      <p className="font-semibold">{plan.owner}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">กำหนดเสร็จ</p>
                      <p className="font-semibold">
                        {new Date(plan.deadline).toLocaleDateString('th-TH')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MitigationPlans;
