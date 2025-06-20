
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Eye, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ExaminationForm from '@/components/doctor/ExaminationForm';
import { ExaminationForm as ExaminationFormType } from '@/data/doctorMockData';
import { sessionManager } from '@/utils/sessionManager';
import { patients } from '@/data/patientMockData';

const DoctorExamination = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const patientId = searchParams.get('patientId');
  const queueId = searchParams.get('queueId');
  
  const [patient, setPatient] = useState(null);
  const [examinationForm, setExaminationForm] = useState<ExaminationFormType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (patientId) {
      const foundPatient = patients.find(p => p.id === patientId);
      setPatient(foundPatient);
      
      // Check if examination already exists in session
      const existingExamination = sessionManager.get(`examination_${patientId}`);
      if (existingExamination) {
        setExaminationForm(existingExamination);
      }
    }
  }, [patientId]);

  const handleSaveExamination = async (formData: ExaminationFormType) => {
    setIsLoading(true);
    
    try {
      // Save to session storage
      sessionManager.set(`examination_${patientId}`, formData);
      
      // Update queue status if queueId exists
      if (queueId) {
        const queues = sessionManager.get('doctorQueues') || [];
        const updatedQueues = queues.map(q => 
          q.id === queueId 
            ? { ...q, status: 'completed', actualTime: new Date().toLocaleTimeString('th-TH', { hour12: false }) }
            : q
        );
        sessionManager.set('doctorQueues', updatedQueues);
      }
      
      toast({
        title: "บันทึกแล้ว",
        description: "บันทึกผลการตรวจสายตาเรียบร้อยแล้ว",
      });
      
      navigate('/doctor/queue');
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถบันทึกข้อมูลได้",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!patient) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <p className="text-gray-500">ไม่พบข้อมูลผู้ป่วย</p>
          <Button onClick={() => navigate('/doctor/queue')} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับไปหน้าคิว
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/doctor/queue')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            กลับ
          </Button>
          <div className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-teal-600" />
            <h1 className="text-2xl font-bold text-gray-900">ตรวจสายตา / วินิจฉัยโรค</h1>
          </div>
        </div>
      </div>

      {/* Patient Info Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            ข้อมูลผู้ป่วย
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">ชื่อ-นามสกุล</p>
              <p className="font-medium">{patient.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">อายุ</p>
              <p className="font-medium">{patient.age} ปี</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">เพศ</p>
              <p className="font-medium">
                {patient.gender === 'male' ? 'ชาย' : patient.gender === 'female' ? 'หญิง' : 'อื่นๆ'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">โทรศัพท์</p>
              <p className="font-medium">{patient.phone}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">ที่อยู่</p>
              <p className="font-medium">{patient.address.street}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Examination Form */}
      <ExaminationForm
        patient={patient}
        initialData={examinationForm}
        onSave={handleSaveExamination}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DoctorExamination;
