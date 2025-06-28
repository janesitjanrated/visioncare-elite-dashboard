
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Package } from 'lucide-react';
import { PendingGlassesForm } from '@/components/PendingGlassesForm';

interface PendingGlass {
  id: string;
  patientName: string;
  patientId: string;
  orderDate: string;
  expectedDelivery: string;
  glassType: string;
  status: 'ordered' | 'arrived' | 'ready' | 'delivered';
  supplier: string;
  trackingNumber: string;
  notes: string;
}

const PendingGlasses = () => {
  const [glasses, setGlasses] = useState<PendingGlass[]>([
    {
      id: '1',
      patientName: 'นางสาว สมใจ ใจดี',
      patientId: 'P001',
      orderDate: '2024-06-15',
      expectedDelivery: '2024-06-25',
      glassType: 'Progressive Lens',
      status: 'arrived',
      supplier: 'Zeiss Thailand',
      trackingNumber: 'ZT001234',
      notes: 'ได้รับแล้ว รอนัดรับ'
    },
    {
      id: '2',
      patientName: 'นาย วิชัย รักดี',
      patientId: 'P002',
      orderDate: '2024-06-18',
      expectedDelivery: '2024-06-28',
      glassType: 'Blue Light Filter',
      status: 'ordered',
      supplier: 'Hoya Vision',
      trackingNumber: 'HV005678',
      notes: 'รอของจากบริษัท'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingGlass, setEditingGlass] = useState<PendingGlass | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGlasses = glasses.filter(glass =>
    glass.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    glass.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    glass.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ordered': return 'bg-orange-100 text-orange-800';
      case 'arrived': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ordered': return 'สั่งแล้ว';
      case 'arrived': return 'มาถึงแล้ว';
      case 'ready': return 'พร้อมรับ';
      case 'delivered': return 'ส่งมอบแล้ว';
      default: return status;
    }
  };

  const handleSave = (glassData: Partial<PendingGlass>) => {
    if (editingGlass) {
      setGlasses(glasses.map(glass => 
        glass.id === editingGlass.id 
          ? { ...glass, ...glassData }
          : glass
      ));
    } else {
      const newGlass: PendingGlass = {
        id: Date.now().toString(),
        ...glassData as PendingGlass
      };
      setGlasses([...glasses, newGlass]);
    }
    setShowForm(false);
    setEditingGlass(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('คุณต้องการลบรายการนี้หรือไม่?')) {
      setGlasses(glasses.filter(glass => glass.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">แว่นค้างส่ง</h2>
              <p className="text-gray-600">ติดตามสถานะแว่นที่รอส่งมอบ</p>
            </div>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มรายการใหม่
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>รายการแว่นค้างส่ง</CardTitle>
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="ค้นหาชื่อผู้ป่วย, รหัส หรือเลขติดตาม..."
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
                    <TableHead>ประเภทแว่น</TableHead>
                    <TableHead>วันที่สั่ง</TableHead>
                    <TableHead>คาดว่าจะได้รับ</TableHead>
                    <TableHead>ผู้จำหน่าย</TableHead>
                    <TableHead>เลขติดตาม</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead>จัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGlasses.map((glass) => (
                    <TableRow key={glass.id}>
                      <TableCell className="font-medium">{glass.patientId}</TableCell>
                      <TableCell>{glass.patientName}</TableCell>
                      <TableCell>{glass.glassType}</TableCell>
                      <TableCell>{new Date(glass.orderDate).toLocaleDateString('th-TH')}</TableCell>
                      <TableCell>{new Date(glass.expectedDelivery).toLocaleDateString('th-TH')}</TableCell>
                      <TableCell>{glass.supplier}</TableCell>
                      <TableCell className="font-mono text-sm">{glass.trackingNumber}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(glass.status)}>
                          {getStatusText(glass.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingGlass(glass);
                              setShowForm(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(glass.id)}
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
            <PendingGlassesForm
              glass={editingGlass}
              onSave={handleSave}
              onClose={() => {
                setShowForm(false);
                setEditingGlass(null);
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default PendingGlasses;
