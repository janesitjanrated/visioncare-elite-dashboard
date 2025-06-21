
import { apiClient } from './api';

export interface Opportunity {
  id: string;
  title: string;
  category: 'expansion' | 'service' | 'b2b' | 'digital';
  potential: 'สูง' | 'ปานกลาง' | 'ต่ำ';
  investment: string;
  roi: string;
  timeframe: string;
  status: 'evaluating' | 'planning' | 'ready';
  description: string;
}

export interface MarketTrend {
  id: string;
  trend: string;
  impact: 'สูง' | 'ปานกลาง';
  opportunity: string;
}

class OpportunityService {
  async getOpportunities(): Promise<Opportunity[]> {
    try {
      // Mock implementation - replace with real API
      const response = await apiClient.get('/posts');
      // Transform mock data to match our interface
      return response.data.slice(0, 4).map((item: any, index: number) => ({
        id: `OPP${String(item.id).padStart(3, '0')}`,
        title: this.getMockOpportunityTitle(index),
        category: this.getMockCategory(index),
        potential: this.getMockPotential(index),
        investment: this.getMockInvestment(index),
        roi: this.getMockRoi(index),
        timeframe: this.getMockTimeframe(index),
        status: this.getMockStatus(index),
        description: item.title
      }));
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      return [];
    }
  }

  async createOpportunity(opportunity: Omit<Opportunity, 'id'>): Promise<Opportunity> {
    try {
      const response = await apiClient.post('/posts', opportunity);
      return { ...opportunity, id: `OPP${response.data.id}` };
    } catch (error) {
      console.error('Error creating opportunity:', error);
      throw error;
    }
  }

  async updateOpportunity(id: string, opportunity: Partial<Opportunity>): Promise<Opportunity> {
    try {
      const response = await apiClient.put(`/posts/${id.replace('OPP', '')}`, opportunity);
      return { ...response.data, id };
    } catch (error) {
      console.error('Error updating opportunity:', error);
      throw error;
    }
  }

  async deleteOpportunity(id: string): Promise<void> {
    try {
      await apiClient.delete(`/posts/${id.replace('OPP', '')}`);
    } catch (error) {
      console.error('Error deleting opportunity:', error);
      throw error;
    }
  }

  async getMarketTrends(): Promise<MarketTrend[]> {
    try {
      const response = await apiClient.get('/posts');
      return response.data.slice(0, 4).map((item: any, index: number) => ({
        id: `MT${String(item.id).padStart(3, '0')}`,
        trend: this.getMockTrend(index),
        impact: index % 2 === 0 ? 'สูง' : 'ปานกลาง',
        opportunity: item.title.substring(0, 30) + '...'
      }));
    } catch (error) {
      console.error('Error fetching market trends:', error);
      return [];
    }
  }

  private getMockOpportunityTitle(index: number): string {
    const titles = [
      'ขยายสาขาใหม่ในห้างสรรพสินค้า',
      'เพิ่มบริการตรวจสายตาเด็ก',
      'แพ็คเกจตรวจสุขภาพตาสำหรับองค์กร',
      'ระบบ Online Booking'
    ];
    return titles[index] || 'โอกาสใหม่';
  }

  private getMockCategory(index: number): Opportunity['category'] {
    const categories: Opportunity['category'][] = ['expansion', 'service', 'b2b', 'digital'];
    return categories[index] || 'expansion';
  }

  private getMockPotential(index: number): Opportunity['potential'] {
    const potentials: Opportunity['potential'][] = ['สูง', 'ปานกลาง', 'สูง', 'ปานกลาง'];
    return potentials[index] || 'ปานกลาง';
  }

  private getMockInvestment(index: number): string {
    const investments = ['1200000', '350000', '150000', '280000'];
    return investments[index] || '100000';
  }

  private getMockRoi(index: number): string {
    const rois = ['180%', '145%', '220%', '165%'];
    return rois[index] || '150%';
  }

  private getMockTimeframe(index: number): string {
    const timeframes = ['12 เดือน', '6 เดือน', '3 เดือน', '4 เดือน'];
    return timeframes[index] || '6 เดือน';
  }

  private getMockStatus(index: number): Opportunity['status'] {
    const statuses: Opportunity['status'][] = ['evaluating', 'planning', 'ready', 'planning'];
    return statuses[index] || 'evaluating';
  }

  private getMockTrend(index: number): string {
    const trends = [
      'ผู้สูงอายุเพิ่มขึ้น',
      'WFH เพิ่มขึ้น',
      'สุขภาพเป็นเทรนด์',
      'เทคโนโลยีสูง'
    ];
    return trends[index] || 'เทรนด์ใหม่';
  }
}

export const opportunityService = new OpportunityService();
