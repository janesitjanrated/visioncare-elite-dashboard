
import React from 'react';
import { Calendar, User, Clipboard, Users } from 'lucide-react';

const stats = [
  { label: 'รอตรวจ', value: '1', unit: 'คน', icon: Calendar, color: 'bg-emerald-600' },
  { label: 'กำลังตรวจ', value: '1', unit: 'คน', icon: User, color: 'bg-emerald-600' },
  { label: 'ตรวจเสร็จ', value: '0', unit: 'คน', icon: Clipboard, color: 'bg-emerald-600' },
  { label: 'ทั้งหมด', value: '2', unit: 'คน', icon: Users, color: 'bg-emerald-600' }
];

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className={`${stat.color} rounded-xl p-6 text-white`}>
            <div className="flex items-center justify-between mb-4">
              <Icon className="w-6 h-6" />
              <div className="text-right">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.unit}</div>
              </div>
            </div>
            <div className="text-sm font-medium opacity-90">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};
