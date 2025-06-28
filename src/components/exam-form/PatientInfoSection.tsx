
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PatientInfoSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const PatientInfoSection = ({ formData, setFormData }: PatientInfoSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">ข้อมูลผู้ป่วย</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>ชื่อ-นามสกุล</Label>
            <Input
              value={formData.patientName}
              onChange={(e) => setFormData({...formData, patientName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>เพศ</Label>
            <Input
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>อายุ</Label>
            <Input
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>HN</Label>
            <Input
              value={formData.hn}
              onChange={(e) => setFormData({...formData, hn: e.target.value})}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
