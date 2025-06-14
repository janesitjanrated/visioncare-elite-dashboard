
export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  manager: string;
  status: 'active' | 'inactive';
  establishedDate: string;
  totalStaff: number;
  monthlyRevenue: number;
  monthlyTarget: number;
  area: string;
}

export interface BranchStaff {
  id: string;
  branchId: string;
  name: string;
  position: string;
  department: string;
  startDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'leave';
  email: string;
  phone: string;
}

export interface BranchTarget {
  id: string;
  branchId: string;
  month: string;
  revenueTarget: number;
  customerTarget: number;
  appointmentTarget: number;
  actualRevenue: number;
  actualCustomers: number;
  actualAppointments: number;
  achievementRate: number;
}

export const branches: Branch[] = [
  {
    id: 'BR001',
    name: 'สาขาสยาม',
    address: '123 ถนนพระราม 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330',
    phone: '02-123-4567',
    manager: 'คุณสมชาย จันทร์เพ็ญ',
    status: 'active',
    establishedDate: '2020-01-15',
    totalStaff: 25,
    monthlyRevenue: 650000,
    monthlyTarget: 600000,
    area: 'กรุงเทพ-กลาง'
  },
  {
    id: 'BR002',
    name: 'สาขาเอกมัย',
    address: '456 ถนนสุขุมวิท 63 แขวงเอกมัย เขตวัฒนา กรุงเทพฯ 10110',
    phone: '02-234-5678',
    manager: 'คุณสุภาพร วงษ์ไทย',
    status: 'active',
    establishedDate: '2019-06-20',
    totalStaff: 22,
    monthlyRevenue: 580000,
    monthlyTarget: 550000,
    area: 'กรุงเทพ-ตะวันออก'
  },
  {
    id: 'BR003',
    name: 'สาขาทองหล่อ',
    address: '789 ถนนทองหล่อ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330',
    phone: '02-345-6789',
    manager: 'คุณวิไล ศรีสวัสดิ์',
    status: 'active',
    establishedDate: '2021-03-10',
    totalStaff: 20,
    monthlyRevenue: 520000,
    monthlyTarget: 500000,
    area: 'กรุงเทพ-กลาง'
  }
];

export const branchStaff: BranchStaff[] = [
  {
    id: 'ST001',
    branchId: 'BR001',
    name: 'นางสาวอนันต์ ใจดี',
    position: 'พยาบาลวิชาชีพ',
    department: 'การแพทย์',
    startDate: '2020-02-01',
    salary: 35000,
    status: 'active',
    email: 'anan@visioncare.com',
    phone: '08-1234-5678'
  },
  {
    id: 'ST002',
    branchId: 'BR001',
    name: 'นายพิเชษฐ์ สมบูรณ์',
    position: 'เจ้าหน้าที่รับเคาน์เตอร์',
    department: 'บริการลูกค้า',
    startDate: '2020-03-15',
    salary: 25000,
    status: 'active',
    email: 'pichet@visioncare.com',
    phone: '08-2345-6789'
  }
];

export const branchTargets: BranchTarget[] = [
  {
    id: 'TG001',
    branchId: 'BR001',
    month: '2024-06',
    revenueTarget: 600000,
    customerTarget: 1200,
    appointmentTarget: 450,
    actualRevenue: 650000,
    actualCustomers: 1245,
    actualAppointments: 456,
    achievementRate: 108.3
  },
  {
    id: 'TG002',
    branchId: 'BR002',
    month: '2024-06',
    revenueTarget: 550000,
    customerTarget: 1100,
    appointmentTarget: 400,
    actualRevenue: 580000,
    actualCustomers: 1156,
    actualAppointments: 398,
    achievementRate: 105.5
  }
];
