
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Eye, Activity, Stethoscope, FileText } from 'lucide-react';
import { ExaminationForm as ExaminationFormType } from '@/data/doctorMockData';

interface ExaminationFormProps {
  patient: any;
  initialData?: ExaminationFormType | null;
  onSave: (data: ExaminationFormType) => void;
  isLoading?: boolean;
}

const ExaminationForm: React.FC<ExaminationFormProps> = ({
  patient,
  initialData,
  onSave,
  isLoading = false
}) => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    defaultValues: initialData || {
      chiefComplaint: '',
      presentHistory: '',
      pastMedicalHistory: '',
      visualAcuity: {
        rightEye: { distance: '', near: '' },
        leftEye: { distance: '', near: '' }
      },
      refraction: {
        rightEye: { sphere: 0, cylinder: 0, axis: 0 },
        leftEye: { sphere: 0, cylinder: 0, axis: 0 }
      },
      functionalTest: {
        binocularVision: '',
        accommodation: '',
        convergence: ''
      },
      vergence: '',
      maddoxTest: '',
      phoria: '',
      iop: { rightEye: 0, leftEye: 0 },
      bloodPressure: { systolic: 0, diastolic: 0 },
      diagnosis: '',
      icd10Code: '',
      doctorAdvice: '',
      attachments: []
    }
  });

  const onSubmit = (data: any) => {
    const examinationData: ExaminationFormType = {
      id: initialData?.id || `EX${Date.now()}`,
      patientId: patient.id,
      patientInfo: {
        name: patient.fullName,
        age: patient.age,
        gender: patient.gender === 'male' ? 'ชาย' : patient.gender === 'female' ? 'หญิง' : 'อื่นๆ',
        phone: patient.phone,
        address: patient.address.street
      },
      ...data,
      create: new Date().toISOString(),
      doctorId: 'D001',
      doctorName: 'นพ.สมชาย รักษาดี'
    };
    
    onSave(examinationData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Chief Complaint & History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            อาการสำคัญและประวัติ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="chiefComplaint">อาการสำคัญที่มาพบแพทย์</Label>
            <Textarea
              id="chiefComplaint"
              {...register('chiefComplaint', { required: 'กรุณากรอกอาการสำคัญ' })}
              placeholder="อธิบายอาการที่ผู้ป่วยมาพบแพทย์"
              rows={3}
            />
            {errors.chiefComplaint && (
              <p className="text-sm text-red-500 mt-1">{errors.chiefComplaint.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="presentHistory">ประวัติอาการปัจจุบัน</Label>
            <Textarea
              id="presentHistory"
              {...register('presentHistory')}
              placeholder="รายละเอียดของอาการในปัจจุบัน"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="pastMedicalHistory">ประวัติการเจ็บป่วย</Label>
            <Textarea
              id="pastMedicalHistory"
              {...register('pastMedicalHistory')}
              placeholder="ประวัติโรคที่เคยเป็นมา, ยาที่แพ้, ผ่าตัดที่เคยทำ"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Visual Acuity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            ความคมชัดของสายตา (Visual Acuity)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">ตาขวา (OD)</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="rightEyeDistance">ดูไกล</Label>
                  <Input
                    id="rightEyeDistance"
                    {...register('visualAcuity.rightEye.distance')}
                    placeholder="เช่น 20/20, 6/6"
                  />
                </div>
                <div>
                  <Label htmlFor="rightEyeNear">ดูใกล้</Label>
                  <Input
                    id="rightEyeNear"
                    {...register('visualAcuity.rightEye.near')}
                    placeholder="เช่น J1, N5"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">ตาซ้าย (OS)</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="leftEyeDistance">ดูไกล</Label>
                  <Input
                    id="leftEyeDistance"
                    {...register('visualAcuity.leftEye.distance')}
                    placeholder="เช่น 20/20, 6/6"
                  />
                </div>
                <div>
                  <Label htmlFor="leftEyeNear">ดูใกล้</Label>
                  <Input
                    id="leftEyeNear"
                    {...register('visualAcuity.leftEye.near')}
                    placeholder="เช่น J1, N5"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Refraction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            การหักเหของแสง (Refraction)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">ตาขวา (OD)</h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="rightSphere">Sphere</Label>
                  <Input
                    id="rightSphere"
                    type="number"
                    step="0.25"
                    {...register('refraction.rightEye.sphere', { valueAsNumber: true })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="rightCylinder">Cylinder</Label>
                  <Input
                    id="rightCylinder"
                    type="number"
                    step="0.25"
                    {...register('refraction.rightEye.cylinder', { valueAsNumber: true })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="rightAxis">Axis</Label>
                  <Input
                    id="rightAxis"
                    type="number"
                    min="0"
                    max="180"
                    {...register('refraction.rightEye.axis', { valueAsNumber: true })}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">ตาซ้าย (OS)</h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="leftSphere">Sphere</Label>
                  <Input
                    id="leftSphere"
                    type="number"
                    step="0.25"
                    {...register('refraction.leftEye.sphere', { valueAsNumber: true })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="leftCylinder">Cylinder</Label>
                  <Input
                    id="leftCylinder"
                    type="number"
                    step="0.25"
                    {...register('refraction.leftEye.cylinder', { valueAsNumber: true })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="leftAxis">Axis</Label>
                  <Input
                    id="leftAxis"
                    type="number"
                    min="0"
                    max="180"
                    {...register('refraction.leftEye.axis', { valueAsNumber: true })}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Functional Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            การตรวจการทำงานของดวงตา
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="binocularVision">การมองเห็นสองตา</Label>
              <Input
                id="binocularVision"
                {...register('functionalTest.binocularVision')}
                placeholder="ปกติ/ผิดปกติ"
              />
            </div>
            <div>
              <Label htmlFor="accommodation">การปรับโฟกัส</Label>
              <Input
                id="accommodation"
                {...register('functionalTest.accommodation')}
                placeholder="ปกติ/ผิดปกติ"
              />
            </div>
            <div>
              <Label htmlFor="convergence">การบรรจบสายตา</Label>
              <Input
                id="convergence"
                {...register('functionalTest.convergence')}
                placeholder="ปกติ/ผิดปกติ"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="vergence">Vergence</Label>
              <Input
                id="vergence"
                {...register('vergence')}
                placeholder="BI/BO values"
              />
            </div>
            <div>
              <Label htmlFor="maddoxTest">Maddox Test</Label>
              <Input
                id="maddoxTest"
                {...register('maddoxTest')}
                placeholder="ผลการตรวจ"
              />
            </div>
            <div>
              <Label htmlFor="phoria">Phoria</Label>
              <Input
                id="phoria"
                {...register('phoria')}
                placeholder="Eso/Exo/Ortho"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* IOP & BP */}
      <Card>
        <CardHeader>
          <CardTitle>ความดันลูกตาและความดันโลหิต</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">ความดันลูกตา (IOP)</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="iopRight">ตาขวา (mmHg)</Label>
                  <Input
                    id="iopRight"
                    type="number"
                    {...register('iop.rightEye', { valueAsNumber: true })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="iopLeft">ตาซ้าย (mmHg)</Label>
                  <Input
                    id="iopLeft"
                    type="number"
                    {...register('iop.leftEye', { valueAsNumber: true })}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">ความดันโลหิต</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="systolic">Systolic</Label>
                  <Input
                    id="systolic"
                    type="number"
                    {...register('bloodPressure.systolic', { valueAsNumber: true })}
                    placeholder="120"
                  />
                </div>
                <div>
                  <Label htmlFor="diastolic">Diastolic</Label>
                  <Input
                    id="diastolic"
                    type="number"
                    {...register('bloodPressure.diastolic', { valueAsNumber: true })}
                    placeholder="80"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diagnosis & Treatment */}
      <Card>
        <CardHeader>
          <CardTitle>การวินิจฉัยและคำแนะนำ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="diagnosis">การวินิจฉัย</Label>
            <Textarea
              id="diagnosis"
              {...register('diagnosis', { required: 'กรุณากรอกการวินิจฉัย' })}
              placeholder="ระบุการวินิจฉัยโรค"
              rows={3}
            />
            {errors.diagnosis && (
              <p className="text-sm text-red-500 mt-1">{errors.diagnosis.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="icd10Code">รหัส ICD-10</Label>
            <Input
              id="icd10Code"
              {...register('icd10Code')}
              placeholder="เช่น H52.1"
            />
          </div>

          <div>
            <Label htmlFor="doctorAdvice">คำแนะนำแพทย์</Label>
            <Textarea
              id="doctorAdvice"
              {...register('doctorAdvice')}
              placeholder="คำแนะนำสำหรับผู้ป่วย"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          {isLoading ? 'กำลังบันทึก...' : 'บันทึกผลการตรวจ'}
        </Button>
      </div>
    </form>
  );
};

export default ExaminationForm;
