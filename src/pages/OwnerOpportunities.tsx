
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Target, 
  Lightbulb, 
  MapPin, 
  Users, 
  DollarSign, 
  Calendar,
  Star,
  BarChart3,
  Growth
} from 'lucide-react';

const OwnerOpportunities = () => {
  const opportunities = [
    {
      title: 'ขยายสาขาใหม่ในห้างสรรพสินค้า',
      category: 'expansion',
      potential: 'สูง',
      investment: '1,200,000',
      roi: '180%',
      timeframe: '12 เดือน',
      status: 'evaluating',
      description: 'เปิดสาขาในห้างสรรพสินค้าชั้นนำ 3 แห่ง'
    },
    {
      title: 'เพิ่มบริการตรวจสายตาเด็ก',
      category: 'service',
      potential: 'ปานกลาง',
      investment: '350,000',
      roi: '145%',
      timeframe: '6 เดือน',
      status: 'planning',
      description: 'บริการเฉพาะสำหรับเด็กอายุ 3-15 ปี'
    },
    {
      title: 'แพ็คเกจตรวจสุขภาพตาสำหรับองค์กร',
      category: 'b2b',
      potential: 'สูง',
      investment: '150,000',
      roi: '220%',
      timeframe: '3 เดือน',
      status: 'ready',
      description: 'ขายแพ็คเกจให้บริษัทใหญ่สำหรับพนักงาน'
    },
    {
      title: 'ระบบ Online Booking',
      category: 'digital',
      potential: 'ปานกลาง',
      investment: '280,000',
      roi: '165%',
      timeframe: '4 เดือน',
      status: 'planning',
      description: 'แอปพลิเคชันจองคิวออนไลน์'
    }
  ];

  const marketTrends = [
    { trend: 'ผู้สูงอายุเพิ่มขึ้น', impact: 'สูง', opportunity: 'บริการเฉพาะผู้สูงอายุ' },
    { trend: 'WFH เพิ่มขึ้น', impact: 'ปานกลาง', opportunity: 'แว่นป้องกันแสงน้ำเงิน' },
    { trend: 'สุขภาพเป็นเทรนด์', impact: 'สูง', opportunity: 'แพ็คเกจตรวจสุขภาพ' },
    { trend: 'เทคโนโลยีสูง', impact: 'ปานกลาง', opportunity: 'อุปกรณ์ตรวจสมัยใหม่' }
  ];

  const performanceMetrics = [
    { title: 'โอกาสทั้งหมด', value: '12', unit: 'โครงการ', change: '+3' },
    { title: 'มูลค่ารวม', value: '5.2', unit: 'ล้านบาท', change: '+1.8M' },
    { title: 'ROI เฉลี่ย', value: '178', unit: '%', change: '+12%' },
    { title: 'เวลาคืนทุนเฉลี่ย', value: '8', unit: 'เดือน', change: '-2 เดือน' }
  ];

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
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">โอกาส</h1>
          <p className="text-gray-600 mt-1">สำรวจและติดตามโอกาสทางธุรกิจ</p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <TrendingUp className="h-4 w-4 mr-1" />
          Opportunities
        </Badge>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
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

      {/* Opportunities List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
            โอกาสทางธุรกิจ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {opportunities.map((opportunity, index) => (
              <div key={index} className="border rounded-lg p-6">
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
                    <Button size="sm" variant="outline">
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

      {/* Market Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              เทรนด์ตลาด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-semibold">{trend.trend}</p>
                    <p className="text-sm text-gray-600">โอกาส: {trend.opportunity}</p>
                  </div>
                  <Badge className={trend.impact === 'สูง' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {trend.impact}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-purple-600" />
              แผนการดำเนินงาน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-green-800">ข้อเสนอ B2B Package</p>
                    <p className="text-sm text-green-600">เริ่มได้ทันที</p>
                  </div>
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-blue-800">วิจัยตลาดสาขาใหม่</p>
                    <p className="text-sm text-blue-600">ดำเนินการใน Q3</p>
                  </div>
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-yellow-800">พัฒนาบริการเด็ก</p>
                    <p className="text-sm text-yellow-600">รออนุมัติงบ</p>
                  </div>
                  <Users className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerOpportunities;
