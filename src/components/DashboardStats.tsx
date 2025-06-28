
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, Package, DollarSign } from 'lucide-react';
import { usePatients } from '@/hooks/usePatients';
import { useAppointments } from '@/hooks/useAppointments';
import { useOrders } from '@/hooks/useOrders';

export const DashboardStats = () => {
  const { patients } = usePatients();
  const { appointments } = useAppointments();
  const { orders } = useOrders();

  const todayAppointments = appointments.filter(appointment => 
    new Date(appointment.appointment_date).toDateString() === new Date().toDateString()
  );

  const thisMonthRevenue = orders
    .filter(order => {
      const orderDate = new Date(order.order_date);
      const now = new Date();
      return orderDate.getMonth() === now.getMonth() && 
             orderDate.getFullYear() === now.getFullYear() &&
             order.payment_status === 'paid';
    })
    .reduce((total, order) => total + order.total_amount, 0);

  const pendingOrders = orders.filter(order => 
    order.status === 'pending' || order.status === 'in_production'
  ).length;

  const stats = [
    {
      title: "ผู้ป่วยทั้งหมด",
      value: patients.length.toString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "นัดหมายวันนี้",
      value: todayAppointments.length.toString(),
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "คำสั่งซื้อที่รอดำเนินการ",
      value: pendingOrders.toString(),
      icon: Package,
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      title: "รายได้เดือนนี้",
      value: `฿${thisMonthRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
