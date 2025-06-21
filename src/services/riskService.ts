
import { apiClient } from './api';

export interface Risk {
  id: string;
  title: string;
  category: string;
  level: 'high' | 'medium' | 'low';
  impact: string;
  probability: string;
}

export interface MitigationPlan {
  id: string;
  risk: string;
  actions: string[];
  owner: string;
  deadline: string;
  status: 'in-progress' | 'pending' | 'completed';
}

class RiskService {
  async getRisks(): Promise<Risk[]> {
    try {
      const response = await apiClient.get('/posts');
      return response.data.slice(0, 7).map((item: any, index: number) => ({
        id: `R${String(item.id).padStart(3, '0')}`,
        title: this.getMockRiskTitle(index),
        category: this.getMockRiskCategory(index),
        level: this.getMockRiskLevel(index),
        impact: this.getMockImpact(index),
        probability: this.getMockProbability(index)
      }));
    } catch (error) {
      console.error('Error fetching risks:', error);
      return [];
    }
  }

  async getMitigationPlans(): Promise<MitigationPlan[]> {
    try {
      const response = await apiClient.get('/posts');
      return response.data.slice(0, 2).map((item: any, index: number) => ({
        id: `MP${String(item.id).padStart(3, '0')}`,
        risk: this.getMockMitigationRisk(index),
        actions: this.getMockActions(index),
        owner: this.getMockOwner(index),
        deadline: this.getMockDeadline(index),
        status: this.getMockMitigationStatus(index)
      }));
    } catch (error) {
      console.error('Error fetching mitigation plans:', error);
      return [];
    }
  }

  async createRisk(risk: Omit<Risk, 'id'>): Promise<Risk> {
    try {
      const response = await apiClient.post('/posts', risk);
      return { ...risk, id: `R${response.data.id}` };
    } catch (error) {
      console.error('Error creating risk:', error);
      throw error;
    }
  }

  async updateRisk(id: string, risk: Partial<Risk>): Promise<Risk> {
    try {
      const response = await apiClient.put(`/posts/${id.replace('R', '')}`, risk);
      return { ...response.data, id };
    } catch (error) {
      console.error('Error updating risk:', error);
      throw error;
    }
  }

  private getMockRiskTitle(index: number): string {
    const titles = [
      'กระแสเงินสดไม่เพียงพอ',
      'ลูกหนี้เก่าค้างชำระ',
      'ต้นทุนวัตถุดิบเพิ่มขึ้น',
      'พนักงานลาออกบ่อย',
      'อุปกรณ์เสียบ่อย',
      'คุณภาพบริการไม่สม่ำเสมอ',
      'การเปลี่ยนแปลงกฎหมายภาษี'
    ];
    return titles[index] || 'ความเสี่ยงใหม่';
  }

  private getMockRiskCategory(index: number): string {
    const categories = [
      'ความเสี่ยงทางการเงิน',
      'ความเสี่ยงทางการเงิน',
      'ความเสี่ยงทางการเงิน',
      'ความเสี่ยงด้านปฏิบัติการ',
      'ความเสี่ยงด้านปฏิบัติการ',
      'ความเสี่ยงด้านปฏิบัติการ',
      'ความเสี่ยงด้านกฎหมาย'
    ];
    return categories[index] || 'ความเสี่ยงทั่วไป';
  }

  private getMockRiskLevel(index: number): Risk['level'] {
    const levels: Risk['level'][] = ['high', 'medium', 'medium', 'high', 'medium', 'low', 'medium'];
    return levels[index] || 'medium';
  }

  private getMockImpact(index: number): string {
    const impacts = ['สูง', 'ปานกลาง', 'ปานกลาง', 'สูง', 'ปานกลาง', 'ต่ำ', 'สูง'];
    return impacts[index] || 'ปานกลาง';
  }

  private getMockProbability(index: number): string {
    const probabilities = ['ปานกลาง', 'สูง', 'สูง', 'สูง', 'ปานกลาง', 'ต่ำ', 'ต่ำ'];
    return probabilities[index] || 'ปานกลาง';
  }

  private getMockMitigationRisk(index: number): string {
    const risks = ['พนักงานลาออกบ่อย', 'กระแสเงินสดไม่เพียงพอ'];
    return risks[index] || 'ความเสี่ยงทั่วไป';
  }

  private getMockActions(index: number): string[] {
    const actions = [
      ['ปรับปรุงสวัสดิการ', 'เพิ่มโอกาสเติบโต', 'สร้างสภาพแวดล้อมที่ดี'],
      ['ปรับปรุงการเก็บหนี้', 'ขยายช่องทางรายได้', 'ลดต้นทุนที่ไม่จำเป็น']
    ];
    return actions[index] || ['แผนป้องกันทั่วไป'];
  }

  private getMockOwner(index: number): string {
    const owners = ['HR Manager', 'CFO'];
    return owners[index] || 'Manager';
  }

  private getMockDeadline(index: number): string {
    const deadlines = ['2024-08-31', '2024-07-30'];
    return deadlines[index] || '2024-12-31';
  }

  private getMockMitigationStatus(index: number): MitigationPlan['status'] {
    const statuses: MitigationPlan['status'][] = ['in-progress', 'pending'];
    return statuses[index] || 'pending';
  }
}

export const riskService = new RiskService();
