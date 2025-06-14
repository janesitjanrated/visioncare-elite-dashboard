
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  TrendingUp, 
  Package, 
  Users, 
  FileText, 
  AlertTriangle,
  Plus,
  BarChart3,
  PieChart,
  Calculator
} from 'lucide-react';
import SalesRevenueSection from '@/components/finance/SalesRevenueSection';
import InventoryCostSection from '@/components/finance/InventoryCostSection';
import CustomerDataSection from '@/components/finance/CustomerDataSection';
import ExpenseManagementSection from '@/components/finance/ExpenseManagementSection';
import TaxInvoiceSection from '@/components/finance/TaxInvoiceSection';
import FinanceAlertSystem from '@/components/finance/FinanceAlertSystem';
import FinancialStatements from '@/components/finance/FinancialStatements';
import CreateTransactionForm from '@/components/finance/CreateTransactionForm';
import { useLocation } from 'react-router-dom';

const Finance = () => {
  const [showCreateTransaction, setShowCreateTransaction] = useState(false);
  const location = useLocation();

  // Mock financial summary data
  const financialSummary = {
    totalRevenue: 2850000,
    grossProfit: 1420000,
    netProfit: 890000,
    totalExpenses: 530000,
    totalAssets: 5200000,
    totalLiabilities: 1800000,
    cashFlow: 650000,
    taxPayable: 178000
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  // Determine which section to show based on route
  const renderContent = () => {
    switch (location.pathname) {
      case '/finance/sales':
        return <SalesRevenueSection />;
      case '/finance/inventory':
        return <InventoryCostSection />;
      case '/finance/customers':
        return <CustomerDataSection />;
      case '/finance/expenses':
        return <ExpenseManagementSection />;
      case '/finance/tax':
        return <TaxInvoiceSection />;
      case '/finance/alerts':
        return <FinanceAlertSystem />;
      default:
        return <FinancialStatements />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finance Management</h1>
          <p className="text-gray-600 mt-1">ระบบบริหารการเงินและบัญชี</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setShowCreateTransaction(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            สร้างรายการขาย
          </Button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              รายได้รวม
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(financialSummary.totalRevenue)}</div>
            <p className="text-green-100 text-xs">+12.5% จากเดือนที่แล้ว</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              กำไรสุทธิ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(financialSummary.netProfit)}</div>
            <p className="text-blue-100 text-xs">อัตรากำไร 31.2%</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              กระแสเงินสด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(financialSummary.cashFlow)}</div>
            <p className="text-purple-100 text-xs">เพิ่มขึ้น 8.3%</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calculator className="w-4 h-4 mr-2" />
              ภาษีค้างจ่าย
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(financialSummary.taxPayable)}</div>
            <p className="text-orange-100 text-xs">ครบกำหนด 15 มี.ค.</p>
          </CardContent>
        </Card>
      </div>

      {/* Dynamic Content based on sidebar selection */}
      <div className="space-y-6">
        {renderContent()}
      </div>

      {/* Create Transaction Modal */}
      {showCreateTransaction && (
        <CreateTransactionForm 
          onClose={() => setShowCreateTransaction(false)}
          onSave={(data) => {
            console.log('Transaction created:', data);
            setShowCreateTransaction(false);
          }}
        />
      )}
    </div>
  );
};

export default Finance;
