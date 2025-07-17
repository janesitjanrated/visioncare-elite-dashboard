import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TodayAppointments = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalType, setModalType] = useState(null); // 'call' | 'message' | 'more' | null

  const todayAppointments = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      time: "09:00 AM",
      type: "Eye Examination",
      status: "confirmed",
      phone: "+1 (555) 123-4567",
      notes: "Regular checkup, prescription update needed"
    },
    {
      id: 2,
      patientName: "Michael Chen",
      time: "10:30 AM",
      type: "Contact Lens Fitting",
      status: "in-progress",
      phone: "+1 (555) 234-5678",
      notes: "First time contact lens user"
    },
    {
      id: 3,
      patientName: "Emily Rodriguez",
      time: "11:15 AM",
      type: "Frame Selection",
      status: "waiting",
      phone: "+1 (555) 345-6789",
      notes: "Looking for progressive lenses"
    },
    {
      id: 4,
      patientName: "David Thompson",
      time: "02:00 PM",
      type: "Follow-up Visit",
      status: "confirmed",
      phone: "+1 (555) 456-7890",
      notes: "Check adjustment on new glasses"
    },
    {
      id: 5,
      patientName: "Lisa Wang",
      time: "03:30 PM",
      type: "Eye Examination",
      status: "confirmed",
      phone: "+1 (555) 567-8901",
      notes: "Annual checkup, family history of glaucoma"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-green-100 text-green-800';
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'waiting':
        return 'AlertCircle';
      case 'completed':
        return 'Check';
      default:
        return 'Circle';
    }
  };

  const handleStatusUpdate = (appointmentId, newStatus) => {
    console.log(`Updating appointment ${appointmentId} to ${newStatus}`);
  };

  // Modal components (inline for now)
  const CallModal = ({ appointment, onClose }) => (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4">
        <h3 className="text-lg font-semibold mb-2">Call Patient</h3>
        <p className="mb-4">Call <b>{appointment.patientName}</b> at <b>{appointment.phone}</b>?</p>
        <div className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <a href={`tel:${appointment.phone}`}>
            <Button iconName="Phone">Call</Button>
          </a>
        </div>
      </div>
    </div>
  );

  const MessageModal = ({ appointment, onClose }) => (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4">
        <h3 className="text-lg font-semibold mb-2">Send Message</h3>
        <p className="mb-2">Send SMS to <b>{appointment.patientName}</b> at <b>{appointment.phone}</b></p>
        <textarea className="w-full border rounded p-2 mb-4" rows={3} placeholder="Type your message..." />
        <div className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <a href={`sms:${appointment.phone}`}>
            <Button iconName="MessageSquare">Send SMS</Button>
          </a>
        </div>
      </div>
    </div>
  );

  const MoreModal = ({ appointment, onClose }) => (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4">
        <h3 className="text-lg font-semibold mb-2">More Actions</h3>
        <ul className="mb-4 space-y-2">
          <li><Button variant="ghost" iconName="Edit2">Edit Appointment</Button></li>
          <li><Button variant="ghost" iconName="Clock">Reschedule</Button></li>
          <li><Button variant="ghost" iconName="Trash2">Cancel Appointment</Button></li>
        </ul>
        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Today's Appointments</h3>
            <p className="text-sm text-muted-foreground">
              {todayAppointments.length} appointments scheduled
            </p>
          </div>
        </div>
        <Button 
          className="bg-emerald-400 hover:bg-gray-500 text-white border-emerald-400 hover:border-gray-50" 
          iconName="Plus" 
          iconPosition="left"
        >
          Add Appointment
        </Button>
      </div>

      <div className="space-y-4">
        {todayAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-hover cursor-pointer"
            onClick={() => setSelectedAppointment(appointment)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">{appointment.time}</p>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    <Icon name={getStatusIcon(appointment.status)} size={12} className="mr-1" />
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{appointment.patientName}</h4>
                  <p className="text-sm text-muted-foreground">{appointment.type}</p>
                  <p className="text-xs text-muted-foreground mt-1">{appointment.notes}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" iconName="Phone" size="sm" onClick={e => { e.stopPropagation(); setSelectedAppointment(appointment); setModalType('call'); }} />
                <Button variant="ghost" iconName="MessageSquare" size="sm" onClick={e => { e.stopPropagation(); setSelectedAppointment(appointment); setModalType('message'); }} />
                <Button variant="ghost" iconName="MoreVertical" size="sm" onClick={e => { e.stopPropagation(); setSelectedAppointment(appointment); setModalType('more'); }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {todayAppointments.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No appointments scheduled for today</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Quick Actions</p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" iconName="Calendar">
              View Calendar
            </Button>
            <Button variant="outline" size="sm" iconName="Clock">
              Reschedule
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedAppointment && modalType === 'call' && (
        <CallModal appointment={selectedAppointment} onClose={() => setModalType(null)} />
      )}
      {selectedAppointment && modalType === 'message' && (
        <MessageModal appointment={selectedAppointment} onClose={() => setModalType(null)} />
      )}
      {selectedAppointment && modalType === 'more' && (
        <MoreModal appointment={selectedAppointment} onClose={() => setModalType(null)} />
      )}
    </div>
  );
};

export default TodayAppointments;