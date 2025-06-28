import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Target, TrendingUp, TrendingDown, Award, AlertCircle, Plus } from 'lucide-react';
import { RevenueGoalForm } from './RevenueGoalForm';

export const RevenueTracking = () => {
  const [showGoalForm, setShowGoalForm] = useState(false);
  
  const [monthlyData] = useState([
    { month: 'ม.ค.', actual: 380000, target: 400000, achievement: 95 },
    { month: 'ก.พ.', actual: 420000, target: 400000, achievement: 105 },
    { month: 'มี.ค.', actual: 350000, target: 450000, achievement: 78 },
    { month: 'เม.ย.', actual: 480000, target: 450000, achievement: 107 },
    { month: 'พ.ค.', actual: 520000, target: 500000, achievement: 104 },
    { month: 'มิ.ย.', actual: 450000, target: 500000, achievement: 90 }
  ]);

  const [revenueBreakdown] = useState([
    { source: 'การตรวจสายตา', amount: 180000, percentage: 40, growth: 12 },
    { source: 'ขายแว่นสายตา', amount: 135000, percentage: 30, growth: 8 },
    { source: 'ขายคอนแทคเลนส์', amount: 90000, percentage: 20, growth: -5 },
    { source: 'บริการอื่นๆ', amount: 45000, percentage: 10, growth: 15 }
  ]);

  const currentMonth = monthlyData[monthlyData.length - 1];
  const totalActual = monthlyData.reduce((sum, month) => sum + month.actual, 0);
  const totalTarget = monthlyData.reduce((sum, month) => sum + month.target, 0);
  const overallAchievement = (totalActual / totalTarget) * 100;

  const achievedMonths = monthlyData.filter(month => month.achievement >= 100).length;
  const bestMonth = monthlyData.reduce((best, month) => 
    month.actual > best.actual ? month : best
  );
  const worstMonth = monthlyData.reduce((worst, month) => 
    month.actual < worst.actual ? month : worst
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">รายได้รวม 6 เดือน</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ฿{totalActual.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">
              เป้าหมาย: ฿{totalTarget.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ความสำเร็จโดยรวม</CardTitle>
            <Target className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {overallAchievement.toFixed(1)}%
            </div>
            <p className="text-xs text-gray-600">
              ทะลุเป้า {achievedMonths}/6 เดือน
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">เดือนที่ดีที่สุด</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {bestMonth.month}
            </div>
            <p className="text-xs text-gray-600">
              ฿{bestMonth.actual.toLocaleString()} ({bestMonth.achievement}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">เดือนปัจจุบัน</CardTitle>
            <AlertCircle className={`h-4 w-4 ${currentMonth.achievement >= 100 ? 'text-green-600' : 'text-red-600'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${currentMonth.achievement >= 100 ? 'text-green-600' : 'text-red-600'}`}>
              {currentMonth.achievement}%
            </div>
            <p className="text-xs text-gray-600">
              ฿{currentMonth.actual.toLocaleString()}/฿{currentMonth.target.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Goal Setting Button */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>การตั้งเป้าหมายรายได้</CardTitle>
              <CardDescription>กำหนดเป้าหมายรายได้รายเดือนและติดตามผล</CardDescription>
            </div>
            <Button onClick={() => setShowGoalForm(true)} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              ตั้งเป้าหมายใหม่
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Revenue vs Target Chart */}
      <Card>
        <CardHeader>
          <CardTitle>รายได้จริง vs เป้าหมาย</CardTitle>
          <CardDescription>เปรียบเทียบผลการดำเนินงานกับเป้าหมายที่ตั้งไว้</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `฿${value.toLocaleString()}`} />
              <Bar dataKey="target" fill="#e5e7eb" name="เป้าหมาย" />
              <Bar dataKey="actual" fill="#10b981" name="รายได้จริง" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Achievement Percentage */}
      <Card>
        <CardHeader>
          <CardTitle>เปอร์เซ็นต์ความสำเร็จ</CardTitle>
          <CardDescription>อัตราการบรรลุเป้าหมายแต่ละเดือน</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Line 
                type="monotone" 
                dataKey="achievement" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="% ความสำเร็จ"
              />
              <Line 
                type="monotone" 
                dataKey={() => 100} 
                stroke="#ef4444" 
                strokeDasharray="5 5"
                name="เป้าหมาย 100%"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>แหล่งรายได้</CardTitle>
          <CardDescription>การกระจายรายได้จากแหล่งต่างๆ และอัตราการเติบโต</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {revenueBreakdown.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{source.source}</span>
                    <span className="font-bold">฿{source.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full" 
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>{source.percentage}% ของรายได้รวม</span>
                    <span className={`flex items-center ${source.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {source.growth >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {Math.abs(source.growth)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลเชิงลึก</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">จุดแข็ง</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• ทะลุเป้าหมาย {achievedMonths} เดือนจาก 6 เดือน</li>
                <li>• การตรวจสายตามีการเติบโต 12%</li>
                <li>• บริการอื่นๆ เติบโต 15%</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-medium text-red-800 mb-2">จุดที่ต้องปรับปรุง</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• ยอดขายคอนแทคเลนส์ลดลง 5%</li>
                <li>• เดือน{worstMonth.month} ได้เพียง {worstMonth.achievement}%</li>
                <li>• ควรหาแนวทางเพิ่มยอดขาย</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Goal Form Modal */}
      {showGoalForm && (
        <RevenueGoalForm
          onSave={(goalData) => {
            console.log('New goal:', goalData);
            setShowGoalForm(false);
          }}
          onClose={() => setShowGoalForm(false)}
        />
      )}
    </div>
  );
};
