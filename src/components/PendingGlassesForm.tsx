
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface PendingGlass {
  id: string;
  patientName: string;
  patientId: string;
  orderDate: string;
  expectedDelivery: string;
  glassType: string;
  status: 'ordered' | 'arrived' | 'ready' | 'delivered';
  supplier: string;
  trackingNumber: string;
  notes: string;
}

interface PendingGlassesFormProps {
  glass?: PendingGlass | null;
  onSave: (glass: Partial<PendingGlass>) => void;
  onClose: () => void;
}

export const PendingGlassesForm = ({ glass, onSave, onClose }: PendingGlassesFormProps) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    orderDate: new Date().toISOString().split('T')[0],
    expectedDelivery: '',
    glassType: '',
    status: 'ordered' as 'ordered' | 'arrived' | 'ready' | 'delivered',
    supplier: '',
    trackingNumber: '',
    notes: ''
  });

  useEffect(() => {
    if (glass) {
      setFormData({
        patientName: glass.patientName,
        patientId: glass.patientId,
        orderDate: glass.orderDate,
        expectedDelivery: glass.expectedDelivery,
        glassType: glass.glassType,
        status: glass.status,
        supplier: glass.supplier,
        trackingNumber: glass.trackingNumber,
        notes: glass.notes
      });
    }
  }, [glass]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              {glass ? 'แก้ไขรายการแว่นค้างส่ง' : 'เพิ่มรายการแว่นค้างส่งใหม่'}
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
                <Label>คาดว่าจะได้รับ</Label>
                <Input
                  type="date"
                  value={formData.expectedDelivery}
                  onChange={(e) => setFormData({...formData, expectedDelivery: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>ประเภทแว่น</Label>
              <Input
                value={formData.glassType}
                onChange={(e) => setFormData({...formData, glassType: e.target.value})}
                placeholder="เช่น Progressive Lens, Blue Light Filter"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ผู้จำหน่าย</Label>
                <Input
                  value={formData.supplier}
                  onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                  placeholder="เช่น Zeiss Thailand, Hoya Vision"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>เลขติดตาม</Label>
                <Input
                  value={formData.trackingNumber}
                  onChange={(e) => setFormData({...formData, trackingNumber: e.target.value})}
                  placeholder="เลขติดตามจากผู้จำหน่าย"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>สถานะ</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: 'ordered' | 'arrived' | 'ready' | 'delivered') => setFormData({...formData, status: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ordered">สั่งแล้ว</SelectItem>
                  <SelectItem value="arrived">มาถึงแล้ว</SelectItem>
                  <SelectItem value="ready">พร้อมรับ</SelectItem>
                  <SelectItem value="delivered">ส่งมอบแล้ว</SelectItem>
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
