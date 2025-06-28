
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { X, Plus, Trash2, Receipt, Calculator } from 'lucide-react';

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

interface SalesItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
  hasVat: boolean;
}

interface LensOrderFormProps {
  order?: LensOrder | null;
  onSave: (order: Partial<LensOrder>) => void;
  onClose: () => void;
}

export const LensOrderForm = ({ order, onSave, onClose }: LensOrderFormProps) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    orderDate: new Date().toISOString().split('T')[0],
    lensType: '',
    frameType: '',
    prescription: '',
    status: 'pending' as 'pending' | 'processing' | 'completed' | 'cancelled',
    deliveryDate: '',
    notes: '',
    hasVat: false,
    vatAmount: 0,
    totalAmount: 0,
    salesItems: [] as SalesItem[],
    paymentStatus: 'unpaid' as 'unpaid' | 'deposit' | 'paid',
    depositAmount: 0,
    remainingAmount: 0
  });

  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    unitPrice: 0,
    hasVat: false
  });

  useEffect(() => {
    if (order) {
      setFormData({
        patientName: order.patientName,
        patientId: order.patientId,
        orderDate: order.orderDate,
        lensType: order.lensType,
        frameType: order.frameType,
        prescription: order.prescription,
        status: order.status,
        deliveryDate: order.deliveryDate || '',
        notes: order.notes,
        hasVat: order.hasVat || false,
        vatAmount: order.vatAmount || 0,
        totalAmount: order.totalAmount || 0,
        salesItems: order.salesItems || [],
        paymentStatus: order.paymentStatus || 'unpaid',
        depositAmount: order.depositAmount || 0,
        remainingAmount: order.remainingAmount || 0
      });
    }
  }, [order]);

  const calculateTotals = (items: SalesItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const vatAmount = items.reduce((sum, item) => sum + (item.hasVat ? item.total * 0.07 : 0), 0);
    const total = subtotal + vatAmount;
    return { subtotal, vatAmount, total };
  };

  const addSalesItem = () => {
    if (newItem.name && newItem.unitPrice > 0) {
      const item: SalesItem = {
        id: Date.now().toString(),
        name: newItem.name,
        quantity: newItem.quantity,
        unitPrice: newItem.unitPrice,
        total: newItem.quantity * newItem.unitPrice,
        hasVat: newItem.hasVat
      };
      
      const updatedItems = [...formData.salesItems, item];
      const { vatAmount, total } = calculateTotals(updatedItems);
      
      setFormData({
        ...formData,
        salesItems: updatedItems,
        vatAmount,
        totalAmount: total,
        remainingAmount: total - formData.depositAmount
      });
      
      setNewItem({ name: '', quantity: 1, unitPrice: 0, hasVat: false });
    }
  };

  const removeSalesItem = (id: string) => {
    const updatedItems = formData.salesItems.filter(item => item.id !== id);
    const { vatAmount, total } = calculateTotals(updatedItems);
    
    setFormData({
      ...formData,
      salesItems: updatedItems,
      vatAmount,
      totalAmount: total,
      remainingAmount: total - formData.depositAmount
    });
  };

  const handleDepositChange = (amount: number) => {
    setFormData({
      ...formData,
      depositAmount: amount,
      remainingAmount: formData.totalAmount - amount,
      paymentStatus: amount > 0 ? (amount >= formData.totalAmount ? 'paid' : 'deposit') : 'unpaid'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const generateBill = () => {
    const billData = {
      patientName: formData.patientName,
      patientId: formData.patientId,
      orderDate: formData.orderDate,
      items: formData.salesItems,
      subtotal: formData.totalAmount - formData.vatAmount,
      vatAmount: formData.vatAmount,
      total: formData.totalAmount,
      depositAmount: formData.depositAmount,
      remainingAmount: formData.remainingAmount
    };
    
    console.log('Generated Bill:', billData);
    alert('บิลถูกสร้างแล้ว! (ดูในคอนโซล)');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              {order ? 'แก้ไขรายการสั่งเลนส์' : 'เพิ่มรายการสั่งเลนส์ใหม่'}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>รหัสผู้ป่วย</Label>
                <Input
                  value={formData.patientId}
                  onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>ชื่อผู้ป่วย</Label>
                <Input
                  value={formData.patientName}
                  onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>วันที่สั่ง</Label>
                <Input
                  type="date"
                  value={formData.orderDate}
                  onChange={(e) => setFormData({...formData, orderDate: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>วันที่ส่งมอบ</Label>
                <Input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ประเภทเลนส์</Label>
                <Select 
                  value={formData.lensType} 
                  onValueChange={(value) => setFormData({...formData, lensType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกประเภทเลนส์" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single Vision">Single Vision</SelectItem>
                    <SelectItem value="Bifocal">Bifocal</SelectItem>
                    <SelectItem value="Progressive">Progressive</SelectItem>
                    <SelectItem value="Photochromic">Photochromic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>ประเภทกรอบ</Label>
                <Select 
                  value={formData.frameType} 
                  onValueChange={(value) => setFormData({...formData, frameType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกประเภทกรอบ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Titanium Frame">Titanium Frame</SelectItem>
                    <SelectItem value="Plastic Frame">Plastic Frame</SelectItem>
                    <SelectItem value="Metal Frame">Metal Frame</SelectItem>
                    <SelectItem value="Rimless">Rimless</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>ค่าสายตา</Label>
              <Input
                value={formData.prescription}
                onChange={(e) => setFormData({...formData, prescription: e.target.value})}
                placeholder="เช่น OD: -2.00 OS: -1.75"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="hasVat"
                checked={formData.hasVat}
                onCheckedChange={(checked) => setFormData({...formData, hasVat: !!checked})}
              />
              <Label htmlFor="hasVat">มี VAT (เพื่อใช้หักกับภาษีขาย)</Label>
            </div>

            <Separator />

            {/* Sales Items Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">สินค้า/บริการเพิ่มเติม</h3>
              
              <div className="border rounded-lg p-4 space-y-4">
                <h4 className="font-medium">เพิ่มสินค้า/บริการ</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>ชื่อสินค้า/บริการ</Label>
                    <Input
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      placeholder="เช่น น้ำยาล้างแว่น, เช็คสายตา"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>จำนวน</Label>
                    <Input
                      type="number"
                      min="1"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({...newItem, quantity: Number(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>ราคาต่อหน่วย (บาท)</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={newItem.unitPrice}
                      onChange={(e) => setNewItem({...newItem, unitPrice: Number(e.target.value)})}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <Checkbox 
                      id="itemVat"
                      checked={newItem.hasVat}
                      onCheckedChange={(checked) => setNewItem({...newItem, hasVat: !!checked})}
                    />
                    <Label htmlFor="itemVat">มี VAT</Label>
                    <Button type="button" onClick={addSalesItem} size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      เพิ่ม
                    </Button>
                  </div>
                </div>
              </div>

              {formData.salesItems.length > 0 && (
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">รายการสินค้า/บริการ</h4>
                  <div className="space-y-2">
                    {formData.salesItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div className="flex-1">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-sm text-gray-600 ml-2">
                            {item.quantity} x ฿{item.unitPrice.toLocaleString()} = ฿{item.total.toLocaleString()}
                            {item.hasVat && <span className="text-green-600 ml-1">(+VAT)</span>}
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeSalesItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Payment Summary */}
            {formData.salesItems.length > 0 && (
              <div className="border rounded-lg p-4 bg-blue-50">
                <h4 className="font-medium mb-3">สรุปการชำระเงิน</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>ยอดรวม (ไม่รวม VAT):</span>
                    <span>฿{(formData.totalAmount - formData.vatAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT (7%):</span>
                    <span>฿{formData.vatAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>ยอดรวมทั้งสิ้น:</span>
                    <span>฿{formData.totalAmount.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>มัดจำ (บาท)</Label>
                    <Input
                      type="number"
                      min="0"
                      max={formData.totalAmount}
                      step="0.01"
                      value={formData.depositAmount}
                      onChange={(e) => handleDepositChange(Number(e.target.value))}
                    />
                  </div>
                  <div className="flex justify-between">
                    <span>ยอดคงเหลือ:</span>
                    <span className="font-bold text-red-600">฿{formData.remainingAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>สถานะการชำระ:</span>
                    <span className={`font-bold ${
                      formData.paymentStatus === 'paid' ? 'text-green-600' :
                      formData.paymentStatus === 'deposit' ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {formData.paymentStatus === 'paid' ? 'ชำระครบแล้ว' :
                       formData.paymentStatus === 'deposit' ? 'ชำระมัดจำแล้ว' : 'ยังไม่ชำระ'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>สถานะ</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: 'pending' | 'processing' | 'completed' | 'cancelled') => setFormData({...formData, status: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">รอดำเนินการ</SelectItem>
                  <SelectItem value="processing">กำลังผลิต</SelectItem>
                  <SelectItem value="completed">เสร็จสิ้น</SelectItem>
                  <SelectItem value="cancelled">ยกเลิก</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>หมายเหตุ</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="หมายเหตุเพิ่มเติม..."
                rows={3}
              />
            </div>

            <div className="flex justify-between pt-4">
              <div className="space-x-2">
                {formData.salesItems.length > 0 && (
                  <Button type="button" variant="outline" onClick={generateBill}>
                    <Receipt className="w-4 h-4 mr-2" />
                    ออกบิล
                  </Button>
                )}
              </div>
              <div className="space-x-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  ยกเลิก
                </Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                  บันทึก
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
