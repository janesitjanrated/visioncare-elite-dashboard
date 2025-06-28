
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  User, 
  Clipboard, 
  ListVideo, 
  Glasses,
  Plus,
  List,
  Menu,
  Package,
  ShoppingCart,
  Eye,
  DollarSign,
  Calculator,
  Users
} from 'lucide-react';

const menuItems = [
  { name: 'เพิ่มคนไข้ใหม่', path: '/new-patient', icon: User },
  { name: 'คิว / นัดหมาย', path: '/appointments', icon: Calendar, active: true },
  { name: 'รายชื่อคนไข้', path: '/patients', icon: List },
  { name: 'สั่งเลนส์ / กรอบแว่น', path: '/lens-orders', icon: Glasses },
  { name: 'แว่นค้างส่ง', path: '/pending-glasses', icon: Eye },
  { name: 'รายการเคลมสินค้า', path: '/claims', icon: ListVideo },
  { name: 'รายการสั่งประกอบ', path: '/assembly', icon: Plus },
  { name: 'ระบบการเงิน', path: '/finance', icon: DollarSign },
  { name: 'จ่ายเงินเดือน', path: '/payroll', icon: Calculator },
  { name: 'จัดการพนักงาน', path: '/employees', icon: Users },
  { name: 'ตาราง / ลา', path: '/schedule', icon: Calendar },
  { name: 'Task Daily', path: '/tasks', icon: Clipboard },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white shadow-lg min-h-full">
      {/* Logo */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
            <Glasses className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">VisionCare</h2>
            <p className="text-sm text-emerald-600 font-medium">Elite</p>
            <p className="text-xs text-gray-500">ระบบบริหารสายตาผู้ใหญ่</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="mt-6 px-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || item.active;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive 
                    ? "bg-emerald-600 text-white" 
                    : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
