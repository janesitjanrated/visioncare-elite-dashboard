
import { useState, useEffect } from 'react';
import { apiClient } from '@/integrations/api/client';
import { useToast } from '@/hooks/use-toast';

export interface InventoryItem {
  id: number;
  name: string;
  description?: string;
  quantity: number;
  current_stock?: number;
  reorder_point?: number;
  minimum_stock?: number;
  unit_price: number;
  category?: string;
  created_at: string;
  // Relations
  products?: {
    name: string;
  };
}

export const useInventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchInventory = async () => {
    try {
      setLoading(true);
      // Note: Inventory endpoint needs to be added to the API client
      const response = await fetch(`${apiClient['baseUrl']}/inventory`);
      if (!response.ok) throw new Error('Failed to fetch inventory');
      
      const data = await response.json();
      setInventory(data);
    } catch (error: any) {
      console.error('Error fetching inventory:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดข้อมูลสต็อกได้",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStock = async (id: number, quantity: number) => {
    try {
      // Note: Update inventory endpoint needs to be added to the API client
      const response = await fetch(`${apiClient['baseUrl']}/inventory/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });
      
      if (!response.ok) throw new Error('Failed to update inventory');

      await fetchInventory(); // Refresh data

      toast({
        title: "อัพเดทสต็อกสำเร็จ",
        description: "ปรับปรุงจำนวนสต็อกเรียบร้อยแล้ว",
      });
    } catch (error: any) {
      console.error('Error updating stock:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถอัพเดทสต็อกได้",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return {
    inventory,
    loading,
    updateStock,
    refetch: fetchInventory,
  };
};
