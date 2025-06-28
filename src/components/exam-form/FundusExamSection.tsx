
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FundusExamSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const FundusExamSection = ({ formData, setFormData }: FundusExamSectionProps) => {
  return (
    <>
      {/* Fundus Examination */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Fundus Examination</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Headers */}
            <div className="grid grid-cols-5 gap-2 text-center text-sm font-medium">
              <div></div>
              <div>Optic Disc</div>
              <div>Macula</div>
              <div>Vessels</div>
              <div>Periphery</div>
            </div>
            
            {/* OD Row */}
            <div className="grid grid-cols-5 gap-2 items-center">
              <div className="font-medium">OD</div>
              <Input
                value={formData.fundusOdOpticDisc}
                onChange={(e) => setFormData({...formData, fundusOdOpticDisc: e.target.value})}
              />
              <Input
                value={formData.fundusOdMacula}
                onChange={(e) => setFormData({...formData, fundusOdMacula: e.target.value})}
              />
              <Input
                value={formData.fundusOdVessels}
                onChange={(e) => setFormData({...formData, fundusOdVessels: e.target.value})}
              />
              <Input
                value={formData.fundusOdPeriphery}
                onChange={(e) => setFormData({...formData, fundusOdPeriphery: e.target.value})}
              />
            </div>
            
            {/* OS Row */}
            <div className="grid grid-cols-5 gap-2 items-center">
              <div className="font-medium">OS</div>
              <Input
                value={formData.fundusOsOpticDisc}
                onChange={(e) => setFormData({...formData, fundusOsOpticDisc: e.target.value})}
              />
              <Input
                value={formData.fundusOsMacula}
                onChange={(e) => setFormData({...formData, fundusOsMacula: e.target.value})}
              />
              <Input
                value={formData.fundusOsVessels}
                onChange={(e) => setFormData({...formData, fundusOsVessels: e.target.value})}
              />
              <Input
                value={formData.fundusOsPeriphery}
                onChange={(e) => setFormData({...formData, fundusOsPeriphery: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CDR (Cup to Disc Ratio) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">CDR (Cup to Disc Ratio)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>OD</Label>
              <Input
                placeholder="0.3"
                value={formData.cdrOd}
                onChange={(e) => setFormData({...formData, cdrOd: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>OS</Label>
              <Input
                placeholder="0.3"
                value={formData.cdrOs}
                onChange={(e) => setFormData({...formData, cdrOs: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
