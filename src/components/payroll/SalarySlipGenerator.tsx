
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Send, Eye } from 'lucide-react';

export const SalarySlipGenerator = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('2024-06');

  const employees = [
    { id: 'EMP001', name: 'นายสมชาย ใจดี' },
    { id: 'EMP002', name: 'นางสาวมาลี รักงาน' },
    { id: 'EMP003', name: 'นายเจมส์ สมิธ' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>สร้างสลิปเงินเดือน</CardTitle>
          <CardDescription>สร้างและส่งสลิปเงินเดือนให้พนักงาน</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="employee">เลือกพนักงาน</Label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกพนักงาน" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">พนักงานทั้งหมด</SelectItem>
                  {employees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="month">เลือกเดือน</Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-06">มิถุนายน 2567</SelectItem>
                  <SelectItem value="2024-05">พฤษภาคม 2567</SelectItem>
                  <SelectItem value="2024-04">เมษายน 2567</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Eye className="w-4 h-4 mr-2" />
                ดูตัวอย่าง
              </Button>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              ดาวน์โหลด PDF
            </Button>
            <Button variant="outline">
              <Send className="w-4 h-4 mr-2" />
              ส่งทางอีเมล
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Salary Slip Preview */}
      {selectedEmployee && (
        <Card>
          <CardHeader>
            <CardTitle>ตัวอย่างสลิปเงินเดือน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white border-2 border-dashed border-gray-300 p-8 rounded-lg">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold">คลินิกตรวจสายตา VisionCare</h2>
                <p className="text-gray-600">สลิปเงินเดือนประจำเดือน มิถุนายน 2567</p>
              </div>
              
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>รหัสพนักงาน: EMP001</div>
                  <div>ชื่อ-นามสกุล: นายสมชาย ใจดี</div>
                </div>
                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium">รายได้</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>เงินเดือนพื้นฐาน</span>
                          <span>25,000.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ค่าล่วงเวลา</span>
                          <span>1,200.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>โบนัส</span>
                          <span>2,000.00</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">รายการหัก</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>ประกันสังคม</span>
                          <span>750.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ภาษี</span>
                          <span>1,200.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>รวมรับสุทธิ</span>
                    <span>26,250.00 บาท</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
