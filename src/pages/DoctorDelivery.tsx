import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Truck, Package, Camera, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { sessionManager } from '@/utils/sessionManager';
import { mockDeliveryOrders, DeliveryOrder } from '@/data/doctorMockData';
import { useToast } from '@/hooks/use-toast';

const DoctorDelivery = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [deliveryOrders, setDeliveryOrders] = useState<DeliveryOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<DeliveryOrder | null>(null);
  const [deliveryNote, setDeliveryNote] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  useEffect(() => {
    const storedOrders = sessionManager.get<DeliveryOrder[]>('deliveryOrders') || mockDeliveryOrders;
    setDeliveryOrders(storedOrders);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting-lens': return 'bg-yellow-100 text-yellow-800';
      case 'assembling': return 'bg-blue-100 text-blue-800';
      case 'qc': return 'bg-purple-100 text-purple-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'waiting-lens': return <Clock className="h-4 w-4" />;
      case 'assembling': return <Package className="h-4 w-4" />;
      case 'qc': return <AlertTriangle className="h-4 w-4" />;
      case 'ready': return <CheckCircle className="h-4 w-4" />;
      case 'delivered': return <Truck className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting-lens': return 'รอเลนส์';
      case 'assembling': return 'กำลังประกอบ';
      case 'qc': return 'ตรวจสอบคุณภาพ';
      case 'ready': return 'พร้อมส่ง';
      case 'delivered': return 'ส่งแล้ว';
      default: return status;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: DeliveryOrder['status']) => {
    const updatedOrders = deliveryOrders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: newStatus,
            ...(newStatus === 'delivered' && {
              receivedAt: new Date().toISOString(),
              deliveryNote: deliveryNote,
              trackingNumber: trackingNumber
            })
          }
        : order
    );
    
    setDeliveryOrders(updatedOrders);
    sessionManager.set('deliveryOrders', updatedOrders);
    
    toast({
      title: "อัปเดตสถานะสำเร็จ",
      description: `ออเดอร์ ${orderId} ได้รับการอัปเดตเป็น ${getStatusText(newStatus)}`,
    });
    
    setDeliveryNote('');
    setTrackingNumber('');
  };

  const canProgressStatus = (currentStatus: string) => {
    const statusFlow = ['waiting-lens', 'assembling', 'qc', 'ready', 'delivered'];
    const currentIndex = statusFlow.indexOf(currentStatus);
    return currentIndex < statusFlow.length - 1;
  };

  const getNextStatus = (currentStatus: string): DeliveryOrder['status'] => {
    const statusFlow: DeliveryOrder['status'][] = ['waiting-lens', 'assembling', 'qc', 'ready', 'delivered'];
    const currentIndex = statusFlow.indexOf(currentStatus as DeliveryOrder['status']);
    
    // Ensure we don't go out of bounds and always return a valid status
    if (currentIndex >= 0 && currentIndex < statusFlow.length - 1) {
      return statusFlow[currentIndex + 1];
    }
    
    // Fallback to the last status if something goes wrong
    return 'delivered';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/doctor/queue')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับไปคิว
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ประกอบ / ส่งของ</h1>
            <p className="text-gray-600 mt-1">จัดการการประกอบแว่นและการส่งของ</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          <Truck className="h-4 w-4 mr-1" />
          การส่งของ
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders List */}
        <Card>
          <CardHeader>
            <CardTitle>รายการออเดอร์</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {deliveryOrders.map((order) => (
              <div
                key={order.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedOrder?.id === order.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">#{order.id}</span>
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusIcon(order.status)}
                    <span className="ml-1">{getStatusText(order.status)}</span>
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{order.patientName}</p>
                <p className="text-sm text-gray-800">ออเดอร์: {order.orderId}</p>
                <div className="mt-2">
                  {order.items.map((item, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded mr-1">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Order Details */}
        {selectedOrder ? (
          <Card>
            <CardHeader>
              <CardTitle>รายละเอียดออเดอร์ #{selectedOrder.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">ลูกค้า</p>
                <p className="font-semibold">{selectedOrder.patientName}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">หมายเลขออเดอร์</p>
                <p className="font-semibold">{selectedOrder.orderId}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">รายการสินค้า</p>
                <div className="mt-1">
                  {selectedOrder.items.map((item, index) => (
                    <span key={index} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mr-1 mb-1">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">วิธีการรับของ</p>
                <p className="font-semibold">
                  {selectedOrder.deliveryMethod === 'pickup' ? 'มารับเอง' : 'จัดส่ง'}
                </p>
              </div>

              {selectedOrder.deliveryDate && (
                <div>
                  <p className="text-sm text-gray-600">วันที่นัดรับ/ส่ง</p>
                  <p className="font-semibold">
                    {new Date(selectedOrder.deliveryDate).toLocaleDateString('th-TH')}
                  </p>
                </div>
              )}

              {selectedOrder.qcImages && selectedOrder.qcImages.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">รูปตรวจสอบคุณภาพ</p>
                  <div className="flex space-x-2">
                    {selectedOrder.qcImages.map((image, index) => (
                      <div key={index} className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Camera className="h-6 w-6 text-gray-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {canProgressStatus(selectedOrder.status) && (
                <div className="space-y-4 pt-4 border-t">
                  {selectedOrder.status === 'ready' && (
                    <>
                      <div>
                        <label className="text-sm font-medium text-gray-700">เลขติดตาม (ถ้ามี)</label>
                        <Input
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                          placeholder="ระบุเลขติดตาม..."
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-700">หมายเหตุการส่ง</label>
                        <Textarea
                          value={deliveryNote}
                          onChange={(e) => setDeliveryNote(e.target.value)}
                          placeholder="ระบุหมายเหตุการส่ง..."
                          className="mt-1"
                        />
                      </div>
                    </>
                  )}
                  
                  <Button
                    onClick={() => updateOrderStatus(selectedOrder.id, getNextStatus(selectedOrder.status))}
                    className="w-full"
                  >
                    {selectedOrder.status === 'waiting-lens' && 'เริ่มประกอบ'}
                    {selectedOrder.status === 'assembling' && 'ส่งตรวจ QC'}
                    {selectedOrder.status === 'qc' && 'ผ่าน QC - พร้อมส่ง'}
                    {selectedOrder.status === 'ready' && 'ส่งของแล้ว'}
                  </Button>
                </div>
              )}

              {selectedOrder.status === 'delivered' && (
                <div className="pt-4 border-t">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="font-semibold text-green-800">ส่งของเรียบร้อยแล้ว</span>
                    </div>
                    {selectedOrder.receivedAt && (
                      <p className="text-sm text-green-600 mt-1">
                        ส่งเมื่อ: {new Date(selectedOrder.receivedAt).toLocaleDateString('th-TH')}
                      </p>
                    )}
                    {selectedOrder.trackingNumber && (
                      <p className="text-sm text-green-600">
                        เลขติดตาม: {selectedOrder.trackingNumber}
                      </p>
                    )}
                    {selectedOrder.deliveryNote && (
                      <p className="text-sm text-green-600">
                        หมายเหตุ: {selectedOrder.deliveryNote}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">เลือกออเดอร์เพื่อดูรายละเอียด</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DoctorDelivery;
