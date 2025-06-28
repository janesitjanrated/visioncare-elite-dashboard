
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, Check, X } from 'lucide-react';

interface LeaveRequest {
  id: string;
  employeeName: string;
  position: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
}

export const LeaveRequestList = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      employeeName: 'นพ.สมชาย ใจดี',
      position: 'แพทย์จักษุ',
      leaveType: 'ลาพักผ่อน',
      startDate: '2024-01-15',
      endDate: '2024-01-17',
      reason: 'ต้องการพักผ่อนกับครอบครัว',
      status: 'pending',
      submittedDate: '2024-01-10'
    },
    {
      id: '2',
      employeeName: 'พย.สมหญิง ใจงาม',
      position: 'พยาบาลจักษุ',
      leaveType: 'ลาป่วย',
      startDate: '2024-01-12',
      endDate: '2024-01-13',
      reason: 'ป่วยเป็นไข้หวัดใหญ่',
      status: 'approved',
      submittedDate: '2024-01-11'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600">รออนุมัติ</Badge>;
      case 'approved':
        return <Badge variant="outline" className="text-green-600">อนุมัติ</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600">ไม่อนุมัติ</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleApprove = (id: string) => {
    setLeaveRequests(requests =>
      requests.map(request =>
        request.id === id ? { ...request, status: 'approved' as const } : request
      )
    );
  };

  const handleReject = (id: string) => {
    setLeaveRequests(requests =>
      requests.map(request =>
        request.id === id ? { ...request, status: 'rejected' as const } : request
      )
    );
  };

  const handleDelete = (id: string) => {
    setLeaveRequests(requests => requests.filter(request => request.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>รายการขอลาหยุด</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ชื่อ-นามสกุล</TableHead>
                <TableHead>ตำแหน่ง</TableHead>
                <TableHead>ประเภทการลา</TableHead>
                <TableHead>วันที่ลา</TableHead>
                <TableHead>เหตุผล</TableHead>
                <TableHead>สถานะ</TableHead>
                <TableHead>วันที่ส่งคำขอ</TableHead>
                <TableHead>จัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.employeeName}</TableCell>
                  <TableCell>{request.position}</TableCell>
                  <TableCell>{request.leaveType}</TableCell>
                  <TableCell>
                    {new Date(request.startDate).toLocaleDateString('th-TH')} - {new Date(request.endDate).toLocaleDateString('th-TH')}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{request.reason}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>{new Date(request.submittedDate).toLocaleDateString('th-TH')}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {request.status === 'pending' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleApprove(request.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleReject(request.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(request.id)}
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
