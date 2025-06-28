
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Edit, Trash2, Info } from 'lucide-react';
import { AssetForm } from './AssetForm';

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];

export const BalanceSheet = () => {
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);

  const [assets, setAssets] = useState([
    { id: '1', name: 'เงินสด', category: 'current', value: 450000, description: 'เงินสดในมือและธนาคาร' },
    { id: '2', name: 'เงินฝากธนาคาร', category: 'current', value: 800000, description: 'เงินฝากออมทรัพย์และกระแสรายวัน' },
    { id: '3', name: 'ลูกหนี้การค้า', category: 'current', value: 180000, description: 'เงินที่ลูกค้าค้างชำระ' },
    { id: '4', name: 'สินค้าคงเหลือ', category: 'current', value: 350000, description: 'กรอบแว่น เลนส์ และอุปกรณ์' },
    { id: '5', name: 'อุปกรณ์การแพทย์', category: 'fixed', value: 1200000, description: 'เครื่องตรวจสายตาและอุปกรณ์' },
    { id: '6', name: 'เฟอร์นิเจอร์', category: 'fixed', value: 150000, description: 'โต๊ะ เก้าอี้ ตู้' },
    { id: '7', name: 'การปรับปรุงร้าน', category: 'fixed', value: 300000, description: 'ค่าตกแต่งและปรับปรุงสถานที่' }
  ]);

  const [liabilities, setLiabilities] = useState([
    { id: '1', name: 'เจ้าหนี้การค้า', category: 'current', value: 120000, description: 'เงินที่ค้างจ่ายผู้จำหน่าย' },
    { id: '2', name: 'ภาษีค้างจ่าย', category: 'current', value: 45000, description: 'ภาษีมูลค่าเพิ่มและภาษีหัก ณ ที่จ่าย' },
    { id: '3', name: 'เงินเดือนค้างจ่าย', category: 'current', value: 80000, description: 'เงินเดือนพนักงานเดือนปัจจุบัน' },
    { id: '4', name: 'เงินกู้ระยะยาว', category: 'long-term', value: 500000, description: 'เงินกู้ธนาคารสำหรับขยายธุรกิจ' }
  ]);

  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.value, 0);
  const equity = totalAssets - totalLiabilities;

  const assetData = [
    { name: 'เงินสดและเงินฝาก', value: 1250000 },
    { name: 'ลูกหนี้', value: 180000 },
    { name: 'สินค้าคงเหลือ', value: 350000 },
    { name: 'อุปกرณ์และเฟอร์นิเจอร์', value: 1650000 }
  ];

  const handleSaveAsset = (assetData) => {
    if (editingAsset) {
      setAssets(assets.map(asset => 
        asset.id === editingAsset.id ? { ...assetData, id: editingAsset.id } : asset
      ));
      setEditingAsset(null);
    } else {
      setAssets([...assets, { ...assetData, id: Date.now().toString() }]);
    }
    setShowAssetForm(false);
  };

  const handleDeleteAsset = (id) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-emerald-600">สินทรัพย์รวม</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">฿{totalAssets.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">หนี้สินรวม</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">฿{totalLiabilities.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">ส่วนของเจ้าของ</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">฿{equity.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>การกระจายสินทรัพย์</CardTitle>
            <CardDescription>แสดงสัดส่วนสินทรัพย์แต่ละประเภท</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {assetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `฿${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>อัตราส่วนทางการเงิน</CardTitle>
            <CardDescription>ตัวชี้วัดสุขภาพทางการเงิน</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>อัตราส่วนหนี้สินต่อสินทรัพย์</span>
              <span className="font-bold">{((totalLiabilities / totalAssets) * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>อัตราส่วนส่วนของเจ้าของต่อสินทรัพย์</span>
              <span className="font-bold">{((equity / totalAssets) * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Debt-to-Equity Ratio</span>
              <span className="font-bold">{(totalLiabilities / equity).toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assets Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>รายการสินทรัพย์</CardTitle>
              <CardDescription>จัดการสินทรัพย์ทั้งหมดของคลินิก</CardDescription>
            </div>
            <Button onClick={() => setShowAssetForm(true)} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มสินทรัพย์
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">รายการ</th>
                  <th className="text-left p-2">ประเภท</th>
                  <th className="text-right p-2">มูลค่า</th>
                  <th className="text-left p-2">รายละเอียด</th>
                  <th className="text-center p-2">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr key={asset.id} className="border-b">
                    <td className="p-2 font-medium">{asset.name}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        asset.category === 'current' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {asset.category === 'current' ? 'สินทรัพย์หมุนเวียน' : 'สินทรัพย์ถาวร'}
                      </span>
                    </td>
                    <td className="p-2 text-right font-bold">฿{asset.value.toLocaleString()}</td>
                    <td className="p-2 text-sm text-gray-600">{asset.description}</td>
                    <td className="p-2 text-center">
                      <div className="flex justify-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingAsset(asset);
                            setShowAssetForm(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteAsset(asset.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Asset Form Modal */}
      {showAssetForm && (
        <AssetForm
          asset={editingAsset}
          onSave={handleSaveAsset}
          onClose={() => {
            setShowAssetForm(false);
            setEditingAsset(null);
          }}
        />
      )}
    </div>
  );
};
