export interface DashboardKPIResponse {
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative';
}

export interface RevenueData extends DashboardKPIResponse {
  totalRevenue: number;
  comparedToYesterday: number;
}

export interface AppointmentData extends DashboardKPIResponse {
  totalAppointments: number;
  completed: number;
  pending: number;
  cancelled: number;
}

export interface InventoryAlertData extends DashboardKPIResponse {
  totalAlerts: number;
  lowStock: number;
  outOfStock: number;
  expiringItems: number;
}

export interface StaffProductivityData extends DashboardKPIResponse {
  averageProductivity: number;
  totalStaff: number;
  highPerformers: number;
  needsImprovement: number;
}
