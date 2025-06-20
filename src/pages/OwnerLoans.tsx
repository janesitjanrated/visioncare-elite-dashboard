
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Banknote, TrendingDown, Calendar, AlertCircle, CreditCard, Building } from 'lucide-react';

const OwnerLoans = () => {
  const loanData = [
    { 
      bank: 'ธนาคารกรุงเทพ', 
      amount: '2,500,000', 
      remaining: '1,850,000', 
      rate: '4.5%', 
      nextPayment: '2024-07-15',
      monthlyPayment: '85,000',
      type: 'business'
    },
    { 
      bank: 'ธนาคารกสิกรไทย', 
      amount: '1,200,000', 
      remaining: '950,000', 
      rate: '3.8%', 
      nextPayment: '2024-07-20',
      monthlyPayment: '45,000',
      type: 'equipment'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">เงินกู้</h1>
          <p className="text-gray-600 mt-1">จัดการเงินกู้และการชำระหนี้</p>
        </div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          <Banknote className="h-4 w-4 mr-1" />
          เงินกู้
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">หนี้สินรวม</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">2,800,000 บาท</p>
            <div className="flex items-center mt-1">
              <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600 font-semibold">-12.5%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">ชำระรายเดือน</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">130,000 บาท</p>
            <p className="text-sm text-gray-600 mt-1">จากทั้งหมด 2 สัญญา</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">อัตราดอกเบี้ยเฉลี่ย</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">4.15%</p>
            <p className="text-sm text-gray-600 mt-1">ต่อปี</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>รายละเอียดเงินกู้</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {loanData.map((loan, index) => (
              <div key={index} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Building className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="font-bold text-lg">{loan.bank}</h3>
                      <Badge variant="outline">
                        {loan.type === 'business' ? 'เงินกู้ธุรกิจ' : 'เงินกู้อุปกรณ์'}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">อัตราดอกเบี้ย</p>
                    <p className="font-bold text-lg text-blue-600">{loan.rate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">วงเงินเดิม</p>
                    <p className="font-semibold">{loan.amount} บาท</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ยอดคงเหลือ</p>
                    <p className="font-semibold text-red-600">{loan.remaining} บาท</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ชำระรายเดือน</p>
                    <p className="font-semibold">{loan.monthlyPayment} บาท</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ครบกำหนดงวดถัดไป</p>
                    <p className="font-semibold">
                      {new Date(loan.nextPayment).toLocaleDateString('th-TH')}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">ความคืบหน้าการชำระ</span>
                    <span className="text-sm font-semibold">
                      {Math.round(((parseFloat(loan.amount.replace(/,/g, '')) - parseFloat(loan.remaining.replace(/,/g, ''))) / parseFloat(loan.amount.replace(/,/g, ''))) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" 
                      style={{ 
                        width: `${Math.round(((parseFloat(loan.amount.replace(/,/g, '')) - parseFloat(loan.remaining.replace(/,/g, ''))) / parseFloat(loan.amount.replace(/,/g, ''))) * 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button size="sm" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    ดูตารางชำระ
                  </Button>
                  <Button size="sm" variant="outline">
                    <CreditCard className="h-4 w-4 mr-2" />
                    ชำระเงิน
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-orange-600" />
            การแจ้งเตือนการชำระ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border-l-4 border-orange-500 bg-orange-50">
              <p className="text-sm font-medium">
                ธนาคารกรุงเทพ - ครบกำหนดชำระในอีก 5 วัน (85,000 บาท)
              </p>
            </div>
            <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
              <p className="text-sm font-medium">
                ธนาคารกสิกรไทย - ครบกำหนดชำระในอีก 10 วัน (45,000 บาท)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerLoans;
