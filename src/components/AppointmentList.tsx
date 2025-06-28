
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, User, MapPin } from 'lucide-react';
import { useAppointments } from '@/hooks/useAppointments';

export const AppointmentList = () => {
  const { appointments, loading, updateAppointmentStatus } = useAppointments();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'รอตรวจ';
      case 'in_progress': return 'กำลังตรวจ';
      case 'completed': return 'ตรวจเสร็จ';
      case 'cancelled': return 'ยกเลิก';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const todayAppointments = appointments.filter(appointment => 
    new Date(appointment.appointment_date).toDateString() === new Date().toDateString()
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">รายการนัดหมายวันนี้</h2>
        <span className="text-sm text-gray-500">{todayAppointments.length} รายการ</span>
      </div>
      
      <div className="space-y-4">
        {todayAppointments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            ไม่มีการนัดหมายวันนี้
          </div>
        ) : (
          todayAppointments.map((appointment) => (
            <div key={appointment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{appointment.patients?.full_name}</h3>
                      {appointment.queue_number && (
                        <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                          คิว {appointment.queue_number}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.appointment_time.slice(0, 5)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{appointment.branches?.name}</span>
                      </div>
                    </div>
                    {appointment.chief_complaint && (
                      <p className="text-sm text-gray-500 mt-1">
                        {appointment.chief_complaint}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {getStatusText(appointment.status)}
                  </span>
                  
                  <div className="flex space-x-1">
                    {appointment.status === 'scheduled' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateAppointmentStatus(appointment.id, 'in_progress')}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        เริ่มตรวจ
                      </Button>
                    )}
                    {appointment.status === 'in_progress' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        ตรวจเสร็จ
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
