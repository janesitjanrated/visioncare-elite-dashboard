import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';


// Import section components
import { PatientInfoSection } from './exam-form/PatientInfoSection';
import { ChiefComplaintSection } from './exam-form/ChiefComplaintSection';
import { POHxSection } from './exam-form/POHxSection';
import { MedicalHistorySection } from './exam-form/MedicalHistorySection';
import { VisualAcuitySection } from './exam-form/VisualAcuitySection';
import { PreliminaryExamSection } from './exam-form/PreliminaryExamSection';
import { RefractionSection } from './exam-form/RefractionSection';
import { FunctionalVergenceSection } from './exam-form/FunctionalVergenceSection';
import { IOPSection } from './exam-form/IOPSection';
import { FittingParameterSection } from './exam-form/FittingParameterSection';
import { SlitLampSection } from './exam-form/SlitLampSection';
import { FundusExamSection } from './exam-form/FundusExamSection';
import { DiagnosisSection } from './exam-form/DiagnosisSection';

interface PatientRecord {
  id: string;
  name: string;
  idCard: string;
  phone: string;
  age: number;
  lastVisit: string;
  diagnosis: string;
  status: 'active' | 'inactive';
}

interface MedicalExamFormProps {
  patient?: PatientRecord;
  onClose: () => void;
}

