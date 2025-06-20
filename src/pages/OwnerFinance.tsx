
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, TrendingDown, Calculator, CreditCard, PieChart } from 'lucide-react';

const OwnerFinance = () => {
  const financialData = [
    { title: 'รายรับรวม', amount: '3,250,000', change: '+12.5%', trend: 'up' },
    { title: 'ค่าใช้จ่ายรวม', amount: '2,180,000', change: '+8.2%', trend: 'up' },
    { title: 'กำไรสุทธิ', amount: '1,070,000', change: '+18.5%', trend: 'up' },
    { title: 'กระแสเงินสด', amount: '485,000', change: '-5.2%', trend: 'down' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">การเงิน / งบ</h1>
          <p className="text-gray-600 mt-1">จัดการงบการเงินและรายงานทางการเงิน</p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <DollarSign className="h-4 w-4 mr-1" />
          การเงิน
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{item.amount}</p>
                  <div className="flex items-center mt-1">
                    {item.trend === 'up' ? 
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" /> :
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    }
                    <span className={`text-sm font-semibold ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>รายได้ตามประเภท</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">กราฟพายรายได้ตามประเภท</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ค่าใช้จ่ายรายเดือน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">กราฟแท่งค่าใช้จ่ายรายเดือน</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>รายงานทางการเงิน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <Calculator className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-semibold">งบดุล</h3>
              <p className="text-sm text-gray-600">ดูงบดุลประจำเดือน/ปี</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <PieChart className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-semibold">งบกำไรขาดทุน</h3>
              <p className="text-sm text-gray-600">วิเคราะห์กำไรขาดทุน</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <CreditCard className="h-8 w-8 text-purple-600 mb-2" />
              <h3 className="font-semibold">กระแสเงินสด</h3>
              <p className="text-sm text-gray-600">ติดตามกระแสเงินสด</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerFinance;
