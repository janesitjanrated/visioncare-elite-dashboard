
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Phone, Mail, MapPin, Calendar, Eye } from 'lucide-react';
import { Patient } from '@/services/patientDataService';

interface PatientGeneralInfoProps {
  patient: Patient;
}

const PatientGeneralInfo: React.FC<PatientGeneralInfoProps> = ({ patient }) => {
  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'male': return 'ชาย';
      case 'female': return 'หญิง';
      default: return 'อื่นๆ';
    }
  };

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
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            ข้อมูลพื้นฐาน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">รหัสผู้ป่วย</p>
              <p className="font-semibold">{patient.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">ชื่อ-นามสกุล</p>
              <p className="font-semibold">{patient.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">วันเกิด</p>
              <p className="font-semibold">{new Date(patient.dateOfBirth).toLocaleDateString('th-TH')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">อายุ</p>
              <p className="font-semibold">{patient.age} ปี</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">เพศ</p>
              <p className="font-semibold">{getGenderText(patient.gender)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">สถานะติดตาม</p>
              {getStatusBadge(patient.followUpStatus)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="h-5 w-5 mr-2" />
            ข้อมูลติดต่อ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{patient.phone}</span>
            </div>
            {patient.email && (
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{patient.email}</span>
              </div>
            )}
            <div className="flex items-start space-x-3">
              <MapPin className="h-4 w-4 text-gray-500 mt-1" />
              <div>
                <p>{patient.address.street}</p>
                <p>{patient.address.district} {patient.address.province} {patient.address.postalCode}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Prescription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            ค่าสายตาปัจจุบัน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">ตาขวา (OD)</h4>
              <div className="bg-gray-50 p-3 rounded">
                <p>Sphere: {patient.currentPrescription.od.sphere}</p>
                <p>Cylinder: {patient.currentPrescription.od.cylinder}</p>
                <p>Axis: {patient.currentPrescription.od.axis}</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">ตาซ้าย (OS)</h4>
              <div className="bg-gray-50 p-3 rounded">
                <p>Sphere: {patient.currentPrescription.os.sphere}</p>
                <p>Cylinder: {patient.currentPrescription.os.cylinder}</p>
                <p>Axis: {patient.currentPrescription.os.axis}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visual Acuity */}
      <Card>
        <CardHeader>
          <CardTitle>ความคมชัดของสายตา</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">ตาขวา (OD)</h4>
              <div className="bg-gray-50 p-3 rounded">
                <p>Distance: {patient.visualAcuity.od.distance}</p>
                <p>Near: {patient.visualAcuity.od.near}</p>
                <p>With Correction: {patient.visualAcuity.od.withCorrection}</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">ตาซ้าย (OS)</h4>
              <div className="bg-gray-50 p-3 rounded">
                <p>Distance: {patient.visualAcuity.os.distance}</p>
                <p>Near: {patient.visualAcuity.os.near}</p>
                <p>With Correction: {patient.visualAcuity.os.withCorrection}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Doctor's Comment */}
      <Card>
        <CardHeader>
          <CardTitle>ความเห็นแพทย์</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded">
            <p className="text-gray-800">{patient.doctorComment}</p>
            <p className="text-sm text-gray-600 mt-2">
              วันที่มาล่าสุด: {new Date(patient.lastVisitDate).toLocaleDateString('th-TH')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientGeneralInfo;
