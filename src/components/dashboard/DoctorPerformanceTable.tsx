
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { doctorPerformance } from '@/data/mockData';

const DoctorPerformanceTable: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          👨‍⚕️ ประสิทธิภาพแพทย์
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ชื่อแพทย์</TableHead>
              <TableHead>ความเชี่ยวชาญ</TableHead>
              <TableHead className="text-right">การนัดหมาย</TableHead>
              <TableHead className="text-right">รายได้</TableHead>
              <TableHead className="text-right">คะแนน</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctorPerformance.map((doctor, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{doctor.name}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell className="text-right">{doctor.appointments}</TableCell>
                <TableCell className="text-right">฿{doctor.revenue.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <span className="flex items-center justify-end gap-1">
                    ⭐ {doctor.rating}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DoctorPerformanceTable;
