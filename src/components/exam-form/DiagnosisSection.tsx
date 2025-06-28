
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface DiagnosisSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const DiagnosisSection = ({ formData, setFormData }: DiagnosisSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Diagnosis & Plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Diagnosis</Label>
          <Textarea
            placeholder="การวินิจฉัยโรค..."
            value={formData.diagnosis}
            onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Plan</Label>
          <Textarea
            placeholder="แผนการรักษา..."
            value={formData.plan}
            onChange={(e) => setFormData({...formData, plan: e.target.value})}
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Next Visit</Label>
          <Input
            placeholder="นัดครั้งถัดไป..."
            value={formData.nextVisit}
            onChange={(e) => setFormData({...formData, nextVisit: e.target.value})}
          />
        </div>
      </CardContent>
    </Card>
  );
};
