
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Package, Calendar, CreditCard } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';

export const RecentOrders = () => {
  const { orders, loading } = useOrders();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_production': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'รอดำเนินการ';
      case 'in_production': return 'กำลังผลิต';
      case 'completed': return 'เสร็จสิ้น';
      case 'delivered': return 'ส่งมอบแล้ว';
      case 'cancelled': return 'ยกเลิก';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const recentOrders = orders.slice(0, 10);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">คำสั่งซื้อล่าสุด</h2>
        <span className="text-sm text-gray-500">{orders.length} รายการทั้งหมด</span>
      </div>
      
      <div className="space-y-4">
        {recentOrders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            ยังไม่มีคำสั่งซื้อ
          </div>
        ) : (
          recentOrders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{order.order_number}</h3>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>{order.patients?.full_name}</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(order.order_date).toLocaleDateString('th-TH')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CreditCard className="w-4 h-4" />
                        <span>฿{order.total_amount.toLocaleString()}</span>
                      </div>
                    </div>
                    {order.order_items && order.order_items.length > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        {order.order_items.map(item => item.item_name).join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium">
                    ฿{order.total_amount.toLocaleString()}
                  </div>
                  {order.expected_delivery && (
                    <div className="text-xs text-gray-500">
                      คาดว่าจะส่ง: {new Date(order.expected_delivery).toLocaleDateString('th-TH')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
