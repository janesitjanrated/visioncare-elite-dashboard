
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { ClaimForm } from '@/components/ClaimForm';

interface Claim {
  id: string;
  patientName: string;
  patientId: string;
  claimDate: string;
  productType: string;
  issueDescription: string;
  status: 'pending' | 'approved' | 'rejected' | 'resolved';
  claimAmount: number;
  supplierResponse?: string;
  resolvedDate?: string;
}

const Claims = () => {
  const [claims, setClaims] = useState<Claim[]>([
    {
      id: '1',
      patientName: 'นางสาว สมใจ ใจดี',
      patientId: 'P001',
      claimDate: '2024-06-15',
      productType: 'Progressive Lens',
      issueDescription: 'เลนส์มีรอยขีดข่วน',
      status: 'pending',
      claimAmount: 15000,
    },
    {
      id: '2',
      patientName: 'นาย วิชัย รักดี',
      patientId: 'P002',
      claimDate: '2024-06-10',
      productType: 'Titanium Frame',
      issueDescription: 'กรอบหัก',
      status: 'approved',
      claimAmount: 8000,
      supplierResponse: 'อนุมัติการเคลม ส่งของใหม่ให้',
      resolvedDate: '2024-06-18'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingClaim, setEditingClaim] = useState<Claim | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClaims = claims.filter(claim =>
    claim.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.productType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'resolved': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'รอดำเนินการ';
      case 'approved': return 'อนุมัติ';
      case 'rejected': return 'ปฏิเสธ';
      case 'resolved': return 'แก้ไขแล้ว';
      default: return status;
    }
  };

  const handleSave = (claimData: Partial<Claim>) => {
    if (editingClaim) {
      setClaims(claims.map(claim => 
        claim.id === editingClaim.id 
          ? { ...claim, ...claimData }
          : claim
      ));
    } else {
      const newClaim: Claim = {
        id: Date.now().toString(),
        ...claimData as Claim
      };
      setClaims([...claims, newClaim]);
    }
    setShowForm(false);
    setEditingClaim(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('คุณต้องการลบรายการนี้หรือไม่?')) {
      setClaims(claims.filter(claim => claim.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">รายการเคลมสินค้า</h2>
              <p className="text-gray-600">จัดการรายการเคลมสินค้าที่มีปัญหา</p>
            </div>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มรายการเคลม
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>รายการเคลมสินค้า</CardTitle>
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="ค้นหาชื่อผู้ป่วย, รหัส หรือสินค้า..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-80"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>รหัสผู้ป่วย</TableHead>
                    <TableHead>ชื่อผู้ป่วย</TableHead>
                    <TableHead>สินค้า</TableHead>
                    <TableHead>ปัญหา</TableHead>
                    <TableHead>วันที่เคลม</TableHead>
                    <TableHead>มูลค่า</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead>วันที่แก้ไข</TableHead>
                    <TableHead>จัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClaims.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">{claim.patientId}</TableCell>
                      <TableCell>{claim.patientName}</TableCell>
                      <TableCell>{claim.productType}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{claim.issueDescription}</TableCell>
                      <TableCell>{new Date(claim.claimDate).toLocaleDateString('th-TH')}</TableCell>
                      <TableCell>{claim.claimAmount.toLocaleString()} บาท</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(claim.status)}>
                          {getStatusText(claim.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {claim.resolvedDate ? new Date(claim.resolvedDate).toLocaleDateString('th-TH') : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingClaim(claim);
                              setShowForm(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(claim.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {showForm && (
            <ClaimForm
              claim={editingClaim}
              onSave={handleSave}
              onClose={() => {
                setShowForm(false);
                setEditingClaim(null);
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Claims;
