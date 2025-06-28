
import React from 'react';
import { Header } from '@/components/Header';
import { DashboardStats } from '@/components/DashboardStats';
import { AppointmentList } from '@/components/AppointmentList';
import { RecentOrders } from '@/components/RecentOrders';
import { InventoryAlert } from '@/components/InventoryAlert';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">แดชบอร์ด</h1>
            <p className="text-gray-600 mt-2">ภาพรวมการดำเนินงานประจำวัน</p>
          </div>

          <div className="space-y-6">
            {/* Stats Cards */}
            <DashboardStats />

            {/* Inventory Alert */}
            <InventoryAlert />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Appointments List */}
              <AppointmentList />
              
              {/* Recent Orders */}
              <RecentOrders />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
