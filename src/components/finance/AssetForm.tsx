
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  category: 'current' | 'fixed';
  value: number;
  description: string;
}

interface AssetFormProps {
  asset?: Asset | null;
  onSave: (asset: Partial<Asset>) => void;
  onClose: () => void;
}

export const AssetForm = ({ asset, onSave, onClose }: AssetFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'current' as 'current' | 'fixed',
    value: 0,
    description: ''
  });

  useEffect(() => {
    if (asset) {
      setFormData({
        name: asset.name,
        category: asset.category,
        value: asset.value,
        description: asset.description
      });
    }
  }, [asset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              {asset ? 'แก้ไขสินทรัพย์' : 'เพิ่มสินทรัพย์ใหม่'}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>ชื่อสินทรัพย์</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="เช่น เงินสด, อุปกรณ์การแพทย์"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>ประเภท</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value: 'current' | 'fixed') => setFormData({...formData, category: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">สินทรัพย์หมุนเวียน</SelectItem>
                  <SelectItem value="fixed">สินทรัพย์ถาวร</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>มูลค่า (บาท)</Label>
              <Input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: Number(e.target.value)})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>รายละเอียด</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="รายละเอียดเพิ่มเติมเกี่ยวกับสินทรัพย์นี้"
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
