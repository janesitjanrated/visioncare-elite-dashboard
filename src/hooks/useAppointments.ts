
import { useState, useEffect } from 'react';
import { apiClient, Appointment as ApiAppointment } from '@/integrations/api/client';
import { useToast } from '@/hooks/use-toast';

export interface Appointment {
  id: number;
  patient_id: number;
  appointment_date: string;
  appointment_time?: string;
  notes?: string;
  status: string;
  queue_number?: number;
  chief_complaint?: string;
  created_at: string;
  // Relations
  patients?: {
    name: string;
    full_name?: string;
    phone?: string;
  };
  branches?: {
    name: string;
  };
}

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getAppointments();
      setAppointments(data);
    } catch (error: any) {
      console.error('Error fetching appointments:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดข้อมูลการนัดหมายได้",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id: number, status: string) => {
    try {
      // Note: Update endpoint needs to be added to the API client
      const response = await fetch(`${apiClient['baseUrl']}/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) throw new Error('Failed to update appointment');

      setAppointments(prev => 
        prev.map(appointment => 
          appointment.id === id ? { ...appointment, status } : appointment
        )
      );

      toast({
        title: "อัพเดทสถานะสำเร็จ",
        description: `เปลี่ยนสถานะเป็น ${status}`,
      });
    } catch (error: any) {
      console.error('Error updating appointment status:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถอัพเดทสถานะได้",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    appointments,
    loading,
    updateAppointmentStatus,
    refetch: fetchAppointments,
  };
};
