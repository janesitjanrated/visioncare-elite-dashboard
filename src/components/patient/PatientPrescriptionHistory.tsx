
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Calendar } from 'lucide-react';
import { Patient } from '@/services/patientDataService';

interface PatientPrescriptionHistoryProps {
  patient: Patient;
}

const PatientPrescriptionHistory: React.FC<PatientPrescriptionHistoryProps> = ({ patient }) => {
  return (
    <div className="space-y-6">
      {/* Current Prescription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            ค่าสายตาปัจจุบัน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-lg">ตาขวา (OD)</h4>
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sphere:</span>
                  <span className="font-semibold">{patient.currentPrescription.od.sphere}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cylinder:</span>
                  <span className="font-semibold">{patient.currentPrescription.od.cylinder}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Axis:</span>
                  <span className="font-semibold">{patient.currentPrescription.od.axis}°</span>
                </div>
                {patient.currentPrescription.od.add && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Add:</span>
                    <span className="font-semibold">{patient.currentPrescription.od.add}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium">ความคมชัดสายตา</h5>
                <div className="bg-gray-50 p-3 rounded space-y-1">
                  <p><span className="text-gray-600">Distance:</span> {patient.visualAcuity.od.distance}</p>
                  <p><span className="text-gray-600">Near:</span> {patient.visualAcuity.od.near}</p>
                  <p><span className="text-gray-600">With Correction:</span> {patient.visualAcuity.od.withCorrection}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-lg">ตาซ้าย (OS)</h4>
              <div className="bg-green-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sphere:</span>
                  <span className="font-semibold">{patient.currentPrescription.os.sphere}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cylinder:</span>
                  <span className="font-semibold">{patient.currentPrescription.os.cylinder}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Axis:</span>
                  <span className="font-semibold">{patient.currentPrescription.os.axis}°</span>
                </div>
                {patient.currentPrescription.os.add && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Add:</span>
                    <span class.="font-semibold">{patient.currentPrescription.os.add}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium">ความคมชัดสายตา</h5>
                <div className="bg-gray-50 p-3 rounded space-y-1">
                  <p><span className="text-gray-600">Distance:</span> {patient.visualAcuity.os.distance}</p>
                  <p><span className="text-gray-600">Near:</span> {patient.visualAcuity.os.near}</p>
                  <p><span className="text-gray-600">With Correction:</span> {patient.visualAcuity.os.withCorrection}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prescription History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            ประวัติค่าสายตา (เรียงจากล่าสุดไปเก่าสุด)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {patient.prescriptionHistory.length > 0 ? (
            <div className="space-y-4">
              {patient.prescriptionHistory.map((prescription, index) => (
                <div key={prescription.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">
                        {new Date(prescription.date).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </h4>
                      <p className="text-sm text-gray-600">แพทย์: {prescription.doctorName}</p>
                    </div>
                    {index === 0 && <Badge variant="secondary">ล่าสุด</Badge>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">ตาขวา (OD)</h5>
                      <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
                        <p>Sphere: <span className="font-semibold">{prescription.od.sphere}</span></p>
                        <p>Cylinder: <span className="font-semibold">{prescription.od.cylinder}</span></p>
                        <p>Axis: <span className="font-semibold">{prescription.od.axis}°</span></p>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">ตาซ้าย (OS)</h5>
                      <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
                        <p>Sphere: <span className="font-semibold">{prescription.os.sphere}</span></p>
                        <p>Cylinder: <span className="font-semibold">{prescription.os.cylinder}</span></p>
                        <p>Axis: <span className="font-semibold">{prescription.os.axis}°</span></p>
                      </div>
                    </div>
                  </div>

                  {prescription.notes && (
                    <div className="mt-3 p-3 bg-blue-50 rounded">
                      <p className="text-sm"><strong>หมายเหตุ:</strong> {prescription.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>ไม่มีประวัติค่าสายตา</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Vision Comparison Chart */}
      {patient.prescriptionHistory.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>แผนภูมิเปรียบเทียบค่าสายตา</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">การเปลี่ยนแปลงค่า Sphere</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>วันที่</TableHead>
                      <TableHead>OD Sphere</TableHead>
                      <TableHead>OS Sphere</TableHead>
                      <TableHead>การเปลี่ยนแปลง</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patient.prescriptionHistory.map((prescription, index) => {
                      const prevPrescription = patient.prescriptionHistory[index + 1];
                      const odChange = prevPrescription ? 
                        (parseFloat(prescription.od.sphere) - parseFloat(prevPrescription.od.sphere)).toFixed(2) : '-';
                      const osChange = prevPrescription ? 
                        (parseFloat(prescription.os.sphere) - parseFloat(prevPrescription.os.sphere)).toFixed(2) : '-';
                      
                      return (
                        <TableRow key={prescription.id}>
                          <TableCell>{new Date(prescription.date).toLocaleDateString('th-TH')}</TableCell>
                          <TableCell>{prescription.od.sphere}</TableCell>
                          <TableCell>{prescription.os.sphere}</TableCell>
                          <TableCell>
                            {odChange !== '-' && (
                              <div className="text-sm">
                                <span className={parseFloat(odChange) > 0 ? 'text-red-600' : 'text-green-600'}>
                                  OD: {odChange > 0 ? '+' : ''}{odChange}
                                </span>
                                <br />
                                <span className={parseFloat(osChange) > 0 ? 'text-red-600' : 'text-green-600'}>
                                  OS: {osChange > 0 ? '+' : ''}{osChange}
                                </span>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientPrescriptionHistory;
