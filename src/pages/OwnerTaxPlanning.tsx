
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Calculator, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  Calendar,
  FileText,
  PiggyBank,
  Target,
  Lightbulb,
  DollarSign
} from 'lucide-react';

const OwnerTaxPlanning = () => {
  const [selectedYear, setSelectedYear] = useState('2024');

  const taxSummary = {
    estimatedIncome: 8500000,
    taxableIncome: 7200000,
    estimatedTax: 1200000,
    taxPaid: 800000,
    remainingTax: 400000,
    taxRate: 16.7,
    deductions: 1300000
  };

  const taxStrategies = [
    {
      id: 1,
      title: 'ลงทุนในกองทุน LTF/RMF',
      description: 'ลดหย่อนภาษีได้สูงสุด 500,000 บาท',
      potentialSaving: 125000,
      difficulty: 'ง่าย',
      timeframe: 'ทันที',
      status: 'recommended',
      details: 'ลงทุนในกองทุนรวมหุ้นระยะยาวและกองทุนรวมเพื่อการเลี้ยงชีพ'
    },
    {
      id: 2,
      title: 'จัดตั้งบริษัทลูก',
      description: 'แยกธุรกิจเพื่อใช้อัตราภาษีแบบขั้นบันได',
      potentialSaving: 300000,
      difficulty: 'ปานกลาง',
      timeframe: '3-6 เดือน',
      status: 'considering',
      details: 'จัดตั้งบริษัทลูกเพื่อรับรายได้จากบริการเฉพาะทาง'
    },
    {
      id: 3,
      title: 'ขยายการลงทุนในอุปกรณ์',
      description: 'ค่าเสื่อมราคาช่วยลดภาษี',
      potentialSaving: 180000,
      difficulty: 'ง่าย',
      timeframe: '1 เดือน',
      status: 'in-progress',
      details: 'ซื้ออุปกรณ์การแพทย์และเทคโนโลยีใหม่ก่อนสิ้นปี'
    },
    {
      id: 4,
      title: 'การบริจาคเพื่อสังคม',
      description: 'หย่อนภาษีได้ 2 เท่าของยอดบริจาค',
      potentialSaving: 100000,
      difficulty: 'ง่าย',
      timeframe: 'ทันที',
      status: 'recommended',
      details: 'บริจาคให้มูลนิธิหรือองค์กรการกุศลที่ได้รับการรับรอง'
    }
  ];

  const monthlyTaxPlan = [
    { month: 'ม.ค.', planned: 100000, actual: 95000, status: 'completed' },
    { month: 'ก.พ.', planned: 100000, actual: 105000, status: 'completed' },
    { month: 'มี.ค.', planned: 100000, actual: 98000, status: 'completed' },
    { month: 'เม.ย.', planned: 100000, actual: 102000, status: 'completed' },
    { month: 'พ.ค.', planned: 100000, actual: 0, status: 'pending' },
    { month: 'มิ.ย.', planned: 100000, actual: 0, status: 'upcoming' }
  ];

  const taxDeadlines = [
    { 
      date: '2024-07-31', 
      task: 'ยื่นแบบ ภ.ง.ด.50', 
      description: 'ภาษีเงินได้บุคคลธรรมดา', 
      status: 'upcoming',
      priority: 'high'
    },
    { 
      date: '2024-08-15', 
      task: 'ยื่นแบบ ภ.พ.36', 
      description: 'ภาษีเงินได้หัก ณ ที่จ่าย', 
      status: 'upcoming',
      priority: 'medium'
    },
    { 
      date: '2024-09-15', 
      task: 'ชำระภาษีงวดที่ 3', 
      description: 'ภาษีเงินได้นิติบุคคล', 
      status: 'upcoming',
      priority: 'high'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recommended': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'considering': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'recommended': return 'แนะนำ';
      case 'in-progress': return 'ดำเนินการ';
      case 'considering': return 'พิจารณา';
      case 'completed': return 'เสร็จแล้ว';
      default: return status;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'ง่าย': return 'text-green-600';
      case 'ปานกลาง': return 'text-yellow-600';
      case 'ยาก': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPotentialSaving = taxStrategies.reduce((sum, strategy) => sum + strategy.potentialSaving, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">วางแผนภาษี</h1>
          <p className="text-gray-600 mt-1">วางแผนและปรับปรุงกลยุทธ์ภาษีเพื่อประหยัดค่าใช้จ่าย</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="2024">ปี 2567</option>
            <option value="2023">ปี 2566</option>
            <option value="2025">ปี 2568</option>
          </select>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            <Calculator className="h-4 w-4 mr-1" />
            Tax Planning
          </Badge>
        </div>
      </div>

      {/* Tax Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">รายได้ประเมิน</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">
              {(taxSummary.estimatedIncome / 1000000).toFixed(1)}
              <span className="text-sm font-normal text-gray-500 ml-1">ล้านบาท</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">หลังหักค่าใช้จ่าย</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">ภาษีที่ต้องชำระ</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              {(taxSummary.remainingTax / 1000).toLocaleString()}
              <span className="text-sm font-normal text-gray-500 ml-1">บาท</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">ที่เหลือต้องจ่าย</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">อัตราภาษีเฉลี่ย</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">
              {taxSummary.taxRate}
              <span className="text-sm font-normal text-gray-500 ml-1">%</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">ของรายได้สุทธิ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">ประหยัดภาษีได้</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {(totalPotentialSaving / 1000).toLocaleString()}
              <span className="text-sm font-normal text-gray-500 ml-1">บาท</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">จากกลยุทธ์ที่แนะนำ</p>
          </CardContent>
        </Card>
      </div>

      {/* Tax Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
            กลยุทธ์ประหยัดภาษี
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taxStrategies.map((strategy) => (
              <div key={strategy.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{strategy.title}</h3>
                    <p className="text-sm text-gray-600">{strategy.description}</p>
                  </div>
                  <Badge className={getStatusColor(strategy.status)}>
                    {getStatusText(strategy.status)}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">ประหยัดได้</p>
                    <p className="font-bold text-green-600">
                      {strategy.potentialSaving.toLocaleString()} ฿
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ความยาก</p>
                    <p className={`font-semibold ${getDifficultyColor(strategy.difficulty)}`}>
                      {strategy.difficulty}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ระยะเวลา</p>
                    <p className="font-semibold">{strategy.timeframe}</p>
                  </div>
                  <div>
                    <Button size="sm" className="w-full">
                      <Target className="h-4 w-4 mr-2" />
                      ดำเนินการ
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">{strategy.details}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Tax Planning */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              แผนชำระภาษีรายเดือน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyTaxPlan.map((month, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-semibold">{month.month}</p>
                    <p className="text-sm text-gray-600">
                      แผน: {month.planned.toLocaleString()} ฿
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      month.status === 'completed' ? 
                        month.actual > month.planned ? 'text-red-600' : 'text-green-600'
                      : 'text-gray-600'
                    }`}>
                      {month.status === 'completed' ? `${month.actual.toLocaleString()} ฿` : 
                       month.status === 'pending' ? 'รอชำระ' : 'รอถึงกำหนด'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {month.status === 'completed' && (
                        <>ส่วนต่าง: {(month.actual - month.planned).toLocaleString()} ฿</>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tax Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
              กำหนดเวลาสำคัญ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {taxDeadlines.map((deadline, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{deadline.task}</h4>
                    <Badge className={getPriorityColor(deadline.priority)}>
                      {deadline.priority === 'high' ? 'เร่งด่วน' : 
                       deadline.priority === 'medium' ? 'ปานกลาง' : 'ต่ำ'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{deadline.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      กำหนด: {new Date(deadline.date).toLocaleDateString('th-TH')}
                    </span>
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-1" />
                      เตรียมเอกสาร
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tax Savings Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PiggyBank className="h-5 w-5 mr-2 text-green-600" />
            ความคืบหน้าการประหยัดภาษี
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>เป้าหมายประหยัด: {totalPotentialSaving.toLocaleString()} ฿</span>
              <span>ประหยัดแล้ว: {(totalPotentialSaving * 0.3).toLocaleString()} ฿</span>
            </div>
            <Progress value={30} className="h-3" />
            <p className="text-sm text-gray-600 text-center">
              ดำเนินการแล้ว 30% - เหลืออีก {(totalPotentialSaving * 0.7).toLocaleString()} ฿
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerTaxPlanning;
