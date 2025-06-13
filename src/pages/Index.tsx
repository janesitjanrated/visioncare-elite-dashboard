
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, Calendar, Building, ChartBar } from 'lucide-react';
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
    <div className="space-y-4">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <StatCard
          title="ลูกค้าทั้งหมด"
          value={dashboardStats.totalCustomers}
          change={12.5}
          icon={<Users className="w-4 h-4 text-white" />}
          color="bg-emerald-600"
        />
        <StatCard
          title="รายได้รวม"
          value={`฿${dashboardStats.totalRevenue.toLocaleString()}`}
          change={18.7}
          icon={<DollarSign className="w-4 h-4 text-white" />}
          color="bg-teal-600"
        />
        <StatCard
          title="นัดหมายวันนี้"
          value={dashboardStats.appointmentsToday}
          change={8.2}
          icon={<Calendar className="w-4 h-4 text-white" />}
          color="bg-emerald-600"
        />
        <StatCard
          title="บริการที่ใช้งาน"
          value={dashboardStats.activeServices}
          change={5.3}
          icon={<ChartBar className="w-4 h-4 text-white" />}
          color="bg-teal-600"
        />
        <StatCard
          title="รอชำระเงิน"
          value={`฿${dashboardStats.pendingPayments.toLocaleString()}`}
          change={-2.1}
          icon={<DollarSign className="w-4 h-4 text-white" />}
          color="bg-gray-500"
        />
        <StatCard
          title="การรักษาเสร็จสิ้น"
          value={dashboardStats.completedTreatments}
          change={15.8}
          icon={<Building className="w-4 h-4 text-white" />}
          color="bg-emerald-600"
        />
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RevenueChart />
        <ServicePerformanceChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AppointmentTrendChart />
        <CustomerDemographicsChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PaymentMethodChart />
        <BranchPerformanceChart />
      </div>

      <DoctorPerformanceTable />

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Users className="h-4 w-4 text-emerald-600" />
              ลูกค้า VIP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { name: 'คุณสมใจ ใจดี', tier: 'Platinum', spent: 125000 },
                { name: 'คุณมาลี สวยงาม', tier: 'Gold', spent: 98000 },
                { name: 'คุณนิดา หวานใจ', tier: 'Gold', spent: 75000 },
              ].map((customer, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-gray-500">฿{customer.spent.toLocaleString()}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    customer.tier === 'Platinum' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {customer.tier}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Calendar className="h-4 w-4 text-emerald-600" />
              สถานะการนัดหมาย
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span>รอการยืนยัน</span>
                <span className="font-bold text-blue-600">12 ราย</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>ยืนยันแล้ว</span>
                <span className="font-bold text-green-600">36 ราย</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>กำลังรักษา</span>
                <span className="font-bold text-yellow-600">8 ราย</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>ยกเลิก</span>
                <span className="font-bold text-red-600">2 ราย</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <ChartBar className="h-4 w-4 text-emerald-600" />
              ประสิทธิภาพทีมงาน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">4.8</div>
                <div className="text-xs text-gray-600">คะแนนเฉลี่ย</div>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">96%</div>
                <div className="text-xs text-gray-600">ความพึงพอใจ</div>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">24</div>
                <div className="text-xs text-gray-600">แพทย์ทั้งหมด</div>
              </div>
              <div className="p-2 bg-orange-50 rounded-lg">
                <div className="text-lg font-bold text-orange-600">156</div>
                <div className="text-xs text-gray-600">พนักงานทั้งหมด</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Building className="h-4 w-4 text-emerald-600" />
              เปรียบเทียบสาขา
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span>รายได้เฉลี่ย</span>
                <span className="font-bold">฿557,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span>ลูกค้าเฉลี่ย</span>
                <span className="font-bold">1,066 คน</span>
              </div>
              <div className="flex justify-between items-center">
                <span>การนัดหมายเฉลี่ย</span>
                <span className="font-bold">374 ครั้ง</span>
              </div>
              <div className="flex justify-between items-center">
                <span>การเติบโตเฉลี่ย</span>
                <span className="font-bold text-green-600">+17.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
