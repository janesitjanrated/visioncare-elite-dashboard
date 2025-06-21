
import { apiClient } from './api';

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

class DoctorService {
  async getQueues(): Promise<Queue[]> {
    try {
      const response = await apiClient.get('/users');
      return response.data.slice(0, 5).map((user: any, index: number) => ({
        id: `Q${String(user.id).padStart(3, '0')}`,
        patientId: `P${String(user.id).padStart(3, '0')}`,
        patientName: user.name,
        appointmentType: index % 2 === 0 ? 'scheduled' : 'walk-in',
        status: this.getMockQueueStatus(index),
        priority: index === 1 ? 'urgent' : 'normal',
        estimatedTime: this.getMockTime(index),
        actualTime: index === 1 ? '09:45' : undefined,
        doctorId: 'D001',
        doctorName: 'นพ.สมชาย รักษาดี',
        createdAt: new Date().toISOString(),
        notes: index === 1 ? 'ตาแดง เจ็บมาก' : 'ตรวจตามนัด'
      }));
    } catch (error) {
      console.error('Error fetching queues:', error);
      return [];
    }
  }

  async getClaims(): Promise<Claim[]> {
    try {
      const response = await apiClient.get('/users');
      return response.data.slice(0, 3).map((user: any, index: number) => ({
        id: `C${String(user.id).padStart(3, '0')}`,
        orderId: `O${String(user.id).padStart(3, '0')}`,
        patientId: `P${String(user.id).padStart(3, '0')}`,
        patientName: user.name,
        reason: this.getMockClaimReason(index),
        status: 'pending' as const,
        images: [`claim${index + 1}.jpg`],
        createdAt: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error fetching claims:', error);
      return [];
    }
  }

  async getDeliveryOrders(): Promise<DeliveryOrder[]> {
    try {
      const response = await apiClient.get('/users');
      return response.data.slice(0, 4).map((user: any, index: number) => ({
        id: `DO${String(user.id).padStart(3, '0')}`,
        orderId: `O${String(user.id).padStart(3, '0')}`,
        patientId: `P${String(user.id).padStart(3, '0')}`,
        patientName: user.name,
        status: this.getMockDeliveryStatus(index),
        items: [`${user.name.split(' ')[0]} แว่น + เลนส์`],
        qcImages: index === 0 ? [`qc${index + 1}.jpg`] : undefined,
        deliveryMethod: index % 2 === 0 ? 'pickup' : 'delivery',
        deliveryDate: new Date(Date.now() + (index + 3) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }));
    } catch (error) {
      console.error('Error fetching delivery orders:', error);
      return [];
    }
  }

  async getFollowUps(): Promise<FollowUp[]> {
    try {
      const response = await apiClient.get('/users');
      return response.data.slice(0, 6).map((user: any, index: number) => ({
        id: `F${String(user.id).padStart(3, '0')}`,
        patientId: `P${String(user.id).padStart(3, '0')}`,
        patientName: user.name,
        lastVisit: new Date(Date.now() - (index + 1) * 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        nextVisit: new Date(Date.now() + (index + 10) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        followUpType: this.getMockFollowUpType(index),
        status: 'pending' as const,
        promotion: index === 0 ? 'ลด 20% สำหรับการตรวจประจำปี' : undefined
      }));
    } catch (error) {
      console.error('Error fetching follow ups:', error);
      return [];
    }
  }

  async updateQueue(id: string, updates: Partial<Queue>): Promise<Queue> {
    try {
      const response = await apiClient.put(`/users/${id.replace('Q', '')}`, updates);
      return { ...response.data, id };
    } catch (error) {
      console.error('Error updating queue:', error);
      throw error;
    }
  }

  async updateClaim(id: string, updates: Partial<Claim>): Promise<Claim> {
    try {
      const response = await apiClient.put(`/users/${id.replace('C', '')}`, updates);
      return { ...response.data, id };
    } catch (error) {
      console.error('Error updating claim:', error);
      throw error;
    }
  }

  async updateDeliveryOrder(id: string, updates: Partial<DeliveryOrder>): Promise<DeliveryOrder> {
    try {
      const response = await apiClient.put(`/users/${id.replace('DO', '')}`, updates);
      return { ...response.data, id };
    } catch (error) {
      console.error('Error updating delivery order:', error);
      throw error;
    }
  }

  async updateFollowUp(id: string, updates: Partial<FollowUp>): Promise<FollowUp> {
    try {
      const response = await apiClient.put(`/users/${id.replace('F', '')}`, updates);
      return { ...response.data, id };
    } catch (error) {
      console.error('Error updating follow up:', error);
      throw error;
    }
  }

  private getMockQueueStatus(index: number): Queue['status'] {
    const statuses: Queue['status'][] = ['waiting', 'in-progress', 'waiting', 'completed', 'waiting'];
    return statuses[index] || 'waiting';
  }

  private getMockTime(index: number): string {
    const times = ['09:00', '09:30', '10:00', '10:30', '11:00'];
    return times[index] || '12:00';
  }

  private getMockClaimReason(index: number): string {
    const reasons = [
      'แว่นแตก ภายใน 1 สัปดาห์',
      'เลนส์มีรอยขีดข่วน',
      'กรอบแว่นหลวม'
    ];
    return reasons[index] || 'ปัญหาทั่วไป';
  }

  private getMockDeliveryStatus(index: number): DeliveryOrder['status'] {
    const statuses: DeliveryOrder['status'][] = ['qc', 'assembling', 'ready', 'waiting-lens'];
    return statuses[index] || 'waiting-lens';
  }

  private getMockFollowUpType(index: number): FollowUp['followUpType'] {
    const types: FollowUp['followUpType'][] = ['annual', 'chronic', 'post-surgery'];
    return types[index % 3];
  }
}

export const doctorService = new DoctorService();
