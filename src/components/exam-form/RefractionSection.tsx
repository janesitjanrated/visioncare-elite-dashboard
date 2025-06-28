import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RefractionSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const RefractionSection = ({ formData, setFormData }: RefractionSectionProps) => {
  return (
    <>
      {/* Retino */}
      <Card>
        <CardHeader className='bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-tl-2xl rounded-tr-2xl'>
          <CardTitle className="text-lg">Retino</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8 mb-4">
            {/* OD (Right Eye) */}
            <div>
              <div className="font-semibold text-lg mb-2">OD (Right Eye)</div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Sphere</Label>
                  <Input
                    value={formData.retinoOdSphere || ''}
                    onChange={(e) => setFormData({ ...formData, retinoOdSphere: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Cylinder</Label>
                  <Input
                    value={formData.retinoOdCylinder || ''}
                    onChange={(e) => setFormData({ ...formData, retinoOdCylinder: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Axis</Label>
                  <Input
                    value={formData.retinoOdAxis || ''}
                    onChange={(e) => setFormData({ ...formData, retinoOdAxis: e.target.value })}
                  />
                </div>
              </div>
            </div>
            {/* OS (Left Eye) */}
            <div>
              <div className="font-semibold text-lg mb-2">OS (Left Eye)</div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Sphere</Label>
                  <Input
                    value={formData.retinoOsSphere || ''}
                    onChange={(e) => setFormData({ ...formData, retinoOsSphere: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Cylinder</Label>
                  <Input
                    value={formData.retinoOsCylinder || ''}
                    onChange={(e) => setFormData({ ...formData, retinoOsCylinder: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Axis</Label>
                  <Input
                    value={formData.retinoOsAxis || ''}
                    onChange={(e) => setFormData({ ...formData, retinoOsAxis: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 mb-4">
            {/* Mono Sub OD */}
            <div>
              <div className="font-semibold text-lg mb-2">Mono Sub OD</div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Sphere</Label>
                  <Input
                    value={formData.monoSubOdSphere || ''}
                    onChange={(e) => setFormData({ ...formData, monoSubOdSphere: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Cylinder</Label>
                  <Input
                    value={formData.monoSubOdCylinder || ''}
                    onChange={(e) => setFormData({ ...formData, monoSubOdCylinder: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Axis</Label>
                  <Input
                    value={formData.monoSubOdAxis || ''}
                    onChange={(e) => setFormData({ ...formData, monoSubOdAxis: e.target.value })}
                  />
                </div>
              </div>
            </div>
            {/* Mono Sub OS */}
            <div>
              <div className="font-semibold text-lg mb-2">Mono Sub OS</div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Sphere</Label>
                  <Input
                    value={formData.monoSubOsSphere || ''}
                    onChange={(e) => setFormData({ ...formData, monoSubOsSphere: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Cylinder</Label>
                  <Input
                    value={formData.monoSubOsCylinder || ''}
                    onChange={(e) => setFormData({ ...formData, monoSubOsCylinder: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Axis</Label>
                  <Input
                    value={formData.monoSubOsAxis || ''}
                    onChange={(e) => setFormData({ ...formData, monoSubOsAxis: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {/* BVA OD */}
            <div>
              <div className="font-semibold text-lg mb-2">BVA OD</div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Sphere</Label>
                  <Input
                    value={formData.bvaOdSphere || ''}
                    onChange={(e) => setFormData({ ...formData, bvaOdSphere: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Cylinder</Label>
                  <Input
                    value={formData.bvaOdCylinder || ''}
                    onChange={(e) => setFormData({ ...formData, bvaOdCylinder: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Axis</Label>
                  <Input
                    value={formData.bvaOdAxis || ''}
                    onChange={(e) => setFormData({ ...formData, bvaOdAxis: e.target.value })}
                  />
                </div>
              </div>
            </div>
            {/* BVA OS */}
            <div>
              <div className="font-semibold text-lg mb-2">BVA OS</div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Sphere</Label>
                  <Input
                    value={formData.bvaOsSphere || ''}
                    onChange={(e) => setFormData({ ...formData, bvaOsSphere: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Cylinder</Label>
                  <Input
                    value={formData.bvaOsCylinder || ''}
                    onChange={(e) => setFormData({ ...formData, bvaOsCylinder: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Axis</Label>
                  <Input
                    value={formData.bvaOsAxis || ''}
                    onChange={(e) => setFormData({ ...formData, bvaOsAxis: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
