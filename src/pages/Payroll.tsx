
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calculator, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { PayrollCalculator } from '@/components/payroll/PayrollCalculator';
import { PayrollHistory } from '@/components/payroll/PayrollHistory';
import { SalarySlipGenerator } from '@/components/payroll/SalarySlipGenerator';

const Payroll = () => {
  const [summary] = useState({
    totalEmployees: 12,
    totalSalaryBudget: 180000,
    pendingPayments: 8,
    completedPayments: 4
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ระบบจ่ายเงินเดือน</h1>
          <p className="text-gray-600">จัดการการจ่ายเงินเดือนและค่าตอบแทนพนักงาน</p>
        </div>
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
            <p className="text-xs text-gray-600">พนักงานประจำและชั่วคราว</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">งบเงินเดือนเดือนนี้</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ฿{summary.totalSalaryBudget.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">รวมโบนัสและ OT</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">รอจ่าย</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {summary.pendingPayments} คน
            </div>
            <p className="text-xs text-gray-600">ยังไม่ได้จ่ายเงินเดือน</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">จ่ายแล้ว</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {summary.completedPayments} คน
            </div>
            <p className="text-xs text-gray-600">จ่ายเงินเดือนแล้ว</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="calculator" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="calculator">คำนวณเงินเดือน</TabsTrigger>
          <TabsTrigger value="history">ประวัติการจ่าย</TabsTrigger>
          <TabsTrigger value="slip">สลิปเงินเดือน</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <PayrollCalculator />
        </TabsContent>

        <TabsContent value="history">
          <PayrollHistory />
        </TabsContent>

        <TabsContent value="slip">
          <SalarySlipGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payroll;
