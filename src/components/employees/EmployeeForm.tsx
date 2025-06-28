
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Save } from 'lucide-react';

export const EmployeeForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    idCard: '',
    birthDate: '',
    gender: '',
    nationality: 'ไทย',
    religion: 'พุทธ',
    maritalStatus: '',
    address: '',
    
    // Employment Info
    employeeCode: '',
    startDate: '',
    department: '',
    position: '',
    role: '',
    employmentType: '',
    paymentType: '',
    baseSalary: '',
    branch: '',
    
    // Contact Info
    phone: '',
    email: '',
    emergencyContact: '',
    emergencyPhone: '',
    bankAccount: '',
    
    // Benefits
    socialSecurityNumber: '',
    hospital: '',
    insurance: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>เพิ่มพนักงานใหม่</CardTitle>
                <CardDescription>กรอกข้อมูลพนักงานใหม่</CardDescription>
              </div>
              <Button variant="outline" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="personal" className="space-y-6">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="personal">ข้อมูลส่วนตัว</TabsTrigger>
                  <TabsTrigger value="employment">ข้อมูลการจ้างงาน</TabsTrigger>
                  <TabsTrigger value="contact">ข้อมูลติดต่อ</TabsTrigger>
                  <TabsTrigger value="benefits">สวัสดิการ</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">ชื่อ *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">นามสกุล *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="idCard">เลขบัตรประชาชน *</Label>
                      <Input
                        id="idCard"
                        value={formData.idCard}
                        onChange={(e) => handleInputChange('idCard', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="birthDate">วันเกิด *</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">เพศ *</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกเพศ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">ชาย</SelectItem>
                          <SelectItem value="female">หญิง</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="maritalStatus">สถานะสมรส</Label>
                      <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกสถานะ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">โสด</SelectItem>
                          <SelectItem value="married">สมรส</SelectItem>
                          <SelectItem value="divorced">หย่า</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">ที่อยู่</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="ที่อยู่เต็ม"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="employment" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="employeeCode">รหัสพนักงาน *</Label>
                      <Input
                        id="employeeCode"
                        value={formData.employeeCode}
                        onChange={(e) => handleInputChange('employeeCode', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="startDate">วันที่เริ่มงาน *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">แผนก *</Label>
                      <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกแผนก" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medical">แผนกตรวจสายตา</SelectItem>
                          <SelectItem value="nursing">แผนกพยาบาล</SelectItem>
                          <SelectItem value="optical">แผนกแว่น</SelectItem>
                          <SelectItem value="admin">แผนกบริหาร</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="position">ตำแหน่ง *</Label>
                      <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="employmentType">ประเภทการจ้าง *</Label>
                      <Select value={formData.employmentType} onValueChange={(value) => handleInputChange('employmentType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกประเภท" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="permanent">พนักงานประจำ</SelectItem>
                          <SelectItem value="temporary">พนักงานชั่วคราว</SelectItem>
                          <SelectItem value="parttime">พนักงานพาร์ทไทม์</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="paymentType">ประเภทการจ่ายเงิน *</Label>
                      <Select value={formData.paymentType} onValueChange={(value) => handleInputChange('paymentType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกประเภท" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">รายเดือน</SelectItem>
                          <SelectItem value="daily">รายวัน</SelectItem>
                          <SelectItem value="hourly">รายชั่วโมง</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="baseSalary">เงินเดือนพื้นฐาน *</Label>
                      <Input
                        id="baseSalary"
                        type="number"
                        value={formData.baseSalary}
                        onChange={(e) => handleInputChange('baseSalary', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="branch">สาขา *</Label>
                      <Select value={formData.branch} onValueChange={(value) => handleInputChange('branch', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกสาขา" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main">สาขาหลัก</SelectItem>
                          <SelectItem value="branch2">สาขา 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">เบอร์โทรศัพท์ *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">อีเมล *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyContact">ชื่อผู้ติดต่อฉุกเฉิน</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone">เบอร์ฉุกเฉิน</Label>
                      <Input
                        id="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bankAccount">บัญชีธนาคาร</Label>
                      <Input
                        id="bankAccount"
                        value={formData.bankAccount}
                        onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                        placeholder="ธนาคาร เลขบัญชี"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="benefits" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="socialSecurityNumber">เลขประกันสังคม</Label>
                      <Input
                        id="socialSecurityNumber"
                        value={formData.socialSecurityNumber}
                        onChange={(e) => handleInputChange('socialSecurityNumber', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hospital">โรงพยาบาลประจำ</Label>
                      <Input
                        id="hospital"
                        value={formData.hospital}
                        onChange={(e) => handleInputChange('hospital', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="insurance">ประกันสุขภาพ</Label>
                      <Input
                        id="insurance"
                        value={formData.insurance}
                        onChange={(e) => handleInputChange('insurance', e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
                <Button type="button" variant="outline" onClick={onClose}>
                  ยกเลิก
                </Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                  <Save className="w-4 h-4 mr-2" />
                  บันทึก
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
