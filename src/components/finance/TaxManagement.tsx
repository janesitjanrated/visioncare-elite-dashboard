
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Plus, FileText, Calculator, AlertTriangle, Download } from 'lucide-react';
import { TaxForm } from './TaxForm';

export const TaxManagement = () => {
  const [showTaxForm, setShowTaxForm] = useState(false);

  const [taxRecords] = useState([
    { 
      id: '1', 
      period: '2024-05', 
      type: 'vat', 
      revenue: 520000, 
      vatOutput: 36400, 
      vatInput: 8000, 
      netVat: 28400, 
      status: 'filed',
      dueDate: '2024-06-15',
      filedDate: '2024-06-10'
    },
    { 
      id: '2', 
      period: '2024-04', 
      type: 'vat', 
      revenue: 480000, 
      vatOutput: 33600, 
      vatInput: 7200, 
      netVat: 26400, 
      status: 'filed',
      dueDate: '2024-05-15',
      filedDate: '2024-05-12'
    },
    { 
      id: '3', 
      period: '2024-06', 
      type: 'vat', 
      revenue: 450000, 
      vatOutput: 31500, 
      vatInput: 9000, 
      netVat: 22500, 
      status: 'pending',
      dueDate: '2024-07-15',
      filedDate: null
    }
  ]);

  const [withHoldingTax] = useState([
    { id: '1', date: '2024-06-15', vendor: 'ABC Medical Supply', amount: 5000, taxRate: 3, withheld: 150 },
    { id: '2', date: '2024-06-20', vendor: 'XYZ Equipment', amount: 8000, taxRate: 3, withheld: 240 },
    { id: '3', date: '2024-06-25', vendor: 'Marketing Agency', amount: 15000, taxRate: 3, withheld: 450 }
  ]);

  const [quarterlyData] = useState([
    { quarter: 'Q1 2024', revenue: 1200000, netVat: 75000, incomeTax: 24000, totalTax: 99000 },
    { quarter: 'Q2 2024', revenue: 1450000, netVat: 77300, incomeTax: 28000, totalTax: 105300 },
  ]);

  const currentNetVat = taxRecords.reduce((sum, record) => sum + record.netVat, 0);
  const currentWithholding = withHoldingTax.reduce((sum, record) => sum + record.withheld, 0);
  const pendingReturns = taxRecords.filter(record => record.status === 'pending').length;

  const getStatusColor = (status) => {
    return status === 'filed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ภาษีมูลค่าเพิ่มสุทธิ</CardTitle>
            <Calculator className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ฿{currentNetVat.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">ไตรมาสปัจจุบัน</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ภาษีหัก ณ ที่จ่าย</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ฿{currentWithholding.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">เดือนนี้</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">แบบแสดงรายการค้าง</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {pendingReturns}
            </div>
            <p className="text-xs text-gray-600">รายการ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ภาษีรวมไตรมาส</CardTitle>
            <Calculator className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              ฿{quarterlyData[quarterlyData.length - 1]?.totalTax.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-gray-600">Q2 2024</p>
          </CardContent>
        </Card>
      </div>

      {/* Tax Burden Chart */}
      <Card>
        <CardHeader>
          <CardTitle>ภาระภาษีรายไตรมาส</CardTitle>
          <CardDescription>การเปรียบเทียบภาระภาษีทั้งหมด</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={quarterlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip formatter={(value) => `฿${value.toLocaleString()}`} />
              <Bar dataKey="netVat" fill="#3b82f6" name="ภาษีมูลค่าเพิ่ม" />
              <Bar dataKey="incomeTax" fill="#10b981" name="ภาษีเงินได้" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* VAT Returns */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>แบบแสดงรายการภาษีมูลค่าเพิ่ม</CardTitle>
              <CardDescription>ติดตามการยื่นแบบแสดงรายการ ภพ.30</CardDescription>
            </div>
            <Button onClick={() => setShowTaxForm(true)} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มรายการ
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>งวด</TableHead>
                <TableHead className="text-right">รายได้</TableHead>
                <TableHead className="text-right">ภาษีขาย</TableHead>
                <TableHead className="text-right">ภาษีซื้อ</TableHead>
                <TableHead className="text-right">ภาษีสุทธิ</TableHead>
                <TableHead>กำหนดยื่น</TableHead>
                <TableHead>สถานะ</TableHead>
                <TableHead className="text-center">การจัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.period}</TableCell>
                  <TableCell className="text-right">฿{record.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">฿{record.vatOutput.toLocaleString()}</TableCell>
                  <TableCell className="text-right">฿{record.vatInput.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-bold">฿{record.netVat.toLocaleString()}</TableCell>
                  <TableCell>{new Date(record.dueDate).toLocaleDateString('th-TH')}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(record.status)}`}>
                      {record.status === 'filed' ? 'ยื่นแล้ว' : 'ค้างยื่น'}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Withholding Tax */}
      <Card>
        <CardHeader>
          <CardTitle>ภาษีหัก ณ ที่จ่าย</CardTitle>
          <CardDescription>รายการภาษีที่หักจากการจ่ายเงิน</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>วันที่</TableHead>
                <TableHead>ผู้รับเงิน</TableHead>
                <TableHead className="text-right">จำนวนเงิน</TableHead>
                <TableHead className="text-center">อัตราภาษี</TableHead>
                <TableHead className="text-right">ภาษีหัก</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withHoldingTax.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{new Date(record.date).toLocaleDateString('th-TH')}</TableCell>
                  <TableCell>{record.vendor}</TableCell>
                  <TableCell className="text-right">฿{record.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{record.taxRate}%</TableCell>
                  <TableCell className="text-right font-bold">฿{record.withheld.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">รวมภาษีหัก ณ ที่จ่าย:</span>
              <span className="font-bold text-lg">฿{currentWithholding.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>ปฏิทินภาษี</CardTitle>
          <CardDescription>กำหนดการยื่นแบบแสดงรายการภาษีที่สำคัญ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">ภาษีมูลค่าเพิ่ม (ภพ.30)</h4>
              <p className="text-sm text-gray-600">ยื่นภายในวันที่ 15 ของเดือนถัดไป</p>
              <p className="text-sm font-medium text-red-600">ครั้งต่อไป: 15 ก.ค. 2024</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">ภาษีหัก ณ ที่จ่าย (ภงด.1)</h4>
              <p className="text-sm text-gray-600">ยื่นภายในวันที่ 7 ของเดือนถัดไป</p>
              <p className="text-sm font-medium text-yellow-600">ครั้งต่อไป: 7 ก.ค. 2024</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">ภาษีเงินได้นิติบุคคล</h4>
              <p className="text-sm text-gray-600">ยื่นภายใน 150 วันหลังสิ้นรอบปีบัญชี</p>
              <p className="text-sm font-medium text-blue-600">ครั้งต่อไป: 30 พ.ค. 2025</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">ภาษีเงินได้บุคคลธรรมดา</h4>
              <p className="text-sm text-gray-600">ยื่นภายในวันที่ 30 มี.ค.</p>
              <p className="text-sm font-medium text-green-600">ครั้งต่อไป: 30 มี.ค. 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Form Modal */}
      {showTaxForm && (
        <TaxForm
          onSave={(taxData) => {
            console.log('New tax record:', taxData);
            setShowTaxForm(false);
          }}
          onClose={() => setShowTaxForm(false)}
        />
      )}
    </div>
  );
};
