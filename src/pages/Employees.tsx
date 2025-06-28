
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Plus, Search, UserCheck, Building } from 'lucide-react';
import { EmployeeList } from '@/components/employees/EmployeeList';
import { EmployeeForm } from '@/components/employees/EmployeeForm';
import { EmployeeProfile } from '@/components/employees/EmployeeProfile';

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [summary] = useState({
    totalEmployees: 12,
    activeEmployees: 11,
    departments: 4,
    branches: 2
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">จัดการพนักงาน</h1>
          <p className="text-gray-600">ข้อมูลพนักงานและการจัดการทรัพยากรบุคคล</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          เพิ่มพนักงานใหม่
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">พนักงานทั้งหมด</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {summary.totalEmployees} คน
            </div>
            <p className="text-xs text-gray-600">รวมทุกแผนก</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">พนักงานปัจจุบัน</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {summary.activeEmployees} คน
            </div>
            <p className="text-xs text-gray-600">ยังทำงานอยู่</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">แผนก</CardTitle>
            <Building className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {summary.departments} แผนก
            </div>
            <p className="text-xs text-gray-600">แผนกทั้งหมด</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">สาขา</CardTitle>
            <Building className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {summary.branches} สาขา
            </div>
            <p className="text-xs text-gray-600">สาขาทั้งหมด</p>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="ค้นหาพนักงาน (ชื่อ, รหัส, แผนก, ตำแหน่ง)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee List or Profile */}
      {selectedEmployee ? (
        <EmployeeProfile 
          employee={selectedEmployee} 
          onBack={() => setSelectedEmployee(null)} 
        />
      ) : (
        <EmployeeList 
          searchTerm={searchTerm} 
          onSelectEmployee={setSelectedEmployee} 
        />
      )}

      {/* Add Employee Form Modal */}
      {showAddForm && (
        <EmployeeForm 
          onClose={() => setShowAddForm(false)} 
          onSave={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default Employees;
