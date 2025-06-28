
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface TaxFormProps {
  onSave: (taxData: any) => void;
  onClose: () => void;
}

export const TaxForm = ({ onSave, onClose }: TaxFormProps) => {
  const [formData, setFormData] = useState({
    period: '',
    type: 'vat',
    revenue: 0,
    vatOutput: 0,
    vatInput: 0,
    dueDate: '',
    status: 'pending'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const netVat = formData.vatOutput - formData.vatInput;
    onSave({ ...formData, netVat });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>เพิ่มรายการภาษี</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>งวดภาษี</Label>
                <Input
                  value={formData.period}
                  onChange={(e) => setFormData({...formData, period: e.target.value})}
                  placeholder="2024-07"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>ประเภท</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => setFormData({...formData, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vat">ภาษีมูลค่าเพิ่ม</SelectItem>
                    <SelectItem value="income">ภาษีเงินได้</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>รายได้รวม (บาท)</Label>
              <Input
                type="number"
                value={formData.revenue}
                onChange={(e) => setFormData({...formData, revenue: Number(e.target.value)})}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ภาษีขาย (บาท)</Label>
                <Input
                  type="number"
                  value={formData.vatOutput}
                  onChange={(e) => setFormData({...formData, vatOutput: Number(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label>ภาษีซื้อ (บาท)</Label>
                <Input
                  type="number"
                  value={formData.vatInput}
                  onChange={(e) => setFormData({...formData, vatInput: Number(e.target.value)})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>กำหนดยื่น</Label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                required
              />
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">ภาษีมูลค่าเพิ่มสุทธิ:</span>
                <span className="font-bold text-lg">
                  ฿{(formData.vatOutput - formData.vatInput).toLocaleString()}
                </span>
              </div>
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
