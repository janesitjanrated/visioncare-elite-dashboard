
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Phone, Mail, MapPin, Building, User } from 'lucide-react';

export const EmployeeList = ({ searchTerm, onSelectEmployee }) => {
  const [employees] = useState([
    {
      id: 'EMP001',
      code: 'EMP001',
      name: 'นายสมชาย ใจดี',
      phone: '081-234-5678',
      email: 'somchai@clinic.com',
      role: 'หมอ',
      department: 'แผนกตรวจสายตา',
      position: 'จักษุแพทย์',
      paymentType: 'รายเดือน',
      employmentType: 'พนักงานประจำ',
      branch: 'สาขาหลัก',
      status: 'active',
      startDate: '2023-01-15',
      baseSalary: 45000
    },
    {
      id: 'EMP002',
      code: 'EMP002',
      name: 'นางสาวมาลี รักงาน',
      phone: '082-345-6789',
      email: 'malee@clinic.com',
      role: 'พยาบาล',
      department: 'แผนกพยาบาล',
      position: 'พยาบาลวิชาชีพ',
      paymentType: 'รายเดือน',
      employmentType: 'พนักงานประจำ',
      branch: 'สาขาหลัก',
      status: 'active',
      startDate: '2023-03-01',
      baseSalary: 22000
    },
    {
      id: 'EMP003',
      code: 'EMP003',
      name: 'นายเจมส์ สมิธ',
      phone: '083-456-7890',
      email: 'james@clinic.com',
      role: 'ช่างแว่น',
      department: 'แผนกแว่น',
      position: 'ช่างฝึกหัด',
      paymentType: 'รายวัน',
      employmentType: 'พนักงานชั่วคราว',
      branch: 'สาขา 2',
      status: 'active',
      startDate: '2024-01-10',
      baseSalary: 350
    }
  ]);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEmploymentTypeColor = (type) => {
    switch (type) {
      case 'พนักงานประจำ': return 'bg-blue-100 text-blue-800';
      case 'พนักงานชั่วคราว': return 'bg-orange-100 text-orange-800';
      case 'พนักงานพาร์ทไทม์': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>รายชื่อพนักงานทั้งหมด</CardTitle>
        <CardDescription>
          พบพนักงาน {filteredEmployees.length} คน จากทั้งหมด {employees.length} คน
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>รหัส</TableHead>
                <TableHead>ชื่อ-นามสกุล</TableHead>
                <TableHead>ติดต่อ</TableHead>
                <TableHead>บทบาท</TableHead>
                <TableHead>แผนก/ตำแหน่ง</TableHead>
                <TableHead>การจ้างงาน</TableHead>
                <TableHead>สาขา</TableHead>
                <TableHead>สถานะ</TableHead>
                <TableHead>จัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-mono font-medium">
                    {employee.code}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{employee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Phone className="w-3 h-3 mr-1 text-gray-400" />
                        {employee.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-3 h-3 mr-1 text-gray-400" />
                        {employee.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{employee.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Building className="w-3 h-3 mr-1 text-gray-400" />
                        {employee.department}
                      </div>
                      <div className="text-sm text-gray-600">
                        {employee.position}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={getEmploymentTypeColor(employee.employmentType)}>
                        {employee.employmentType}
                      </Badge>
                      <div className="text-sm text-gray-600">
                        {employee.paymentType}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                      {employee.branch}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(employee.status)}>
                      {employee.status === 'active' ? 'ทำงาน' : 'ไม่ทำงาน'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onSelectEmployee(employee)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      ดูรายละเอียด
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
