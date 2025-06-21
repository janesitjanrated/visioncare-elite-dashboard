
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Patient } from '@/services/patientDataService';
import PatientGeneralInfo from './PatientGeneralInfo';
import PatientMedicalRecord from './PatientMedicalRecord';
import PatientPrescriptionHistory from './PatientPrescriptionHistory';
import PatientBillingHistory from './PatientBillingHistory';

interface PatientDetailsPopupProps {
  patient: Patient;
  onClose: () => void;
}

const PatientDetailsPopup: React.FC<PatientDetailsPopupProps> = ({ patient, onClose }) => {
  return (
    <div className="w-full h-full">
      <Tabs defaultValue="general" className="w-full h-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">ข้อมูลทั่วไป</TabsTrigger>
          <TabsTrigger value="medical">ระเบียนคนไข้</TabsTrigger>
          <TabsTrigger value="prescription">ค่าสายตา</TabsTrigger>
          <TabsTrigger value="billing">บิล/การชำระเงิน</TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[70vh] mt-4">
          <TabsContent value="general" className="space-y-4">
            <PatientGeneralInfo patient={patient} />
          </TabsContent>

          <TabsContent value="medical" className="space-y-4">
            <PatientMedicalRecord patient={patient} />
          </TabsContent>

          <TabsContent value="prescription" className="space-y-4">
            <PatientPrescriptionHistory patient={patient} />
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <PatientBillingHistory patient={patient} />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default PatientDetailsPopup;
