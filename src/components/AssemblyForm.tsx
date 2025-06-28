
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface AssemblyOrder {
  id: string;
  patientName: string;
  patientId: string;
  orderDate: string;
  lensType: string;
  frameModel: string;
  assemblyInstructions: string;
  status: 'pending' | 'in-progress' | 'quality-check' | 'completed';
  technician: string;
  estimatedCompletion: string;
  actualCompletion?: string;
  notes: string;
}

interface AssemblyFormProps {
  order?: AssemblyOrder | null;
  onSave: (order: Partial<AssemblyOrder>) => void;
  onClose: () => void;
}

export const AssemblyForm = ({ order, onSave, onClose }: AssemblyFormProps) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    orderDate: new Date().toISOString().split('T')[0],
    lensType: '',
    frameModel: '',
    assemblyInstructions: '',
    status: 'pending' as 'pending' | 'in-progress' | 'quality-check' | 'completed',
    technician: '',
    estimatedCompletion: '',
    actualCompletion: '',
    notes: ''
  });

  useEffect(() => {
    if (order) {
      setFormData({
        patientName: order.patientName,
        patientId: order.patientId,
        orderDate: order.orderDate,
        lensType: order.lensType,
        frameModel: order.frameModel,
        assemblyInstructions: order.assemblyInstructions,
        status: order.status,
        technician: order.technician,
        estimatedCompletion: order.estimatedCompletion,
        actualCompletion: order.actualCompletion || '',
        notes: order.notes
      });
    }
  }, [order]);

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
              {order ? 'แก้ไขรายการประกอบ' : 'เพิ่มรายการประกอบใหม่'}
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
                <Label>ช่างประกอบ</Label>
                <Select 
                  value={formData.technician} 
                  onValueChange={(value) => setFormData({...formData, technician: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกช่างประกอบ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ช่างโอ๋">ช่างโอ๋</SelectItem>
                    <SelectItem value="ช่างแดง">ช่างแดง</SelectItem>
                    <SelectItem value="ช่างดำ">ช่างดำ</SelectItem>
                    <SelectItem value="ช่างขาว">ช่างขาว</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label>รุ่นกรอบ</Label>
                <Input
                  value={formData.frameModel}
                  onChange={(e) => setFormData({...formData, frameModel: e.target.value})}
                  placeholder="เช่น Ray-Ban RB5154"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>คำแนะนำการประกอบ</Label>
              <Textarea
                value={formData.assemblyInstructions}
                onChange={(e) => setFormData({...formData, assemblyInstructions: e.target.value})}
                placeholder="รายละเอียดการประกอบ เช่น ตัดเลนส์ให้พอดีกับกรอบ..."
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>สถานะ</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: 'pending' | 'in-progress' | 'quality-check' | 'completed') => setFormData({...formData, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">รอประกอบ</SelectItem>
                    <SelectItem value="in-progress">กำลังประกอบ</SelectItem>
                    <SelectItem value="quality-check">ตรวจคุณภาพ</SelectItem>
                    <SelectItem value="completed">เสร็จสิ้น</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>กำหนดเสร็จ</Label>
                <Input
                  type="date"
                  value={formData.estimatedCompletion}
                  onChange={(e) => setFormData({...formData, estimatedCompletion: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>วันที่เสร็จจริง</Label>
              <Input
                type="date"
                value={formData.actualCompletion}
                onChange={(e) => setFormData({...formData, actualCompletion: e.target.value})}
              />
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
