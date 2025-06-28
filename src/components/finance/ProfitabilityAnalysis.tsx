
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Eye, DollarSign } from 'lucide-react';

export const ProfitabilityAnalysis = () => {
  const [productData] = useState([
    { 
      name: 'Progressive Lens', 
      revenue: 180000, 
      cost: 90000, 
      profit: 90000, 
      margin: 50, 
      volume: 45,
      avgPrice: 4000,
      category: 'high-margin-low-volume'
    },
    { 
      name: 'Blue Light Filter', 
      revenue: 240000, 
      cost: 168000, 
      profit: 72000, 
      margin: 30, 
      volume: 120,
      avgPrice: 2000,
      category: 'high-volume-low-margin'
    },
    { 
      name: 'Titanium Frame', 
      revenue: 150000, 
      cost: 60000, 
      profit: 90000, 
      margin: 60, 
      volume: 25,
      avgPrice: 6000,
      category: 'high-margin-low-volume'
    },
    { 
      name: 'Basic Frame', 
      revenue: 320000, 
      cost: 224000, 
      profit: 96000, 
      margin: 30, 
      volume: 160,
      avgPrice: 2000,
      category: 'high-volume-low-margin'
    },
    { 
      name: 'Contact Lens', 
      revenue: 280000, 
      cost: 168000, 
      profit: 112000, 
      margin: 40, 
      volume: 200,
      avgPrice: 1400,
      category: 'balanced'
    }
  ]);

  const [monthlyTrend] = useState([
    { month: 'ม.ค.', revenue: 380000, cost: 228000, profit: 152000, margin: 40 },
    { month: 'ก.พ.', revenue: 420000, cost: 252000, profit: 168000, margin: 40 },
    { month: 'มี.ค.', revenue: 350000, cost: 217000, profit: 133000, margin: 38 },
    { month: 'เม.ย.', revenue: 480000, cost: 288000, profit: 192000, margin: 40 },
    { month: 'พ.ค.', revenue: 520000, cost: 312000, profit: 208000, margin: 40 },
    { month: 'มิ.ย.', revenue: 450000, cost: 270000, profit: 180000, margin: 40 }
  ]);

  const highMarginLowVolume = productData.filter(p => p.category === 'high-margin-low-volume');
  const highVolumeLowMargin = productData.filter(p => p.category === 'high-volume-low-margin');
  const balanced = productData.filter(p => p.category === 'balanced');

  const totalRevenue = productData.reduce((sum, product) => sum + product.revenue, 0);
  const totalProfit = productData.reduce((sum, product) => sum + product.profit, 0);
  const avgMargin = (totalProfit / totalRevenue) * 100;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">รายได้รวม</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ฿{totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">เดือนนี้</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">กำไรรวม</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ฿{totalProfit.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">Margin: {avgMargin.toFixed(1)}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">สินค้าที่ขายดี</CardTitle>
            <Eye className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {highVolumeLowMargin.length}
            </div>
            <p className="text-xs text-gray-600">Volume สูง Margin ต่ำ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">สินค้ากำไรสูง</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {highMarginLowVolume.length}
            </div>
            <p className="text-xs text-gray-600">Margin สูง Volume ต่ำ</p>
          </CardContent>
        </Card>
      </div>

      {/* Product Profitability Chart */}
      <Card>
        <CardHeader>
          <CardTitle>การวิเคราะห์ความสามารถในการทำกำไรของสินค้า</CardTitle>
          <CardDescription>เปรียบเทียบรายได้ ต้นทุน และกำไรของแต่ละสินค้า</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={productData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `฿${value.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#3b82f6" name="รายได้" />
              <Bar dataKey="cost" fill="#ef4444" name="ต้นทุน" />
              <Bar dataKey="profit" fill="#10b981" name="กำไร" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Profit Trend */}
      <Card>
        <CardHeader>
          <CardTitle>แนวโน้มกำไรรายเดือน</CardTitle>
          <CardDescription>ติดตามการเปลี่ยนแปลงของกำไรและ Margin</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="profit" stroke="#10b981" name="กำไร (฿)" strokeWidth={3} />
              <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#8b5cf6" name="Margin (%)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Product Categories Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-emerald-600">สินค้ากำไรสูง Volume ต่ำ</CardTitle>
            <CardDescription>ควรส่งเสริมการขายเพิ่มเติม</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {highMarginLowVolume.map((product, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-emerald-50 rounded">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">Volume: {product.volume} ชิ้น</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600">{product.margin}%</p>
                    <p className="text-sm">฿{product.profit.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">สินค้า Volume สูง กำไรต่ำ</CardTitle>
            <CardDescription>ควรหาวิธีลดต้นทุนหรือปรับราคา</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {highVolumeLowMargin.map((product, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">Volume: {product.volume} ชิ้น</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">{product.margin}%</p>
                    <p className="text-sm">฿{product.profit.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600">สินค้าสมดุล</CardTitle>
            <CardDescription>Volume และ Margin ที่สมดุลกัน</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {balanced.map((product, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-purple-50 rounded">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">Volume: {product.volume} ชิ้น</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">{product.margin}%</p>
                    <p className="text-sm">฿{product.profit.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
