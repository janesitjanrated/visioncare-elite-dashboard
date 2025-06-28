
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Calculator } from 'lucide-react';
import { BalanceSheet } from '@/components/finance/BalanceSheet';
import { CashFlowTracker } from '@/components/finance/CashFlowTracker';
import { ProfitabilityAnalysis } from '@/components/finance/ProfitabilityAnalysis';
import { RevenueTracking } from '@/components/finance/RevenueTracking';
import { ExpenseManagement } from '@/components/finance/ExpenseManagement';
import { TaxManagement } from '@/components/finance/TaxManagement';

const Finance = () => {
  const [summary, setSummary] = useState({
    totalAssets: 2500000,
    totalLiabilities: 800000,
    netWorth: 1700000,
    monthlyRevenue: 350000,
    monthlyExpenses: 220000,
    cashOnHand: 450000,
    runway: 18
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ระบบการเงิน</h1>
          <p className="text-gray-600">จัดการงบการเงินและวิเคราะห์ผลประกอบการของคลินิก</p>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">สินทรัพย์รวม</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              ฿{summary.totalAssets.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">+12% จากเดือนที่แล้ว</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">มูลค่าสุทธิ</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ฿{summary.netWorth.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">+8% จากเดือนที่แล้ว</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">เงินสดคงเหลือ</CardTitle>
            <Calculator className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ฿{summary.cashOnHand.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">Runway: {summary.runway} เดือน</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">กำไรเดือนนี้</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              ฿{(summary.monthlyRevenue - summary.monthlyExpenses).toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">Margin: {(((summary.monthlyRevenue - summary.monthlyExpenses) / summary.monthlyRevenue) * 100).toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="balance-sheet" className="space-y-6">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="balance-sheet">งบดุล</TabsTrigger>
          <TabsTrigger value="cashflow">กระแสเงินสด</TabsTrigger>
          <TabsTrigger value="profitability">วิเคราะห์กำไร</TabsTrigger>
          <TabsTrigger value="revenue">รายได้</TabsTrigger>
          <TabsTrigger value="expenses">รายจ่าย</TabsTrigger>
          <TabsTrigger value="tax">ภาษี</TabsTrigger>
        </TabsList>

        <TabsContent value="balance-sheet">
          <BalanceSheet />
        </TabsContent>

        <TabsContent value="cashflow">
          <CashFlowTracker />
        </TabsContent>

        <TabsContent value="profitability">
          <ProfitabilityAnalysis />
        </TabsContent>

        <TabsContent value="revenue">
          <RevenueTracking />
        </TabsContent>

        <TabsContent value="expenses">
          <ExpenseManagement />
        </TabsContent>

        <TabsContent value="tax">
          <TaxManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Finance;
