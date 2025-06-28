
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Eye, Receipt } from 'lucide-react';
import { LensOrderForm } from '@/components/LensOrderForm';

interface SalesItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
  hasVat: boolean;
}

interface LensOrder {
  id: string;
  patientName: string;
  patientId: string;
  orderDate: string;
  lensType: string;
  frameType: string;
  prescription: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  deliveryDate?: string;
  notes: string;
  hasVat: boolean;
  vatAmount: number;
  totalAmount: number;
  salesItems: SalesItem[];
  paymentStatus: 'unpaid' | 'deposit' | 'paid';
  depositAmount: number;
  remainingAmount: number;
}

const LensOrders = () => {
  const [orders, setOrders] = useState<LensOrder[]>([
    {
      id: '1',
      patientName: 'นางสาว สมใจ ใจดี',
      patientId: 'P001',
      orderDate: '2024-06-20',
      lensType: 'Progressive',
      frameType: 'Titanium Frame',
      prescription: 'OD: -2.00 OS: -1.75',
      status: 'processing',
      deliveryDate: '2024-06-27',
      notes: 'ต้องการเลนส์กรองแสงฟ้า',
      hasVat: true,
      vatAmount: 350,
      totalAmount: 5350,
      salesItems: [
        {
          id: '1',
          name: 'น้ำยาล้างแว่น',
          quantity: 1,
          unitPrice: 300,
          total: 300,
          hasVat: true
        }
      ],
      paymentStatus: 'deposit',
      depositAmount: 2000,
      remainingAmount: 3350
    },
    {
      id: '2',
      patientName: 'นาย วิชัย รักดี',
      patientId: 'P002',
      orderDate: '2024-06-21',
      lensType: 'Single Vision',
      frameType: 'Plastic Frame',
      prescription: 'OD: -1.50 OS: -1.25',
      status: 'pending',
      notes: 'ขอกรอบสีดำ',
      hasVat: false,
      vatAmount: 0,
      totalAmount: 0,
      salesItems: [],
      paymentStatus: 'unpaid',
      depositAmount: 0,
      remainingAmount: 0
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState<LensOrder | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(order =>
    order.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'รอดำเนินการ';
      case 'processing': return 'กำลังผลิต';
      case 'completed': return 'เสร็จสิ้น';
      case 'cancelled': return 'ยกเลิก';
      default: return status;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'deposit': return 'bg-orange-100 text-orange-800';
      case 'unpaid': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'ชำระครบแล้ว';
      case 'deposit': return 'ชำระมัดจำแล้ว';
      case 'unpaid': return 'ยังไม่ชำระ';
      default: return status;
    }
  };

  const handleSave = (orderData: Partial<LensOrder>) => {
    if (editingOrder) {
      setOrders(orders.map(order => 
        order.id === editingOrder.id 
          ? { ...order, ...orderData }
          : order
      ));
    } else {
      const newOrder: LensOrder = {
        id: Date.now().toString(),
        hasVat: false,
        vatAmount: 0,
        totalAmount: 0,
        salesItems: [],
        paymentStatus: 'unpaid',
        depositAmount: 0,
        remainingAmount: 0,
        ...orderData as LensOrder
      };
      setOrders([...orders, newOrder]);
    }
    setShowForm(false);
    setEditingOrder(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('คุณต้องการลบรายการนี้หรือไม่?')) {
      setOrders(orders.filter(order => order.id !== id));
    }
  };

  const generateBill = (order: LensOrder) => {
    console.log('Generate bill for order:', order);
    alert(`สร้างบิลสำหรับคนไข้ ${order.patientName} เรียบร้อยแล้ว!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">สั่งเลนส์ / กรอบแว่น</h2>
              <p className="text-gray-600">จัดการรายการสั่งเลนส์และกรอบแว่น พร้อมระบบขายและออกบิล</p>
            </div>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มรายการใหม่
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>รายการสั่งเลนส์ / กรอบแว่น</CardTitle>
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="ค้นหาชื่อผู้ป่วยหรือรหัส..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>รหัสผู้ป่วย</TableHead>
                    <TableHead>ชื่อผู้ป่วย</TableHead>
                    <TableHead>วันที่สั่ง</TableHead>
                    <TableHead>ยอดรวม</TableHead>
                    <TableHead>สถานะการชำระ</TableHead>
                    <TableHead>สถานะคำสั่ง</TableHead>
                    <TableHead>วันที่ส่งมอบ</TableHead>
                    <TableHead>จัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.patientId}</TableCell>
                      <TableCell>{order.patientName}</TableCell>
                      <TableCell>{new Date(order.orderDate).toLocaleDateString('th-TH')}</TableCell>
                      <TableCell>
                        {order.totalAmount > 0 ? (
                          <div className="text-sm">
                            <div className="font-medium">฿{order.totalAmount.toLocaleString()}</div>
                            {order.paymentStatus === 'deposit' && (
                              <div className="text-gray-500">
                                มัดจำ: ฿{order.depositAmount.toLocaleString()}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {order.totalAmount > 0 ? (
                          <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                            {getPaymentStatusText(order.paymentStatus)}
                          </Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString('th-TH') : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingOrder(order);
                              setShowForm(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          {order.totalAmount > 0 && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => generateBill(order)}
                            >
                              <Receipt className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(order.id)}
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

          {showForm && (
            <LensOrderForm
              order={editingOrder}
              onSave={handleSave}
              onClose={() => {
                setShowForm(false);
                setEditingOrder(null);
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default LensOrders;
