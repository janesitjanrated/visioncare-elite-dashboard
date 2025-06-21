
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, Receipt, TrendingUp } from 'lucide-react';
import { Patient } from '@/services/patientDataService';

interface PatientBillingHistoryProps {
  patient: Patient;
}

const PatientBillingHistory: React.FC<PatientBillingHistoryProps> = ({ patient }) => {
  const totalAmount = patient.billingHistory.reduce((sum, bill) => 
    bill.status === 'paid' ? sum + bill.amount : sum, 0
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">ชำระแล้ว</Badge>;
      case 'pending':
        return <Badge variant="destructive">รอชำระ</Badge>;
      case 'cancelled':
        return <Badge variant="secondary">ยกเลิก</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  // Calculate payment method statistics
  const paymentMethodStats = patient.billingHistory
    .filter(bill => bill.paymentMethod && bill.status === 'paid')
    .reduce((acc, bill) => {
      const method = bill.paymentMethod!;
      if (!acc[method]) {
        acc[method] = { count: 0, amount: 0 };
      }
      acc[method].count += 1;
      acc[method].amount += bill.amount;
      return acc;
    }, {} as Record<string, { count: number; amount: number }>);

  return (
    <div className="space-y-6">
      {/* Billing Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">ยอดรวมทั้งหมด</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalAmount)}</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">จำนวนบิลทั้งหมด</p>
                <p className="text-2xl font-bold text-blue-600">{patient.billingHistory.length}</p>
              </div>
              <Receipt className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">ค่าเฉลี่ยต่อครั้ง</p>
                <p className="text-2xl font-bold text-purple-600">
                  {patient.billingHistory.length > 0 ? formatCurrency(totalAmount / patient.billingHistory.length) : '฿0'}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Receipt className="h-5 w-5 mr-2" />
            ประวัติการชำระเงิน (เรียงจากล่าสุดไปเก่าสุด)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {patient.billingHistory.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>รหัสบิล</TableHead>
                  <TableHead>วันที่</TableHead>
                  <TableHead>รายการ</TableHead>
                  <TableHead>จำนวนเงิน</TableHead>
                  <TableHead>วิธีชำระ</TableHead>
                  <TableHead>สถานะ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patient.billingHistory
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell className="font-medium">{bill.id}</TableCell>
                      <TableCell>
                        {new Date(bill.date).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </TableCell>
                      <TableCell>{bill.description}</TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency(bill.amount)}
                      </TableCell>
                      <TableCell>
                        {bill.paymentMethod ? (
                          <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {bill.paymentMethod}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(bill.status)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>ไม่มีประวัติการชำระเงิน</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Method Statistics */}
      {patient.billingHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>สถิติวิธีการชำระเงิน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(paymentMethodStats).map(([method, data]) => (
                <div key={method} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-semibold">{method}</p>
                    <p className="text-sm text-gray-600">{data.count} ครั้ง</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(data.amount)}</p>
                    <p className="text-sm text-gray-600">
                      {((data.amount / totalAmount) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientBillingHistory;
