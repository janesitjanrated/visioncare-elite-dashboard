
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Patient {
  id: string;
  name: string;
  time: string;
  doctor: string;
  department: string;
  status: 'รอตรวจ' | 'กำลังตรวจ' | 'ตรวจเสร็จ';
  isUrgent?: boolean;
}

const initialPatients: Patient[] = [
  {
    id: '1',
    name: 'นางสาว สมใจ ใจดี',
    time: '09:00',
    doctor: 'หมอ นพ.สมชาย รักษาดี',
    department: 'ตรวจตา: ตรวจทำซิลิก',
    status: 'รอตรวจ'
  },
  {
    id: '2',
    name: 'นาย วิชาญ มองไส',
    time: '09:30',
    doctor: 'หมอ นพ.สมชาย รักษาดี',
    department: 'ตรวจตา: ตรวจสา เท็มมาก',
    status: 'กำลังตรวจ',
    isUrgent: true
  }
];

export const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleStatusChange = (id: string, newStatus: Patient['status']) => {
    setPatients(prev => prev.map(patient => 
      patient.id === id ? { ...patient, status: newStatus } : patient
    ));
    toast({
      title: "อัพเดทสถานะสำเร็จ",
      description: `เปลี่ยนสถานะเป็น ${newStatus}`,
    });
  };

  const handleDelete = (id: string) => {
    setPatients(prev => prev.filter(patient => patient.id !== id));
    toast({
      title: "ลบข้อมูลสำเร็จ",
      description: "ลบข้อมูลผู้ป่วยเรียบร้อยแล้ว",
    });
  };

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'รอตรวจ': return 'bg-yellow-100 text-yellow-800';
      case 'กำลังตรวจ': return 'bg-blue-100 text-blue-800';
      case 'ตรวจเสร็จ': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">รายการคิววันนี้</h2>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          เพิ่มคิวใหม่
        </Button>
      </div>
      
      <div className="space-y-4">
        {patients.map((patient) => (
          <div key={patient.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-medium text-sm">
                    {patient.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">{patient.name}</h3>
                    {patient.isUrgent && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                        ด่วน
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    นัดหมาย • เวลา {patient.time} • {patient.doctor}
                  </p>
                  <p className="text-sm text-gray-500">
                    {patient.department}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                  {patient.status}
                </span>
                
                <div className="flex space-x-1">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleStatusChange(patient.id, 'กำลังตรวจ')}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    เริ่มตรวจ
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleStatusChange(patient.id, 'ตรวจเสร็จ')}
                    className="text-purple-600 border-purple-200 hover:bg-purple-50"
                  >
                    ตรวจสำเร็จ
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleStatusChange(patient.id, 'ตรวจเสร็จ')}
                    className="text-green-600 border-green-200 hover:bg-green-50"
                  >
                    ตรวจเสร็จ
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setEditingId(patient.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleDelete(patient.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
