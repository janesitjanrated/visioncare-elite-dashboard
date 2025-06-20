
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, RefreshCw, Camera, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { sessionManager } from '@/utils/sessionManager';
import { mockClaims, Claim } from '@/data/doctorMockData';
import { useToast } from '@/hooks/use-toast';

const DoctorClaims = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [resolution, setResolution] = useState('');

  useEffect(() => {
    const storedClaims = sessionManager.get<Claim[]>('claims') || mockClaims;
    setClaims(storedClaims);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';  
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleProcessClaim = (claimId: string, action: 'approve' | 'reject') => {
    const updatedClaims = claims.map(claim => 
      claim.id === claimId 
        ? { 
            ...claim, 
            status: action === 'approve' ? 'approved' as const : 'rejected' as const,
            resolvedAt: new Date().toISOString(),
            resolution: resolution || `${action === 'approve' ? 'อนุมัติ' : 'ปฏิเสธ'}การเคลม`
          }
        : claim
    );
    
    setClaims(updatedClaims);
    sessionManager.set('claims', updatedClaims);
    
    toast({
      title: `${action === 'approve' ? 'อนุมัติ' : 'ปฏิเสธ'}การเคลมสำเร็จ`,
      description: `การเคลม ${claimId} ได้รับการ${action === 'approve' ? 'อนุมัติ' : 'ปฏิเสธ'}แล้ว`,
    });
    
    setSelectedClaim(null);
    setResolution('');
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
            <h1 className="text-3xl font-bold text-gray-900">เคลมสินค้า</h1>
            <p className="text-gray-600 mt-1">จัดการการเคลมสินค้าจากลูกค้า</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
          <RefreshCw className="h-4 w-4 mr-1" />
          เคลมสินค้า
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Claims List */}
        <Card>
          <CardHeader>
            <CardTitle>รายการเคลม</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {claims.map((claim) => (
              <div
                key={claim.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedClaim?.id === claim.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedClaim(claim)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">#{claim.id}</span>
                  <Badge className={getStatusColor(claim.status)}>
                    {getStatusIcon(claim.status)}
                    <span className="ml-1">
                      {claim.status === 'pending' ? 'รอดำเนินการ' :
                       claim.status === 'approved' ? 'อนุมัติ' :
                       claim.status === 'rejected' ? 'ปฏิเสธ' : 'เสร็จสิ้น'}
                    </span>
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{claim.patientName}</p>
                <p className="text-sm text-gray-800">{claim.reason}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(claim.createdAt).toLocaleDateString('th-TH')}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Claim Details */}
        {selectedClaim ? (
          <Card>
            <CardHeader>
              <CardTitle>รายละเอียดการเคลม #{selectedClaim.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">ลูกค้า</p>
                <p className="font-semibold">{selectedClaim.patientName}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">เหตุผลการเคลม</p>
                <p className="font-semibold">{selectedClaim.reason}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">หมายเลขออเดอร์</p>
                <p className="font-semibold">{selectedClaim.orderId}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">วันที่แจ้งเคลม</p>
                <p className="font-semibold">
                  {new Date(selectedClaim.createdAt).toLocaleDateString('th-TH')}
                </p>
              </div>

              {selectedClaim.images && selectedClaim.images.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">รูปภาพประกอب</p>
                  <div className="flex space-x-2">
                    {selectedClaim.images.map((image, index) => (
                      <div key={index} className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Camera className="h-6 w-6 text-gray-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedClaim.status === 'pending' && (
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <label className="text-sm font-medium text-gray-700">หมายเหตุการดำเนินการ</label>
                    <Textarea
                      value={resolution}
                      onChange={(e) => setResolution(e.target.value)}
                      placeholder="ระบุเหตุผลการอนุมัติ/ปฏิเสธ..."
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleProcessClaim(selectedClaim.id, 'approve')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      อนุมัติ
                    </Button>
                    <Button
                      onClick={() => handleProcessClaim(selectedClaim.id, 'reject')}
                      variant="destructive"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      ปฏิเสธ
                    </Button>
                  </div>
                </div>
              )}

              {selectedClaim.resolution && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600">หมายเหตุการดำเนินการ</p>
                  <p className="font-semibold">{selectedClaim.resolution}</p>
                  {selectedClaim.resolvedAt && (
                    <p className="text-xs text-gray-500 mt-1">
                      ดำเนินการเมื่อ: {new Date(selectedClaim.resolvedAt).toLocaleDateString('th-TH')}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center">
                <RefreshCw className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">เลือกรายการเคลมเพื่อดูรายละเอียด</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DoctorClaims;
