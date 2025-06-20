
// Mock data for Owner System (ฝั่งเจ้าของ)

export interface FinancialSummary {
  totalRevenue: number;
  totalCost: number;
  netProfit: number;
  grossMargin: number;
  operatingExpenses: number;
  dailyRevenue: { date: string; amount: number }[];
  monthlyRevenue: { month: string; amount: number }[];
  revenueByBranch: { branchId: string; branchName: string; revenue: number }[];
  revenueByDoctor: { doctorId: string; doctorName: string; revenue: number }[];
}

export interface Expense {
  id: string;
  type: 'rent' | 'salary' | 'inventory' | 'utilities' | 'marketing' | 'other';
  description: string;
  amount: number;
  date: string;
  branchId: string;
  branchName: string;
  category: string;
  receipt?: string;
  approved: boolean;
  approvedBy?: string;
}

export interface TaxRecord {
  id: string;
  type: 'vat-sale' | 'vat-purchase' | 'withholding';
  amount: number;
  taxAmount: number;
  date: string;
  description: string;
  documentNo: string;
  branchId: string;
}

export interface Loan {
  id: string;
  bankName: string;
  loanType: string;
  principal: number;
  interestRate: number;
  monthlyPayment: number;
  remainingBalance: number;
  startDate: string;
  endDate: string;
  purpose: string;
  usageTracking: {
    date: string;
    amount: number;
    description: string;
    approved: boolean;
  }[];
}

export interface PerformanceMetric {
  branchId: string;
  branchName: string;
  revenue: number;
  target: number;
  achievement: number;
  customerCount: number;
  averageTicket: number;
  conversionRate: number;
  ranking: number;
  topProducts: string[];
  topSalespeople: string[];
}

export interface Risk {
  id: string;
  type: 'customer' | 'claim' | 'branch' | 'inventory';
  severity: 'low' | 'medium' | 'high';
  description: string;
  impact: string;
  probability: number;
  detectedAt: string;
  status: 'active' | 'mitigated' | 'resolved';
  mitigationPlan?: string;
}

export interface Opportunity {
  id: string;
  type: 'upsell' | 'cross-sell' | 'retention' | 'acquisition';
  description: string;
  potentialValue: number;
  probability: number;
  customerSegment: string;
  actionRequired: string;
  deadline?: string;
  status: 'identified' | 'in-progress' | 'completed';
}

export interface Asset {
  id: string;
  name: string;
  category: 'equipment' | 'furniture' | 'vehicle' | 'technology';
  purchaseDate: string;
  purchaseCost: number;
  currentValue: number;
  depreciationRate: number;
  location: string;
  branchId: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  maintenanceSchedule: string;
  lastMaintenance?: string;
}

export interface Corporation {
  id: string;
  name: string;
  registrationNumber: string;
  taxId: string;
  capital: number;
  branches: {
    branchId: string;
    branchName: string;
    investment: number;
    profitShare: number;
    status: 'active' | 'inactive';
  }[];
  shareholders: {
    name: string;
    percentage: number;
    investment: number;
  }[];
}

export interface GrowthPlan {
  id: string;
  type: 'new-branch' | 'expansion' | 'acquisition';
  location: string;
  estimatedCost: number;
  estimatedRevenue: number;
  paybackPeriod: number;
  roi: number;
  riskFactors: string[];
  timeline: string;
  status: 'planning' | 'approved' | 'in-progress' | 'completed';
}

// Mock data
export const mockFinancialSummary: FinancialSummary = {
  totalRevenue: 2850000,
  totalCost: 1430000,
  netProfit: 890000,
  grossMargin: 49.8,
  operatingExpenses: 530000,
  dailyRevenue: [
    { date: '2024-06-01', amount: 95000 },
    { date: '2024-06-02', amount: 87000 },
    { date: '2024-06-03', amount: 102000 },
    { date: '2024-06-04', amount: 78000 },
    { date: '2024-06-05', amount: 115000 }
  ],
  monthlyRevenue: [
    { month: '2024-01', amount: 2100000 },
    { month: '2024-02', amount: 2250000 },
    { month: '2024-03', amount: 2400000 },
    { month: '2024-04', amount: 2600000 },
    { month: '2024-05', amount: 2750000 },
    { month: '2024-06', amount: 2850000 }
  ],
  revenueByBranch: [
    { branchId: 'BR001', branchName: 'สาขาสยาม', revenue: 1200000 },
    { branchId: 'BR002', branchName: 'สาขาเอกมัย', revenue: 950000 },
    { branchId: 'BR003', branchName: 'สาขาทองหล่อ', revenue: 700000 }
  ],
  revenueByDoctor: [
    { doctorId: 'D001', doctorName: 'นพ.สมชาย รักษาดี', revenue: 1500000 },
    { doctorId: 'D002', doctorName: 'นพ.หญิง วิภาวดี ใสสะอาด', revenue: 1350000 }
  ]
};

