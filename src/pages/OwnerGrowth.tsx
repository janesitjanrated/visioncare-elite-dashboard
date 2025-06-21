
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Target, 
  Rocket, 
  BarChart3,
  Users,
  MapPin,
  DollarSign,
  Calendar,
  Star,
  Lightbulb,
  CheckCircle,
  Clock
} from 'lucide-react';

const OwnerGrowth = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('year');

  const growthMetrics = [
    { title: 'การเติบโตรายได้', value: '24.5', unit: '%', change: '+5.2%', target: 30 },
    { title: 'ลูกค้าใหม่', value: '450', unit: 'คน/เดือน', change: '+85', target: 500 },
    { title: 'ขยายสาขา', value: '3', unit: 'สาขาใหม่', change: '+1', target: 5 },
    { title: 'มูลค่าบริษัท', value: '45', unit: 'ล้านบาท', change: '+8M', target: 60 }
  ];

  const growthStrategies = [
    {
      id: 1,
      category: 'Market Expansion',
      title: 'ขยายสาขาในห้างสรรพสินค้า',
      description: 'เปิดสาขาใหม่ในห้างชั้นนำ 5 แห่ง',
      timeline: '12 เดือน',
      investment: 6000000,
      expectedReturn: 150,
      probability: 85,
      status: 'planning',
      milestones: [
        { task: 'Market Research', completed: true },
        { task: 'Location Scouting', completed: true },
        { task: 'Lease Negotiation', completed: false },
        { task: 'Store Setup', completed: false }
      ]
    },
    {
      id: 2,
      category: 'Digital Transformation',
      title: 'พัฒนาแพลตฟอร์มออนไลน์',
      description: 'ระบบ E-commerce และ Telemedicine',
      timeline: '8 เดือน',
      investment: 2500000,
      expectedReturn: 200,
      probability: 90,
      status: 'in-progress',
      milestones: [
        { task: 'System Design', completed: true },
        { task: 'Development', completed: true },
        { task: 'Testing', completed: false },
        { task: 'Launch', completed: false }
      ]
    },
    {
      id: 3,
      category: 'Service Innovation',
      title: 'บริการตรวจสายตาโดย AI',
      description: 'นำ AI มาช่วยในการตรวจวิเคราะห์',
      timeline: '6 เดือน',
      investment: 3500000,
      expectedReturn: 180,
      probability: 75,
      status: 'researching',
      milestones: [
        { task: 'Technology Research', completed: true },
        { task: 'Vendor Selection', completed: false },
        { task: 'Pilot Testing', completed: false },
        { task: 'Full Implementation', completed: false }
      ]
    },
    {
      id: 4,
      category: 'Partnership',
      title: 'พันธมิตรกับโรงพยาบาล',
      description: 'สร้างเครือข่ายกับโรงพยาบาลชั้นนำ',
      timeline: '4 เดือน',
      investment: 1000000,
      expectedReturn: 120,
      probability: 95,
      status: 'negotiating',
      milestones: [
        { task: 'Partner Identification', completed: true },
        { task: 'Initial Meetings', completed: true },
        { task: 'Contract Negotiation', completed: false },
        { task: 'Partnership Launch', completed: false }
      ]
    }
  ];

  const competitorAnalysis = [
    { name: 'ออพติคัล ชอป A', marketShare: 25, growth: 15, strength: 'ราคาถูก' },
    { name: 'อายแคร์ B', marketShare: 20, growth: 12, strength: 'เทคโนโลยี' },
    { name: 'ร้านแว่นตา C', marketShare: 18, growth: 8, strength: 'สาขาเยอะ' },
    { name: 'VisionCare (เรา)', marketShare: 15, growth: 24.5, strength: 'คุณภาพ' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-green-100 text-green-800';
      case 'researching': return 'bg-purple-100 text-purple-800';
      case 'negotiating': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planning': return 'วางแผน';
      case 'in-progress': return 'ดำเนินการ';
      case 'researching': return 'วิจัย';
      case 'negotiating': return 'เจรจา';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning': return <Target className="h-4 w-4" />;
      case 'in-progress': return <Rocket className="h-4 w-4" />;
      case 'researching': return <Lightbulb className="h-4 w-4" />;
      case 'negotiating': return <Users className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const calculateProgress = (milestones: any[]) => {
    const completed = milestones.filter(m => m.completed).length;
    return (completed / milestones.length) * 100;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">การเติบโต</h1>
          <p className="text-gray-600 mt-1">วางแผนและติดตามการเติบโตของธุรกิจ</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="quarter">ไตรมาสนี้</option>
            <option value="year">ปีนี้</option>
            <option value="3years">3 ปีข้างหน้า</option>
          </select>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <TrendingUp className="h-4 w-4 mr-1" />
            Growth
          </Badge>
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {growthMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-gray-900">
                  {metric.value}
                  <span className="text-sm font-normal text-gray-500 ml-1">{metric.unit}</span>
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 font-semibold">{metric.change}</span>
                  </div>
                  <span className="text-xs text-gray-500">เป้า: {metric.target}</span>
                </div>
                <Progress 
                  value={(parseFloat(metric.value) / metric.target) * 100} 
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Growth Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Rocket className="h-5 w-5 mr-2 text-blue-600" />
            กลยุทธ์การเติบโต
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {growthStrategies.map((strategy) => (
              <div key={strategy.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline">{strategy.category}</Badge>
                      <Badge className={getStatusColor(strategy.status)}>
                        {getStatusIcon(strategy.status)}
                        <span className="ml-1">{getStatusText(strategy.status)}</span>
                      </Badge>
                    </div>
                    <h3 className="font-bold text-xl">{strategy.title}</h3>
                    <p className="text-gray-600">{strategy.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">ระยะเวลา</p>
                    <p className="font-semibold">{strategy.timeline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">เงินลงทุน</p>
                    <p className="font-semibold">{strategy.investment.toLocaleString()} ฿</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ผลตอบแทนคาดการณ์</p>
                    <p className="font-semibold text-green-600">{strategy.expectedReturn}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">โอกาสสำเร็จ</p>
                    <p className="font-semibold">{strategy.probability}%</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">ความคืบหน้า</h4>
                    <span className="text-sm text-gray-600">
                      {calculateProgress(strategy.milestones).toFixed(0)}% เสร็จสิ้น
                    </span>
                  </div>
                  <Progress value={calculateProgress(strategy.milestones)} className="h-2" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {strategy.milestones.map((milestone, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        {milestone.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Clock className="h-4 w-4 text-gray-400" />
                        )}
                        <span className={`text-sm ${
                          milestone.completed ? 'text-green-700 line-through' : 'text-gray-700'
                        }`}>
                          {milestone.task}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t">
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    รายละเอียด
                  </Button>
                  <div className="space-x-2">
                    <Button size="sm" variant="outline">
                      แก้ไข
                    </Button>
                    <Button size="sm">
                      อัปเดต
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Competitor Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-600" />
              การวิเคราะห์คู่แข่ง
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {competitorAnalysis.map((competitor, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">{competitor.name}</h4>
                    <Badge variant="outline">{competitor.strength}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">ส่วนแบ่งตลาด</p>
                      <p className="font-semibold">{competitor.marketShare}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">การเติบโต</p>
                      <p className={`font-semibold ${
                        competitor.name === 'VisionCare (เรา)' ? 'text-green-600' : 'text-gray-700'
                      }`}>
                        +{competitor.growth}%
                      </p>
                    </div>
                  </div>
                  <Progress value={competitor.marketShare} className="h-2 mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Growth Roadmap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              แผนการเติบโต 3 ปี
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">ปี 2567 (ปัจจุบัน)</h4>
                <p className="text-sm text-gray-600">ขยาย 3 สาขา, พัฒนาออนไลน์</p>
                <p className="text-sm font-semibold text-green-600">เป้า: 15M รายได้</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold">ปี 2568</h4>
                <p className="text-sm text-gray-600">นำ AI มาใช้, พันธมิตรโรงพยาบาล</p>
                <p className="text-sm font-semibold text-blue-600">เป้า: 25M รายได้</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">ปี 2569</h4>
                <p className="text-sm text-gray-600">ขยายต่างจังหวัด, ไปต่างประเทศ</p>
                <p className="text-sm font-semibold text-purple-600">เป้า: 40M รายได้</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerGrowth;
