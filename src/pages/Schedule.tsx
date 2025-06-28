
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Plus, FileText } from 'lucide-react';
import { ScheduleTable } from '@/components/ScheduleTable';
import { LeaveRequestForm } from '@/components/LeaveRequestForm';
import { LeaveRequestList } from '@/components/LeaveRequestList';

const Schedule = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [showLeaveForm, setShowLeaveForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">ตาราง / ลา</h2>
              <p className="text-gray-600">จัดการตารางงานและการลาหยุด</p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => setShowLeaveForm(true)}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                ขอลาหยุด
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="schedule" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                ตารางงาน
              </TabsTrigger>
              <TabsTrigger value="leave-requests" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                รายการลาหยุด
              </TabsTrigger>
            </TabsList>

            <TabsContent value="schedule" className="mt-6">
              <ScheduleTable />
            </TabsContent>

            <TabsContent value="leave-requests" className="mt-6">
              <LeaveRequestList />
            </TabsContent>
          </Tabs>

          {showLeaveForm && (
            <LeaveRequestForm onClose={() => setShowLeaveForm(false)} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Schedule;
