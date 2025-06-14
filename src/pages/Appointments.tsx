
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
  MoreHorizontal
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Appointments = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock appointment data
  const appointments = [
    {
      id: 1,
      patientName: 'นางสาว สมใจ ใจดี',
      phone: '081-234-5678',
      email: 'somjai@email.com',
      doctor: 'นพ.สมชาย รักษาดี',
      time: '09:00',
      date: '2024-06-15',
      status: 'confirmed',
      service: 'ตรวจสายตา',
      notes: 'ตรวจตามนัด รีวิวแว่นใหม่'
    },
    {
      id: 2,
      patientName: 'นาย วิชาญ มองใส',
      phone: '082-345-6789',
      email: 'wichan@email.com',
      doctor: 'นพ.หญิง วิภาวดี ใสสะอาด',
      time: '10:30',
      date: '2024-06-15',
      status: 'waiting',
      service: 'ผ่าตัดต้อกระจก',
      notes: 'เตรียมการผ่าตัดสัปดาหน้า'
    },
    {
      id: 3,
      patientName: 'นางสาว มาลี ดูแล',
      phone: '083-456-7890',
      email: 'malee@email.com',
      doctor: 'นพ.สมชาย รักษาดี',
      time: '14:00',
      date: '2024-06-15',
      status: 'completed',
      service: 'ตรวจจอประสาทตา',
      notes: 'ผลตรวจปกติ นัดตรวจครั้งต่อไป 6 เดือน'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">ยืนยันแล้ว</Badge>;
      case 'waiting':
        return <Badge className="bg-yellow-100 text-yellow-800">รอตรวจ</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">เสร็จสิ้น</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">ยกเลิก</Badge>;
      default:
        return <Badge>ไม่ทราบสถานะ</Badge>;
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
      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{appointment.patientName}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {appointment.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {appointment.email}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{appointment.time}</span>
                    <Calendar className="h-4 w-4 text-gray-500 ml-2" />
                    <span>{appointment.date}</span>
                  </div>
                  {getStatusBadge(appointment.status)}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">แพทย์:</span>
                    <span className="ml-2 font-medium">{appointment.doctor}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">บริการ:</span>
                    <span className="ml-2 font-medium">{appointment.service}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-gray-600">หมายเหตุ:</span>
                  <span className="ml-2">{appointment.notes}</span>
                </div>
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
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>สร้างนัดหมายใหม่</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">ชื่อผู้ป่วย</label>
                    <input type="text" className="w-full p-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">เบอร์โทรศัพท์</label>
                    <input type="text" className="w-full p-2 border rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">อีเมล</label>
                  <input type="email" className="w-full p-2 border rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">วันที่</label>
                    <input type="date" className="w-full p-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">เวลา</label>
                    <input type="time" className="w-full p-2 border rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">แพทย์</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>นพ.สมชาย รักษาดี</option>
                    <option>นพ.หญิง วิภาวดี ใสสะอาด</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">บริการ</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>ตรวจสายตา</option>
                    <option>ผ่าตัดต้อกระจก</option>
                    <option>ตรวจจอประสาทตา</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">หมายเหตุ</label>
                  <textarea className="w-full p-2 border rounded-lg" rows={3}></textarea>
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
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
        <p className="text-gray-600 mt-1">จัดการนัดหมายผู้ป่วยและตารางแพทย์</p>
      </div>

      {renderContent()}
    </div>
  );
};

export default Appointments;
