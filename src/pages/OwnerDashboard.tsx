
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, DollarSign, Users, AlertTriangle, Target, Activity, Building } from 'lucide-react';

const OwnerDashboard = () => {
  const kpiData = [
    { title: 'รายได้รวม', value: '2,450,000', unit: 'บาท', change: '+12.5%', trend: 'up' },
    { title: 'กำไรสุทธิ', value: '485,000', unit: 'บาท', change: '+8.3%', trend: 'up' },
    { title: 'จำนวนสาขา', value: '8', unit: 'สาขา', change: '+2', trend: 'up' },
    { title: 'พนักงานทั้งหมด', value: '45', unit: 'คน', change: '+3', trend: 'up' },
    { title: 'ลูกค้าใหม่', value: '127', unit: 'คน', change: '+15%', trend: 'up' },
    { title: 'อัตราการเติบโต', value: '18.5', unit: '%', change: '+2.1%', trend: 'up' }
  ];

  const alerts = [
    { type: 'warning', message: 'สาขาลาดพร้าว - รายได้ลดลง 15% เมื่อเทียบเดือนที่แล้ว', priority: 'high' },
    { type: 'info', message: 'เงินกู้ธนาคาร - ใกล้ครบกำหนดชำระงวดที่ 24', priority: 'medium' },
    { type: 'success', message: 'สาขาสยาม - เป้าหมายเดือนนี้บรรลุ 125%', priority: 'low' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard เจ้าของ</h1>
          <p className="text-gray-600 mt-1">ภาพรวมธุรกิจและการเติบโต</p>
        </div>
        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
          <BarChart3 className="h-4 w-4 mr-1" />
          ข้อมูลล่าสุด
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {kpi.value}
                    <span className="text-sm font-normal text-gray-500 ml-1">{kpi.unit}</span>
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 font-semibold">{kpi.change}</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>รายได้รายเดือน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">กราฟรายได้รายเดือน</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ประสิทธิภาพสาขา</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['สยาม', 'ลาดพร้าว', 'เอกมัย', 'สาทร'].map((branch, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="font-medium">{branch}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" 
                        style={{ width: `${85 + (index * 5)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">{85 + (index * 5)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            การแจ้งเตือนสำคัญ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                alert.priority === 'high' ? 'border-red-500 bg-red-50' :
                alert.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                'border-green-500 bg-green-50'
              }`}>
                <p className="text-sm font-medium">{alert.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerDashboard;
