import { useState, useEffect } from 'react';
import { apiClient, Patient } from '@/integrations/api/client';
import { useToast } from '@/hooks/use-toast';

export type { Patient };

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getPatients();
      setPatients(data);
    } catch (error: any) {
      console.error('Error fetching patients:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดข้อมูลผู้ป่วยได้",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createPatient = async (patientData: Omit<Patient, 'id' | 'created_at'>) => {
    try {
      const data = await apiClient.createPatient(patientData);
      setPatients(prev => [data, ...prev]);
      toast({
        title: "เพิ่มผู้ป่วยสำเร็จ",
        description: `เพิ่มข้อมูล ${data.name} เรียบร้อยแล้ว`,
      });
      
      return { data, error: null };
    } catch (error: any) {
      console.error('Error creating patient:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถเพิ่มข้อมูลผู้ป่วยได้",
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const updatePatient = async (id: number, patientData: Partial<Patient>) => {
    try {
      // Note: Update endpoint needs to be added to the API client
      const response = await fetch(`${apiClient['baseUrl']}/patients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientData),
      });
      
      if (!response.ok) throw new Error('Failed to update patient');
      
      const data = await response.json();
      setPatients(prev => 
        prev.map(patient => patient.id === id ? data : patient)
      );
      
      toast({
        title: "อัพเดทข้อมูลสำเร็จ",
        description: `แก้ไขข้อมูล ${data.name} เรียบร้อยแล้ว`,
      });
      
      return { data, error: null };
    } catch (error: any) {
      console.error('Error updating patient:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถแก้ไขข้อมูลผู้ป่วยได้",
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const deletePatient = async (id: number) => {
    try {
      // Note: Delete endpoint needs to be added to the API client
      const response = await fetch(`${apiClient['baseUrl']}/patients/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete patient');

      setPatients(prev => prev.filter(patient => patient.id !== id));
      toast({
        title: "ลบข้อมูลสำเร็จ",
        description: "ลบข้อมูลผู้ป่วยเรียบร้อยแล้ว",
      });
      
      return { error: null };
    } catch (error: any) {
      console.error('Error deleting patient:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถลบข้อมูลผู้ป่วยได้",
        variant: "destructive",
      });
      return { error };
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return {
    patients,
    loading,
    createPatient,
    updatePatient,
    deletePatient,
    refetch: fetchPatients,
  };
};
