
import { useState, useEffect } from 'react';
import { apiClient } from '@/integrations/api/client';
import { useToast } from '@/hooks/use-toast';

export interface Order {
  id: number;
  patient_id?: number;
  order_date: string;
  order_number?: string;
  status: string;
  total_amount: number;
  payment_status?: string;
  expected_delivery?: string;
  notes?: string;
  created_at: string;
  // Relations
  patients?: {
    name: string;
    full_name?: string;
    phone?: string;
  };
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  inventory_id?: number;
  item_name?: string;
  quantity: number;
  unit_price: number;
  created_at: string;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Note: Orders endpoint needs to be added to the API client
      const response = await fetch(`${apiClient['baseUrl']}/orders`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      
      const data = await response.json();
      setOrders(data);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดข้อมูลคำสั่งซื้อได้",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: number, status: string) => {
    try {
      // Note: Update orders endpoint needs to be added to the API client
      const response = await fetch(`${apiClient['baseUrl']}/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) throw new Error('Failed to update order');

      setOrders(prev => 
        prev.map(order => 
          order.id === id ? { ...order, status } : order
        )
      );

      toast({
        title: "อัพเดทสถานะสำเร็จ",
        description: `เปลี่ยนสถานะเป็น ${status}`,
      });
    } catch (error: any) {
      console.error('Error updating order status:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถอัพเดทสถานะได้",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    updateOrderStatus,
    refetch: fetchOrders,
  };
};
