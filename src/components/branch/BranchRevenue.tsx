
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Users,
  FileText,
  Download,
  Filter
} from 'lucide-react';
import { branches } from '@/data/branchMockData';

const BranchRevenue = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedBranch, setSelectedBranch] = useState('all');

  // Mock revenue data
  const revenueData = {
    monthly: {
      total: 1750000,
      growth: 8.5,
      transactions: 2645,
      avgTransaction: 662
    },
    quarterly: {
      total: 5100000,
      growth: 12.3,
      transactions: 7890,
      avgTransaction: 646
    },
    yearly: {
      total: 18500000,
      growth: 15.7,
      transactions: 28650,
      avgTransaction: 645
    }
  };

  const branchRevenueBreakdown = [
    {
      branchId: 'BR001',
      branchName: 'สาขาสยาม',
      revenue: 650000,
      target: 600000,
      growth: 8.3,
      transactions: 1245,
      achievement: 108.3
    },
    {
      branchId: 'BR002',
      branchName: 'สาขาเอกมัย',
      revenue: 580000,
      target: 550000,
      growth: 5.5,
      transactions: 1156,
      achievement: 105.5
    },
    {
      branchId: 'BR003',
      branchName: 'สาขาทองหล่อ',
      revenue: 520000,
      target: 500000,
      growth: 4.0,
      transactions: 1044,
      achievement: 104.0
    }
  ];

  const serviceRevenue = [
    { service: 'ตรวจสายตาทั่วไป', revenue: 450000, percentage: 25.7 },
    { service: 'ผ่าตัดต้อกระจก', revenue: 420000, percentage: 24.0 },
    { service: 'ตรวจจอประสาทตา', revenue: 380000, percentage: 21.7 },
    { service: 'จัดแว่นตา', revenue: 320000, percentage: 18.3 },
    { service: 'อื่นๆ', revenue: 180000, percentage: 10.3 }
  ];

  const currentData = revenueData[selectedPeriod];

  const getAchievementBadge = (achievement: number) => {
    if (achievement >= 110) {
      return <Badge className="bg-green-100 text-green-800">เกินเป้า</Badge>;
    } else if (achievement >= 100) {
      return <Badge className="bg-blue-100 text-blue-800">ถึงเป้า</Badge>;
    } else if (achievement >= 90) {
      return <Badge className="bg-yellow-100 text-yellow-800">ใกล้เป้า</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">ไม่ถึงเป้า</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">รายได้สาขา</h1>
        <div className="flex items-center gap-4">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="monthly">รายเดือน</option>
            <option value="quarterly">รายไตรมาส</option>
            <option value="yearly">รายปี</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            ตัวกรอง
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            ส่งออกรายงาน
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">รายได้รวม</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{currentData.total.toLocaleString()}</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">+{currentData.growth}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">จำนวนธุรกรรม</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{currentData.transactions.toLocaleString()}</p>
                <p className="text-xs text-gray-500">ธุรกรรม</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">ค่าเฉลี่ยต่อธุรกรรม</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{currentData.avgTransaction}</p>
                <p className="text-xs text-gray-500">บาท</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">สาขาทั้งหมด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{branches.length}</p>
                <p className="text-xs text-gray-500">สาขา</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Branch Revenue Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>รายได้แยกตามสาขา</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {branchRevenueBreakdown.map((branch) => (
              <div key={branch.branchId} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{branch.branchName}</h3>
                    <p className="text-sm text-gray-600">{branch.transactions.toLocaleString()} ธุรกรรม</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{branch.revenue.toLocaleString()} บาท</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">เป้าหมาย: {branch.target.toLocaleString()}</span>
                    {getAchievementBadge(branch.achievement)}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {branch.growth >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm ${branch.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {branch.growth >= 0 ? '+' : ''}{branch.growth}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Revenue Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>รายได้แยกตามบริการ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serviceRevenue.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                  <span className="font-medium">{item.service}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{item.revenue.toLocaleString()} บาท</p>
                  <p className="text-sm text-gray-600">{item.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BranchRevenue;
