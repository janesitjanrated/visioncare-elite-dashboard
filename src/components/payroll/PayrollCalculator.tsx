
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calculator, CheckCircle, Clock, Save } from 'lucide-react';

export const PayrollCalculator = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-06');
  const [payrollData, setPayrollData] = useState([
    {
      id: 'EMP001',
      name: 'นายสมชาย ใจดี',
      bankAccount: '123-4-56789-0',
      baseSalary: 25000,
      workDays: 22,
      totalWorkDays: 22,
      otHours: 8,
      otRate: 150,
      bonus: 2000,
      allowances: 1500,
      socialSecurity: 750,
      tax: 1200,
      otherDeductions: 500,
      netSalary: 0,
      status: 'pending'
    },
    {
      id: 'EMP002',
      name: 'นางสาวมาลี รักงาน',
      bankAccount: '987-6-54321-0',
      baseSalary: 22000,
      workDays: 20,
      totalWorkDays: 22,
      otHours: 12,
      otRate: 130,
      bonus: 1500,
      allowances: 1000,
      socialSecurity: 660,
      tax: 800,
      otherDeductions: 200,
      netSalary: 0,
      status: 'paid'
    }
  ]);

  const calculateNetSalary = (employee) => {
    const dailySalary = employee.baseSalary / employee.totalWorkDays;
    const actualSalary = dailySalary * employee.workDays;
    const otPay = employee.otHours * employee.otRate;
    const grossPay = actualSalary + otPay + employee.bonus + employee.allowances;
    const totalDeductions = employee.socialSecurity + employee.tax + employee.otherDeductions;
    return grossPay - totalDeductions;
  };

  const updateEmployeeStatus = (employeeId, newStatus) => {
    setPayrollData(prevData =>
      prevData.map(emp =>
        emp.id === employeeId ? { ...emp, status: newStatus } : emp
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Month Selection */}
      <Card>
        <CardHeader>
          <CardTitle>เลือกเดือนที่จ่ายเงินเดือน</CardTitle>
          <CardDescription>เลือกเดือนและปีที่ต้องการคำนวณและจ่ายเงินเดือน</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <Label htmlFor="month">เดือน/ปี:</Label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-06">มิถุนายน 2567</SelectItem>
                <SelectItem value="2024-05">พฤษภาคม 2567</SelectItem>
                <SelectItem value="2024-04">เมษายน 2567</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Calculator className="w-4 h-4 mr-2" />
              คำนวณทั้งหมด
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payroll Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายการจ่ายเงินเดือนประจำเดือน {selectedMonth}</CardTitle>
          <CardDescription>ตรวจสอบและอัพเดทสถานะการจ่ายเงินเดือนพนักงาน</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>รหัส</TableHead>
                  <TableHead>ชื่อพนักงาน</TableHead>
                  <TableHead>บัญชี</TableHead>
                  <TableHead>เงินเดือนพื้นฐาน</TableHead>
                  <TableHead>วันทำงาน</TableHead>
                  <TableHead>OT (ชม.)</TableHead>
                  <TableHead>โบนัส</TableHead>
                  <TableHead>หัก</TableHead>
                  <TableHead>รับสุทธิ</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>จัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollData.map((employee) => {
                  const netSalary = calculateNetSalary(employee);
                  const totalDeductions = employee.socialSecurity + employee.tax + employee.otherDeductions;
                  
                  return (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.id}</TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell className="font-mono text-sm">{employee.bankAccount}</TableCell>
                      <TableCell>฿{employee.baseSalary.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="font-medium">{employee.workDays}/{employee.totalWorkDays}</div>
                          <div className="text-xs text-gray-500">
                            {((employee.workDays / employee.totalWorkDays) * 100).toFixed(0)}%
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="font-medium">{employee.otHours} ชม.</div>
                          <div className="text-xs text-gray-500">
                            ฿{employee.otRate}/ชม.
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="font-medium">฿{employee.bonus.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">
                            +฿{employee.allowances.toLocaleString()} เบี้ยเลี้ยง
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center text-red-600">
                          <div className="font-medium">฿{totalDeductions.toLocaleString()}</div>
                          <div className="text-xs">ประกัน+ภาษี</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center font-bold text-green-600">
                          ฿{netSalary.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {employee.status === 'paid' ? (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              <span className="text-sm">จ่ายแล้ว</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-orange-600">
                              <Clock className="w-4 h-4 mr-1" />
                              <span className="text-sm">รอจ่าย</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {employee.status === 'pending' ? (
                          <Button
                            size="sm"
                            onClick={() => updateEmployeeStatus(employee.id, 'paid')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            จ่ายแล้ว
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateEmployeeStatus(employee.id, 'pending')}
                          >
                            <Clock className="w-4 h-4 mr-1" />
                            ยกเลิก
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  ฿{payrollData.reduce((sum, emp) => sum + calculateNetSalary(emp), 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">รวมเงินเดือนทั้งหมด</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {payrollData.filter(emp => emp.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">รอจ่าย</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {payrollData.filter(emp => emp.status === 'paid').length}
                </div>
                <div className="text-sm text-gray-600">จ่ายแล้ว</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
