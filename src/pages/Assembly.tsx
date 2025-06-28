
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Settings } from 'lucide-react';
import { AssemblyForm } from '@/components/AssemblyForm';

interface AssemblyOrder {
  id: string;
  patientName: string;
  patientId: string;
  orderDate: string;
  lensType: string;
  frameModel: string;
  assemblyInstructions: string;
  status: 'pending' | 'in-progress' | 'quality-check' | 'completed';
  technician: string;
  estimatedCompletion: string;
  actualCompletion?: string;
  notes: string;
}

const Assembly = () => {
  const [orders, setOrders] = useState<AssemblyOrder[]>([
    {
      id: '1',
      patientName: 'นางสาว สมใจ ใจดี',
      patientId: 'P001',
      orderDate: '2024-06-20',
      lensType: 'Progressive Lens',
      frameModel: 'Ray-Ban RB5154',
      assemblyInstructions: 'ตัดเลนส์ให้พอดีกับกรอบ, ปรับจุดโฟกัส',
      status: 'in-progress',
      technician: 'ช่างโอ๋',
      estimatedCompletion: '2024-06-25',
      notes: 'ลูกค้าต้องการเลนส์บางพิเศษ'
    },
    {
      id: '2',
      patientName: 'นาย วิชัย รักดี',
      patientId: 'P002',
      orderDate: '2024-06-21',
      lensType: 'Single Vision',
      frameModel: 'Oakley OX8156',
      assemblyInstructions: 'ประกอบเลนส์มาตรฐาน',
      status: 'pending',
      technician: 'ช่างแดง',
      estimatedCompletion: '2024-06-24',
      notes: 'งานทั่วไป'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState<AssemblyOrder | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(order =>
    order.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.frameModel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'quality-check': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'รอประกอบ';
      case 'in-progress': return 'กำลังประกอบ';
      case 'quality-check': return 'ตรวจคุณภาพ';
      case 'completed': return 'เสร็จสิ้น';
      default: return status;
    }
  };

  const handleSave = (orderData: Partial<AssemblyOrder>) => {
    if (editingOrder) {
      setOrders(orders.map(order => 
        order.id === editingOrder.id 
          ? { ...order, ...orderData }
          : order
      ));
    } else {
      const newOrder: AssemblyOrder = {
        id: Date.now().toString(),
        ...orderData as AssemblyOrder
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">รายการสั่งประกอบ</h2>
              <p className="text-gray-600">จัดการรายการประกอบแว่นสายตา</p>
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
                <CardTitle>รายการสั่งประกอบ</CardTitle>
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="ค้นหาชื่อผู้ป่วย, รหัส หรือรุ่นกรอบ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-80"
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
                    <TableHead>ประเภทเลนส์</TableHead>
                    <TableHead>รุ่นกรอบ</TableHead>
                    <TableHead>ช่างประกอบ</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead>กำหนดเสร็จ</TableHead>
                    <TableHead>จัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.patientId}</TableCell>
                      <TableCell>{order.patientName}</TableCell>
                      <TableCell>{order.lensType}</TableCell>
                      <TableCell>{order.frameModel}</TableCell>
                      <TableCell>{order.technician}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(order.estimatedCompletion).toLocaleDateString('th-TH')}</TableCell>
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
            <AssemblyForm
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

export default Assembly;
