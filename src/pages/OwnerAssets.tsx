
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Monitor, 
  Car, 
  Building, 
  Wrench, 
  Calendar, 
  DollarSign,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

const OwnerAssets = () => {
  const assetCategories = [
    {
      name: 'อุปกรณ์การแพทย์',
      icon: <Monitor className="h-6 w-6" />,
      count: 45,
      value: '12,500,000',
      status: 'good'
    },
    {
      name: 'เครื่องมือและอุปกรณ์',
      icon: <Wrench className="h-6 w-6" />,
      count: 128,
      value: '2,850,000',
      status: 'fair'
    },
    {
      name: 'ยานพาหนะ',
      icon: <Car className="h-6 w-6" />,
      count: 8,
      value: '3,200,000',
      status: 'good'
    },
    {
      name: 'อสังหาริมทรัพย์',
      icon: <Building className="h-6 w-6" />,
      count: 3,
      value: '18,500,000',
      status: 'excellent'
    }
  ];

  const recentAssets = [
    {
      name: 'เครื่องตรวจวัดสายตา Topcon KR-1W',
      category: 'อุปกรณ์การแพทย์',
      purchaseDate: '2024-06-15',
      value: '450,000',
      condition: 'ใหม่',
      location: 'สาขาสยาม',
      warranty: '2026-06-15',
      status: 'active'
    },
    {
      name: 'รถตู้ Toyota Commuter',
      category: 'ยานพาหนะ',
      purchaseDate: '2024-05-20',
      value: '1,200,000',
      condition: 'ใหม่',
      location: 'สำนักงานใหญ่',
      warranty: '2027-05-20',
      status: 'active'
    },
    {
      name: 'ชุดเครื่องมือซ่อมแว่น',
      category: 'เครื่องมือและอุปกรณ์',
      purchaseDate: '2024-04-10',
      value: '85,000',
      condition: 'ดี',
      location: 'สาขาลาดพร้าว',
      warranty: '2025-04-10',
      status: 'maintenance'
    }
  ];

  const maintenanceSchedule = [
    {
      asset: 'เครื่องตรวจวัดสายตา Canon RK-F2',
      type: 'บำรุงรักษาประจำปี',
      dueDate: '2024-07-20',
      cost: '15,000',
      priority: 'high'
    },
    {
      asset: 'ระบบปรับอากาศ Daikin',
      type: 'เปลี่ยนไส้กรอง',
      dueDate: '2024-07-25',
      cost: '8,500',
      priority: 'medium'
    },
    {
      asset: 'รถยนต์ Honda City',
      type: 'เปลี่ยนน้ำมันเครื่อง',
      dueDate: '2024-08-05',
      cost: '3,200',
      priority: 'low'
    }
  ];

  const assetMetrics = [
    { title: 'มูลค่าทรัพย์สินรวม', value: '37.05', unit: 'ล้านบาท', change: '+2.1M' },
    { title: 'ค่าเสื่อมราคา/ปี', value: '4.2', unit: 'ล้านบาท', change: '+0.3M' },
    { title: 'ค่าบำรุงรักษา/เดือน', value: '125', unit: 'พันบาท', change: '-12K' },
    { title: 'อายุเฉลี่ย', value: '3.8', unit: 'ปี', change: '+0.2ปี' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'excellent': return 'ดีเยี่ยม';
      case 'good': return 'ดี';
      case 'fair': return 'พอใช้';
      case 'poor': return 'ต้องปรับปรุง';
      case 'active': return 'ใช้งาน';
      case 'maintenance': return 'บำรุงรักษา';
      default: return 'ไม่ระบุ';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ทะเบียนทรัพย์สิน</h1>
          <p className="text-gray-600 mt-1">จัดการและติดตามทรัพย์สินองค์กร</p>
        </div>
        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
          <Package className="h-4 w-4 mr-1" />
          Asset Management
        </Badge>
      </div>

      {/* Asset Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {assetMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                    <span className="text-sm font-normal text-gray-500 ml-1">{metric.unit}</span>
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 font-semibold">{metric.change}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Asset Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {assetCategories.map((category, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm font-medium text-gray-600">
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">จำนวน</span>
                  <span className="font-semibold">{category.count} รายการ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">มูลค่า</span>
                  <span className="font-semibold">{parseInt(category.value).toLocaleString()} ฿</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">สถานะ</span>
                  <Badge className={getStatusColor(category.status)}>
                    {getStatusText(category.status)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Assets */}
      <Card>
        <CardHeader>
          <CardTitle>ทรัพย์สินล่าสุด</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAssets.map((asset, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{asset.name}</h3>
                    <p className="text-sm text-gray-600">{asset.category}</p>
                  </div>
                  <Badge className={getStatusColor(asset.status)}>
                    {getStatusText(asset.status)}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">วันที่ซื้อ</p>
                    <p className="font-semibold">{new Date(asset.purchaseDate).toLocaleDateString('th-TH')}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">มูลค่า</p>
                    <p className="font-semibold">{parseInt(asset.value).toLocaleString()} ฿</p>
                  </div>
                  <div>
                    <p className="text-gray-600">สภาพ</p>
                    <p className="font-semibold">{asset.condition}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">สถานที่</p>
                    <p className="font-semibold">{asset.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">รับประกัน</p>
                    <p className="font-semibold">{new Date(asset.warranty).toLocaleDateString('th-TH')}</p>
                  </div>
                  <div>
                    <Button size="sm" variant="outline">
                      <Package className="h-4 w-4 mr-2" />
                      ดู
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-600" />
            ตารางบำรุงรักษา
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {maintenanceSchedule.map((item, index) => (
              <div key={index} className={`p-4 border-l-4 rounded-lg ${getPriorityColor(item.priority)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{item.asset}</h3>
                    <p className="text-sm text-gray-600">{item.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-500" />
                      <span className="text-sm font-semibold">
                        {new Date(item.dueDate).toLocaleDateString('th-TH')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{parseInt(item.cost).toLocaleString()} ฿</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerAssets;
