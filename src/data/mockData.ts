
import { 
  DashboardStats, 
  RevenueData, 
  ServicePerformance, 
  AppointmentData,
  CustomerDemographic,
  DoctorPerformance,
  BranchPerformance,
  PaymentMethodData
} from '@/types/dashboard';

export const dashboardStats: DashboardStats = {
  totalCustomers: 2847,
  totalRevenue: 1250000,
  appointmentsToday: 48,
  activeServices: 127,
  pendingPayments: 85000,
  completedTreatments: 1532
};

export const revenueData: RevenueData[] = [
  { month: 'ม.ค.', revenue: 850000, expenses: 420000, profit: 430000 },
  { month: 'ก.พ.', revenue: 920000, expenses: 450000, profit: 470000 },
  { month: 'มี.ค.', revenue: 1100000, expenses: 480000, profit: 620000 },
  { month: 'เม.ย.', revenue: 980000, expenses: 460000, profit: 520000 },
  { month: 'พ.ค.', revenue: 1150000, expenses: 520000, profit: 630000 },
  { month: 'มิ.ย.', revenue: 1250000, expenses: 540000, profit: 710000 },
];

export const servicePerformance: ServicePerformance[] = [
  { name: 'Laser Hair Removal', revenue: 450000, bookings: 245, growthRate: 15.2 },
  { name: 'Facial Treatment', revenue: 320000, bookings: 412, growthRate: 12.8 },
  { name: 'Botox Injection', revenue: 280000, bookings: 156, growthRate: 8.5 },
  { name: 'Chemical Peeling', revenue: 200000, bookings: 189, growthRate: 22.1 },
  { name: 'Dermal Fillers', revenue: 180000, bookings: 98, growthRate: 18.7 },
  { name: 'Acne Treatment', revenue: 150000, bookings: 234, growthRate: 7.3 },
];

export const appointmentData: AppointmentData[] = [
  { date: '2024-06-07', booked: 45, completed: 38, cancelled: 5, noShow: 2 },
  { date: '2024-06-08', booked: 52, completed: 48, cancelled: 3, noShow: 1 },
  { date: '2024-06-09', booked: 38, completed: 35, cancelled: 2, noShow: 1 },
  { date: '2024-06-10', booked: 56, completed: 51, cancelled: 4, noShow: 1 },
  { date: '2024-06-11', booked: 48, completed: 44, cancelled: 3, noShow: 1 },
  { date: '2024-06-12', booked: 61, completed: 55, cancelled: 4, noShow: 2 },
  { date: '2024-06-13', booked: 48, completed: 0, cancelled: 0, noShow: 0 },
];

export const customerDemographics: CustomerDemographic[] = [
  { ageGroup: '18-25', count: 425, percentage: 15 },
  { ageGroup: '26-35', count: 854, percentage: 30 },
  { ageGroup: '36-45', count: 711, percentage: 25 },
  { ageGroup: '46-55', count: 569, percentage: 20 },
  { ageGroup: '56+', count: 288, percentage: 10 },
];

export const doctorPerformance: DoctorPerformance[] = [
  { name: 'Dr. สุชาติ วิทยาเศรษฐ์', appointments: 156, revenue: 420000, rating: 4.9, specialization: 'Dermatologist' },
  { name: 'Dr. อัญชลี นิติธรรม', appointments: 142, revenue: 380000, rating: 4.8, specialization: 'Aesthetic Medicine' },
  { name: 'Dr. ภูวนาท สมบูรณ์', appointments: 134, revenue: 350000, rating: 4.7, specialization: 'Plastic Surgery' },
  { name: 'Dr. รัชนี เจริญสุข', appointments: 128, revenue: 320000, rating: 4.8, specialization: 'Dermatologist' },
];

export const branchPerformance: BranchPerformance[] = [
  { name: 'สาขาสยาม', revenue: 650000, customers: 1245, appointments: 456, growth: 18.5 },
  { name: 'สาขาเอกมัย', revenue: 580000, customers: 1156, appointments: 398, growth: 15.2 },
  { name: 'สาขาทองหล่อ', revenue: 520000, customers: 986, appointments: 342, growth: 12.8 },
  { name: 'สาขาอารีย์', revenue: 480000, customers: 876, appointments: 298, growth: 22.1 },
];

export const paymentMethodData: PaymentMethodData[] = [
  { method: 'เงินสด', amount: 450000, percentage: 36, color: '#22c55e' },
  { method: 'บัตรเครดิต', amount: 400000, percentage: 32, color: '#3b82f6' },
  { method: 'โอนผ่านธนาคาร', amount: 300000, percentage: 24, color: '#f59e0b' },
  { method: 'QR Code', amount: 100000, percentage: 8, color: '#8b5cf6' },
];

export const monthlyTrends = [
  { month: 'ม.ค.', customers: 2450, appointments: 1245, satisfaction: 4.6 },
  { month: 'ก.พ.', customers: 2520, appointments: 1320, satisfaction: 4.7 },
  { month: 'มี.ค.', customers: 2650, appointments: 1456, satisfaction: 4.7 },
  { month: 'เม.ย.', customers: 2720, appointments: 1398, satisfaction: 4.8 },
  { month: 'พ.ค.', customers: 2780, appointments: 1567, satisfaction: 4.8 },
  { month: 'มิ.ย.', customers: 2847, appointments: 1632, satisfaction: 4.9 },
];
