import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign } from 'lucide-react';

export const CashFlowTracker = () => {
  const [cashFlowData] = useState([
    { month: 'ม.ค.', inflow: 380000, outflow: 220000, net: 160000, balance: 450000 },
    { month: 'ก.พ.', inflow: 420000, outflow: 250000, net: 170000, balance: 620000 },
    { month: 'มี.ค.', inflow: 350000, outflow: 280000, net: 70000, balance: 690000 },
    { month: 'เม.ย.', inflow: 480000, outflow: 240000, net: 240000, balance: 930000 },
    { month: 'พ.ค.', inflow: 520000, outflow: 290000, net: 230000, balance: 1160000 },
    { month: 'มิ.ย.', inflow: 450000, outflow: 310000, net: 140000, balance: 1300000 }
  ]);

  const [runwayData] = useState([
    { category: 'เงินเดือนพนักงาน', monthly: 150000, percentage: 45 },
    { category: 'ค่าเช่าและสาธารณูปโภค', monthly: 80000, percentage: 24 },
    { category: 'ค่าสินค้า', monthly: 60000, percentage: 18 },
    { category: 'การตลาดและโฆษณา', monthly: 25000, percentage: 8 },
    { category: 'อื่นๆ', monthly: 15000, percentage: 5 }
  ]);

  const currentCash = 1300000;
  const monthlyBurn = 330000;
  const runway = Math.floor(currentCash / monthlyBurn);
  
  const avgMonthlyInflow = cashFlowData.reduce((sum, month) => sum + month.inflow, 0) / cashFlowData.length;
  const avgMonthlyOutflow = cashFlowData.reduce((sum, month) => sum + month.outflow, 0) / cashFlowData.length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">เงินสดปัจจุบัน</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ฿{currentCash.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">+10.8% จากเดือนที่แล้ว</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Runway</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {runway} เดือน
            </div>
            <p className="text-xs text-gray-600">ที่อัตราการใช้จ่ายปัจจุบัน</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">เงินเข้าเฉลี่ย/เดือน</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ฿{avgMonthlyInflow.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">6 เดือนที่ผ่านมา</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">เงินออกเฉลี่ย/เดือน</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ฿{avgMonthlyOutflow.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">6 เดือนที่ผ่านมา</p>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Chart */}
      <Card>
        <CardHeader>
          <CardTitle>กระแสเงินสดรายเดือน</CardTitle>
          <CardDescription>เปรียบเทียบเงินเข้า-ออก และยอดคงเหลือ</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `฿${value.toLocaleString()}`} />
              <Line type="monotone" dataKey="inflow" stroke="#10b981" name="เงินเข้า" strokeWidth={2} />
              <Line type="monotone" dataKey="outflow" stroke="#ef4444" name="เงิน่" strokeWidth={2} />
              <Line type="monotone" dataKey="balance" stroke="#3b82f6" name="ยอดคงเหลือ" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Expenses Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>รายจ่ายประจำเดือน</CardTitle>
          <CardDescription>การกระจายค่าใช้จ่ายรายเดือน - ใช้คำนวณ Runway</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {runwayData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm font-bold">฿{item.monthly.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-4 text-sm text-gray-600">{item.percentage}%</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium text-orange-800">รวมรายจ่ายต่อเดือน:</span>
              <span className="font-bold text-orange-800">฿{monthlyBurn.toLocaleString()}</span>
            </div>
            <p className="text-sm text-orange-600 mt-1">
              ด้วยเงินสดปัจจุบัน ฿{currentCash.toLocaleString()} สามารถดำเนินกิจการได้ {runway} เดือน
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Net Cash Flow by Month */}
      <Card>
        <CardHeader>
          <CardTitle>กระแสเงินสดสุทธิ</CardTitle>
          <CardDescription>เงินเข้า - เงินออก = กระแสเงินสดสุทธิ</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `฿${value.toLocaleString()}`} />
              <Bar dataKey="net" name="กระแสเงินสดสุทธิ">
                {cashFlowData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.net >= 0 ? "#10b981" : "#ef4444"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
