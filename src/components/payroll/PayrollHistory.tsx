
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, Calendar } from 'lucide-react';

export const PayrollHistory = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-06');
  
  const [payrollHistory] = useState([
    {
      id: 'PAY001',
      month: '2024-06',
      monthName: 'มิถุนายน 2567',
      totalEmployees: 12,
      totalAmount: 285000,
      paidEmployees: 12,
      pendingEmployees: 0,
      status: 'completed',
      processedDate: '2024-06-30'
    },
    {
      id: 'PAY002',
      month: '2024-05',
      monthName: 'พฤษภาคม 2567',
      totalEmployees: 11,
      totalAmount: 265000,
      paidEmployees: 11,
      pendingEmployees: 0,
      status: 'completed',
      processedDate: '2024-05-31'
    },
    {
      id: 'PAY003',
      month: '2024-04',
      monthName: 'เมษายน 2567',
      totalEmployees: 10,
      totalAmount: 240000,
      paidEmployees: 10,
      pendingEmployees: 0,
      status: 'completed',
      processedDate: '2024-04-30'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'จ่ายครบแล้ว';
      case 'processing': return 'กำลังจ่าย';
      case 'pending': return 'รอจ่าย';
      default: return 'ไม่ทราบสถานะ';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ประวัติการจ่ายเงินเดือน</CardTitle>
          <CardDescription>ตรวจสอบประวัติการจ่ายเงินเดือนย้อนหลัง</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4 items-center">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-06">มิถุนายน 2567</SelectItem>
                  <SelectItem value="2024-05">พฤษภาคม 2567</SelectItem>
                  <SelectItem value="2024-04">เมษายน 2567</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              ดาวน์โหลดรายงาน
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>เดือน/ปี</TableHead>
                  <TableHead>จำนวนพนักงาน</TableHead>
                  <TableHead>จำนวนเงินรวม</TableHead>
                  <TableHead>จ่ายแล้ว</TableHead>
                  <TableHead>ค้างจ่าย</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>วันที่ประมวลผล</TableHead>
                  <TableHead>จัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="font-medium">{record.monthName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {record.totalEmployees} คน
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-blue-600">
                        ฿{record.totalAmount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-green-600 font-medium">
                        {record.paidEmployees} คน
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={record.pendingEmployees > 0 ? "text-red-600 font-medium" : "text-gray-400"}>
                        {record.pendingEmployees} คน
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(record.status)}>
                        {getStatusText(record.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(record.processedDate).toLocaleDateString('th-TH')}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          ดูรายละเอียด
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          รายงาน
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
