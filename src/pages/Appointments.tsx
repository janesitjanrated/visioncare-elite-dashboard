import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  MapPin,
  FileText,
  CreditCard,
  Heart
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { appointments, patients } from '@/data/patientMockData';
import { branches } from '@/data/branchMockData';

const Appointments = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">ยืนยันแล้ว</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800">จองแล้ว</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800">กำลังตรวจ</Badge>;
      case 'completed':
        return <Badge className="bg-emerald-100 text-emerald-800">เสร็จสิ้น</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">ยกเลิก</Badge>;
      case 'no-show':
        return <Badge className="bg-gray-100 text-gray-800">ไม่มาตามนัด</Badge>;
      default:
        return <Badge>ไม่ทราบสถานะ</Badge>;
    }
  };

  const getPaymentStatusBadge = (status?: string) => {
    if (!status) return null;
    
    switch (status) {
      case 'paid':
        return <Badge variant="outline" className="text-green-700 border-green-200">ชำระแล้ว</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-yellow-700 border-yellow-200">รอชำระ</Badge>;
      case 'partial':
        return <Badge variant="outline" className="text-orange-700 border-orange-200">ชำระบางส่วน</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="text-red-700 border-red-200">ยกเลิกการชำระ</Badge>;
      default:
        return null;
    }
  };

  const renderAppointmentList = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาผู้ป่วย, แพทย์, หรือบริการ..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          ตัวกรอง
        </Button>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          นัดหมายใหม่
        </Button>
      </div>

      {/* Appointments Grid */}
      <div className="grid gap-6">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{appointment.patient.fullName}</h3>
                    <p className="text-sm text-gray-600">อายุ {appointment.patient.age} ปี • {appointment.patient.gender === 'male' ? 'ชาย' : 'หญิง'}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {appointment.patient.phone}
                      </span>
                      {appointment.patient.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {appointment.patient.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{appointment.appointmentTime}</span>
                    <Calendar className="h-4 w-4 text-gray-500 ml-2" />
                    <span>{new Date(appointment.appointmentDate).toLocaleDateString('th-TH')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(appointment.status)}
                    {getPaymentStatusBadge(appointment.paymentStatus)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-600 text-sm">แพทย์:</span>
                    <span className="ml-2 font-medium">{appointment.doctorName}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">บริการ:</span>
                    <span className="ml-2 font-medium">{appointment.serviceType}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">สาขา:</span>
                    <span className="ml-2">{appointment.branchName}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-600 text-sm">ระยะเวลา:</span>
                    <span className="ml-2">{appointment.duration} นาที</span>
                  </div>
                  {appointment.cost && (
                    <div>
                      <span className="text-gray-600 text-sm">ค่าใช้จ่าย:</span>
                      <span className="ml-2 font-medium">{appointment.cost.toLocaleString()} บาท</span>
                    </div>
                  )}
                  {appointment.followUpRequired && (
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-600">ต้องติดตาม</span>
                      {appointment.followUpDate && (
                        <span className="text-sm text-gray-600">
                          ({new Date(appointment.followUpDate).toLocaleDateString('th-TH')})
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Patient Medical Info */}
              <div className="pt-4 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">ประวัติการแพ้:</span>
                    <div className="mt-1">
                      {appointment.patient.medicalHistory.allergies.length > 0 ? (
                        appointment.patient.medicalHistory.allergies.map((allergy, index) => (
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
                      {appointment.patient.medicalHistory.chronicDiseases.length > 0 ? (
                        appointment.patient.medicalHistory.chronicDiseases.map((disease, index) => (
                          <Badge key={index} variant="outline" className="mr-1 mb-1 text-orange-700 border-orange-200">
                            {disease}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-gray-500">ไม่มี</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">ผู้ติดต่อฉุกเฉิน:</span>
                    <div className="mt-1">
                      <p className="font-medium">{appointment.patient.emergencyContact.name}</p>
                      <p className="text-gray-600">{appointment.patient.emergencyContact.relationship} • {appointment.patient.emergencyContact.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-gray-600">เหตุผลการนัด:</span>
                  <span className="ml-2">{appointment.reason}</span>
                </div>
                {appointment.notes && (
                  <div className="mt-2">
                    <span className="text-gray-600">หมายเหตุ:</span>
                    <span className="ml-2">{appointment.notes}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (location.pathname) {
      case '/appointments/create':
        return (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>สร้างนัดหมายใหม่</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Patient Information Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">ข้อมูลผู้ป่วย</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">ชื่อ</label>
                      <input type="text" className="w-full p-2 border rounded-lg" placeholder="ชื่อจริง" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">นามสกุล</label>
                      <input type="text" className="w-full p-2 border rounded-lg" placeholder="นามสกุล" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">วันเกิด</label>
                      <input type="date" className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">เพศ</label>
                      <select className="w-full p-2 border rounded-lg">
                        <option value="">เลือกเพศ</option>
                        <option value="male">ชาย</option>
                        <option value="female">หญิง</option>
                        <option value="other">อื่นๆ</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">เบอร์โทรศัพท์</label>
                      <input type="tel" className="w-full p-2 border rounded-lg" placeholder="0XX-XXX-XXXX" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">อีเมล</label>
                      <input type="email" className="w-full p-2 border rounded-lg" placeholder="example@email.com" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">ที่อยู่</label>
                    <textarea className="w-full p-2 border rounded-lg" rows={2} placeholder="ที่อยู่ผู้ป่วย"></textarea>
                  </div>
                </div>

                {/* Emergency Contact Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">ผู้ติดต่อฉุกเฉิน</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">ชื่อผู้ติดต่อ</label>
                      <input type="text" className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">ความสัมพันธ์</label>
                      <input type="text" className="w-full p-2 border rounded-lg" placeholder="เช่น พ่อ แม่ สามี ภรรยา" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">เบอร์โทรศัพท์</label>
                      <input type="tel" className="w-full p-2 border rounded-lg" />
                    </div>
                  </div>
                </div>

                {/* Medical History Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">ประวัติการรักษา</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">ประวัติการแพ้ยา/อาหาร</label>
                      <textarea className="w-full p-2 border rounded-lg" rows={3} placeholder="ระบุสิ่งที่แพ้ (ถ้ามี)"></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">โรคประจำตัว</label>
                      <textarea className="w-full p-2 border rounded-lg" rows={3} placeholder="ระบุโรคประจำตัว (ถ้ามี)"></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">ยาที่ใช้ประจำ</label>
                      <textarea className="w-full p-2 border rounded-lg" rows={2} placeholder="ระบุยาที่ใช้ประจำ (ถ้ามี)"></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">กรุ๊ปเลือด</label>
                      <select className="w-full p-2 border rounded-lg">
                        <option value="">เลือกกรุ๊ปเลือด</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Appointment Details Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">รายละเอียดการนัดหมาย</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">วันที่</label>
                      <input type="date" className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">เวลา</label>
                      <input type="time" className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">สาขา</label>
                      <select className="w-full p-2 border rounded-lg">
                        <option value="">เลือกสาขา</option>
                        {branches.map((branch) => (
                          <option key={branch.id} value={branch.id}>{branch.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">แพทย์</label>
                      <select className="w-full p-2 border rounded-lg">
                        <option value="">เลือกแพทย์</option>
                        <option value="D001">นพ.สมชาย รักษาดี</option>
                        <option value="D002">นพ.หญิง วิภาวดี ใสสะอาด</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">บริการ</label>
                      <select className="w-full p-2 border rounded-lg">
                        <option value="">เลือกบริการ</option>
                        <option value="general">ตรวจสายตาทั่วไป</option>
                        <option value="cataract">ผ่าตัดต้อกระจก</option>
                        <option value="retina">ตรวจจอประสาทตา</option>
                        <option value="glasses">จัดแว่นตา</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">ระยะเวลา (นาที)</label>
                      <input type="number" className="w-full p-2 border rounded-lg" placeholder="30" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">เหตุผลการนัด</label>
                    <textarea className="w-full p-2 border rounded-lg" rows={2} placeholder="อาการหรือเหตุผลที่ต้องมาตรวจ"></textarea>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">หมายเหตุ</label>
                    <textarea className="w-full p-2 border rounded-lg" rows={3} placeholder="หมายเหตุเพิ่มเติม"></textarea>
                  </div>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-3">
                  บันทึกนัดหมาย
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return renderAppointmentList();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">ระบบนัดหมาย</h1>
        <p className="text-gray-600 mt-1">จัดการนัดหมายผู้ป่วยและข้อมูลการรักษา</p>
      </div>

      {renderContent()}
    </div>
  );
};

export default Appointments;