export const MedicalExamForm = ({ patient, onClose }: MedicalExamFormProps) => {
  const [examDate, setExamDate] = useState<Date>();
  const [formData, setFormData] = useState({
    // Patient Info
    patientName: patient?.name || '',
    age: patient?.age?.toString() || '',
    gender: '',
    hn: '',
    
    // Chief Complaint
    chiefComplaint1: '',
    chiefComplaint2: '',
    
    // Medical History
    contactLens: false,
    glasses: false,
    
    // POHx
    pohxDetails: '',
    pohxDuration: '',
    pohxOther: '',
    
    // Checkboxes for conditions
    cl: false,
    trauma: false,
    glasses_checkbox: false,
    floater: false,
    surgery: false,
    flash: false,
    injury: false,
    inflammation: false,
    infection: false,
    
    // HA/Diplopia ; FOLDDARQ
    ha: '',
    diplopia: '',
    
    // PMHx
    pmhxDetails: '',
    pmhxDuration: '',
    
    // KEA/KMA
    kea: '',
    med: '',
    
    // Medical conditions checkboxes
    self: false,
    ros: false,
    family: false,
    glaucoma: false,
    dm: false,
    htn: false,
    thyroid: false,
    
    // SHx
    alcohol: '',
    smoke: '',
    occupation: '',
    
    // Visual Acuity
    vasc: { od: '', os: '' },
    vacc: { od: '', os: '' },
    vanear: { od: '', os: '' },
    vaph: { od: '', os: '' },
    
    // PD
    pdR: '',
    pdL: '',
    pdTotal: '',
    
    // Preliminary Examination
    version: '',
    duction: '',
    confrontationVF: '',
    coverTest: '',
    npc: '',
    npa: '',
    stereopsis: '',
    stereopsisType: '',
    colorVision: '',
    colorVisionType: '',
    amsler: '',
    vf: '',
    vfType: '',
    
    // DNEye Scan
    dneOd: '',
    dneOs: '',
    dneOdSphere: '',
    dneOdCylinder: '',
    dneOdAxis: '',
    dneOsSphere: '',
    dneOsCylinder: '',
    dneOsAxis: '',
    
    // Keratometry
    keratometryOd: '',
    keratometryOs: '',
    keratometryOdSphere: '',
    keratometryOdCylinder: '',
    keratometryOdAxis: '',
    keratometryOsSphere: '',
    keratometryOsCylinder: '',
    keratometryOsAxis: '',
    
    // Pupil
    pupilOdPhoto: '',
    pupilOdMeso: '',
    pupilOsPhoto: '',
    pupilOsMeso: '',
    
    // Refraction - Functional ; Vergence and Accom
    nra: '',
    pra: '',
    bcc: '',
    relyOn: '',
    
    // Fitting Parameter
    fittingParameterPd: '',
    fittingParameterFh: '',
    ffa: '',
    pt: '',
    cvd: '',
    frame: '',
    lens: '',
    
    // Retino
    retinoOd: '',
    retinoOs: '',
    monoSubOd: '',
    monoSubOs: '',
    bvaOd: '',
    bvaOs: '',
    
    // Functional ; Vergence and Accommodation Distant
    test6m: {
      horzPhoria: '',
      vergenceBi: '',
      vergenceBo: '',
      vertPhoria: '',
      bdResSup: '',
      buResInf: ''
    },
    test40cm: {
      horzPhoria: '',
      vergenceBi: '',
      vergenceBo: '',
      vertPhoria: '',
      bdResSup: '',
      buResInf: ''
    },
    
    // Spectacle Rx
    spectacleRxOd: '',
    spectacleRxOs: '',
    prism: '',
    add: '',
    
    // Additional Tests
    acaRatio: '',
    madoxRod: '',
    word4dot: '',
    stereo: '',
    
    // Additional Info
    iopMethod: '',
    time: '',
    od: '',
    mmhg: '',
    bp: '',
    
    // Slit Lamp Examination
    slitLampOdLids: '',
    slitLampOdConjunctiva: '',
    slitLampOdCornea: '',
    slitLampOdAc: '',
    slitLampOdIris: '',
    slitLampOdLens: '',
    slitLampOdVitreous: '',
    slitLampOsLids: '',
    slitLampOsConjunctiva: '',
    slitLampOsCornea: '',
    slitLampOsAc: '',
    slitLampOsIris: '',
    slitLampOsLens: '',
    slitLampOsVitreous: '',
    
    // Fundus Examination
    fundusOdOpticDisc: '',
    fundusOdMacula: '',
    fundusOdVessels: '',
    fundusOdPeriphery: '',
    fundusOsOpticDisc: '',
    fundusOsMacula: '',
    fundusOsVessels: '',
    fundusOsPeriphery: '',
    
    // CDR (Cup to Disc Ratio)
    cdrOd: '',
    cdrOs: '',
    
    // Diagnosis
    diagnosis: '',
    plan: '',
    nextVisit: '',
    
    // Doctor Comment
    doctorComment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Medical exam form submitted:', { examDate, patient, ...formData });
    onClose();
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>ฟอร์มตรวจสายตา - Medical Examination Form</DialogTitle>
          {patient && (
            <p className="text-sm text-gray-600">ผู้ป่วย: {patient.name}</p>
          )}
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date */}
          
          {/* Chief Complaint Section */}
          <ChiefComplaintSection 
            formData={formData} 
            setFormData={setFormData} 
            handleCheckboxChange={handleCheckboxChange}
          />

          {/* POHx Section */}
          <POHxSection 
            formData={formData} 
            setFormData={setFormData} 
            handleCheckboxChange={handleCheckboxChange}
          />

          {/* Medical History Sections */}
          <MedicalHistorySection 
            formData={formData} 
            setFormData={setFormData} 
            handleCheckboxChange={handleCheckboxChange}
          />

          {/* Visual Acuity + PD Section */}
          <Card>
            <CardHeader className='bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-tl-2xl rounded-tr-2xl'>
              <CardTitle className="text-lg">Visual Acuity & PD</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6 items-start w-full">
              <div className="flex flex-col gap-4 w-full md:w-64">
                  <div className="font-semibold mb-2">PD (Pupillary Distance)</div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Label className="w-12">R</Label>
                      <Input
                        value={formData.pdR}
                        onChange={(e) => setFormData({ ...formData, pdR: e.target.value })}
                        placeholder="PD ขวา"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="w-12">L</Label>
                      <Input
                        value={formData.pdL}
                        onChange={(e) => setFormData({ ...formData, pdL: e.target.value })}
                        placeholder="PD ซ้าย"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="w-12">รวม</Label>
                      <Input
                        value={formData.pdTotal}
                        onChange={(e) => setFormData({ ...formData, pdTotal: e.target.value })}
                        placeholder="PD รวม"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <VisualAcuitySection formData={formData} setFormData={setFormData} />
                </div>
                
              </div>
            </CardContent>
          </Card>

          {/* Preliminary Examination + DNEye Scan Section */}
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex-1 min-w-0">
              <PreliminaryExamSection formData={formData} setFormData={setFormData} />
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-6">
              {/* DNEye Scan Card เฉพาะส่วนนี้ */}
              <Card>
                <CardHeader className='bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-tl-2xl rounded-tr-2xl'>
                  <CardTitle className="text-lg">DNEye Scan</CardTitle>
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
                            value={formData.dneOdSphere || ''}
                            onChange={(e) => setFormData({ ...formData, dneOdSphere: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Cylinder</Label>
                          <Input
                            value={formData.dneOdCylinder || ''}
                            onChange={(e) => setFormData({ ...formData, dneOdCylinder: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Axis</Label>
                          <Input
                            value={formData.dneOdAxis || ''}
                            onChange={(e) => setFormData({ ...formData, dneOdAxis: e.target.value })}
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
                            value={formData.dneOsSphere || ''}
                            onChange={(e) => setFormData({ ...formData, dneOsSphere: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Cylinder</Label>
                          <Input
                            value={formData.dneOsCylinder || ''}
                            onChange={(e) => setFormData({ ...formData, dneOsCylinder: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Axis</Label>
                          <Input
                            value={formData.dneOsAxis || ''}
                            onChange={(e) => setFormData({ ...formData, dneOsAxis: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Keratometry Card */}
              <Card>
                <CardHeader className='bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-tl-2xl rounded-tr-2xl'>
                  <CardTitle className="text-lg">Keratometry</CardTitle>
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
                            value={formData.keratometryOdSphere || ''}
                            onChange={(e) => setFormData({ ...formData, keratometryOdSphere: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Cylinder</Label>
                          <Input
                            value={formData.keratometryOdCylinder || ''}
                            onChange={(e) => setFormData({ ...formData, keratometryOdCylinder: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Axis</Label>
                          <Input
                            value={formData.keratometryOdAxis || ''}
                            onChange={(e) => setFormData({ ...formData, keratometryOdAxis: e.target.value })}
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
                            value={formData.keratometryOsSphere || ''}
                            onChange={(e) => setFormData({ ...formData, keratometryOsSphere: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Cylinder</Label>
                          <Input
                            value={formData.keratometryOsCylinder || ''}
                            onChange={(e) => setFormData({ ...formData, keratometryOsCylinder: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Axis</Label>
                          <Input
                            value={formData.keratometryOsAxis || ''}
                            onChange={(e) => setFormData({ ...formData, keratometryOsAxis: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Pupil Card */}
              <Card>
                <CardHeader className='bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-tl-2xl rounded-tr-2xl'>
                  <CardTitle className="text-lg">Pupil</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <h4 className="font-medium">OD</h4>
                      <div className="space-y-2">
                        <Label>Photo</Label>
                        <Input
                          value={formData.pupilOdPhoto}
                          onChange={(e) => setFormData({...formData, pupilOdPhoto: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Meso</Label>
                        <Input
                          value={formData.pupilOdMeso}
                          onChange={(e) => setFormData({...formData, pupilOdMeso: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">OS</h4>
                      <div className="space-y-2">
                        <Label>Photo</Label>
                        <Input
                          value={formData.pupilOsPhoto}
                          onChange={(e) => setFormData({...formData, pupilOsPhoto: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Meso</Label>
                        <Input
                          value={formData.pupilOsMeso}
                          onChange={(e) => setFormData({...formData, pupilOsMeso: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Refraction Sections */}
          <RefractionSection formData={formData} setFormData={setFormData} />

          {/* Functional Vergence Sections */}
          <FunctionalVergenceSection formData={formData} setFormData={setFormData} />

          {/* IOP Section */}
          <IOPSection formData={formData} setFormData={setFormData} />

          {/* Fitting Parameter Section */}
          <FittingParameterSection formData={formData} setFormData={setFormData} />

          {/* Slit Lamp Examination */}
          <SlitLampSection formData={formData} setFormData={setFormData} />

          {/* Fundus Examination */}
          <FundusExamSection formData={formData} setFormData={setFormData} />

          {/* Diagnosis Section */}
          <DiagnosisSection formData={formData} setFormData={setFormData} />

          {/* Doctor Comment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Doctor Comment</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="ความเห็นของแพทย์..."
                value={formData.doctorComment}
                onChange={(e) => setFormData({...formData, doctorComment: e.target.value})}
                rows={4}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              ยกเลิก
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              บันทึกผลการตรวจ
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
