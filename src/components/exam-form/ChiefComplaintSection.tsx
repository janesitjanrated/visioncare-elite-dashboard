import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface ChiefComplaintSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  handleCheckboxChange: (field: string, checked: boolean) => void;
}

export const ChiefComplaintSection = ({ formData, setFormData, handleCheckboxChange }: ChiefComplaintSectionProps) => {
  return (
    <Card>
      <CardHeader className='bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-tl-2xl rounded-tr-2xl'>
        <CardTitle className="text-lg">Chief Complaint</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>1st CC:</Label>
          <Input
            value={formData.chiefComplaint1}
            onChange={(e) => setFormData({...formData, chiefComplaint1: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label>2nd CC:</Label>
          <Input
            value={formData.chiefComplaint2}
            onChange={(e) => setFormData({...formData, chiefComplaint2: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="contactLens"
              checked={formData.contactLens}
              onCheckedChange={(checked) => handleCheckboxChange('contactLens', checked as boolean)}
            />
            <Label htmlFor="contactLens">ใส่คอนแทคเลนส์</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="glasses"
              checked={formData.glasses}
              onCheckedChange={(checked) => handleCheckboxChange('glasses', checked as boolean)}
            />
            <Label htmlFor="glasses">ใส่แว่นตา</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="blurNear"
              checked={formData.blurNear}
              onCheckedChange={(checked) => handleCheckboxChange('blurNear', checked as boolean)}
            />
            <Label htmlFor="blurNear">มองใกล้มัว</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="blurFar"
              checked={formData.blurFar}
              onCheckedChange={(checked) => handleCheckboxChange('blurFar', checked as boolean)}
            />
            <Label htmlFor="blurFar">มองไกลมัว</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
