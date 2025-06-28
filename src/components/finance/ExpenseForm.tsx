import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending';
  dueDate: string;
  vendor: string;
}

interface ExpenseFormProps {
  expense?: Expense | null;
  onSave: (expense: Partial<Expense>) => void;
  onClose: () => void;
}

export const ExpenseForm = ({ expense, onSave, onClose }: ExpenseFormProps) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: 'other' as string,
    description: '',
    amount: 0,
    status: 'pending' as 'paid' | 'pending',
    dueDate: new Date().toISOString().split('T')[0],
    vendor: ''
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        date: expense.date,
        category: expense.category,
        description: expense.description,
        amount: expense.amount,
        status: expense.status,
        dueDate: expense.dueDate,
        vendor: expense.vendor
      });
    }
  }, [expense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              {expense ? 'แก้ไขรายจ่าย' : 'เพิ่มรายจ่ายใหม่'}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>วันที่</Label>
                <Input
                  type="date"
                  value={formData.date ? formData.date.slice(0, 10) : ""}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>กำหนดชำระ</Label>
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>ประเภทรายจ่าย</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({...formData, category: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salary">เงินเดือน</SelectItem>
                  <SelectItem value="rent">ค่าเช่า</SelectItem>
                  <SelectItem value="utilities">สาธารณูปโภค</SelectItem>
                  <SelectItem value="supplies">ค่าสินค้า</SelectItem>
                  <SelectItem value="marketing">การตลาด</SelectItem>
                  <SelectItem value="equipment">อุปกรณ์</SelectItem>
                  <SelectItem value="other">อื่นๆ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>รายละเอียด</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="เช่น ค่าไฟฟ้าเดือนมิถุนายน"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>จำนวนเงิน (บาท)</Label>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>ผู้จำหน่าย/เจ้าหนี้</Label>
                <Input
                  value={formData.vendor}
                  onChange={(e) => setFormData({...formData, vendor: e.target.value})}
                  placeholder="เช่น การไฟฟ้านครหลวง"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>สถานะ</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: 'paid' | 'pending') => setFormData({...formData, status: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">ค้างจ่าย</SelectItem>
                  <SelectItem value="paid">จ่ายแล้ว</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                ยกเลิก
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                บันทึก
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
