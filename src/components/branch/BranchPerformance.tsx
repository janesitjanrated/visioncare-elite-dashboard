
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Target, BarChart3 } from 'lucide-react';
import { branchTargets } from '@/data/branchMockData';

const BranchPerformance = () => {
  const currentTarget = branchTargets[0];
  const achievementColor = currentTarget.achievementRate >= 100 ? 'text-green-600' : 'text-red-600';
  const trendIcon = currentTarget.achievementRate >= 100 ? TrendingUp : TrendingDown;
  const TrendIcon = trendIcon;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">ผลงานสาขา</h1>
        <Badge variant="outline">
          {currentTarget.month}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">รายได้</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">เป้าหมาย</span>
                <span className="text-sm font-medium">{currentTarget.revenueTarget.toLocaleString()} บาท</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">ผลจริง</span>
                <span className="text-lg font-bold text-green-600">{currentTarget.actualRevenue.toLocaleString()} บาท</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendIcon className={`h-4 w-4 ${achievementColor}`} />
                <span className={`text-sm font-semibold ${achievementColor}`}>
                  {currentTarget.achievementRate}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">ลูกค้า</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">เป้าหมาย</span>
                <span className="text-sm font-medium">{currentTarget.customerTarget.toLocaleString()} คน</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">ผลจริง</span>
                <span className="text-lg font-bold text-blue-600">{currentTarget.actualCustomers.toLocaleString()} คน</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">
                  {((currentTarget.actualCustomers / currentTarget.customerTarget) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">นัดหมาย</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">เป้าหมาย</span>
                <span className="text-sm font-medium">{currentTarget.appointmentTarget.toLocaleString()} ครั้ง</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">ผลจริง</span>
                <span className="text-lg font-bold text-purple-600">{currentTarget.actualAppointments.toLocaleString()} ครั้ง</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-600">
                  {((currentTarget.actualAppointments / currentTarget.appointmentTarget) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>สรุปผลการดำเนินงาน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-green-800">อัตราความสำเร็จโดยรวม</h3>
                <p className="text-sm text-green-600">เกินเป้าหมายที่ตั้งไว้</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">{currentTarget.achievementRate}%</p>
                <p className="text-sm text-green-500">+{(currentTarget.achievementRate - 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BranchPerformance;
