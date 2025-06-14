
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email?: string;
  address: {
    street: string;
    district: string;
    province: string;
    postalCode: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalHistory: {
    allergies: string[];
    chronicDiseases: string[];
    currentMedications: string[];
    bloodType?: string;
  };
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
  };
  registrationDate: string;
  lastVisitDate?: string;
  branchId: string;
  status: 'active' | 'inactive';
  notes?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patient: Patient;
  doctorId: string;
  doctorName: string;
  branchId: string;
  branchName: string;
  appointmentDate: string;
  appointmentTime: string;
  duration: number; // minutes
  serviceType: string;
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  reason: string;
  notes?: string;
  followUpRequired: boolean;
  followUpDate?: string;
  cost?: number;
  paymentStatus?: 'pending' | 'paid' | 'partial' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export const patients: Patient[] = [
  {
    id: 'P001',
    firstName: 'สมใจ',
    lastName: 'ใจดี',
    fullName: 'นางสาว สมใจ ใจดี',
    dateOfBirth: '1985-06-15',
    age: 39,
    gender: 'female',
    phone: '081-234-5678',
    email: 'somjai@email.com',
    address: {
      street: '123 ถนนสุขุมวิท แขวงคลองตัน',
      district: 'เขตวัฒนา',
      province: 'กรุงเทพมหานคร',
      postalCode: '10110'
    },
    emergencyContact: {
      name: 'นายสมชาย ใจดี',
      relationship: 'สามี',
      phone: '081-234-5679'
    },
    medicalHistory: {
      allergies: ['ยาปฏิชีวนะกลุ่ม Penicillin'],
      chronicDiseases: ['โรคเบาหวาน', 'ความดันโลหิตสูง'],
      currentMedications: ['Metformin 500mg', 'Amlodipine 5mg'],
      bloodType: 'B+'
    },
    insuranceInfo: {
      provider: 'บริษัทประกันสุขภาพไทย',
      policyNumber: 'INS-001-2024',
      expiryDate: '2025-12-31'
    },
    registrationDate: '2023-01-15',
    lastVisitDate: '2024-06-10',
    branchId: 'BR001',
    status: 'active',
    notes: 'ผู้ป่วยให้ความร่วมมือดี ต้องการติดตามอาการสายตาเป็นประจำ'
  },
  {
    id: 'P002',
    firstName: 'วิชาญ',
    lastName: 'มองใส',
    fullName: 'นาย วิชาญ มองใส',
    dateOfBirth: '1970-03-22',
    age: 54,
    gender: 'male',
    phone: '082-345-6789',
    email: 'wichan@email.com',
    address: {
      street: '456 ถนนพระราม 4 แขวงคลองเตย',
      district: 'เขตคลองเตย',
      province: 'กรุงเทพมหานคร',
      postalCode: '10110'
    },
    emergencyContact: {
      name: 'นางวิภา มองใส',
      relationship: 'ภรรยา',
      phone: '082-345-6790'
    },
    medicalHistory: {
      allergies: [],
      chronicDiseases: ['ต้อกระจก'],
      currentMedications: ['วิตามินอี'],
      bloodType: 'A+'
    },
    registrationDate: '2022-08-20',
    lastVisitDate: '2024-06-12',
    branchId: 'BR001',
    status: 'active',
    notes: 'เตรียมผ่าตัดต้อกระจกตาซ้าย'
  },
  {
    id: 'P003',
    firstName: 'มาลี',
    lastName: 'ดูแล',
    fullName: 'นางสาว มาลี ดูแล',
    dateOfBirth: '1992-11-08',
    age: 32,
    gender: 'female',
    phone: '083-456-7890',
    email: 'malee@email.com',
    address: {
      street: '789 ถนนทองหล่อ แขวงลุมพินี',
      district: 'เขตปทุมวัน',
      province: 'กรุงเทพมหานคร',
      postalCode: '10330'
    },
    emergencyContact: {
      name: 'นางมณี ดูแล',
      relationship: 'แม่',
      phone: '083-456-7891'
    },
    medicalHistory: {
      allergies: ['อาหารทะเล'],
      chronicDiseases: [],
      currentMedications: [],
      bloodType: 'O+'
    },
    registrationDate: '2023-05-10',
    lastVisitDate: '2024-06-14',
    branchId: 'BR002',
    status: 'active',
    notes: 'ตรวจตาเป็นประจำทุก 6 เดือน'
  }
];

export const appointments: Appointment[] = [
  {
    id: 'A001',
    patientId: 'P001',
    patient: patients[0],
    doctorId: 'D001',
    doctorName: 'นพ.สมชาย รักษาดี',
    branchId: 'BR001',
    branchName: 'สาขาสยาม',
    appointmentDate: '2024-06-15',
    appointmentTime: '09:00',
    duration: 30,
    serviceType: 'ตรวจสายตาทั่วไป',
    status: 'confirmed',
    reason: 'ตรวจสายตาประจำปี และรีวิวแว่นใหม่',
    notes: 'ตรวจตามนัด รีวิวแว่นใหม่',
    followUpRequired: true,
    followUpDate: '2024-09-15',
    cost: 1500,
    paymentStatus: 'paid',
    createdAt: '2024-06-10T08:00:00Z',
    updatedAt: '2024-06-10T08:00:00Z'
  },
  {
    id: 'A002',
    patientId: 'P002',
    patient: patients[1],
    doctorId: 'D002',
    doctorName: 'นพ.หญิง วิภาวดี ใสสะอาด',
    branchId: 'BR001',
    branchName: 'สาขาสยาม',
    appointmentDate: '2024-06-15',
    appointmentTime: '10:30',
    duration: 60,
    serviceType: 'ปรึกษาผ่าตัดต้อกระจก',
    status: 'in-progress',
    reason: 'เตรียมการผ่าตัดต้อกระจกตาซ้าย',
    notes: 'เตรียมการผ่าตัดสัปดาหน้า',
    followUpRequired: true,
    followUpDate: '2024-06-22',
    cost: 5000,
    paymentStatus: 'partial',
    createdAt: '2024-06-12T10:00:00Z',
    updatedAt: '2024-06-12T10:00:00Z'
  },
  {
    id: 'A003',
    patientId: 'P003',
    patient: patients[2],
    doctorId: 'D001',
    doctorName: 'นพ.สมชาย รักษาดี',
    branchId: 'BR002',
    branchName: 'สาขาเอกมัย',
    appointmentDate: '2024-06-15',
    appointmentTime: '14:00',
    duration: 45,
    serviceType: 'ตรวจจอประสาทตา',
    status: 'completed',
    reason: 'ตรวจจอประสาทตาเป็นประจำ',
    notes: 'ผลตรวจปกติ นัดตรวจครั้งต่อไป 6 เดือน',
    followUpRequired: true,
    followUpDate: '2024-12-15',
    cost: 2500,
    paymentStatus: 'paid',
    createdAt: '2024-06-14T12:00:00Z',
    updatedAt: '2024-06-14T15:00:00Z'
  }
];
