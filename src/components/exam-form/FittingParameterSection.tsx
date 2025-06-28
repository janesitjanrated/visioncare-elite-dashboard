
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FittingParameterSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const FittingParameterSection = ({ formData, setFormData }: FittingParameterSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Fitting Parameter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="space-y-2">
            <Label>PD</Label>
            <Input
              value={formData.fittingParameterPd}
              onChange={(e) => setFormData({...formData, fittingParameterPd: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>FH</Label>
            <Input
              value={formData.fittingParameterFh}
              onChange={(e) => setFormData({...formData, fittingParameterFh: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>FFA</Label>
            <Input
              value={formData.ffa}
              onChange={(e) => setFormData({...formData, ffa: e.target.value})}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>PT</Label>
            <Input
              value={formData.pt}
              onChange={(e) => setFormData({...formData, pt: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>CVD</Label>
            <Input
              value={formData.cvd}
              onChange={(e) => setFormData({...formData, cvd: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Frame</Label>
            <Input
              value={formData.frame}
              onChange={(e) => setFormData({...formData, frame: e.target.value})}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="space-y-2">
            <Label>Lens</Label>
            <Input
              value={formData.lens}
              onChange={(e) => setFormData({...formData, lens: e.target.value})}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
