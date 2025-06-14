
export interface Feedback {
  id: string;
  customerId: string;
  customerName: string;
  appointmentId: string;
  branchId: string;
  branchName: string;
  serviceType: string;
  rating: number;
  comment: string;
  category: 'service' | 'staff' | 'facility' | 'price' | 'overall';
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
  respondedAt?: string;
  respondedBy?: string;
  response?: string;
}

export interface FeedbackSuggestion {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'new' | 'under_review' | 'implemented' | 'rejected';
  category: 'service_improvement' | 'new_service' | 'facility' | 'process' | 'other';
  createdAt: string;
  implementedAt?: string;
  votes: number;
}

export interface SatisfactionMetrics {
  period: string;
  totalFeedbacks: number;
  averageRating: number;
  responseRate: number;
  resolutionTime: number;
  satisfactionScore: number;
  npsScore: number;
}

export const feedbacks: Feedback[] = [
  {
    id: 'FB001',
    customerId: 'C001',
    customerName: 'คุณสมใจ ใจดี',
    appointmentId: 'APP001',
    branchId: 'BR001',
    branchName: 'สาขาสยาม',
    serviceType: 'Laser Hair Removal',
    rating: 5,
    comment: 'บริการดีมาก พนักงานใจดี อธิบายรายละเอียดชัดเจน',
    category: 'service',
    status: 'reviewed',
    createdAt: '2024-06-10T14:30:00Z',
    respondedAt: '2024-06-11T09:15:00Z',
    respondedBy: 'คุณสมชาย จันทร์เพ็ญ',
    response: 'ขอบคุณสำหรับข้อเสนอแนะ เรายินดีที่ได้ให้บริการคุณ'
  },
  {
    id: 'FB002',
    customerId: 'C002',
    customerName: 'คุณวิไล สวยงาม',
    appointmentId: 'APP002',
    branchId: 'BR001',
    branchName: 'สาขาสยาม',
    serviceType: 'Facial Treatment',
    rating: 4,
    comment: 'ผลลัพธ์ดี แต่รอนานหน่อย',
    category: 'service',
    status: 'pending',
    createdAt: '2024-06-12T16:45:00Z'
  },
  {
    id: 'FB003',
    customerId: 'C003',
    customerName: 'คุณประหยัด รักษ์เงิน',
    appointmentId: 'APP003',
    branchId: 'BR002',
    branchName: 'สาขาเอกมัย',
    serviceType: 'Botox Injection',
    rating: 3,
    comment: 'ราคาค่อนข้างแพง เมื่อเทียบกับที่อื่น',
    category: 'price',
    status: 'reviewed',
    createdAt: '2024-06-08T11:20:00Z',
    respondedAt: '2024-06-09T13:30:00Z',
    respondedBy: 'คุณสุภาพร วงษ์ไทย',
    response: 'ขอบคุณสำหรับความคิดเห็น เราจะพิจารณาปรับปรุงเรื่องราคา'
  }
];

export const feedbackSuggestions: FeedbackSuggestion[] = [
  {
    id: 'SG001',
    customerId: 'C004',
    customerName: 'คุณนวดี ไอเดีย',
    title: 'เพิ่มบริการ Online Consultation',
    description: 'อยากให้มีบริการปรึกษาแพทย์ออนไลน์ก่อนมาทำจริง',
    priority: 'high',
    status: 'under_review',
    category: 'new_service',
    createdAt: '2024-06-05T10:00:00Z',
    votes: 45
  },
  {
    id: 'SG002',
    customerId: 'C005',
    customerName: 'คุณสะดวก รวดเร็ว',
    title: 'ระบบจองคิวออนไลน์',
    description: 'ควรมีแอพสำหรับจองคิวและเช็คสถานะการรอ',
    priority: 'medium',
    status: 'implemented',
    category: 'process',
    createdAt: '2024-05-20T14:30:00Z',
    implementedAt: '2024-06-01T00:00:00Z',
    votes: 78
  }
];

export const satisfactionMetrics: SatisfactionMetrics[] = [
  {
    period: '2024-06',
    totalFeedbacks: 156,
    averageRating: 4.3,
    responseRate: 85,
    resolutionTime: 2.5,
    satisfactionScore: 86,
    npsScore: 42
  },
  {
    period: '2024-05',
    totalFeedbacks: 142,
    averageRating: 4.1,
    responseRate: 82,
    resolutionTime: 3.1,
    satisfactionScore: 82,
    npsScore: 38
  }
];
