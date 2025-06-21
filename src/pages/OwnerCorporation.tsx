
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Building, 
  Plus, 
  MapPin, 
  Users, 
  DollarSign,
  Settings,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const OwnerCorporation = () => {
  const { toast } = useToast();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const branches = [
    {
      id: 'BR001',
      name: 'สาขาสีลม',
      address: '123 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500',
      manager: 'นางสาว สมใจ ใจดี',
      employees: 8,
      revenue: 2450000,
      target: 2800000,
      status: 'active',
      openDate: '2020-01-15',
      phone: '02-123-4567',
      performance: {
        customers: 1250,
        satisfaction: 4.8,
        growth: 15.2
      }
    },
    {
      id: 'BR002',
      name: 'สาขาอโศก',
      address: '456 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110',
      manager: 'นาย วิชาญ มองใส',
      employees: 6,
      revenue: 1890000,
      target: 2200000,
      status: 'active',
      openDate: '2021-03-20',
      phone: '02-234-5678',
      performance: {
        customers: 980,
        satisfaction: 4.6,
        growth: 12.8
      }
    },
    {
      id: 'BR003',
      name: 'สาขาเซ็นทรัล',
      address: '789 ห้างเซ็นทรัลพลาซา ลาด่าว กรุงเทพฯ 10900',
      manager: 'นาง ปรีชา รักษาดี',
      employees: 10,
      revenue: 1650000,
      target: 2000000,
      status: 'active',
      openDate: '2019-11-10',
      phone: '02-345-6789',
      performance: {
        customers: 850,
        satisfaction: 4.5,
        growth: 8.4
      }
    },
    {
      id: 'BR004',
      name: 'สาขาพร้อมเปิด',
      address: '321 ถนนราชดำริ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330',
      manager: 'รอแต่งตั้ง',
      employees: 0,
      revenue: 0,
      target: 1500000,
      status: 'planning',
      openDate: '2024-09-01',
      phone: 'รอติดตั้ง',
      performance: {
        customers: 0,
        satisfaction: 0,
        growth: 0
      }
    }
  ];

  const corporationMetrics = [
    { title: 'สาขาทั้งหมด', value: '4', unit: 'สาขา', change: '+1' },
    { title: 'พนักงานรวม', value: '24', unit: 'คน', change: '+3' },
    { title: 'ยอดขายรวม', value: '5.99', unit: 'ล้านบาท', change: '+0.8M' },
    { title: 'ลูกค้าทั้งหมด', value: '3,080', unit: 'คน', change: '+250' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'เปิดดำเนินการ';
      case 'planning': return 'วางแผน';
      case 'closed': return 'ปิดดำเนินการ';
      default: return status;
    }
  };

  const handleAddBranch = () => {
    toast({
      title: "เพิ่มสาขาใหม่",
      description: "ระบบจะเปิดฟอร์มสำหรับเพิ่มสาขาใหม่",
    });
  };

  const handleEditBranch = (branchId: string) => {
    toast({
      title: "แก้ไขข้อมูลสาขา",
      description: `เริ่มแก้ไขข้อมูลสาขา ${branchId}`,
    });
    setIsEditing(true);
  };

  const handleDeleteBranch = (branchId: string) => {
    toast({
      title: "ลบสาขา",
      description: `ยืนยันการลบสาขา ${branchId}`,
      variant: "destructive"
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">บริหาร Corporation/สาขา</h1>
          <p className="text-gray-600 mt-1">จัดการสาขาและโครงสร้างองค์กร</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={handleAddBranch} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            เพิ่มสาขาใหม่
          </Button>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Building className="h-4 w-4 mr-1" />
            Corporation
          </Badge>
        </div>
      </div>

      {/* Corporation Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {corporationMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                    <span className="text-sm font-normal text-gray-500 ml-1">{metric.unit}</span>
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 font-semibold">{metric.change}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {branches.map((branch) => (
          <Card key={branch.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Building className="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{branch.name}</CardTitle>
                    <p className="text-sm text-gray-600">รหัส: {branch.id}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(branch.status)}>
                  {getStatusText(branch.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">ผู้จัดการ</p>
                  <p className="font-semibold">{branch.manager}</p>
                </div>
                <div>
                  <p className="text-gray-600">พนักงาน</p>
                  <p className="font-semibold">{branch.employees} คน</p>
                </div>
                <div>
                  <p className="text-gray-600">ยอดขาย</p>
                  <p className="font-semibold">{branch.revenue.toLocaleString()} ฿</p>
                </div>
                <div>
                  <p className="text-gray-600">เป้าหมาย</p>
                  <p className="font-semibold">{branch.target.toLocaleString()} ฿</p>
                </div>
              </div>

              <div>
                <p className="text-gray-600 text-sm mb-1">ที่อยู่</p>
                <p className="text-sm">{branch.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">เปิดดำเนินการ</p>
                  <p className="font-semibold">
                    {new Date(branch.openDate).toLocaleDateString('th-TH')}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">โทรศัพท์</p>
                  <p className="font-semibold">{branch.phone}</p>
                </div>
              </div>

              {branch.status === 'active' && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">ประสิทธิภาพ</h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-gray-600">ลูกค้า</p>
                      <p className="font-semibold">{branch.performance.customers}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">ความพึงพอใจ</p>
                      <p className="font-semibold">{branch.performance.satisfaction}/5</p>
                    </div>
                    <div>
                      <p className="text-gray-600">การเติบโต</p>
                      <p className="font-semibold text-green-600">+{branch.performance.growth}%</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-2 border-t">
                <Button size="sm" variant="outline" onClick={() => setSelectedBranch(branch)}>
                  <Eye className="h-4 w-4 mr-1" />
                  ดูรายละเอียด
                </Button>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditBranch(branch.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeleteBranch(branch.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Branch Details Modal (simplified) */}
      {selectedBranch && (
        <Card className="mt-6 border-2 border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2 text-blue-600" />
                รายละเอียด{selectedBranch.name}
              </CardTitle>
              <Button variant="outline" size="sm" onClick={() => setSelectedBranch(null)}>
                ปิด
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">ข้อมูลทั่วไป</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ชื่อสาขา:</span>
                    <span className="font-semibold">{selectedBranch.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">รหัสสาขา:</span>
                    <span className="font-semibold">{selectedBranch.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ผู้จัดการ:</span>
                    <span className="font-semibold">{selectedBranch.manager}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">จำนวนพนักงาน:</span>
                    <span className="font-semibold">{selectedBranch.employees} คน</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">ผลประกอบการ</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ยอดขายปัจจุบัน:</span>
                    <span className="font-semibold">{selectedBranch.revenue.toLocaleString()} ฿</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">เป้าหมาย:</span>
                    <span className="font-semibold">{selectedBranch.target.toLocaleString()} ฿</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ความสำเร็จ:</span>
                    <span className="font-semibold text-green-600">
                      {((selectedBranch.revenue / selectedBranch.target) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OwnerCorporation;
