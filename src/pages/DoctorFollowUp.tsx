
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Phone, Calendar, CheckCircle, Clock, Star, User } from 'lucide-react';
import { sessionManager } from '@/utils/sessionManager';
import { mockFollowUps, FollowUp } from '@/data/doctorMockData';
import { useToast } from '@/hooks/use-toast';

const DoctorFollowUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null);
  const [callNotes, setCallNotes] = useState('');

  useEffect(() => {
    const storedFollowUps = sessionManager.get<FollowUp[]>('followUps') || mockFollowUps;
    setFollowUps(storedFollowUps);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'contacted': return <Phone className="h-4 w-4" />;
      case 'scheduled': return <Calendar className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'รอติดตาม';
      case 'contacted': return 'ติดต่อแล้ว';
      case 'scheduled': return 'นัดหมายแล้ว';
      case 'completed': return 'เสร็จสิ้น';
      default: return status;
    }
  };

  const getFollowUpTypeText = (type: string) => {
    switch (type) {
      case 'annual': return 'ตรวจประจำปี';
      case 'chronic': return 'โรคเรื้อรัง';
      case 'post-surgery': return 'หลังผ่าตัด';
      default: return type;
    }
  };

  const updateFollowUpStatus = (followUpId: string, newStatus: FollowUp['status']) => {
    const updatedFollowUps = followUps.map(followUp => 
      followUp.id === followUpId 
        ? { 
            ...followUp, 
            status: newStatus,
            callDate: newStatus === 'contacted' ? new Date().toISOString().split('T')[0] : followUp.callDate,
            callBy: newStatus === 'contacted' ? 'พนักงาน' : followUp.callBy,
            notes: callNotes || followUp.notes
          }
        : followUp
    );
    
    setFollowUps(updatedFollowUps);
    sessionManager.set('followUps', updatedFollowUps);
    
    toast({
      title: "อัปเดตสถานะสำเร็จ",
      description: `การติดตาม ${followUpId} ได้รับการอัปเดตเป็น ${getStatusText(newStatus)}`,
    });
    
    setCallNotes('');
  };

  const isOverdue = (nextVisit: string) => {
    const today = new Date();
    const visitDate = new Date(nextVisit);
    return visitDate < today;
  };

  const getDaysUntilVisit = (nextVisit: string) => {
    const today = new Date();
    const visitDate = new Date(nextVisit);
    const diffTime = visitDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/doctor/queue')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับไปคิว
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Revisit / Follow-up</h1>
            <p className="text-gray-600 mt-1">ติดตามลูกค้าและนัดหมายครั้งถัดไป</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <Phone className="h-4 w-4 mr-1" />
          ติดตามลูกค้า
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Follow-ups List */}
        <Card>
          <CardHeader>
            <CardTitle>รายการติดตาม</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {followUps.map((followUp) => {
              const daysUntil = getDaysUntilVisit(followUp.nextVisit);
              const overdue = isOverdue(followUp.nextVisit);
              
              return (
                <div
                  key={followUp.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedFollowUp?.id === followUp.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  } ${overdue ? 'border-red-200 bg-red-50' : ''}`}
                  onClick={() => setSelectedFollowUp(followUp)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">#{followUp.id}</span>
                    <div className="flex items-center space-x-2">
                      {overdue && (
                        <Badge className="bg-red-100 text-red-800">
                          เกินกำหนด
                        </Badge>
                      )}
                      <Badge className={getStatusColor(followUp.status)}>
                        {getStatusIcon(followUp.status)}
                        <span className="ml-1">{getStatusText(followUp.status)}</span>
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{followUp.patientName}</p>
                  <p className="text-sm text-gray-800 mb-1">
                    {getFollowUpTypeText(followUp.followUpType)}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>ครั้งล่าสุด: {new Date(followUp.lastVisit).toLocaleDateString('th-TH')}</span>
                    <span className={overdue ? 'text-red-600 font-semibold' : ''}>
                      ครั้งต่อไป: {new Date(followUp.nextVisit).toLocaleDateString('th-TH')}
                      {!overdue && daysUntil >= 0 && (
                        <span className="ml-1">({daysUntil} วัน)</span>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Follow-up Details */}
        {selectedFollowUp ? (
          <Card>
            <CardHeader>
              <CardTitle>รายละเอียดการติดตาม #{selectedFollowUp.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">ลูกค้า</p>
                <p className="font-semibold">{selectedFollowUp.patientName}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">ประเภทการติดตาม</p>
                <p className="font-semibold">{getFollowUpTypeText(selectedFollowUp.followUpType)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">วันที่มาครั้งล่าสุด</p>
                  <p className="font-semibold">
                    {new Date(selectedFollowUp.lastVisit).toLocaleDateString('th-TH')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">วันที่ควรมาครั้งต่อไป</p>
                  <p className={`font-semibold ${isOverdue(selectedFollowUp.nextVisit) ? 'text-red-600' : ''}`}>
                    {new Date(selectedFollowUp.nextVisit).toLocaleDateString('th-TH')}
                  </p>
                </div>
              </div>

              {selectedFollowUp.promotion && (
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-600 mr-2" />
                    <span className="font-semibold text-yellow-800">โปรโมชั่นพิเศษ</span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">{selectedFollowUp.promotion}</p>
                </div>
              )}

              {selectedFollowUp.callDate && (
                <div>
                  <p className="text-sm text-gray-600">ติดต่อเมื่อ</p>
                  <p className="font-semibold">
                    {new Date(selectedFollowUp.callDate).toLocaleDateString('th-TH')}
                    {selectedFollowUp.callBy && ` โดย ${selectedFollowUp.callBy}`}
                  </p>
                </div>
              )}

              {selectedFollowUp.notes && (
                <div>
                  <p className="text-sm text-gray-600">หมายเหตุ</p>
                  <p className="font-semibold">{selectedFollowUp.notes}</p>
                </div>
              )}

              {selectedFollowUp.status === 'pending' && (
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <label className="text-sm font-medium text-gray-700">หมายเหตุการติดต่อ</label>
                    <Textarea
                      value={callNotes}
                      onChange={(e) => setCallNotes(e.target.value)}
                      placeholder="บันทึกผลการติดต่อ..."
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => updateFollowUpStatus(selectedFollowUp.id, 'contacted')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      ติดต่อแล้ว
                    </Button>
                    <Button
                      onClick={() => updateFollowUpStatus(selectedFollowUp.id, 'scheduled')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      นัดหมายแล้ว
                    </Button>
                  </div>
                </div>
              )}

              {selectedFollowUp.status === 'contacted' && (
                <div className="pt-4 border-t">
                  <Button
                    onClick={() => updateFollowUpStatus(selectedFollowUp.id, 'scheduled')}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    นัดหมายแล้ว
                  </Button>
                </div>
              )}

              {selectedFollowUp.status === 'scheduled' && (
                <div className="pt-4 border-t">
                  <Button
                    onClick={() => updateFollowUpStatus(selectedFollowUp.id, 'completed')}
                    className="w-full"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    เสร็จสิ้น
                  </Button>
                </div>
              )}

              {selectedFollowUp.status === 'completed' && (
                <div className="pt-4 border-t">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="font-semibold text-green-800">การติดตามเสร็จสิ้น</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      ลูกค้าได้รับการติดตามและนัดหมายเรียบร้อยแล้ว
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">เลือกรายการติดตามเพื่อดูรายละเอียด</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DoctorFollowUp;
