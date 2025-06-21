import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';
import { opportunityService, Opportunity, MarketTrend } from '@/services/opportunityService';
import OpportunityMetrics from '@/components/owner/OpportunityMetrics';
import OpportunityList from '@/components/owner/OpportunityList';
import MarketTrends from '@/components/owner/MarketTrends';
import { useToast } from '@/hooks/use-toast';

const OwnerOpportunities = () => {
  const { toast } = useToast();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([]);
  const [loading, setLoading] = useState(true);

  const performanceMetrics = [
    { title: 'โอกาสทั้งหมด', value: '12', unit: 'โครงการ', change: '+3' },
    { title: 'มูลค่ารวม', value: '5.2', unit: 'ล้านบาท', change: '+1.8M' },
    { title: 'ROI เฉลี่ย', value: '178', unit: '%', change: '+12%' },
    { title: 'เวลาคืนทุนเฉลี่ย', value: '8', unit: 'เดือน', change: '-2 เดือน' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [opportunitiesData, trendsData] = await Promise.all([
        opportunityService.getOpportunities(),
        opportunityService.getMarketTrends()
      ]);
      setOpportunities(opportunitiesData);
      setMarketTrends(trendsData);
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

  const handleViewDetails = (opportunityId: string) => {
    toast({
      title: "ดูรายละเอียด",
      description: `กำลังโหลดรายละเอียดโอกาส ${opportunityId}`,
    });
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
          <h1 className="text-3xl font-bold text-gray-900">โอกาส</h1>
          <p className="text-gray-600 mt-1">สำรวจและติดตามโอกาสทางธุรกิจ</p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <TrendingUp className="h-4 w-4 mr-1" />
          Opportunities
        </Badge>
      </div>

      <OpportunityMetrics metrics={performanceMetrics} />
      <OpportunityList opportunities={opportunities} onViewDetails={handleViewDetails} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarketTrends trends={marketTrends} />
        
        {/* Action Plans - keeping the same structure but simplified */}
        <div className="space-y-4">
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-green-800">ข้อเสนอ B2B Package</p>
                <p className="text-sm text-green-600">เริ่มได้ทันที</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerOpportunities;
