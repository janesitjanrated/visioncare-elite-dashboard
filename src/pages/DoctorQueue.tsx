
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  User, 
  Plus, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  UserPlus,
  Calendar,
  Stethoscope,
  Eye
} from 'lucide-react';
import { mockQueues, Queue } from '@/data/doctorMockData';
import { sessionManager } from '@/utils/sessionManager';

const DoctorQueue = () => {
  const navigate = useNavigate();
  const [queues, setQueues] = useState<Queue[]>([]);
  const [showAddQueue, setShowAddQueue] = useState(false);

  useEffect(() => {
    // Load from session or use mock data
    const sessionQueues = sessionManager.get<Queue[]>('queues');
    if (sessionQueues) {
      setQueues(sessionQueues);
    } else {
      setQueues(mockQueues);
      sessionManager.set('queues', mockQueues);
    }
  }, []);

  const updateQueues = (newQueues: Queue[]) => {
    setQueues(newQueues);
    sessionManager.set('queues', newQueues);
  };

  const updateQueueStatus = (queueId: string, newStatus: Queue['status']) => {
    const updatedQueues = queues.map(queue => 
      queue.id === queueId ? { ...queue, status: newStatus } : queue
    );
    updateQueues(updatedQueues);
  };

  const handleStartExamination = (queue: Queue) => {
    // Update status to in-progress
    updateQueueStatus(queue.id, 'in-progress');
    // Navigate to examination page
    navigate(`/doctor/examination?queueId=${queue.id}`);
  };

  const getStatusBadge = (status: Queue['status']) => {
    switch (status) {
      case 'waiting':
        return <Badge variant="outline" className="text-yellow-700 border-yellow-200">รอตรวจ</Badge>;
      case 'in-progress':
        return <Badge variant="default" className="bg-blue-600">กำลังตรวจ</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-600">ตรวจเสร็จ</Badge>;
      case 'no-show':
        return <Badge variant="destructive">ไม่มา</Badge>;
      default:
        return <Badge variant="outline">ไม่ทราบ</Badge>;
    }
  };

  const getPriorityBadge = (priority: Queue['priority']) => {
    return priority === 'urgent' ? (
      <Badge variant="destructive" className="ml-2">ด่วน</Badge>
    ) : null;
  };

  const waitingCount = queues.filter(q => q.status === 'waiting').length;
  const inProgressCount = queues.filter(q => q.status === 'in-progress').length;
  const completedCount = queues.filter(q => q.status === 'completed').length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">คิว / นัดหมาย</h1>
          <p className="text-gray-600 mt-1">จัดการคิวผู้ป่วยและการนัดหมาย</p>
        </div>
        <Button 
          onClick={() => setShowAddQueue(true)}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มคิวใหม่
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              รอตรวจ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{waitingCount}</div>
            <p className="text-yellow-100 text-xs">คิว</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Stethoscope className="w-4 h-4 mr-2" />
              กำลังตรวจ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressCount}</div>
            <p className="text-blue-100 text-xs">คิว</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              ตรวจเสร็จ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
            <p className="text-green-100 text-xs">คิว</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <User className="w-4 h-4 mr-2" />
              ทั้งหมด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queues.length}</div>
            <p className="text-purple-100 text-xs">คิว</p>
          </CardContent>
        </Card>
      </div>

      {/* Queue List */}
      <Card>
        <CardHeader>
          <CardTitle>รายการคิววันนี้</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {queues.map((queue) => (
              <div key={queue.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg flex items-center">
                        {queue.patientName}
                        {getPriorityBadge(queue.priority)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {queue.appointmentType === 'walk-in' ? 'Walk-in' : 'นัดหมาย'} • 
                        เวลา {queue.estimatedTime} • 
                        หมอ {queue.doctorName}
                      </p>
                      {queue.notes && (
                        <p className="text-sm text-gray-500 mt-1">หมายเหตุ: {queue.notes}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(queue.status)}
                    <div className="flex gap-1 ml-2">
                      {queue.status === 'waiting' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStartExamination(queue)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          เริ่มตรวจ
                        </Button>
                      )}
                      {queue.status === 'in-progress' && (
                        <Button 
                          size="sm" 
                          onClick={() => navigate(`/doctor/examination?queueId=${queue.id}`)}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          ดูการตรวจ
                        </Button>
                      )}
                      {queue.status === 'in-progress' && (
                        <Button 
                          size="sm" 
                          onClick={() => updateQueueStatus(queue.id, 'completed')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          ตรวจเสร็จ
                        </Button>
                      )}
                      {queue.status === 'waiting' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateQueueStatus(queue.id, 'no-show')}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          ไม่มา
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Queue Modal - Simplified for now */}
      {showAddQueue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">เพิ่มคิวใหม่</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">ชื่อผู้ป่วย</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
                  placeholder="กรอกชื่อผู้ป่วย"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ประเภท</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500">
                  <option value="walk-in">Walk-in</option>
                  <option value="scheduled">นัดหมาย</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ความเร่งด่วน</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500">
                  <option value="normal">ปกติ</option>
                  <option value="urgent">ด่วน</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowAddQueue(false)}
                  variant="outline"
                  className="flex-1"
                >
                  ยกเลิก
                </Button>
                <Button 
                  onClick={() => {
                    // Add logic to create new queue
                    setShowAddQueue(false);
                  }}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                >
                  เพิ่มคิว
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorQueue;
