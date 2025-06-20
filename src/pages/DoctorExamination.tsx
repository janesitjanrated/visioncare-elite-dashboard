
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Clock, AlertCircle } from 'lucide-react';
import ExaminationForm from '@/components/doctor/ExaminationForm';
import { sessionManager } from '@/utils/sessionManager';
import { mockQueues, Queue, ExaminationForm as ExaminationFormType } from '@/data/doctorMockData';
import { useToast } from '@/hooks/use-toast';

const DoctorExamination = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [currentQueue, setCurrentQueue] = useState<Queue | null>(null);
  const [patient, setPatient] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const queueId = searchParams.get('queueId');

  useEffect(() => {
    if (queueId) {
      // Load queue data from session storage
      const queues = sessionManager.get<Queue[]>('queues') || mockQueues;
      const queue = queues.find(q => q.id === queueId);
      
      if (queue) {
        setCurrentQueue(queue);
        // Mock patient data based on queue
        setPatient({
          id: queue.patientId,
          fullName: queue.patientName,
          age: 35,
          gender: 'female',
          phone: '081-234-5678',
          address: {
            street: '123 ถนนพหลโยธิน แขวงสามเสนใน เขตพญาไท กรุงเทพมหานคร 10400'
          }
        });
      }
    }
  }, [queueId]);

  const handleSaveExamination = (data: ExaminationFormType) => {
    setIsLoading(true);
    
    // Save examination data to session storage
    const examinations = sessionManager.get<ExaminationFormType[]>('examinations') || [];
    examinations.push(data);
    sessionManager.set('examinations', examinations);

    // Update queue status to completed
    if (currentQueue) {
      const queues = sessionManager.get<Queue[]>('queues') || mockQueues;
      const updatedQueues = queues.map(queue => 
        queue.id === currentQueue.id 
          ? { ...queue, status: 'completed' as const }
          : queue
      );
      sessionManager.set('queues', updatedQueues);
    }

    toast({
      title: "บันทึกผลการตรวจสำเร็จ",
      description: "ข้อมูลการตรวจสายตาได้รับการบันทึกแล้ว",
    });

    setIsLoading(false);
    
    // Navigate back to queue
    navigate('/doctor/queue');
  };

  if (!currentQueue || !patient) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">ไม่พบข้อมูลผู้ป่วย</h3>
              <p className="text-gray-600 mb-4">กรุณาเลือกผู้ป่วยจากคิวก่อนเริ่มการตรวจ</p>
              <Button onClick={() => navigate('/doctor/queue')}>
                กลับไปที่คิว
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/doctor/queue')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับไปคิว
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ตรวจสายตา / วินิจฉัยโรค</h1>
            <p className="text-gray-600 mt-1">บันทึกผลการตรวจสายตาและวินิจฉัยโรค</p>
          </div>
        </div>
        <Badge variant="default" className="bg-blue-600">
          กำลังตรวจ
        </Badge>
      </div>

      {/* Patient Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            ข้อมูลผู้ป่วย
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">ชื่อ-นามสกุล</p>
              <p className="font-semibold">{patient.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">อายุ</p>
              <p className="font-semibold">{patient.age} ปี</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">เพศ</p>
              <p className="font-semibold">
                {patient.gender === 'male' ? 'ชาย' : patient.gender === 'female' ? 'หญิง' : 'อื่นๆ'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">เบอร์โทรศัพท์</p>
              <p className="font-semibold">{patient.phone}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600">ที่อยู่</p>
              <p className="font-semibold">{patient.address.street}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Queue Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-semibold">คิวที่ {currentQueue.id}</p>
                <p className="text-sm text-gray-600">
                  {currentQueue.appointmentType === 'walk-in' ? 'Walk-in' : 'นัดหมาย'} • 
                  เวลา {currentQueue.estimatedTime}
                </p>
              </div>
            </div>
            {currentQueue.notes && (
              <div className="text-right">
                <p className="text-sm text-gray-600">หมายเหตุ</p>
                <p className="font-semibold">{currentQueue.notes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Examination Form */}
      <ExaminationForm
        patient={patient}
        onSave={handleSaveExamination}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DoctorExamination;
