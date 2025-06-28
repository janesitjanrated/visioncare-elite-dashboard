
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Package } from 'lucide-react';
import { useInventory } from '@/hooks/useInventory';

export const InventoryAlert = () => {
  const { inventory, loading } = useInventory();

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const lowStockItems = inventory.filter(item => 
    item.current_stock <= (item.reorder_point || 0) || 
    item.current_stock <= (item.minimum_stock || 0)
  );

  if (lowStockItems.length === 0) {
    return null;
  }

  return (
    <Alert className="border-amber-200 bg-amber-50">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-amber-800">
        <div className="flex items-center justify-between">
          <span className="font-medium">
            มีสินค้า {lowStockItems.length} รายการที่สต็อกต่ำ
          </span>
          <div className="flex items-center space-x-2 text-sm">
            <Package className="w-4 h-4" />
            <span>ต้องเติมสินค้า</span>
          </div>
        </div>
        <div className="mt-2 text-sm">
          {lowStockItems.slice(0, 3).map((item, index) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.products?.name}</span>
              <span className="font-medium">เหลือ {item.current_stock} ชิ้น</span>
            </div>
          ))}
          {lowStockItems.length > 3 && (
            <div className="text-center mt-1">และอีก {lowStockItems.length - 3} รายการ</div>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};
