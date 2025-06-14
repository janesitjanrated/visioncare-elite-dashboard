
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Plus, Mail, Phone } from 'lucide-react';
import { branchStaff } from '@/data/branchMockData';

const BranchStaff = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">ปฏิบัติงาน</Badge>;
      case 'inactive':
        return <Badge variant="secondary">ไม่ปฏิบัติงาน</Badge>;
      case 'leave':
        return <Badge variant="outline">ลา</Badge>;
      default:
        return <Badge variant="secondary">ไม่ระบุ</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">พนักงานสาขา</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          เพิ่มพนักงาน
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branchStaff.map((staff) => (
          <Card key={staff.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{staff.name}</CardTitle>
                {getStatusBadge(staff.status)}
              </div>
              <p className="text-sm text-gray-600">{staff.position}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">แผนก</p>
                <p className="text-base">{staff.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">วันที่เริ่มงาน</p>
                <p className="text-base">{new Date(staff.startDate).toLocaleDateString('th-TH')}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">เงินเดือน</p>
                <p className="text-base font-semibold">{staff.salary.toLocaleString()} บาท</p>
              </div>
              <div className="pt-2 border-t space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  {staff.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  {staff.phone}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BranchStaff;
