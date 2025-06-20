
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Search, 
  Package, 
  Tag,
  Eye,
  Calculator
} from 'lucide-react';
import { mockSalesItems, SalesItem } from '@/data/doctorMockData';
import { sessionManager } from '@/utils/sessionManager';
import { useToast } from '@/hooks/use-toast';

interface CartItem extends SalesItem {
  quantity: number;
}

const DoctorSales = () => {
  const [salesItems, setSalesItems] = useState<SalesItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    // Load sales items from session or use mock data
    const sessionItems = sessionManager.get<SalesItem[]>('salesItems');
    if (sessionItems) {
      setSalesItems(sessionItems);
    } else {
      setSalesItems(mockSalesItems);
      sessionManager.set('salesItems', mockSalesItems);
    }
  }, []);

  const filteredItems = salesItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: SalesItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    
    toast({
      title: "เพิ่มสินค้าในตะกร้า",
      description: `เพิ่ม ${item.name} ลงในตะกร้าแล้ว`,
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const discountedPrice = item.promotion?.type === 'discount' 
        ? item.price * (1 - item.promotion.value / 100)
        : item.price;
      return total + (discountedPrice * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'frame':
        return <Badge variant="outline" className="text-blue-600 border-blue-200">กรอบแว่น</Badge>;
      case 'lens':
        return <Badge variant="outline" className="text-green-600 border-green-200">เลนส์</Badge>;
      case 'accessory':
        return <Badge variant="outline" className="text-purple-600 border-purple-200">อุปกรณ์</Badge>;
      default:
        return <Badge variant="outline">อื่นๆ</Badge>;
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "ตะกร้าว่าง",
        description: "กรุณาเลือกสินค้าก่อนชำระเงิน",
        variant: "destructive",
      });
      return;
    }

    // Save order to session storage
    const orders = sessionManager.get('orders') || [];
    const newOrder = {
      id: `ORD${Date.now()}`,
      items: cart,
      total: getTotalPrice(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    orders.push(newOrder);
    sessionManager.set('orders', orders);

    toast({
      title: "สร้างออเดอร์สำเร็จ",
      description: `ออเดอร์ ${newOrder.id} ถูกสร้างแล้ว`,
    });

    // Clear cart
    setCart([]);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ขายสินค้า</h1>
          <p className="text-gray-600 mt-1">จัดการการขายสินค้าและอุปกรณ์</p>
        </div>
        <div className="flex items-center space-x-2">
          <ShoppingCart className="h-5 w-5 text-gray-600" />
          <span className="font-semibold">{getTotalItems()} รายการ</span>
          <span className="text-lg font-bold text-emerald-600">
            ฿{getTotalPrice().toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="search">ค้นหาสินค้า</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      type="text"
                      placeholder="ค้นหาชื่อสินค้าหรือ SKU"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="category">หมวดหมู่</Label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">ทั้งหมด</option>
                    <option value="frame">กรอบแว่น</option>
                    <option value="lens">เลนส์</option>
                    <option value="accessory">อุปกรณ์</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">SKU: {item.sku}</p>
                    </div>
                    {getCategoryBadge(item.category)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-emerald-600">
                          ฿{item.price.toLocaleString()}
                        </p>
                        {item.promotion && (
                          <p className="text-sm text-red-600">
                            {item.promotion.description}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">สต็อก</p>
                        <p className="font-semibold">{item.stock} ชิ้น</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>ต้นทุน: ฿{item.cost.toLocaleString()}</span>
                      <span>กำไร: {item.margin.toFixed(1)}%</span>
                    </div>

                    <Button
                      onClick={() => addToCart(item)}
                      disabled={item.stock <= 0}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {item.stock <= 0 ? 'สินค้าหมด' : 'เพิ่มในตะกร้า'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Shopping Cart */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                ตะกร้าสินค้า ({getTotalItems()} รายการ)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">ตะกร้าว่าง</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-600">{item.sku}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          ลบ
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="font-semibold text-sm w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">
                            ฿{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold">รวมทั้งสิ้น</span>
                      <span className="text-2xl font-bold text-emerald-600">
                        ฿{getTotalPrice().toLocaleString()}
                      </span>
                    </div>
                    
                    <Button
                      onClick={handleCheckout}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Calculator className="h-4 w-4 mr-2" />
                      ชำระเงิน
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorSales;
