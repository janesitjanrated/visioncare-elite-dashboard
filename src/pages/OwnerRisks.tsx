
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { riskService, Risk, MitigationPlan } from '@/services/riskService';
import RiskMetrics from '@/components/owner/RiskMetrics';
import RiskList from '@/components/owner/RiskList';
import MitigationPlans from '@/components/owner/MitigationPlans';
import { useToast } from '@/hooks/use-toast';

const OwnerRisks = () => {
  const { toast } = useToast();
  const [risks, setRisks] = useState<Risk[]>([]);
  const [mitigationPlans, setMitigationPlans] = useState<MitigationPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const riskMetrics = [
    { title: 'ความเสี่ยงรวม', value: '68', unit: '%', trend: 'down' as const, change: '-5%' },
    { title: 'ความเสี่ยงสูง', value: '3', unit: 'รายการ', trend: 'up' as const, change: '+1' },
    { title: 'การป้องกันที่ใช้งาน', value: '12', unit: 'มาตรการ', trend: 'up' as const, change: '+2' },
    { title: 'อัตราเหตุการณ์', value: '2.1', unit: '%', trend: 'down' as const, change: '-0.3%' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [risksData, plansData] = await Promise.all([
        riskService.getRisks(),
        riskService.getMitigationPlans()
      ]);
      setRisks(risksData);
      setMitigationPlans(plansData);
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดข้อมูลได้",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const groupRisksByCategory = (risks: Risk[]) => {
    const categories: { [key: string]: Risk[] } = {};
    risks.forEach(risk => {
      if (!categories[risk.category]) {
        categories[risk.category] = [];
      }
      categories[risk.category].push(risk);
    });
    
    return Object.keys(categories).map(category => ({
      category,
      risks: categories[category]
    }));
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">กำลังโหลดข้อมูล...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ความเสี่ยง</h1>
          <p className="text-gray-600 mt-1">จัดการและติดตามความเสี่ยงองค์กร</p>
        </div>
        <Badge variant="secondary" className="bg-red-100 text-red-800">
          <AlertTriangle className="h-4 w-4 mr-1" />
          Risk Management
        </Badge>
      </div>

      <RiskMetrics metrics={riskMetrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskList riskCategories={groupRisksByCategory(risks)} />
      </div>

      <MitigationPlans plans={mitigationPlans} />
    </div>
  );
};

export default OwnerRisks;
