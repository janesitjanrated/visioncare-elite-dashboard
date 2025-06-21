
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Queue } from '@/services/doctorService';

interface QueueListProps {
  queues: Queue[];
  selectedQueue: Queue | null;
  onSelectQueue: (queue: Queue) => void;
}

const QueueList: React.FC<QueueListProps> = ({ queues, selectedQueue, onSelectQueue }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'no-show': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'waiting': return <Clock className="h-4 w-4" />;
      case 'in-progress': return <AlertCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'no-show': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting': return 'รอ';
      case 'in-progress': return 'กำลังตรวจ';
      case 'completed': return 'เสร็จแล้ว';
      case 'no-show': return 'ไม่มา';
      default: return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>รายการคิว</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {queues.map((queue) => (
          <div
            key={queue.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedQueue?.id === queue.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
            } ${queue.priority === 'urgent' ? 'border-red-200 bg-red-50' : ''}`}
            onClick={() => onSelectQueue(queue)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">#{queue.id}</span>
              <div className="flex items-center space-x-2">
                {queue.priority === 'urgent' && (
                  <Badge className="bg-red-100 text-red-800">
                    ด่วน
                  </Badge>
                )}
                <Badge className={getStatusColor(queue.status)}>
                  {getStatusIcon(queue.status)}
                  <span className="ml-1">{getStatusText(queue.status)}</span>
                </Badge>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">{queue.patientName}</p>
            <p className="text-sm text-gray-800 mb-1">
              {queue.appointmentType === 'scheduled' ? 'นัดหมาย' : 'Walk-in'}
            </p>
            <div className="flex justify-between text-xs text-gray-500">
              <span>เวลานัด: {queue.estimatedTime}</span>
              {queue.actualTime && <span>เวลาจริง: {queue.actualTime}</span>}
            </div>
            {queue.notes && (
              <p className="text-xs text-gray-600 mt-1 italic">{queue.notes}</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default QueueList;
