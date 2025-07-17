import db from '../../config/db';
import { RevenueData, StaffProductivityData, InventoryAlertData } from './dashboard.types';

export interface AppointmentSummary {
  total: number;
  completed: number;
  cancelled: number;
  pending: number;
}

export interface AppointmentData {
  today: AppointmentSummary;
  upcomingCount: number;
}

export class DashboardService {
  async getTodayRevenue(): Promise<RevenueData> {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Query revenue from appointments and payments for today
    const [todayRevenue] = await db('payments as p')
      .sum({ total_revenue: 'p.amount' })
      .join('appointments as a', 'p.appointment_id', 'a.id')
      .whereRaw('DATE(p.created_at) = CURRENT_DATE');

    // Query revenue from yesterday for comparison
    const [yesterdayRevenue] = await db('payments as p')
      .sum({ total_revenue: 'p.amount' })
      .join('appointments as a', 'p.appointment_id', 'a.id')
      .whereRaw('DATE(p.created_at) = CURRENT_DATE - 1');

    const currentRevenue = todayRevenue?.total_revenue || 0;
    const previousRevenue = yesterdayRevenue?.total_revenue || 0;
    const change = previousRevenue > 0 
      ? ((currentRevenue - previousRevenue) / previousRevenue * 100).toFixed(1)
      : '0';

    return {
      totalRevenue: currentRevenue,
      value: `$${currentRevenue.toLocaleString()}`,
      change: `${change}%`,
      changeType: Number(change) >= 0 ? 'positive' : 'negative',
      comparedToYesterday: previousRevenue
    };
  }

  async getAppointmentsOverview(org_id: string): Promise<AppointmentData> {
    // Get today's appointments
    const [todayStats] = await db('appointments as a')
      .select(db.raw('COUNT(*) as total'))
      .select(db.raw('SUM(CASE WHEN status = \'completed\' THEN 1 ELSE 0 END) as completed'))
      .select(db.raw('SUM(CASE WHEN status = \'cancelled\' THEN 1 ELSE 0 END) as cancelled'))
      .where({ org_id })
      .whereRaw('DATE(a.date) = CURRENT_DATE');

    // Get upcoming appointments
    const [upcomingCount] = await db('appointments as a')
      .count('* as count')
      .where({ org_id })
      .whereRaw('DATE(a.date) > CURRENT_DATE');

    return {
      today: {
        total: Number(todayStats?.total || 0),
        completed: Number(todayStats?.completed || 0),
        cancelled: Number(todayStats?.cancelled || 0),
        pending: Number(todayStats?.total || 0) - 
                Number(todayStats?.completed || 0) - 
                Number(todayStats?.cancelled || 0)
      },
      upcomingCount: Number(upcomingCount?.count || 0)
    };
  }

  async getInventoryAlerts(org_id: string): Promise<InventoryAlertData[]> {
    return db('inventory as i')
      .select(
        'i.id',
        'i.name',
        'i.quantity',
        'i.reorder_level',
        'i.last_restocked_at'
      )
      .where({ org_id })
      .where('quantity', '<=', 'reorder_level')
      .orderBy('quantity', 'asc')
      .limit(10);
  }

  async getStaffProductivity(org_id: string): Promise<StaffProductivityData[]> {
    const startOfWeek = db.raw('DATE_TRUNC(\'week\', CURRENT_DATE)');
    const endOfWeek = db.raw('DATE_TRUNC(\'week\', CURRENT_DATE) + INTERVAL \'6 days\'');

    return db('staff as s')
      .select(
        's.id',
        's.first_name',
        's.last_name',
        db.raw('COUNT(a.id) as total_appointments'),
        db.raw('SUM(CASE WHEN a.status = \'completed\' THEN 1 ELSE 0 END) as completed_appointments'),
        db.raw('AVG(CASE WHEN f.rating IS NOT NULL THEN f.rating ELSE NULL END) as average_rating')
      )
      .leftJoin('appointments as a', 'a.staff_id', 's.id')
      .leftJoin('feedback as f', 'f.appointment_id', 'a.id')
      .where('s.org_id', org_id)
      .whereBetween('a.date', [startOfWeek, endOfWeek])
      .groupBy('s.id', 's.first_name', 's.last_name')
      .orderBy('total_appointments', 'desc')
      .limit(10);
  }
}
