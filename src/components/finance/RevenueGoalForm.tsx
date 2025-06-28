
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface RevenueGoalFormProps {
  onSave: (goalData: any) => void;
  onClose: () => void;
}

export const RevenueGoalForm = ({ onSave, onClose }: RevenueGoalFormProps) => {
  const [formData, setFormData] = useState({
    month: '',
    year: new Date().getFullYear(),
    target: 0,
    examGoal: 0,
    glassesGoal: 0,
    contactGoal: 0,
    otherGoal: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const months = [
    { value: '01', label: 'มกราคม' },
    { value: '02', label: 'กุมภาพันธ์' },
    { value: '03', label: 'มีนาคม' },
    { value: '04', label: 'เมษายน' },
    { value: '05', label: 'พฤษภาคม' },
    { value: '06', label: 'มิถุนายน' },
    { value: '07', label: 'กรกฎาคม' },
    { value: '08', label: 'สิงหาคม' },
    { value: '09', label: 'กันยายน' },
    { value: '10', label: 'ตุลาคม' },
    { value: '11', label: 'พฤศจิกายน' },
    { value: '12', label: 'ธันวาคม' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>ตั้งเป้าหมายรายได้</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>เดือน</Label>
                <Select value={formData.month} onValueChange={(value) => setFormData({...formData, month: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกเดือน" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>ปี</Label>
                <Input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: Number(e.target.value)})}
                  min="2024"
                  max="2030"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>เป้าหมายรายได้รวม (บาท)</Label>
              <Input
                type="number"
                value={formData.target}
                onChange={(e) => setFormData({...formData, target: Number(e.target.value)})}
                placeholder="500000"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>เป้าหมายการตรวจสายตา (บาท)</Label>
                <Input
                  type="number"
                  value={formData.examGoal}
                  onChange={(e) => setFormData({...formData, examGoal: Number(e.target.value)})}
                  placeholder="200000"
                />
              </div>
              <div className="space-y-2">
                <Label>เป้าหมายขายแว่น (บาท)</Label>
                <Input
                  type="number"
                  value={formData.glassesGoal}
                  onChange={(e) => setFormData({...formData, glassesGoal: Number(e.target.value)})}
                  placeholder="150000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>เป้าหมายคอนแทคเลนส์ (บาท)</Label>
                <Input
                  type="number"
                  value={formData.contactGoal}
                  onChange={(e) => setFormData({...formData, contactGoal: Number(e.target.value)})}
                  placeholder="100000"
                />
              </div>
              <div className="space-y-2">
                <Label>เป้าหมายบริการอื่นๆ (บาท)</Label>
                <Input
                  type="number"
                  value={formData.otherGoal}
                  onChange={(e) => setFormData({...formData, otherGoal: Number(e.target.value)})}
                  placeholder="50000"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                ยกเลิก
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                บันทึกเป้าหมาย
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
