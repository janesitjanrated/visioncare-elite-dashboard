
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calculator, FileText, AlertTriangle, Calendar, DollarSign, Receipt } from 'lucide-react';

const OwnerTax = () => {
  const taxData = [
    { title: 'ภาษีเงินได้นิติบุคคล', amount: '185,000', dueDate: '2024-08-31', status: 'pending' },
    { title: 'ภาษีมูลค่าเพิ่ม', amount: '45,000', dueDate: '2024-07-15', status: 'paid' },
    { title: 'ภาษีเงินได้หัก ณ ที่จ่าย', amount: '28,000', dueDate: '2024-07-07', status: 'paid' },
    { title: 'ประกันสังคม', amount: '12,500', dueDate: '2024-07-15', status: 'pending' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ภาษี</h1>
          <p className="text-gray-600 mt-1">จัดการภาษีและการส่งรายงาน</p>
        </div>
        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
          <Calculator className="h-4 w-4 mr-1" />
          ภาษี
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>ภาษีที่ต้องชำระ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {taxData.map((tax, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Receipt className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-semibold">{tax.title}</p>
                      <p className="text-sm text-gray-600">
                        ครบกำหนด: {new Date(tax.dueDate).toLocaleDateString('th-TH')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{tax.amount} บาท</p>
                    <Badge className={tax.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {tax.status === 'paid' ? 'ชำระแล้ว' : 'รอชำระ'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>เครื่องมือภาษี</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="outline">
              <Calculator className="h-4 w-4 mr-2" />
              คำนวณภาษี
            </Button>
            <Button className="w-full" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              สร้างรายงาน
            </Button>
            <Button className="w-full" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              ปฏิทินภาษี
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
            การแจ้งเตือนภาษี
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border-l-4 border-red-500 bg-red-50">
              <p className="text-sm font-medium">ภาษีเงินได้นิติบุคคล ครบกำหนดใน 15 วัน</p>
            </div>
            <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
              <p className="text-sm font-medium">ประกันสังคมประจำเดือน ก.ค. ครบกำหนดใน 7 วัน</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerTax;
