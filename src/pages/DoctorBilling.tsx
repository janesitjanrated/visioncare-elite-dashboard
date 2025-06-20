
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Receipt, 
  CreditCard, 
  Banknote, 
  Printer, 
  Search,
  Calendar,
  User,
  FileText
} from 'lucide-react';
import { sessionManager } from '@/utils/sessionManager';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  patientId?: string;
  patientName?: string;
  items: any[];
  total: number;
  createdAt: string;
  status: 'pending' | 'paid' | 'cancelled';
  paymentMethod?: 'cash' | 'card' | 'transfer';
  receiptNumber?: string;
}

const DoctorBilling = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'transfer'>('cash');
  const [receivedAmount, setReceivedAmount] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const sessionOrders = sessionManager.get<Order[]>('orders') || [];
    setOrders(sessionOrders);
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.patientName && order.patientName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pendingOrders = filteredOrders.filter(order => order.status === 'pending');
  const paidOrders = filteredOrders.filter(order => order.status === 'paid');

  const handlePayment = (order: Order) => {
    if (paymentMethod === 'cash' && receivedAmount < order.total) {
      toast({
        title: "จำนวนเงินไม่เพียงพอ",
        description: "กรุณากรอกจำนวนเงินที่รับมาให้ถูกต้อง",
        variant: "destructive",
      });
      return;
    }

    const updatedOrders = orders.map(o => 
      o.id === order.id 
        ? { 
            ...o, 
            status: 'paid' as const,
            paymentMethod,
            receiptNumber: `RCP${Date.now()}`
          }
        : o
    );
    
    setOrders(updatedOrders);
    sessionManager.set('orders', updatedOrders);
    
    toast({
      title: "ชำระเงินสำเร็จ",
      description: `ออเดอร์ ${order.id} ได้รับการชำระเงินแล้ว`,
    });

    setSelectedOrder(null);
    setReceivedAmount(0);
  };

  const printReceipt = (order: Order) => {
    // Mock print functionality
    toast({
      title: "พิมพ์ใบเสร็จ",
      description: `กำลังพิมพ์ใบเสร็จ ${order.receiptNumber}`,
    });
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-700 border-yellow-200">รอชำระ</Badge>;
      case 'paid':
        return <Badge variant="default" className="bg-green-600">ชำระแล้ว</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">ยกเลิก</Badge>;
      default:
        return <Badge variant="outline">ไม่ทราบ</Badge>;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'cash':
        return <Banknote className="h-4 w-4" />;
      case 'card':
        return <CreditCard className="h-4 w-4" />;
      case 'transfer':
        return <FileText className="h-4 w-4" />;
      default:
        return <Receipt className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ออกใบสั่งซื้อ / รับชำระ</h1>
          <p className="text-gray-600 mt-1">จัดการการชำระเงินและออกใบเสร็จ</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">รอชำระ</p>
            <p className="text-2xl font-bold text-yellow-600">{pendingOrders.length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">ชำระแล้ว</p>
            <p className="text-2xl font-bold text-green-600">{paidOrders.length}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="ค้นหาออเดอร์หรือชื่อผู้ป่วย"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">รายการออเดอร์</h2>
          
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">ไม่มีออเดอร์</p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card 
                key={order.id} 
                className={`cursor-pointer transition-all ${
                  selectedOrder?.id === order.id ? 'ring-2 ring-emerald-500' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedOrder(order)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">ออเดอร์ {order.id}</h3>
                      {order.patientName && (
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <User className="h-4 w-4 mr-1" />
                          {order.patientName}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(order.createdAt).toLocaleDateString('th-TH')}
                      </p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(order.status)}
                      <p className="text-xl font-bold text-emerald-600 mt-2">
                        ฿{order.total.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">รายการสินค้า:</p>
                    {order.items.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span>฿{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className="text-sm text-gray-500">และอีก {order.items.length - 3} รายการ</p>
                    )}
                  </div>

                  {order.status === 'paid' && order.receiptNumber && (
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        {getPaymentMethodIcon(order.paymentMethod || 'cash')}
                        <span className="text-sm">
                          {order.paymentMethod === 'cash' ? 'เงินสด' : 
                           order.paymentMethod === 'card' ? 'บัตรเครดิต' : 'โอนเงิน'}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          printReceipt(order);
                        }}
                      >
                        <Printer className="h-4 w-4 mr-1" />
                        พิมพ์
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Payment Panel */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">ชำระเงิน</h2>
          
          {selectedOrder ? (
            <Card>
              <CardHeader>
                <CardTitle>ออเดอร์ {selectedOrder.id}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">ยอดรวม</span>
                    <span className="text-2xl font-bold text-emerald-600">
                      ฿{selectedOrder.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {selectedOrder.status === 'pending' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="paymentMethod">วิธีการชำระเงิน</Label>
                      <select
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="cash">เงินสด</option>
                        <option value="card">บัตรเครดิต</option>
                        <option value="transfer">โอนเงิน</option>
                      </select>
                    </div>

                    {paymentMethod === 'cash' && (
                      <div>
                        <Label htmlFor="receivedAmount">จำนวนเงินที่รับ</Label>
                        <Input
                          id="receivedAmount"
                          type="number"
                          value={receivedAmount}
                          onChange={(e) => setReceivedAmount(Number(e.target.value))}
                          placeholder="0"
                        />
                        {receivedAmount > selectedOrder.total && (
                          <p className="text-sm text-green-600 mt-1">
                            เงินทอน: ฿{(receivedAmount - selectedOrder.total).toLocaleString()}
                          </p>
                        )}
                      </div>
                    )}

                    <Button
                      onClick={() => handlePayment(selectedOrder)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Receipt className="h-4 w-4 mr-2" />
                      ชำระเงิน
                    </Button>
                  </div>
                )}

                {selectedOrder.status === 'paid' && selectedOrder.receiptNumber && (
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-green-800 font-semibold">ชำระเงินเสร็จสิ้น</p>
                      <p className="text-sm text-green-600">
                        ใบเสร็จ: {selectedOrder.receiptNumber}
                      </p>
                    </div>
                    
                    <Button
                      onClick={() => printReceipt(selectedOrder)}
                      className="w-full"
                      variant="outline"
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      พิมพ์ใบเสร็จ
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">เลือกออเดอร์เพื่อชำระเงิน</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorBilling;