export const mockExpenses: Expense[] = [
  {
    id: 'E001',
    type: 'rent',
    description: 'ค่าเช่าอาคาร เดือน มิ.ย. 2024',
    amount: 150000,
    date: '2024-06-01',
    branchId: 'BR001',
    branchName: 'สาขาสยาม',
    category: 'ค่าใช้จ่ายประจำ',
    approved: true,
    approvedBy: 'Owner'
  },
  {
    id: 'E002',
    type: 'salary',
    description: 'เงินเดือนพนักงาน เดือน มิ.ย. 2024',
    amount: 280000,
    date: '2024-06-01',
    branchId: 'BR001',
    branchName: 'สาขาสยาม',
    category: 'ค่าแรงงาน',
    approved: true,
    approvedBy: 'Owner'
  }
];

export const mockRisks: Risk[] = [
  {
    id: 'R001',
    type: 'customer',
    severity: 'medium',
    description: 'ลูกค้า VIP ขาด revisit มากกว่า 6 เดือน',
    impact: 'สูญเสียรายได้ประมาณ 50,000 บาท/ปี',
    probability: 70,
    detectedAt: '2024-06-15',
    status: 'active'
  },
  {
    id: 'R002',
    type: 'branch',
    severity: 'high',
    description: 'สาขาทองหล่อขาดทุนติดต่อกัน 3 เดือน',
    impact: 'ขาดทุนสะสม 150,000 บาท',
    probability: 85,
    detectedAt: '2024-06-10',
    status: 'active',
    mitigationPlan: 'ปรับกลยุทธ์การตลาด และลดค่าใช้จ่าย'
  }
];

export const mockOpportunities: Opportunity[] = [
  {
    id: 'O001',
    type: 'upsell',
    description: 'ลูกค้าที่ซื้อกรอบอย่างเดียว สามารถเสนอเลนส์ปรับแสง',
    potentialValue: 120000,
    probability: 60,
    customerSegment: 'ลูกค้าที่ซื้อกรอบราคา 5,000+ บาท',
    actionRequired: 'ฝึกอบรมพนักงานขายเทคนิค upselling',
    deadline: '2024-07-15',
    status: 'identified'
  }
];

export const mockAssets: Asset[] = [
  {
    id: 'A001',
    name: 'เครื่องตรวจวัดสายตาอัตโนมัติ',
    category: 'equipment',
    purchaseDate: '2023-01-15',
    purchaseCost: 450000,
    currentValue: 360000,
    depreciationRate: 20,
    location: 'ห้องตรวจ 1',
    branchId: 'BR001',
    condition: 'excellent',
    maintenanceSchedule: 'ทุก 6 เดือน',
    lastMaintenance: '2024-01-15'
  }
];

export const mockCorporation: Corporation = {
  id: 'CORP001',
  name: 'บริษัท วิชั่นแคร์ เอลิท จำกัด',
  registrationNumber: '0105564000123',
  taxId: '0105564000123',
  capital: 5000000,
  branches: [
    {
      branchId: 'BR001',
      branchName: 'สาขาสยาม',
      investment: 2000000,
      profitShare: 45,
      status: 'active'
    },
    {
      branchId: 'BR002',
      branchName: 'สาขาเอกมัย',
      investment: 1800000,
      profitShare: 35,
      status: 'active'
    },
    {
      branchId: 'BR003',
      branchName: 'สาขาทองหล่อ',
      investment: 1200000,
      profitShare: 20,
      status: 'active'
    }
  ],
  shareholders: [
    { name: 'นายสมชาย ใจดี', percentage: 60, investment: 3000000 },
    { name: 'นางสาว วิภาวดี สว่างใส', percentage: 40, investment: 2000000 }
  ]
};

export const mockGrowthPlans: GrowthPlan[] = [
  {
    id: 'GP001',
    type: 'new-branch',
    location: 'ห้างสรรพสินค้าเซ็นทรัล ลาดพร้าว',
    estimatedCost: 2500000,
    estimatedRevenue: 3600000,
    paybackPeriod: 18,
    roi: 44,
    riskFactors: ['การแข่งขันสูง', 'ค่าเช่าแพง'],
    timeline: '6 เดือน',
    status: 'planning'
  }
];
