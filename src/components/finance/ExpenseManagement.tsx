
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Edit, Trash2, Calendar, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import { ExpenseForm } from './ExpenseForm';

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#84cc16'];

export const ExpenseManagement = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const [expenses, setExpenses] = useState([
    { 
      id: '1', 
      date: '2024-06-15', 
      category: 'salary', 
      description: 'เงินเดือนพนักงาน', 
      amount: 150000, 
      status: 'paid',
      dueDate: '2024-06-30',
      vendor: 'บุคลากร'
    },
    { 
      id: '2', 
      date: '2024-06-01', 
      category: 'rent', 
      description: 'ค่าเช่าสถานที่', 
      amount: 50000, 
      status: 'paid',
      dueDate: '2024-06-01',
      vendor: 'เจ้าของอาคาร'
    },
    { 
      id: '3', 
      date: '2024-06-10', 
      category: 'utilities', 
      description: 'ค่าไฟฟ้า', 
      amount: 15000, 
      status: 'pending',
      dueDate: '2024-06-25',
      vendor: 'การไฟฟ้านครหลวง'
    },
    { 
      id: '4', 
      date: '2024-06-05', 
      category: 'supplies', 
      description: 'เลนส์และกรอบแว่น', 
      amount: 80000, 
      status: 'paid',
      dueDate: '2024-06-05',
      vendor: 'Zeiss Thailand'
    },
    { 
      id: '5', 
      date: '2024-06-20', 
      category: 'marketing', 
      description: 'โฆษณา Facebook', 
      amount: 15000, 
      status: 'pending',
      dueDate: '2024-06-30',
      vendor: 'Meta Thailand'
    }
  ]);

  const [monthlyTrend] = useState([
    { month: 'ม.ค.', total: 280000, salary: 150000, rent: 50000, utilities: 20000, supplies: 40000, marketing: 20000 },
    { month: 'ก.พ.', total: 290000, salary: 150000, rent: 50000, utilities: 25000, supplies: 45000, marketing: 20000 },
    { month: 'มี.ค.', total: 275000, salary: 150000, rent: 50000, utilities: 15000, supplies: 40000, marketing: 20000 },
    { month: 'เม.ย.', total: 320000, salary: 160000, rent: 50000, utilities: 30000, supplies: 60000, marketing: 20000 },
    { month: 'พ.ค.', total: 310000, salary: 160000, rent: 50000, utilities: 20000, supplies: 55000, marketing: 25000 },
    { month: 'มิ.ย.', total: 310000, salary: 150000, rent: 50000, utilities: 15000, supplies: 80000, marketing: 15000 }
  ]);

  const categoryData = [
    { name: 'เงินเดือน', value: 150000, color: '#10b981' },
    { name: 'ค่าสินค้า', value: 80000, color: '#3b82f6' },
    { name: 'ค่าเช่า', value: 50000, color: '#8b5cf6' },
    { name: 'การตลาด', value: 15000, color: '#f59e0b' },
    { name: 'สาธารณูปโภค', value: 15000, color: '#ef4444' }
  ];

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const pendingPayments = expenses.filter(expense => expense.status === 'pending');
  const totalPending = pendingPayments.reduce((sum, expense) => sum + expense.amount, 0);
  const overduePayments = pendingPayments.filter(expense => new Date(expense.dueDate) < new Date());

  const handleSaveExpense = (expenseData) => {
    if (editingExpense) {
      setExpenses(expenses.map(expense => 
        expense.id === editingExpense.id ? { ...expenseData, id: editingExpense.id } : expense
      ));
      setEditingExpense(null);
    } else {
      setExpenses([...expenses, { ...expenseData, id: Date.now().toString() }]);
    }
    setShowExpenseForm(false);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const getCategoryName = (category) => {
    const categories = {
      salary: 'เงินเดือน',
      rent: 'ค่าเช่า',
      utilities: 'สาธารณูปโภค',
      supplies: 'ค่าสินค้า',
      marketing: 'การตลาด',
      equipment: 'อุปกรณ์',
      other: 'อื่นๆ'
    };
    return categories[category] || category;
  };

  const getStatusColor = (status) => {
    return status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">รายจ่ายรวมเดือนนี้</CardTitle>
            <DollarSign className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ฿{totalExpenses.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">-5% จากเดือนที่แล้ว</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ค้างจ่าย</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              ฿{totalPending.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">{pendingPayments.length} รายการ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">เกินกำหนด</CardTitle>
            <Calendar className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {overduePayments.length}
            </div>
            <p className="text-xs text-gray-600">รายการที่ต้องจ่ายด่วน</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">เฉลี่ย 6 เดือน</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ฿{Math.round(monthlyTrend.reduce((sum, month) => sum + month.total, 0) / monthlyTrend.length).toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">ต่อเดือน</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>การกระจายรายจ่าย</CardTitle>
            <CardDescription>สัดส่วนรายจ่ายแต่ละประเภท</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `฿${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>แนวโน้มรายจ่าย</CardTitle>
            <CardDescription>รายจ่ายรวมรายเดือน</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `฿${value.toLocaleString()}`} />
                <Bar dataKey="total" fill="#3b82f6" name="รายจ่ายรวม" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Expense List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>รายจ่ายประจำเดือน</CardTitle>
              <CardDescription>จัดการรายจ่ายและการชำระเงิน</CardDescription>
            </div>
            <Button onClick={() => setShowExpenseForm(true)} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มรายจ่าย
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>วันที่</TableHead>
                <TableHead>รายการ</TableHead>
                <TableHead>ประเภท</TableHead>
                <TableHead>ผู้จำหน่าย</TableHead>
                <TableHead className="text-right">จำนวน</TableHead>
                <TableHead>กำหนดชำระ</TableHead>
                <TableHead>สถานะ</TableHead>
                <TableHead className="text-center">การจัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{new Date(expense.date).toLocaleDateString('th-TH')}</TableCell>
                  <TableCell className="font-medium">{expense.description}</TableCell>
                  <TableCell>{getCategoryName(expense.category)}</TableCell>
                  <TableCell>{expense.vendor}</TableCell>
                  <TableCell className="text-right font-bold">฿{expense.amount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(expense.dueDate).toLocaleDateString('th-TH')}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(expense.status)}`}>
                      {expense.status === 'paid' ? 'จ่ายแล้ว' : 'ค้างจ่าย'}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingExpense(expense);
                          setShowExpenseForm(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteExpense(expense.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Expense Form Modal */}
      {showExpenseForm && (
        <ExpenseForm
          expense={editingExpense}
          onSave={handleSaveExpense}
          onClose={() => {
            setShowExpenseForm(false);
            setEditingExpense(null);
          }}
        />
      )}
    </div>
  );
};
