
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  TrendingUp, 
  Target, 
  Award, 
  Building, 
  Calendar,
  BarChart3,
  Star,
  Trophy,
  Clock
} from 'lucide-react';

const OwnerPerformance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const teamPerformance = [
    {
      id: 'T001',
      name: 'ทีมสาขาสีลม',
      leader: 'นางสาว สมใจ ใจดี',
      members: 8,
      revenue: 2450000,
      target: 2800000,
      achievement: 87.5,
      ranking: 1,
      growth: 15.2
    },
    {
      id: 'T002',
      name: 'ทีมสาขาอโศก',
      leader: 'นาย วิชาญ มองใส',
      members: 6,
      revenue: 1890000,
      target: 2200000,
      achievement: 85.9,
      ranking: 2,
      growth: 12.8
    },
    {
      id: 'T003',
      name: 'ทีมสาขาเซ็นทรัล',
      leader: 'นาง ปรีชา รักษาดี',
      members: 10,
      revenue: 1650000,
      target: 2000000,
      achievement: 82.5,
      ranking: 3,
      growth: 8.4
    }
  ];

  const individualPerformance = [
    {
      id: 'E001',
      name: 'นพ.สมชาย รักษาดี',
      position: 'หมอสายตา',
      branch: 'สีลม',
      patientsPerDay: 25,
      revenue: 450000,
      target: 500000,
      rating: 4.9,
      achievement: 90
    },
    {
      id: 'E002',
      name: 'นางสาว มาลี ใสใน',
      position: 'พนักงานขาย',
      branch: 'อโศก',
      salesCount: 45,
      revenue: 380000,
      target: 400000,
      rating: 4.7,
      achievement: 95
    },
    {
      id: 'E003',
      name: 'นาย ประยุทธ์ มีสกิล',
      position: 'ช่างแว่น',
      branch: 'เซ็นทรัล',
      completedOrders: 120,
      revenue: 280000,
      target: 320000,
      rating: 4.6,
      achievement: 87.5
    }
  ];

  const branchMetrics = [
    { title: 'ทีมทั้งหมด', value: '12', unit: 'ทีม', change: '+2' },
    { title: 'พนักงานรวม', value: '156', unit: 'คน', change: '+18' },
    { title: 'ยอดขายรวม', value: '8.2', unit: 'ล้านบาท', change: '+1.2M' },
    { title: 'เป้าหมายรวม', value: '92.3', unit: '%', change: '+5.8%' }
  ];

  const getRankingIcon = (ranking: number) => {
    switch (ranking) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-600" />;
      case 2: return <Award className="h-5 w-5 text-gray-500" />;
      case 3: return <Star className="h-5 w-5 text-orange-600" />;
      default: return <Target className="h-5 w-5 text-blue-600" />;
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performance ทีม/สาขา</h1>
          <p className="text-gray-600 mt-1">ติดตามผลงานและประสิทธิภาพของทีมและสาขา</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="week">สัปดาห์นี้</option>
            <option value="month">เดือนนี้</option>
            <option value="quarter">ไตรมาสนี้</option>
            <option value="year">ปีนี้</option>
          </select>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Users className="h-4 w-4 mr-1" />
            Performance
          </Badge>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {branchMetrics.map((metric, index) => (
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
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 font-semibold">{metric.change}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-blue-600" />
              ผลงานทีม/สาขา
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((team) => (
                <div key={team.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getRankingIcon(team.ranking)}
                      <div>
                        <h3 className="font-semibold">{team.name}</h3>
                        <p className="text-sm text-gray-600">หัวหน้าทีม: {team.leader}</p>
                      </div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">
                      อันดับ {team.ranking}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">สมาชิก</p>
                      <p className="font-semibold">{team.members} คน</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">การเติบโต</p>
                      <p className="font-semibold text-green-600">+{team.growth}%</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>ยอดขาย: {team.revenue.toLocaleString()} ฿</span>
                      <span>เป้าหมาย: {team.target.toLocaleString()} ฿</span>
                    </div>
                    <Progress value={team.achievement} className="h-2" />
                    <p className="text-sm text-gray-600 text-center">
                      ความสำเร็จ: {team.achievement}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Individual Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-600" />
              ผลงานรายบุคคล
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {individualPerformance.map((person) => (
                <div key={person.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{person.name}</h3>
                      <p className="text-sm text-gray-600">
                        {person.position} - สาขา{person.branch}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getRatingStars(person.rating)}
                      <span className="text-sm font-medium ml-1">{person.rating}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">
                        {person.position === 'หมอสายตา' ? 'ผู้ป่วย/วัน' : 
                         person.position === 'พนักงานขาย' ? 'ยอดขาย' : 'งานเสร็จ'}
                      </p>
                      <p className="font-semibold">
                        {person.patientsPerDay || person.salesCount || person.completedOrders}
                        {person.position === 'หมอสายตา' ? ' คน' : 
                         person.position === 'พนักงานขาย' ? ' รายการ' : ' ชิ้น'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">ยอดขาย</p>
                      <p className="font-semibold">{person.revenue.toLocaleString()} ฿</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>เป้าหมาย: {person.target.toLocaleString()} ฿</span>
                      <span>ความสำเร็จ: {person.achievement}%</span>
                    </div>
                    <Progress value={person.achievement} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>การจัดการผลงาน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <BarChart3 className="h-4 w-4 mr-2" />
              รายงานประจำเดือน
            </Button>
            <Button variant="outline">
              <Target className="h-4 w-4 mr-2" />
              ตั้งเป้าหมายใหม่
            </Button>
            <Button variant="outline">
              <Award className="h-4 w-4 mr-2" />
              ระบบรางวัล
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              นัดประชุมทีม
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerPerformance;
