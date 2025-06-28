
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus } from 'lucide-react';

interface Schedule {
  id: string;
  employeeName: string;
  position: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export const ScheduleTable = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: '1',
      employeeName: 'นพ.สมชาย ใจดี',
      position: 'แพทย์จักษุ',
      monday: '08:00-17:00',
      tuesday: '08:00-17:00',
      wednesday: '08:00-17:00',
      thursday: '08:00-17:00',
      friday: '08:00-17:00',
      saturday: 'หยุด',
      sunday: 'หยุด'
    },
    {
      id: '2',
      employeeName: 'พย.สมหญิง ใจงาม',
      position: 'พยาบาลจักษุ',
      monday: '08:00-17:00',
      tuesday: '08:00-17:00',
      wednesday: '08:00-17:00',
      thursday: '08:00-17:00',
      friday: '08:00-17:00',
      saturday: '08:00-12:00',
      sunday: 'หยุด'
    }
  ]);

  const handleDelete = (id: string) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  const getShiftBadge = (shift: string) => {
    if (shift === 'หยุด') {
      return <Badge variant="secondary">หยุด</Badge>;
    }
    return <Badge variant="outline">{shift}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>ตารางงานประจำสัปดาห์</CardTitle>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            เพิ่มตารางงาน
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ชื่อ-นามสกุล</TableHead>
                <TableHead>ตำแหน่ง</TableHead>
                <TableHead>จันทร์</TableHead>
                <TableHead>อังคาร</TableHead>
                <TableHead>พุธ</TableHead>
                <TableHead>พฤหัสบดี</TableHead>
                <TableHead>ศุกร์</TableHead>
                <TableHead>เสาร์</TableHead>
                <TableHead>อาทิตย์</TableHead>
                <TableHead>จัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.employeeName}</TableCell>
                  <TableCell>{schedule.position}</TableCell>
                  <TableCell>{getShiftBadge(schedule.monday)}</TableCell>
                  <TableCell>{getShiftBadge(schedule.tuesday)}</TableCell>
                  <TableCell>{getShiftBadge(schedule.wednesday)}</TableCell>
                  <TableCell>{getShiftBadge(schedule.thursday)}</TableCell>
                  <TableCell>{getShiftBadge(schedule.friday)}</TableCell>
                  <TableCell>{getShiftBadge(schedule.saturday)}</TableCell>
                  <TableCell>{getShiftBadge(schedule.sunday)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(schedule.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
