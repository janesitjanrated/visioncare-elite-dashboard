
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface MedicalHistorySectionProps {
  formData: any;
  setFormData: (data: any) => void;
  handleCheckboxChange: (field: string, checked: boolean) => void;
}

export const MedicalHistorySection = ({ formData, setFormData, handleCheckboxChange }: MedicalHistorySectionProps) => {
  return (
    <>
      {/* HA/Diplopia ; FOLDDARQ */}
      <Card>
        <CardHeader className='bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-tl-2xl rounded-tr-2xl'>
          <CardTitle className="text-lg">HA/Diplopia ; FOLDDARQ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>HA</Label>
              <Input
                value={formData.ha}
                onChange={(e) => setFormData({...formData, ha: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Diplopia</Label>
              <Input
                value={formData.diplopia}
                onChange={(e) => setFormData({...formData, diplopia: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PMHx */}
      <Card>
        <CardHeader className='bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-tl-2xl rounded-tr-2xl'>
          <CardTitle className="text-lg">PMHx ประวัติทางการแพทย์</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label>รายละเอียด</Label>
              <Input
                value={formData.pmhxDetails}
                onChange={(e) => setFormData({...formData, pmhxDetails: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>ระยะเวลา</Label>
              <Input
                value={formData.pmhxDuration}
                onChange={(e) => setFormData({...formData, pmhxDuration: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label>KEA/KMA</Label>
              <Input
                value={formData.kea}
                onChange={(e) => setFormData({...formData, kea: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>MED</Label>
              <Input
                value={formData.med}
                onChange={(e) => setFormData({...formData, med: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">Self</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="self"
                    checked={formData.self}
                    onCheckedChange={(checked) => handleCheckboxChange('self', checked as boolean)}
                  />
                  <Label htmlFor="self">Self</Label>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">ROS</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ros"
                    checked={formData.ros}
                    onCheckedChange={(checked) => handleCheckboxChange('ros', checked as boolean)}
                  />
                  <Label htmlFor="ros">ROS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="glaucoma"
                    checked={formData.glaucoma}
                    onCheckedChange={(checked) => handleCheckboxChange('glaucoma', checked as boolean)}
                  />
                  <Label htmlFor="glaucoma">Glaucoma</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dm"
                    checked={formData.dm}
                    onCheckedChange={(checked) => handleCheckboxChange('dm', checked as boolean)}
                  />
                  <Label htmlFor="dm">DM</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="htn"
                    checked={formData.htn}
                    onCheckedChange={(checked) => handleCheckboxChange('htn', checked as boolean)}
                  />
                  <Label htmlFor="htn">HTN</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="thyroid"
                    checked={formData.thyroid}
                    onCheckedChange={(checked) => handleCheckboxChange('thyroid', checked as boolean)}
                  />
                  <Label htmlFor="thyroid">Thyroid</Label>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Family</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="family"
                    checked={formData.family}
                    onCheckedChange={(checked) => handleCheckboxChange('family', checked as boolean)}
                  />
                  <Label htmlFor="family">Family</Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SHx */}
      <Card>
        <CardHeader className='bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-tl-2xl rounded-tr-2xl'>
          <CardTitle className="text-lg">SHx ประวัติส่วนตัว</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>อาชีพ</Label>
              <Input
                value={formData.occupation}
                onChange={(e) => setFormData({...formData, occupation: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Alcohol</Label>
              <Input
                value={formData.alcohol}
                onChange={(e) => setFormData({...formData, alcohol: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Smoke</Label>
              <Input
                value={formData.smoke}
                onChange={(e) => setFormData({...formData, smoke: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PD */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">PD</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>R</Label>
              <Input
                value={formData.pdR}
                onChange={(e) => setFormData({...formData, pdR: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>L</Label>
              <Input
                value={formData.pdL}
                onChange={(e) => setFormData({...formData, pdL: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>รวม</Label>
              <Input
                value={formData.pdTotal}
                onChange={(e) => setFormData({...formData, pdTotal: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
