
// Mock data for Doctor System (ฝั่งหมอ)

export interface Queue {
  id: string;
  patientId: string;
  patientName: string;
  appointmentType: 'walk-in' | 'scheduled';
  status: 'waiting' | 'in-progress' | 'completed' | 'no-show';
  priority: 'normal' | 'urgent';
  estimatedTime: string;
  actualTime?: string;
  doctorId: string;
  doctorName: string;
  createdAt: string;
  notes?: string;
}

export interface ExaminationForm {
  id: string;
  patientId: string;
  patientInfo: {
    name: string;
    age: number;
    gender: string;
    phone: string;
    address: string;
  };
  chiefComplaint: string;
  presentHistory: string;
  pastMedicalHistory: string;
  visualAcuity: {
    rightEye: { distance: string; near: string; };
    leftEye: { distance: string; near: string; };
  };
  refraction: {
    rightEye: { sphere: number; cylinder: number; axis: number; };
    leftEye: { sphere: number; cylinder: number; axis: number; };
  };
  functionalTest: {
    binocularVision: string;
    accommodation: string;
    convergence: string;
  };
  vergence: string;
  maddoxTest: string;
  phoria: string;
  iop: { rightEye: number; leftEye: number; };
  bloodPressure: { systolic: number; diastolic: number; };
  diagnosis: string;
  icd10Code: string;
  doctorAdvice: string;
  attachments: string[];
  create: string;
  doctorId: string;
  doctorName: string;
}

export interface SalesItem {
  id: string;
  sku: string;
  name: string;
  category: 'frame' | 'lens' | 'accessory';
  price: number;
  cost: number;
  margin: number;
  stock: number;
  branchStock: { [branchId: string]: number };
  promotion?: {
    type: 'discount' | 'bundle';
    value: number;
    description: string;
  };
}

export interface Claim {
  id: string;
  orderId: string;
  patientId: string;
  patientName: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  images: string[];
  createdAt: string;
  resolvedAt?: string;
  resolution?: string;
}

export interface DeliveryOrder {
  id: string;
  orderId: string;
  patientId: string;
  patientName: string;
  status: 'waiting-lens' | 'assembling' | 'qc' | 'ready' | 'delivered';
  items: string[];
  qcImages?: string[];
  deliveryMethod: 'pickup' | 'delivery';
  deliveryDate?: string;
  trackingNumber?: string;
  deliveryNote?: string;
  receivedBy?: string;
  receivedAt?: string;
}

export interface FollowUp {
  id: string;
  patientId: string;
  patientName: string;
  lastVisit: string;
  nextVisit: string;
  followUpType: 'annual' | 'chronic' | 'post-surgery';
  status: 'pending' | 'contacted' | 'scheduled' | 'completed';
  callDate?: string;
  callBy?: string;
  notes?: string;
  promotion?: string;
}

export interface PrescriptionNote {
  id: string;
  patientId: string;
  patientName: string;
  finalRx: {
    rightEye: { sphere: number; cylinder: number; axis: number; add?: number; };
    leftEye: { sphere: number; cylinder: number; axis: number; add?: number; };
  };
  specialNotes: string;
  restrictions: string[];
  createdAt: string;
  doctorId: string;
  doctorName: string;
}

// Mock data
export const mockQueues: Queue[] = [
  {
    id: 'Q001',
    patientId: 'P001',
    patientName: 'นางสาว สมใจ ใจดี',
    appointmentType: 'scheduled',
    status: 'waiting',
    priority: 'normal',
    estimatedTime: '09:00',
    doctorId: 'D001',
    doctorName: 'นพ.สมชาย รักษาดี',
    createdAt: '2024-06-15T08:30:00Z',
    notes: 'ตรวจตามนัด'
  },
  {
    id: 'Q002',
    patientId: 'P002',
    patientName: 'นาย วิชาญ มองใส',
    appointmentType: 'walk-in',
    status: 'in-progress',
    priority: 'urgent',
    estimatedTime: '09:30',
    actualTime: '09:45',
    doctorId: 'D001',
    doctorName: 'นพ.สมชาย รักษาดี',
    createdAt: '2024-06-15T09:15:00Z',
    notes: 'ตาแดง เจ็บมาก'
  }
];

export const mockSalesItems: SalesItem[] = [
  {
    id: 'S001',
    sku: 'RAY-001',
    name: 'Ray-Ban Classic Aviator',
    category: 'frame',
    price: 8500,
    cost: 5000,
    margin: 41.2,
    stock: 15,
    branchStock: { 'BR001': 5, 'BR002': 10 },
    promotion: {
      type: 'discount',
      value: 10,
      description: 'ลด 10% สำหรับลูกค้าเก่า'
    }
  },
  {
    id: 'S002',
    sku: 'LENS-001',
    name: 'Progressive Lens Premium',
    category: 'lens',
    price: 12000,
    cost: 7000,
    margin: 41.7,
    stock: 8,
    branchStock: { 'BR001': 3, 'BR002': 5 }
  }
];

export const mockClaims: Claim[] = [
  {
    id: 'C001',
    orderId: 'O001',
    patientId: 'P001',
    patientName: 'นางสาว สมใจ ใจดี',
    reason: 'แว่นแตก ภายใน 1 สัปดาห์',
    status: 'pending',
    images: ['claim1.jpg'],
    createdAt: '2024-06-10T10:00:00Z'
  }
];

export const mockDeliveryOrders: DeliveryOrder[] = [
  {
    id: 'DO001',
    orderId: 'O001',
    patientId: 'P001',
    patientName: 'นางสาว สมใจ ใจดี',
    status: 'qc',
    items: ['Ray-Ban Classic + Progressive Lens'],
    qcImages: ['qc1.jpg'],
    deliveryMethod: 'pickup',
    deliveryDate: '2024-06-20'
  }
];

export const mockFollowUps: FollowUp[] = [
  {
    id: 'F001',
    patientId: 'P001',
    patientName: 'นางสาว สมใจ ใจดี',
    lastVisit: '2024-01-15',
    nextVisit: '2024-07-15',
    followUpType: 'annual',
    status: 'pending',
    promotion: 'ลด 20% สำหรับการตรวจประจำปี'
  }
];

export const mockPrescriptionNotes: PrescriptionNote[] = [
  {
    id: 'RX001',
    patientId: 'P001',
    patientName: 'นางสาว สมใจ ใจดี',
    finalRx: {
      rightEye: { sphere: -2.50, cylinder: -0.75, axis: 180 },
      leftEye: { sphere: -2.25, cylinder: -0.50, axis: 170 }
    },
    specialNotes: 'ควรใส่แว่นตลอดเวลา หลีกเลี่ยงแสงแรง',
    restrictions: ['ห้ามใส่เลนส์บาง', 'ตาแพ้แสง'],
    createdAt: '2024-06-15T14:00:00Z',
    doctorId: 'D001',
    doctorName: 'นพ.สมชาย รักษาดี'
  }
];
