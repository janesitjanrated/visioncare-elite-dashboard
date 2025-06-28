
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface IOPSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const IOPSection = ({ formData, setFormData }: IOPSectionProps) => {
  return (
    <Card>
      <CardHeader className='bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-tl-2xl rounded-tr-2xl'>
        <CardTitle className="text-lg">IOP & Additional Info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="space-y-2">
            <Label>Method</Label>
            <Input
              value={formData.iopMethod}
              onChange={(e) => setFormData({...formData, iopMethod: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Time</Label>
            <Input
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>mmHg</Label>
            <Input
              value={formData.mmhg}
              onChange={(e) => setFormData({...formData, mmhg: e.target.value})}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>OD</Label>
            <Input
              value={formData.od}
              onChange={(e) => setFormData({...formData, od: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>BP</Label>
            <Input
              value={formData.bp}
              onChange={(e) => setFormData({...formData, bp: e.target.value})}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
