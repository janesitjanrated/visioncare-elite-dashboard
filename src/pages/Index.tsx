
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Calendar, Check, FileText, Clock, Plus } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import ServicePerformanceChart from '@/components/dashboard/ServicePerformanceChart';
import AppointmentTrendChart from '@/components/dashboard/AppointmentTrendChart';
import CustomerDemographicsChart from '@/components/dashboard/CustomerDemographicsChart';
import DoctorPerformanceTable from '@/components/dashboard/DoctorPerformanceTable';
import BranchPerformanceChart from '@/components/dashboard/BranchPerformanceChart';
import PaymentMethodChart from '@/components/dashboard/PaymentMethodChart';
import { dashboardStats } from '@/data/mockData';

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="👥 ลูกค้าทั้งหมด"
          value={dashboardStats.totalCustomers}
          change={12.5}
          icon={<User className="w-6 h-6 text-white" />}
          color="bg-blue-500"
        />
        <StatCard
          title="💰 รายได้รวม"
          value={`฿${dashboardStats.totalRevenue.toLocaleString()}`}
          change={18.7}
          icon={<FileText className="w-6 h-6 text-white" />}
          color="bg-green-500"
        />
        <StatCard
          title="📅 นัดหมายวันนี้"
          value={dashboardStats.appointmentsToday}
          change={8.2}
          icon={<Calendar className="w-6 h-6 text-white" />}
          color="bg-purple-500"
        />
        <StatCard
          title="🩺 บริการที่ใช้งาน"
          value={dashboardStats.activeServices}
          change={5.3}
          icon={<Plus className="w-6 h-6 text-white" />}
          color="bg-indigo-500"
        />
        <StatCard
          title="⏳ รอชำระเงิน"
          value={`฿${dashboardStats.pendingPayments.toLocaleString()}`}
          change={-2.1}
          icon={<Clock className="w-6 h-6 text-white" />}
          color="bg-orange-500"
        />
        <StatCard
          title="✅ การรักษาเสร็จสิ้น"
          value={dashboardStats.completedTreatments}
          change={15.8}
          icon={<Check className="w-6 h-6 text-white" />}
          color="bg-emerald-500"
        />
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="overview">📊 ภาพรวม</TabsTrigger>
          <TabsTrigger value="financial">💰 การเงิน</TabsTrigger>
          <TabsTrigger value="appointments">📅 การนัดหมาย</TabsTrigger>
          <TabsTrigger value="customers">👥 ลูกค้า</TabsTrigger>
          <TabsTrigger value="staff">👨‍⚕️ พนักงาน</TabsTrigger>
          <TabsTrigger value="branches">🏢 สาขา</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart />
            <ServicePerformanceChart />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AppointmentTrendChart />
            <CustomerDemographicsChart />
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart />
            <PaymentMethodChart />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📈 แนวโน้มทางการเงิน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">฿1.25M</div>
                  <div className="text-sm text-gray-600">รายได้เดือนนี้</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">68%</div>
                  <div className="text-sm text-gray-600">อัตรากำไร</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">+18.7%</div>
                  <div className="text-sm text-gray-600">การเติบโต</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-6">
          <AppointmentTrendChart />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📋 สถานะการนัดหมายวันนี้
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <span>📅 รอการยืนยัน</span>
                    <span className="font-bold text-blue-600">12 ราย</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span>✅ ยืนยันแล้ว</span>
                    <span className="font-bold text-green-600">36 ราย</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                    <span>⏳ กำลังรักษา</span>
                    <span className="font-bold text-yellow-600">8 ราย</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                    <span>❌ ยกเลิก</span>
                    <span className="font-bold text-red-600">2 ราย</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ⏰ ช่วงเวลายอดนิยม
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>09:00 - 12:00</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2 flex items-center">
                      <div className="w-3/4 bg-blue-500 h-2 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">75%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>13:00 - 16:00</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2 flex items-center">
                      <div className="w-5/6 bg-green-500 h-2 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>17:00 - 20:00</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2 flex items-center">
                      <div className="w-1/2 bg-yellow-500 h-2 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">50%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <CustomerDemographicsChart />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🏆 ลูกค้า VIP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'คุณสมใจ ใจดี', visits: 24, spent: 125000, tier: 'Platinum' },
                  { name: 'คุณมาลี สวยงาม', visits: 18, spent: 98000, tier: 'Gold' },
                  { name: 'คุณนิดา หวานใจ', visits: 15, spent: 75000, tier: 'Gold' },
                  { name: 'คุณสุดา เก่งกาจ', visits: 12, spent: 52000, tier: 'Silver' },
                ].map((customer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {customer.name.charAt(2)}
                      </div>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-600">{customer.visits} ครั้ง • ฿{customer.spent.toLocaleString()}</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      customer.tier === 'Platinum' ? 'bg-gray-100 text-gray-800' :
                      customer.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {customer.tier}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <DoctorPerformanceTable />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📊 ประสิทธิภาพทีมงาน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">4.8</div>
                  <div className="text-sm text-gray-600">คะแนนเฉลี่ย</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">96%</div>
                  <div className="text-sm text-gray-600">ความพึงพอใจ</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">24</div>
                  <div className="text-sm text-gray-600">แพทย์ทั้งหมด</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">156</div>
                  <div className="text-sm text-gray-600">พนักงานทั้งหมด</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branches" className="space-y-6">
          <BranchPerformanceChart />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🏆 สาขาที่มีประสิทธิภาพสูงสุด
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'สาขาสยาม', score: 95, revenue: '650K' },
                    { name: 'สาขาเอกมัย', score: 89, revenue: '580K' },
                    { name: 'สาขาทองหล่อ', score: 85, revenue: '520K' },
                    { name: 'สาขาอารีย์', score: 82, revenue: '480K' },
                  ].map((branch, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded text-white flex items-center justify-center text-sm font-bold">
                          #{index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{branch.name}</div>
                          <div className="text-sm text-gray-600">รายได้: ฿{branch.revenue}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{branch.score}%</div>
                        <div className="text-xs text-gray-500">คะแนน</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📊 เปรียบเทียบสาขา
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>💰 รายได้เฉลี่ย</span>
                    <span className="font-bold">฿557,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>👥 ลูกค้าเฉลี่ย</span>
                    <span className="font-bold">1,066 คน</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>📅 การนัดหมายเฉลี่ย</span>
                    <span className="font-bold">374 ครั้ง</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>📈 การเติบโตเฉลี่ย</span>
                    <span className="font-bold text-green-600">+17.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
