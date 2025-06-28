
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface VisualAcuitySectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const VisualAcuitySection = ({ formData, setFormData }: VisualAcuitySectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Visual Acuity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-4">
            <div className="font-medium"></div>
            <div className="text-center"><Label>VAsc</Label></div>
            <div className="text-center"><Label>VAcc</Label></div>
            <div className="text-center"><Label>VAnear</Label></div>
            <div className="text-center"><Label>VA(PH)</Label></div>
          </div>
          
          <div className="grid grid-cols-5 gap-4 items-center">
            <div><Label>OD</Label></div>
            <Input
              placeholder="20/"
              value={formData.vasc?.od || ''}
              onChange={(e) => setFormData({...formData, vasc: {...formData.vasc, od: e.target.value}})}
            />
            <Input
              placeholder="20/"
              value={formData.vacc?.od || ''}
              onChange={(e) => setFormData({...formData, vacc: {...formData.vacc, od: e.target.value}})}
            />
            <Input
              placeholder="20/"
              value={formData.vanear?.od || ''}
              onChange={(e) => setFormData({...formData, vanear: {...formData.vanear, od: e.target.value}})}
            />
            <Input
              placeholder="20/"
              value={formData.vaph?.od || ''}
              onChange={(e) => setFormData({...formData, vaph: {...formData.vaph, od: e.target.value}})}
            />
          </div>
          
          <div className="grid grid-cols-5 gap-4 items-center">
            <div><Label>OS</Label></div>
            <Input
              placeholder="20/"
              value={formData.vasc?.os || ''}
              onChange={(e) => setFormData({...formData, vasc: {...formData.vasc, os: e.target.value}})}
            />
            <Input
              placeholder="20/"
              value={formData.vacc?.os || ''}
              onChange={(e) => setFormData({...formData, vacc: {...formData.vacc, os: e.target.value}})}
            />
            <Input
              placeholder="20/"
              value={formData.vanear?.os || ''}
              onChange={(e) => setFormData({...formData, vanear: {...formData.vanear, os: e.target.value}})}
            />
            <Input
              placeholder="20/"
              value={formData.vaph?.os || ''}
              onChange={(e) => setFormData({...formData, vaph: {...formData.vaph, os: e.target.value}})}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
