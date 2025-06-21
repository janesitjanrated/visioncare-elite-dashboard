
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Search, Filter, Eye, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PatientDetailsPopup from '@/components/patient/PatientDetailsPopup';
import { patientDataService, Patient } from '@/services/patientDataService';
import { useToast } from '@/hooks/use-toast';

const PatientData = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setIsLoading(true);
      const data = await patientDataService.getPatients();
      setPatients(data);
    } catch (error) {
      console.error('Error loading patients:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดข้อมูลผู้ป่วยได้",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDetailOpen(true);
  };

  const filteredPatients = patients.filter(patient =>
    patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'follow-up':
        return <Badge variant="destructive">ต้องติดตาม</Badge>;
      case 'normal':
        return <Badge variant="secondary">ปกติ</Badge>;
      case 'urgent':
        return <Badge variant="destructive" className="bg-red-600">เร่งด่วน</Badge>;
      default:
        return <Badge variant="secondary">ปกติ</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">รายชื่อข้อมูลคนไข้</h1>
          <p className="text-gray-600 mt-1">จัดการข้อมูลและประวัติการรักษาของผู้ป่วย</p>
        </div>
        <div className="flex items-center space-x-4">
          <Users className="h-8 w-8 text-blue-600" />
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">{patients.length}</p>
            <p className="text-sm text-gray-600">ผู้ป่วยทั้งหมด</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ค้นหาด้วยชื่อหรือรหัสผู้ป่วย..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              กรองข้อมูล
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patient List Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายชื่อผู้ป่วย</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">กำลังโหลดข้อมูล...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>รหัสผู้ป่วย</TableHead>
                  <TableHead>ชื่อผู้ป่วย</TableHead>
                  <TableHead>ค่าสายตาที่จ่าย</TableHead>
                  <TableHead>Comment หมอ</TableHead>
                  <TableHead>วันที่มาล่าสุด</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-center">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>{patient.fullName}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-semibold">OD: {patient.currentPrescription.od.sphere}/{patient.currentPrescription.od.cylinder}</p>
                        <p className="font-semibold">OS: {patient.currentPrescription.os.sphere}/{patient.currentPrescription.os.cylinder}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600 max-w-xs truncate">
                        {patient.doctorComment || '-'}
                      </p>
                    </TableCell>
                    <TableCell>{new Date(patient.lastVisitDate).toLocaleDateString('th-TH')}</TableCell>
                    <TableCell>{getStatusBadge(patient.followUpStatus)}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        onClick={() => handleViewPatient(patient)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        จัดการ
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {!isLoading && filteredPatients.length === 0 && (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">ไม่พบข้อมูลผู้ป่วย</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Patient Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>ข้อมูลผู้ป่วย - {selectedPatient?.fullName}</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <PatientDetailsPopup
              patient={selectedPatient}
              onClose={() => setIsDetailOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientData;
