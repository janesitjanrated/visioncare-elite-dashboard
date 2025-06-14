
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserPlus, 
  Calendar, 
  FileText, 
  TrendingUp, 
  DollarSign,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const HRDashboard = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock employee data
  const employees = [
    {
      id: 1,
      name: 'นพ.สมชาย รักษาดี',
      position: 'จักษุแพทย์อาวุโส',
      department: 'แผนกจักษุวิทยา',
      phone: '081-234-5678',
      email: 'somchai@visioncare.com',
      salary: 120000,
      startDate: '2020-01-15',
      status: 'active',
      shift: 'เช้า-บ่าย',
      performance: 95
    },
    {
      id: 2,
      name: 'นพ.หญิง วิภาวดี ใสสะอาด',
      position: 'จักษุแพทย์',
      department: 'แผนกจักษุวิทยา',
      phone: '082-345-6789',
      email: 'wipawadee@visioncare.com',
      salary: 100000,
      startDate: '2021-03-20',
      status: 'active',
      shift: 'บ่าย-เย็น',
      performance: 92
    },
    {
      id: 3,
      name: 'นาง สมหญิง ดูแลดี',
      position: 'พยาบาลหัวหน้า',
      department: 'แผนกพยาบาล',
      phone: '083-456-7890',
      email: 'somying@visioncare.com',
      salary: 45000,
      startDate: '2019-06-10',
      status: 'active',
      shift: 'เช้า-บ่าย',
      performance: 98
    }
  ];

  const leaveRequests = [
    {
      id: 1,
      employeeName: 'นพ.สมชาย รักษาดี',
      leaveType: 'ลาป่วย',
      startDate: '2024-06-20',
      endDate: '2024-06-22',
      days: 3,
      status: 'pending',
      reason: 'ป่วยไข้หวัดใหญ่'
    },
    {
      id: 2,
      employeeName: 'นาง สมหญิง ดูแลดี',
      leaveType: 'ลาพักผ่อน',
      startDate: '2024-07-01',
      endDate: '2024-07-05',
      days: 5,
      status: 'approved',
      reason: 'พักผ่อนกับครอบครัว'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">ปฏิบัติงาน</Badge>;
      case 'leave':
        return <Badge className="bg-yellow-100 text-yellow-800">ลางาน</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800">ไม่ปฏิบัติงาน</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">รอพิจารณา</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">อนุมัติ</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">ไม่อนุมัติ</Badge>;
      default:
        return <Badge>ไม่ทราบสถานะ</Badge>;
    }
  };

  const renderEmployeeList = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาพนักงาน, ตำแหน่ง, หรือแผนก..."
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
          <UserPlus className="h-4 w-4 mr-2" />
          เพิ่มพนักงาน
        </Button>
      </div>

      {/* Employee Grid */}
      <div className="grid gap-4">
        {employees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{employee.name}</h3>
                    <p className="text-emerald-600 font-medium">{employee.position}</p>
                    <p className="text-sm text-gray-600">{employee.department}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {employee.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {employee.email}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="mb-2">
                    {getStatusBadge(employee.status)}
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>เงินเดือน: ฿{employee.salary.toLocaleString()}</div>
                    <div>เริ่มงาน: {employee.startDate}</div>
                    <div>ผลงาน: {employee.performance}%</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">เวรงาน: {employee.shift}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">ดูรายละเอียด</Button>
                    <Button size="sm" variant="outline">แก้ไข</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderLeaveManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">การจัดการใบลา</h2>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <FileText className="h-4 w-4 mr-2" />
          ใบลาใหม่
        </Button>
      </div>

      <div className="grid gap-4">
        {leaveRequests.map((request) => (
          <Card key={request.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{request.employeeName}</h3>
                  <p className="text-emerald-600 font-medium">{request.leaveType}</p>
                  <p className="text-sm text-gray-600 mt-1">{request.reason}</p>
                  <div className="mt-2 text-sm">
                    <span className="text-gray-600">วันที่: </span>
                    <span>{request.startDate} - {request.endDate}</span>
                    <span className="ml-4 text-gray-600">จำนวน: </span>
                    <span>{request.days} วัน</span>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(request.status)}
                  {request.status === 'pending' && (
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">อนุมัติ</Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">ไม่อนุมัติ</Button>
                    </div>
                  )}
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
      case '/hr-dashboard/add-employee':
        return (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>เพิ่มพนักงานใหม่</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">ชื่อ-นามสกุล</label>
                    <input type="text" className="w-full p-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">ตำแหน่ง</label>
                    <input type="text" className="w-full p-2 border rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">แผนก</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>แผนกจักษุวิทยา</option>
                    <option>แผนกพยาบาล</option>
                    <option>แผนกการเงิน</option>
                    <option>แผนกธุรการ</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">เบอร์โทรศัพท์</label>
                    <input type="text" className="w-full p-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">อีเมล</label>
                    <input type="email" className="w-full p-2 border rounded-lg" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">เงินเดือน</label>
                    <input type="number" className="w-full p-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">วันเริ่มงาน</label>
                    <input type="date" className="w-full p-2 border rounded-lg" />
                  </div>
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  บันทึกข้อมูลพนักงาน
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      case '/hr-dashboard/leave':
        return renderLeaveManagement();
      default:
        return renderEmployeeList();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">ระบบ HR/OD</h1>
        <p className="text-gray-600 mt-1">จัดการบุคลากรและการพัฒนาองค์กร</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">พนักงานทั้งหมด</p>
                <p className="text-2xl font-bold">{employees.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">ปฏิบัติงาน</p>
                <p className="text-2xl font-bold">{employees.filter(e => e.status === 'active').length}</p>
              </div>
              <UserPlus className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">ใบลารอพิจารณา</p>
                <p className="text-2xl font-bold">{leaveRequests.filter(r => r.status === 'pending').length}</p>
              </div>
              <FileText className="h-8 w-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">เงินเดือนเฉลี่ย</p>
                <p className="text-2xl font-bold">฿{Math.round(employees.reduce((a, b) => a + b.salary, 0) / employees.length).toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {renderContent()}
    </div>
  );
};

export default HRDashboard;
