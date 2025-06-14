
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Bot, Settings, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const FinanceAlertSystem = () => {
  const [showSettings, setShowSettings] = useState(false);

  // Mock alert data
  const criticalAlerts = [
    {
      id: 1,
      type: 'cash_flow',
      title: 'กระแสเงินสดต่ำ',
      message: 'เงินสดคงเหลือ 85,000 บาท ต่ำกว่าระดับขั้นต่ำ',
      severity: 'high',
      timestamp: '2025-06-14 09:30:00',
      action: 'ตรวจสอบลูกหนี้และเร่งเก็บเงิน'
    },
    {
      id: 2,
      type: 'expense_spike',
      title: 'ค่าใช้จ่ายเพิ่มขึ้นผิดปกติ',
      message: 'ค่าใช้จ่ายเดือนนี้เพิ่มขึ้น 25% จากเดือนที่แล้ว',
      severity: 'medium',
      timestamp: '2025-06-14 08:15:00',
      action: 'วิเคราะห์หมวดหมู่ค่าใช้จ่ายที่เพิ่มขึ้น'
    },
    {
      id: 3,
      type: 'tax_due',
      title: 'ภาษีใกล้ครบกำหนด',
      message: 'VAT ครบกำหนดชำระใน 5 วัน จำนวน 40,000 บาท',
      severity: 'medium',
      timestamp: '2025-06-14 07:00:00',
      action: 'เตรียมเงินสำหรับชำระภาษี'
    }
  ];

  const aiInsights = [
    {
      type: 'trend',
      title: 'แนวโน้มรายได้',
      insight: 'รายได้เพิ่มขึ้นต่อเนื่อง 3 เดือน คาดการณ์เดือนหน้าจะเพิ่มขึ้นอีก 8%',
      confidence: 85,
      recommendation: 'เตรียมสต็อกสินค้าเพิ่มเติมเพื่อรองรับความต้องการ'
    },
    {
      type: 'optimization',
      title: 'โอกาสลดต้นทุน',
      insight: 'ค่าขนส่งสาขาลาดพร้าวสูงกว่าสาขาอื่น 15% สามารถเจรจาลดราคาได้',
      confidence: 72,
      recommendation: 'เจรจากับผู้ให้บริการขนส่งใหม่ หรือรวมการส่งของ'
    },
    {
      type: 'risk',
      title: 'ความเสี่ยงทางการเงิน',
      insight: 'อัตราส่วนหนี้สินต่อสินทรัพย์เพิ่มขึ้น อาจส่งผลต่อสภาพคล่องในอนาคต',
      confidence: 68,
      recommendation: 'พิจารณาชำระหนี้บางส่วนหรือหาแหล่งเงินทุนเพิ่มเติม'
    }
  ];

  const kpiMonitoring = [
    { name: 'Gross Profit Margin', current: 52.3, target: 55, status: 'warning' },
    { name: 'Current Ratio', current: 1.85, target: 2.0, status: 'warning' },
    { name: 'Debt to Equity', current: 1.16, target: 1.0, status: 'danger' },
    { name: 'ROI', current: 18.5, target: 20, status: 'good' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'danger': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <TrendingUp className="w-4 h-4" />;
      case 'warning': return <TrendingDown className="w-4 h-4" />;
      case 'danger': return <AlertTriangle className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">ระบบแจ้งเตือน / วิเคราะห์ / AI Bot</h2>
          <p className="text-gray-600">การเตือนภัยอัจฉริยะและการวิเคราะห์เชิงลึก</p>
        </div>
        <Button onClick={() => setShowSettings(true)} variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          ตั้งค่าการแจ้งเตือน
        </Button>
      </div>

      {/* Critical Alerts */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="w-5 h-5" />
            การแจ้งเตือนด่วน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {criticalAlerts.map((alert) => (
              <div key={alert.id} className={`border-l-4 pl-4 py-3 ${getSeverityColor(alert.severity)}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                    <p className="text-gray-700 mt-1">{alert.message}</p>
                    <p className="text-sm text-blue-600 mt-2 font-medium">แนะนำ: {alert.action}</p>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    {new Date(alert.timestamp).toLocaleString('th-TH')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            AI Financial Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {aiInsights.map((insight, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {insight.confidence}% แม่นยำ
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{insight.insight}</p>
                <div className="bg-white p-3 rounded-md border-l-4 border-purple-500">
                  <strong className="text-purple-700">💡 คำแนะนำ: </strong>
                  <span className="text-gray-700">{insight.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* KPI Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle>การติดตาม KPI ทางการเงิน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {kpiMonitoring.map((kpi, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-700">{kpi.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(kpi.status)}`}>
                    {getStatusIcon(kpi.status)}
                    {kpi.status === 'good' ? 'ดี' : kpi.status === 'warning' ? 'เฝ้าระวัง' : 'ต้องปรับปรุง'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>ปัจจุบัน: <strong>{kpi.current}%</strong></span>
                  <span>เป้าหมาย: <strong>{kpi.target}%</strong></span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${kpi.status === 'good' ? 'bg-green-500' : kpi.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>ตั้งค่าการแจ้งเตือน</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">เงื่อนไขการแจ้งเตือน</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span>เงินสดต่ำกว่า (บาท)</span>
                      <input type="number" defaultValue="100000" className="w-24 px-2 py-1 border rounded" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>ค่าใช้จ่ายเพิ่มขึ้นเกิน (%)</span>
                      <input type="number" defaultValue="20" className="w-24 px-2 py-1 border rounded" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>แจ้งเตือนภาษีก่อนครบกำหนด (วัน)</span>
                      <input type="number" defaultValue="7" className="w-24 px-2 py-1 border rounded" />
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">ช่องทางแจ้งเตือน</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2" />
                      อีเมล
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2" />
                      LINE Notify
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      SMS
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setShowSettings(false)}>
                    ยกเลิก
                  </Button>
                  <Button onClick={() => setShowSettings(false)}>
                    บันทึกการตั้งค่า
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FinanceAlertSystem;
