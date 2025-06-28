
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface LeaveRequestFormProps {
  onClose: () => void;
}

export const LeaveRequestForm = ({ onClose }: LeaveRequestFormProps) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    position: '',
    leaveType: '',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    reason: '',
    contactDuringLeave: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Leave request submitted:', formData);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>ใบขอลาหยุด</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employeeName">ชื่อ-นามสกุล</Label>
              <Input
                id="employeeName"
                value={formData.employeeName}
                onChange={(e) => setFormData({...formData, employeeName: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position">ตำแหน่ง</Label>
              <Select onValueChange={(value) => setFormData({...formData, position: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกตำแหน่ง" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doctor">แพทย์จักษุ</SelectItem>
                  <SelectItem value="nurse">พยาบาลจักษุ</SelectItem>
                  <SelectItem value="optometrist">นักวัดสายตา</SelectItem>
                  <SelectItem value="receptionist">พนักงานต้อนรับ</SelectItem>
                  <SelectItem value="admin">เจ้าหน้าที่บริหาร</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="leaveType">ประเภทการลา</Label>
            <Select onValueChange={(value) => setFormData({...formData, leaveType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกประเภทการลา" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annual">ลาพักผ่อน</SelectItem>
                <SelectItem value="sick">ลาป่วย</SelectItem>
                <SelectItem value="personal">ลากิจส่วนตัว</SelectItem>
                <SelectItem value="maternity">ลาคลอด</SelectItem>
                <SelectItem value="emergency">ลาฉุกเฉิน</SelectItem>
                <SelectItem value="study">ลาศึกษา</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>วันที่เริ่มลา</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? format(formData.startDate, "dd/MM/yyyy") : "เลือกวันที่"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => setFormData({...formData, startDate: date})}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>วันที่สิ้นสุดการลา</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? format(formData.endDate, "dd/MM/yyyy") : "เลือกวันที่"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => setFormData({...formData, endDate: date})}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">เหตุผลในการลา</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">ช่องทางติดต่อระหว่างลา</Label>
            <Input
              id="contact"
              value={formData.contactDuringLeave}
              onChange={(e) => setFormData({...formData, contactDuringLeave: e.target.value})}
              placeholder="เบอร์โทรศัพท์หรือช่องทางติดต่อ"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              ยกเลิก
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              ส่งใบขอลา
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
