import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Search, Edit, Trash2, Eye, Plus } from 'lucide-react';
import { PatientDetailView } from '@/components/PatientDetailView';
import { usePatients, Patient } from '@/hooks/usePatients';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Patients = () => {
  const { patients, loading, createPatient, deletePatient } = usePatients();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    address: ''
  });

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (patient.phone && patient.phone.includes(searchTerm))
  );

  const handleDelete = async (id: number) => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบข้อมูลผู้ป่วยนี้?')) {
      await deletePatient(id);
    }
  };

  const handleView = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleCreatePatient = async () => {
    if (!newPatient.name.trim()) return;

    const patientData = {
      name: newPatient.name,
      email: newPatient.email || undefined,
      phone: newPatient.phone || undefined,
      date_of_birth: newPatient.date_of_birth || undefined,
      address: newPatient.address || undefined,
    };

    const { error } = await createPatient(patientData);
    if (!error) {
      setNewPatient({
        name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        address: ''
      });
      setShowCreateDialog(false);
    }
  };

  if (selectedPatient) {
    return (
      <PatientDetailView 
        patient={selectedPatient} 
        onBack={() => setSelectedPatient(null)} 
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">รายชื่อคนไข้</h2>
                <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      <Plus className="w-4 h-4 mr-2" />
                      เพิ่มผู้ป่วยใหม่
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>เพิ่มผู้ป่วยใหม่</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>ชื่อ-นามสกุล *</Label>
                        <Input
                          value={newPatient.name}
                          onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                          placeholder="กรอกชื่อ-นามสกุล"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>อีเมล</Label>
                        <Input
                          type="email"
                          value={newPatient.email}
                          onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                          placeholder="กรอกอีเมล"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>เบอร์โทรศัพท์</Label>
                        <Input
                          value={newPatient.phone}
                          onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                          placeholder="กรอกเบอร์โทรศัพท์"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>วันเกิด</Label>
                        <Input
                          type="date"
                          value={newPatient.date_of_birth ? newPatient.date_of_birth.slice(0, 10) : ""}
                          onChange={(e) => setNewPatient({...newPatient, date_of_birth: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>ที่อยู่</Label>
                        <Input
                          value={newPatient.address}
                          onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                          placeholder="กรอกที่อยู่"
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                          ยกเลิก
                        </Button>
                        <Button onClick={handleCreatePatient} className="bg-emerald-600 hover:bg-emerald-700">
                          บันทึก
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="ค้นหาด้วยชื่อหรือเบอร์โทร..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ผู้ป่วย
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      อีเมล
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      เบอร์โทร
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      วันเกิด
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      วันที่สร้าง
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      จัดการ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {patient.email || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {patient.phone || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {patient.date_of_birth ? new Date(patient.date_of_birth).toLocaleDateString('th-TH') : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(patient.created_at).toLocaleDateString('th-TH')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleView(patient)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(patient.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredPatients.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {searchTerm ? 'ไม่พบข้อมูลผู้ป่วยที่ค้นหา' : 'ยังไม่มีข้อมูลผู้ป่วย'}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Patients;
