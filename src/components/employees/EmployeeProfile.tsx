
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Edit, Phone, Mail, MapPin, Calendar, CreditCard, Shield } from 'lucide-react';

export const EmployeeProfile = ({ employee, onBack }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                กลับ
              </Button>
              <div>
                <CardTitle className="text-2xl">{employee.name}</CardTitle>
                <CardDescription>รหัสพนักงาน: {employee.code}</CardDescription>
              </div>
            </div>
            <Button>
              <Edit className="w-4 h-4 mr-2" />
              แก้ไขข้อมูล
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="personal">ข้อมูลส่วนตัว</TabsTrigger>
          <TabsTrigger value="employment">ข้อมูลการจ้างงาน</TabsTrigger>
          <TabsTrigger value="contact">ข้อมูลติดต่อ</TabsTrigger>
          <TabsTrigger value="benefits">สวัสดิการ</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>ข้อมูลส่วนตัว</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">ชื่อ-นามสกุล</label>
                    <p className="text-lg font-medium">{employee.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">เลขบัตรประชาชน</label>
                    <p>1-2345-67890-12-3</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">วันเกิด</label>
                    <p>15 มกราคม 2533</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">เพศ</label>
                    <p>ชาย</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">สัญชาติ</label>
                    <p>ไทย</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">ศาสนา</label>
                    <p>พุทธ</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">สถานะสมรส</label>
                    <p>โสด</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">ที่อยู่</label>
                    <p>123/45 ถ.สุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพฯ 10110</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employment">
          <Card>
            <CardHeader>
              <CardTitle>ข้อมูลการจ้างงาน</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">รหัสพนักงาน</label>
                    <p className="font-mono text-lg">{employee.code}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">วันที่เริ่มงาน</label>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <p>{new Date(employee.startDate).toLocaleDateString('th-TH')}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">ประเภทการจ้าง</label>
                    <Badge className="mt-1">{employee.employmentType}</Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">แผนก</label>
                    <p>{employee.department}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">ตำแหน่ง</label>
                    <p>{employee.position}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">บทบาท</label>
                    <Badge variant="outline">{employee.role}</Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">ประเภทการจ่ายเงิน</label>
                    <p>{employee.paymentType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">เงินเดือนพื้นฐาน</label>
                    <p className="text-lg font-bold text-green-600">
                      ฿{employee.baseSalary.toLocaleString()}
                      {employee.paymentType === 'รายวัน' ? '/วัน' : '/เดือน'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>ข้อมูลติดต่อ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">เบอร์โทรศัพท์</label>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <p>{employee.phone}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">อีเมล</label>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <p>{employee.email}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">สาขาที่ปฏิบัติงาน</label>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <p>{employee.branch}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">เบอร์ฉุกเฉิน</label>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <p>084-567-8901</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">ชื่อผู้ติดต่อฉุกเฉิน</label>
                    <p>นางสาวสมใจ ใจดี (น้องสาว)</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">บัญชีธนาคาร</label>
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                      <p>กสิกรไทย 123-4-56789-0</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits">
          <Card>
            <CardHeader>
              <CardTitle>สวัสดิการและประกันสังคม</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">เลขประกันสังคม</label>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-gray-400" />
                      <p>1234567890123</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">โรงพยาบาลประจำ</label>
                    <p>โรงพยาบาลรามาธิบดี</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">ประกันสุขภาพ</label>
                    <p>บริษัท เอไอเอ ประกันชีวิต</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">วันลาพักร้อนคงเหลือ</label>
                    <p className="text-lg font-bold text-blue-600">8 วัน</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">วันลาป่วยคงเหลือ</label>
                    <p className="text-lg font-bold text-green-600">12 วัน</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">สิทธิ์พิเศษ</label>
                    <div className="space-y-1">
                      <Badge variant="outline">ตรวจสายตาฟรี</Badge>
                      <Badge variant="outline">ส่วนลดแว่น 50%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
