
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  TrendingDown, 
  Shield, 
  Eye, 
  DollarSign, 
  Users, 
  Building, 
  FileText,
  Clock,
  Target
} from 'lucide-react';

const OwnerRisks = () => {
  const riskCategories = [
    {
      category: 'ความเสี่ยงทางการเงิน',
      risks: [
        { title: 'กระแสเงินสดไม่เพียงพอ', level: 'high', impact: 'สูง', probability: 'ปานกลาง' },
        { title: 'ลูกหนี้เก่าค้างชำระ', level: 'medium', impact: 'ปานกลาง', probability: 'สูง' },
        { title: 'ต้นทุนวัตถุดิบเพิ่มขึ้น', level: 'medium', impact: 'ปานกลาง', probability: 'สูง' }
      ]
    },
    {
      category: 'ความเสี่ยงด้านปฏิบัติการ',
      risks: [
        { title: 'พนักงานลาออกบ่อย', level: 'high', impact: 'สูง', probability: 'สูง' },
        { title: 'อุปกรณ์เสียบ่อย', level: 'medium', impact: 'ปานกลาง', probability: 'ปานกลาง' },
        { title: 'คุณภาพบริการไม่สม่ำเสมอ', level: 'low', impact: 'ต่ำ', probability: 'ต่ำ' }
      ]
    },
    {
      category: 'ความเสี่ยงด้านกฎหมาย',
      risks: [
        { title: 'การเปลี่ยนแปลงกฎหมายภาษี', level: 'medium', impact: 'สูง', probability: 'ต่ำ' },
        { title: 'ใบอนุญาตประกอบวิชาชีพหมดอายุ', level: 'low', impact: 'สูง', probability: 'ต่ำ' }
      ]
    }
  ];

  const riskMetrics = [
    { title: 'ความเสี่ยงรวม', value: '68', unit: '%', trend: 'down', change: '-5%' },
    { title: 'ความเสี่ยงสูง', value: '3', unit: 'รายการ', trend: 'up', change: '+1' },
    { title: 'การป้องกันที่ใช้งาน', value: '12', unit: 'มาตรการ', trend: 'up', change: '+2' },
    { title: 'อัตราเหตุการณ์', value: '2.1', unit: '%', trend: 'down', change: '-0.3%' }
  ];

  const mitigationPlans = [
    {
      risk: 'พนักงานลาออกบ่อย',
      actions: ['ปรับปรุงสวัสดิการ', 'เพิ่มโอกาสเติบโต', 'สร้างสภาพแวดล้อมที่ดี'],
      owner: 'HR Manager',
      deadline: '2024-08-31',
      status: 'in-progress'
    },
    {
      risk: 'กระแสเงินสดไม่เพียงพอ',
      actions: ['ปรับปรุงการเก็บหนี้', 'ขยายช่องทางรายได้', 'ลดต้นทุนที่ไม่จำเป็น'],
      owner: 'CFO',
      deadline: '2024-07-30',
      status: 'pending'
    }
  ];

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
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ความเสี่ยง</h1>
          <p className="text-gray-600 mt-1">จัดการและติดตามความเสี่ยงองค์กร</p>
        </div>
        <Badge variant="secondary" className="bg-red-100 text-red-800">
          <AlertTriangle className="h-4 w-4 mr-1" />
          Risk Management
        </Badge>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {riskMetrics.map((metric, index) => (
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
                    {metric.trend === 'up' ? 
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" /> :
                      <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
                    }
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

      {/* Risk Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    {category.risks.map((risk, riskIndex) => (
                      <div key={riskIndex} className="flex items-center justify-between p-4 border rounded-lg">
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
      </div>

      {/* Mitigation Plans */}
      <Card>
        <CardHeader>
          <CardTitle>แผนป้องกันและแก้ไข</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mitigationPlans.map((plan, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{plan.risk}</h3>
                  <Badge className={plan.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                    {plan.status === 'in-progress' ? 'ดำเนินการ' : 'รอดำเนินการ'}
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
    </div>
  );
};

export default OwnerRisks;
