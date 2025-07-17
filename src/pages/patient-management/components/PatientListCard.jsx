import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PatientListCard = ({ patient, isSelected, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'completed':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div
      onClick={() => onClick(patient)}
      className={`p-4 border border-border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-soft ${
        isSelected ? 'bg-primary/10 border-primary' : 'bg-card hover:bg-muted/50'
      }`}
    >
      <div className="flex items-start space-x-3">
        {/* Patient Avatar */}
        <div className="flex-shrink-0">
          {patient.photo ? (
            <Image
              src={patient.photo}
              alt={`${patient.name} photo`}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <Icon name="User" size={20} className="text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Patient Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-foreground truncate">
              {patient.name}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
              {patient.status}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-xs text-muted-foreground">
              <Icon name="Phone" size={12} className="mr-1" />
              <span className="truncate">{patient.phone}</span>
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground">
              <Icon name="Mail" size={12} className="mr-1" />
              <span className="truncate">{patient.email}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <Icon name="Calendar" size={12} className="mr-1" />
                <span>Last visit: {formatDate(patient.lastVisit)}</span>
              </div>
              {patient.hasInsurance && (
                <div className="flex items-center text-accent">
                  <Icon name="Shield" size={12} className="mr-1" />
                  <span>Insured</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <div className="text-xs text-muted-foreground">
          ID: {patient.patientId}
        </div>
        <div className="flex items-center space-x-2">
          {patient.hasPendingAppointment && (
            <div className="w-2 h-2 bg-warning rounded-full" title="Pending appointment" />
          )}
          {patient.prescriptionDue && (
            <div className="w-2 h-2 bg-error rounded-full" title="Prescription due" />
          )}
          <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default PatientListCard;