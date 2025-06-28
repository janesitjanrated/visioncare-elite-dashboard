
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SlitLampSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const SlitLampSection = ({ formData, setFormData }: SlitLampSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Slit Lamp Examination</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Headers */}
          <div className="grid grid-cols-8 gap-2 text-center text-sm font-medium">
            <div></div>
            <div>Lids</div>
            <div>Conjunctiva</div>
            <div>Cornea</div>
            <div>A/C</div>
            <div>Iris</div>
            <div>Lens</div>
            <div>Vitreous</div>
          </div>
          
          {/* OD Row */}
          <div className="grid grid-cols-8 gap-2 items-center">
            <div className="font-medium">OD</div>
            <Input
              value={formData.slitLampOdLids}
              onChange={(e) => setFormData({...formData, slitLampOdLids: e.target.value})}
            />
            <Input
              value={formData.slitLampOdConjunctiva}
              onChange={(e) => setFormData({...formData, slitLampOdConjunctiva: e.target.value})}
            />
            <Input
              value={formData.slitLampOdCornea}
              onChange={(e) => setFormData({...formData, slitLampOdCornea: e.target.value})}
            />
            <Input
              value={formData.slitLampOdAc}
              onChange={(e) => setFormData({...formData, slitLampOdAc: e.target.value})}
            />
            <Input
              value={formData.slitLampOdIris}
              onChange={(e) => setFormData({...formData, slitLampOdIris: e.target.value})}
            />
            <Input
              value={formData.slitLampOdLens}
              onChange={(e) => setFormData({...formData, slitLampOdLens: e.target.value})}
            />
            <Input
              value={formData.slitLampOdVitreous}
              onChange={(e) => setFormData({...formData, slitLampOdVitreous: e.target.value})}
            />
          </div>
          
          {/* OS Row */}
          <div className="grid grid-cols-8 gap-2 items-center">
            <div className="font-medium">OS</div>
            <Input
              value={formData.slitLampOsLids}
              onChange={(e) => setFormData({...formData, slitLampOsLids: e.target.value})}
            />
            <Input
              value={formData.slitLampOsConjunctiva}
              onChange={(e) => setFormData({...formData, slitLampOsConjunctiva: e.target.value})}
            />
            <Input
              value={formData.slitLampOsCornea}
              onChange={(e) => setFormData({...formData, slitLampOsCornea: e.target.value})}
            />
            <Input
              value={formData.slitLampOsAc}
              onChange={(e) => setFormData({...formData, slitLampOsAc: e.target.value})}
            />
            <Input
              value={formData.slitLampOsIris}
              onChange={(e) => setFormData({...formData, slitLampOsIris: e.target.value})}
            />
            <Input
              value={formData.slitLampOsLens}
              onChange={(e) => setFormData({...formData, slitLampOsLens: e.target.value})}
            />
            <Input
              value={formData.slitLampOsVitreous}
              onChange={(e) => setFormData({...formData, slitLampOsVitreous: e.target.value})}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
