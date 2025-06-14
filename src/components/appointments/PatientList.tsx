
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  User, 
  Phone, 
  Mail, 
  Search,
  Plus,
  Eye
} from 'lucide-react';
import { patients, Patient } from '@/data/patientMockData';
import PatientProfile from './PatientProfile';

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredPatients = patients.filter(patient => 
    patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.includes(searchTerm)
  );

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">รายชื่อผู้ป่วย</h2>
          <p className="text-gray-600">จัดการข้อมูลผู้ป่วยและการนัดหมาย</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มผู้ป่วยใหม่
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="ค้นหาผู้ป่วย (ชื่อ, เบอร์โทร, อีเมล, รหัสผู้ป่วย)"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Patient Grid */}
      <div className="grid gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{patient.fullName}</h3>
                    <p className="text-sm text-gray-600">
                      รหัส: {patient.id} • อายุ {patient.age} ปี • 
                      {patient.gender === 'male' ? ' ชาย' : patient.gender === 'female' ? ' หญิง' : ' อื่นๆ'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {patient.phone}
                      </span>
                      {patient.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {patient.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
                    {patient.status === 'active' ? 'ใช้งานอยู่' : 'ไม่ใช้งาน'}
                  </Badge>
                  <Dialog open={isDialogOpen && selectedPatient?.id === patient.id} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewPatient(patient)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        ดูข้อมูล
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>ข้อมูลผู้ป่วย</DialogTitle>
                      </DialogHeader>
                      {selectedPatient && (
                        <PatientProfile patient={selectedPatient} />
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Quick Medical Info */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">ประวัติการแพ้:</span>
                    <div className="mt-1">
                      {patient.medicalHistory.allergies.length > 0 ? (
                        patient.medicalHistory.allergies.map((allergy, index) => (
                          <Badge key={index} variant="outline" className="mr-1 mb-1 text-red-700 border-red-200">
                            {allergy}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-gray-500">ไม่มี</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">โรคประจำตัว:</span>
                    <div className="mt-1">
                      {patient.medicalHistory.chronicDiseases.length > 0 ? (
                        patient.medicalHistory.chronicDiseases.map((disease, index) => (
                          <Badge key={index} variant="outline" className="mr-1 mb-1 text-orange-700 border-orange-200">
                            {disease}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-gray-500">ไม่มี</span>
                      )}
                    </div>
                  </div>
                </div>
                {patient.lastVisitDate && (
                  <div className="mt-2">
                    <span className="text-gray-600">การมาครั้งล่าสุด:</span>
                    <span className="ml-2">{new Date(patient.lastVisitDate).toLocaleDateString('th-TH')}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">ไม่พบผู้ป่วย</h3>
            <p className="text-gray-500">ไม่มีผู้ป่วยที่ตรงกับคำค้นหา "{searchTerm}"</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientList;
