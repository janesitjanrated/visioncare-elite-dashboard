
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface Claim {
  id: string;
  patientName: string;
  patientId: string;
  claimDate: string;
  productType: string;
  issueDescription: string;
  status: 'pending' | 'approved' | 'rejected' | 'resolved';
  claimAmount: number;
  supplierResponse?: string;
  resolvedDate?: string;
}

interface ClaimFormProps {
  claim?: Claim | null;
  onSave: (claim: Partial<Claim>) => void;
  onClose: () => void;
}

export const ClaimForm = ({ claim, onSave, onClose }: ClaimFormProps) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    claimDate: new Date().toISOString().split('T')[0],
    productType: '',
    issueDescription: '',
    status: 'pending' as 'pending' | 'approved' | 'rejected' | 'resolved',
    claimAmount: 0,
    supplierResponse: '',
    resolvedDate: ''
  });

  useEffect(() => {
    if (claim) {
      setFormData({
        patientName: claim.patientName,
        patientId: claim.patientId,
        claimDate: claim.claimDate,
        productType: claim.productType,
        issueDescription: claim.issueDescription,
        status: claim.status,
        claimAmount: claim.claimAmount,
        supplierResponse: claim.supplierResponse || '',
        resolvedDate: claim.resolvedDate || ''
      });
    }
  }, [claim]);

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
              {claim ? 'แก้ไขรายการเคลม' : 'เพิ่มรายการเคลมใหม่'}
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
                <Label>วันที่เคลม</Label>
                <Input
                  type="date"
                  value={formData.claimDate}
                  onChange={(e) => setFormData({...formData, claimDate: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>มูลค่าเคลม (บาท)</Label>
                <Input
                  type="number"
                  value={formData.claimAmount}
                  onChange={(e) => setFormData({...formData, claimAmount: Number(e.target.value)})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>ประเภทสินค้า</Label>
              <Input
                value={formData.productType}
                onChange={(e) => setFormData({...formData, productType: e.target.value})}
                placeholder="เช่น Progressive Lens, Titanium Frame"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>รายละเอียดปัญหา</Label>
              <Textarea
                value={formData.issueDescription}
                onChange={(e) => setFormData({...formData, issueDescription: e.target.value})}
                placeholder="อธิบายปัญหาที่เกิดขึ้น..."
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>สถานะ</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: 'pending' | 'approved' | 'rejected' | 'resolved') => setFormData({...formData, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">รอดำเนินการ</SelectItem>
                    <SelectItem value="approved">อนุมัติ</SelectItem>
                    <SelectItem value="rejected">ปฏิเสธ</SelectItem>
                    <SelectItem value="resolved">แก้ไขแล้ว</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>วันที่แก้ไข</Label>
                <Input
                  type="date"
                  value={formData.resolvedDate}
                  onChange={(e) => setFormData({...formData, resolvedDate: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>การตอบสนองจากผู้จำหน่าย</Label>
              <Textarea
                value={formData.supplierResponse}
                onChange={(e) => setFormData({...formData, supplierResponse: e.target.value})}
                placeholder="การตอบสนองหรือข้อความจากผู้จำหน่าย..."
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
