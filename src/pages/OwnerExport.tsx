
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  FileSpreadsheet,
  FileBarChart,
  Receipt,
  Archive,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const OwnerExport = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [exportHistory, setExportHistory] = useState([
    {
      id: 'EXP001',
      type: 'financial-report',
      name: 'รายงานการเงินประจำเดือน มิ.ย. 2024',
      format: 'PDF',
      size: '2.4 MB',
      createdAt: '2024-06-15T10:30:00Z',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 'EXP002',
      type: 'sales-data',
      name: 'ข้อมูลการขาย Q2 2024',
      format: 'Excel',
      size: '5.8 MB',
      createdAt: '2024-06-10T14:20:00Z',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 'EXP003',
      type: 'tax-report',
      name: 'รายงานภาษี พ.ศ. 2567',
      format: 'PDF',
      size: '1.2 MB',
      createdAt: '2024-06-05T09:15:00Z',
      status: 'processing',
      downloadUrl: null
    }
  ]);

  const exportTemplates = [
    {
      id: 'financial',
      title: 'รายงานการเงิน',
      description: 'งบดุล กำไรขาดทุน กระแสเงินสด',
      icon: <FileBarChart className="h-6 w-6" />,
      formats: ['PDF', 'Excel'],
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'sales',
      title: 'รายงานการขาย',
      description: 'ยอดขาย สินค้า ลูกค้า',
      icon: <FileSpreadsheet className="h-6 w-6" />,
      formats: ['Excel', 'CSV'],
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'tax',
      title: 'เอกสารภาษี',
      description: 'ใบกำกับภาษี รายงานภาษี',
      icon: <Receipt className="h-6 w-6" />,
      formats: ['PDF'],
      color: 'bg-orange-100 text-orange-800'
    },
    {
      id: 'inventory',
      title: 'รายงานสต็อก',
      description: 'สินค้าคงคลัง การเคลื่อนไหว',
      icon: <Archive className="h-6 w-6" />,
      formats: ['Excel', 'PDF'],
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'customer',
      title: 'ข้อมูลลูกค้า',
      description: 'รายชื่อ ประวัติ การซื้อ',
      icon: <FileText className="h-6 w-6" />,
      formats: ['Excel', 'CSV'],
      color: 'bg-pink-100 text-pink-800'
    },
    {
      id: 'employee',
      title: 'รายงานพนักงาน',
      description: 'เงินเดือน ประสิทธิภาพ ลาออก',
      icon: <FileText className="h-6 w-6" />,
      formats: ['PDF', 'Excel'],
      color: 'bg-indigo-100 text-indigo-800'
    }
  ];

  const branches = [
    { id: 'all', name: 'ทุกสาขา' },
    { id: 'silom', name: 'สาขาสีลม' },
    { id: 'asoke', name: 'สาขาอโศก' },
    { id: 'central', name: 'สาขาเซ็นทรัล' }
  ];

  const handleExport = (templateId: string, format: string) => {
    // Simulate export process
    const newExport = {
      id: `EXP${Date.now()}`,
      type: templateId,
      name: `${exportTemplates.find(t => t.id === templateId)?.title} - ${new Date().toLocaleDateString('th-TH')}`,
      format: format,
      size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
      createdAt: new Date().toISOString(),
      status: 'processing' as const,
      downloadUrl: null
    };

    setExportHistory([newExport, ...exportHistory]);

    toast({
      title: "เริ่มการ Export",
      description: `กำลังสร้าง${exportTemplates.find(t => t.id === templateId)?.title} ในรูปแบบ ${format}`,
    });

    // Simulate completion after 3 seconds
    setTimeout(() => {
      setExportHistory(prev => 
        prev.map(exp => 
          exp.id === newExport.id 
            ? { ...exp, status: 'completed' as const, downloadUrl: '#' }
            : exp
        )
      );
      
      toast({
        title: "Export เสร็จสิ้น",
        description: `${newExport.name} พร้อมดาวน์โหลดแล้ว`,
      });
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'เสร็จสิ้น';
      case 'processing': return 'กำลังประมวลผล';
      default: return 'รอดำเนินการ';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Export เอกสาร</h1>
          <p className="text-gray-600 mt-1">ส่งออกและดาวน์โหลดรายงานต่างๆ</p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <Download className="h-4 w-4 mr-1" />
          Export System
        </Badge>
      </div>

      {/* Export Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2 text-blue-600" />
            ตัวกรองการ Export
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">วันที่เริ่มต้น</label>
              <Input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">วันที่สิ้นสุด</label>
              <Input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">สาขา</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>{branch.name}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Templates */}
      <Card>
        <CardHeader>
          <CardTitle>เทมเพลตการ Export</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exportTemplates.map((template) => (
              <div key={template.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${template.color}`}>
                      {template.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{template.title}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {template.formats.map((format) => (
                    <Button
                      key={format}
                      size="sm"
                      variant="outline"
                      onClick={() => handleExport(template.id, format)}
                      className="text-xs"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      {format}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-gray-600" />
            ประวัติการ Export
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {exportHistory.map((export_item) => (
              <div key={export_item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(export_item.status)}
                  <div>
                    <h4 className="font-semibold">{export_item.name}</h4>
                    <p className="text-sm text-gray-600">
                      {export_item.format} • {export_item.size} • 
                      {new Date(export_item.createdAt).toLocaleDateString('th-TH')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={
                    export_item.status === 'completed' ? 'bg-green-100 text-green-800' :
                    export_item.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }>
                    {getStatusText(export_item.status)}
                  </Badge>
                  {export_item.status === 'completed' && export_item.downloadUrl && (
                    <Button size="sm" onClick={() => toast({ title: "ดาวน์โหลดเริ่มต้น", description: export_item.name })}>
                      <Download className="h-4 w-4 mr-1" />
                      ดาวน์โหลด
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerExport;
