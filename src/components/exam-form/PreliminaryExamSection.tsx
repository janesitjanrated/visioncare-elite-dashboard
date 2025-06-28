
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PreliminaryExamSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const PreliminaryExamSection = ({ formData, setFormData }: PreliminaryExamSectionProps) => {
  return (
    <Card>
      <CardHeader className='bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-tl-2xl rounded-tr-2xl'>
        <CardTitle className="text-lg">Preliminary Examination</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Version</Label>
            <Input
              value={formData.version}
              onChange={(e) => setFormData({...formData, version: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Duction</Label>
            <Input
              value={formData.duction}
              onChange={(e) => setFormData({...formData, duction: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Confrontation VF</Label>
            <Input
              value={formData.confrontationVF}
              onChange={(e) => setFormData({...formData, confrontationVF: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Cover test</Label>
            <Input
              value={formData.coverTest}
              onChange={(e) => setFormData({...formData, coverTest: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>NPC</Label>
            <Input
              value={formData.npc}
              onChange={(e) => setFormData({...formData, npc: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>NPA</Label>
            <Input
              value={formData.npa}
              onChange={(e) => setFormData({...formData, npa: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Stereopsis</Label>
            <Input
              value={formData.stereopsis}
              onChange={(e) => setFormData({...formData, stereopsis: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Type (Randot)</Label>
            <Input
              value={formData.stereopsisType}
              onChange={(e) => setFormData({...formData, stereopsisType: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Color Vision</Label>
            <Input
              value={formData.colorVision}
              onChange={(e) => setFormData({...formData, colorVision: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Type (Ishihara)</Label>
            <Input
              value={formData.colorVisionType}
              onChange={(e) => setFormData({...formData, colorVisionType: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Amsler</Label>
            <Input
              value={formData.amsler}
              onChange={(e) => setFormData({...formData, amsler: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>VF</Label>
            <Input
              value={formData.vf}
              onChange={(e) => setFormData({...formData, vf: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>VF Type</Label>
            <Input
              value={formData.vfType}
              onChange={(e) => setFormData({...formData, vfType: e.target.value})}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
