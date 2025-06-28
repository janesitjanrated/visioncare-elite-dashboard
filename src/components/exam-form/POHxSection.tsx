
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface POHxSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  handleCheckboxChange: (field: string, checked: boolean) => void;
}

export const POHxSection = ({ formData, setFormData, handleCheckboxChange }: POHxSectionProps) => {
  return (
    <Card>
      <CardHeader className='bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-tl-2xl rounded-tr-2xl'>
        <CardTitle className="text-lg">POHx ประวัติทางตาในอดีต</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label>รายละเอียด</Label>
            <Input
              value={formData.pohxDetails}
              onChange={(e) => setFormData({...formData, pohxDetails: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>ระยะเวลา</Label>
            <Input
              value={formData.pohxDuration}
              onChange={(e) => setFormData({...formData, pohxDuration: e.target.value})}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="cl"
                checked={formData.cl}
                onCheckedChange={(checked) => handleCheckboxChange('cl', checked as boolean)}
              />
              <Label htmlFor="cl">CL</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="glasses_checkbox"
                checked={formData.glasses_checkbox}
                onCheckedChange={(checked) => handleCheckboxChange('glasses_checkbox', checked as boolean)}
              />
              <Label htmlFor="glasses_checkbox">Glasses</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="surgery"
                checked={formData.surgery}
                onCheckedChange={(checked) => handleCheckboxChange('surgery', checked as boolean)}
              />
              <Label htmlFor="surgery">Surgery</Label>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="trauma"
                checked={formData.trauma}
                onCheckedChange={(checked) => handleCheckboxChange('trauma', checked as boolean)}
              />
              <Label htmlFor="trauma">Trauma</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="floater"
                checked={formData.floater}
                onCheckedChange={(checked) => handleCheckboxChange('floater', checked as boolean)}
              />
              <Label htmlFor="floater">Floater</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="flash"
                checked={formData.flash}
                onCheckedChange={(checked) => handleCheckboxChange('flash', checked as boolean)}
              />
              <Label htmlFor="flash">Flash</Label>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="injury"
                checked={formData.injury}
                onCheckedChange={(checked) => handleCheckboxChange('injury', checked as boolean)}
              />
              <Label htmlFor="injury">Injury</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inflammation"
                checked={formData.inflammation}
                onCheckedChange={(checked) => handleCheckboxChange('inflammation', checked as boolean)}
              />
              <Label htmlFor="inflammation">Inflammation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="infection"
                checked={formData.infection}
                onCheckedChange={(checked) => handleCheckboxChange('infection', checked as boolean)}
              />
              <Label htmlFor="infection">Infection</Label>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Label className="text-sm font-medium">Other:</Label>
          <Input 
            placeholder="อื่นๆ" 
            value={formData.pohxOther}
            onChange={(e) => setFormData({...formData, pohxOther: e.target.value})}
          />
        </div>
      </CardContent>
    </Card>
  );
};
