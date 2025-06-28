import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FunctionalVergenceSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const FunctionalVergenceSection = ({ formData, setFormData }: FunctionalVergenceSectionProps) => {
  return (
    <>
      {/* Functional ; Vergence and Accom */}
      <Card>
        <CardHeader className='bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-tl-2xl rounded-tr-2xl'>
          <CardTitle className="text-lg">Refraction - Functional ; Vergence and Accom</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>NRA</Label>
              <Input
                value={formData.nra}
                onChange={(e) => setFormData({...formData, nra: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>PRA</Label>
              <Input
                value={formData.pra}
                onChange={(e) => setFormData({...formData, pra: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>BCC</Label>
              <Input
                value={formData.bcc}
                onChange={(e) => setFormData({...formData, bcc: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Rely on</Label>
              <Input
                value={formData.relyOn}
                onChange={(e) => setFormData({...formData, relyOn: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Functional ; Vergence and Accommodation Distant */}
      <Card>
        <CardHeader className='bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-tl-2xl rounded-tr-2xl'>
          <CardTitle className="text-lg">Functional ; Vergence and Accommodation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Ass.phoria */}
            <div className="mb-2 flex items-center gap-2">
              <Label className="min-w-fit">Ass.phoria</Label>
              <Input
                className="w-40"
                value={formData.assPhoria || ''}
                onChange={e => setFormData({ ...formData, assPhoria: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              {/* Test 6m */}
              <div>
                <div className="font-semibold mb-2">Test 6 m</div>
                <div className="mb-2 flex items-center gap-2">
                  <Label className="min-w-fit">Horz.Phoria</Label>
                  <Input className="w-32" value={formData.test6m?.horzPhoria || ''} onChange={e => setFormData({ ...formData, test6m: { ...formData.test6m, horzPhoria: e.target.value } })} />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <Label className="min-w-fit">Vergence BI</Label>
                  <Input className="w-16" value={formData.test6m?.vergenceBi1 || ''} onChange={e => setFormData({ ...formData, test6m: { ...formData.test6m, vergenceBi1: e.target.value } })} />
                  <Input className="w-16" value={formData.test6m?.vergenceBi2 || ''} onChange={e => setFormData({ ...formData, test6m: { ...formData.test6m, vergenceBi2: e.target.value } })} />
                  <Input className="w-16" value={formData.test6m?.vergenceBi3 || ''} onChange={e => setFormData({ ...formData, test6m: { ...formData.test6m, vergenceBi3: e.target.value } })} />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <Label className="min-w-fit">Vergence BO</Label>
                  <Input className="w-16" value={formData.test6m?.vergenceBo1 || ''} onChange={e => setFormData({ ...formData, test6m: { ...formData.test6m, vergenceBo1: e.target.value } })} />
                  <Input className="w-16" value={formData.test6m?.vergenceBo2 || ''} onChange={e => setFormData({ ...formData, test6m: { ...formData.test6m, vergenceBo2: e.target.value } })} />
                  <Input className="w-16" value={formData.test6m?.vergenceBo3 || ''} onChange={e => setFormData({ ...formData, test6m: { ...formData.test6m, vergenceBo3: e.target.value } })} />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <Label className="min-w-fit">Vert.Phoria</Label>
                  <Input className="w-32" value={formData.test6m?.vertPhoria || ''} onChange={e => setFormData({ ...formData, test6m: { ...formData.test6m, vertPhoria: e.target.value } })} />
                  <span className="ml-2">L/R Hyper</span>
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <Label className="min-w-fit">BD-res. Sup</Label>
                  <Input className="w-16" value={formData.test6m?.bdResSup1 || ''} onChange={e => setFormData({ ...formData, test6m: { ...formData.test6m, bdResSup1: e.target.value } })} />
                  <Input className="w-16" value={formData.test6m?.bdResSup2 || ''} onChange={e => setFormData({ ...formData, test6m: { ...formData.test6m, bdResSup2: e.target.value } })} />
                  <span className="ml-2">L/R</span>
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <Label className="min-w-fit">BU-res. Inf</Label>
                  <Input className="w-16" value={formData.test6m?.buResInf1 || ''} onChange={e => setFormData({ ...formData, test6m: { ...formData.test6m, buResInf1: e.target.value } })} />
                  <Input className="w-16" value={formData.test6m?.buResInf2 || ''} onChange={e => setFormData({ ...formData, test6m: { ...formData.test6m, buResInf2: e.target.value } })} />
                  <span className="ml-2">L/R</span>
                </div>
              </div>
              {/* Test 40cm */}
              <div>
                <div className="font-semibold mb-2">Test 40 cm</div>
                <div className="mb-2 flex items-center gap-2">
                  <Label className="min-w-fit">Horz.Phoria</Label>
                  <Input className="w-32" value={formData.test40cm?.horzPhoria || ''} onChange={e => setFormData({ ...formData, test40cm: { ...formData.test40cm, horzPhoria: e.target.value } })} />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <Label className="min-w-fit">Vergence BI</Label>
                  <Input className="w-16" value={formData.test40cm?.vergenceBi1 || ''} onChange={e => setFormData({ ...formData, test40cm: { ...formData.test40cm, vergenceBi1: e.target.value } })} />
                  <Input className="w-16" value={formData.test40cm?.vergenceBi2 || ''} onChange={e => setFormData({ ...formData, test40cm: { ...formData.test40cm, vergenceBi2: e.target.value } })} />
                  <Input className="w-16" value={formData.test40cm?.vergenceBi3 || ''} onChange={e => setFormData({ ...formData, test40cm: { ...formData.test40cm, vergenceBi3: e.target.value } })} />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <Label className="min-w-fit">Vergence BO</Label>
                  <Input className="w-16" value={formData.test40cm?.vergenceBo1 || ''} onChange={e => setFormData({ ...formData, test40cm: { ...formData.test40cm, vergenceBo1: e.target.value } })} />
                  <Input className="w-16" value={formData.test40cm?.vergenceBo2 || ''} onChange={e => setFormData({ ...formData, test40cm: { ...formData.test40cm, vergenceBo2: e.target.value } })} />
                  <Input className="w-16" value={formData.test40cm?.vergenceBo3 || ''} onChange={e => setFormData({ ...formData, test40cm: { ...formData.test40cm, vergenceBo3: e.target.value } })} />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <Label className="min-w-fit">Vert.Phoria</Label>
                  <Input className="w-32" value={formData.test40cm?.vertPhoria || ''} onChange={e => setFormData({ ...formData, test40cm: { ...formData.test40cm, vertPhoria: e.target.value } })} />
                  <span className="ml-2">L/R Hyper</span>
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <Label className="min-w-fit">BD-res. Sup</Label>
                  <Input className="w-16" value={formData.test40cm?.bdResSup1 || ''} onChange={e => setFormData({ ...formData, test40cm: { ...formData.test40cm, bdResSup1: e.target.value } })} />
                  <Input className="w-16" value={formData.test40cm?.bdResSup2 || ''} onChange={e => setFormData({ ...formData, test40cm: { ...formData.test40cm, bdResSup2: e.target.value } })} />
                  <span className="ml-2">L/R</span>
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <Label className="min-w-fit">BU-res. Inf</Label>
                  <Input className="w-16" value={formData.test40cm?.buResInf1 || ''} onChange={e => setFormData({ ...formData, test40cm: { ...formData.test40cm, buResInf1: e.target.value } })} />
                  <Input className="w-16" value={formData.test40cm?.buResInf2 || ''} onChange={e => setFormData({ ...formData, test40cm: { ...formData.test40cm, buResInf2: e.target.value } })} />
                  <span className="ml-2">L/R</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spectacle Rx */}
      <Card>
        <CardHeader className='bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-tl-2xl rounded-tr-2xl'>
          <CardTitle className="text-lg">Spectacle Rx</CardTitle>
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
                    value={formData.spectacleRxOdSphere || ''}
                    onChange={(e) => setFormData({ ...formData, spectacleRxOdSphere: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Cylinder</Label>
                  <Input
                    value={formData.spectacleRxOdCylinder || ''}
                    onChange={(e) => setFormData({ ...formData, spectacleRxOdCylinder: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Axis</Label>
                  <Input
                    value={formData.spectacleRxOdAxis || ''}
                    onChange={(e) => setFormData({ ...formData, spectacleRxOdAxis: e.target.value })}
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
                    value={formData.spectacleRxOsSphere || ''}
                    onChange={(e) => setFormData({ ...formData, spectacleRxOsSphere: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Cylinder</Label>
                  <Input
                    value={formData.spectacleRxOsCylinder || ''}
                    onChange={(e) => setFormData({ ...formData, spectacleRxOsCylinder: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Axis</Label>
                  <Input
                    value={formData.spectacleRxOsAxis || ''}
                    onChange={(e) => setFormData({ ...formData, spectacleRxOsAxis: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Prism</Label>
              <Input
                value={formData.prism}
                onChange={(e) => setFormData({...formData, prism: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Add</Label>
              <Input
                value={formData.add}
                onChange={(e) => setFormData({...formData, add: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Tests */}
      <Card>
        <CardHeader className='bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-tl-2xl rounded-tr-2xl'>
          <CardTitle className="text-lg">Additional Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>AC/A Ratio</Label>
              <Input
                value={formData.acaRatio}
                onChange={(e) => setFormData({...formData, acaRatio: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Maddox Rod</Label>
              <Input
                value={formData.madoxRod}
                onChange={(e) => setFormData({...formData, madoxRod: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Worth 4 Dot</Label>
              <Input
                value={formData.word4dot}
                onChange={(e) => setFormData({...formData, word4dot: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Stereo</Label>
              <Input
                value={formData.stereo}
                onChange={(e) => setFormData({...formData, stereo: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
