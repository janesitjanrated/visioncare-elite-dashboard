import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PendingServices = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      patientName: "Sarah Johnson",
      serviceType: "Prescription Update",
      priority: "high",
      estimatedTime: "30 min",
      notes: "Progressive lens prescription needs adjustment",
      assignedTo: "Dr. Smith",
      createdAt: "2025-01-12T08:30:00Z"
    },
    {
      id: 2,
      patientName: "Michael Chen",
      serviceType: "Contact Lens Training",
      priority: "medium",
      estimatedTime: "45 min",
      notes: "First-time contact lens user, needs insertion/removal training",
      assignedTo: "Lisa Anderson",
      createdAt: "2025-01-12T09:15:00Z"
    },
    {
      id: 3,
      patientName: "Emily Rodriguez",
      serviceType: "Frame Adjustment",
      priority: "low",
      estimatedTime: "15 min",
      notes: "Glasses slipping, needs nose pad adjustment",
      assignedTo: "You",
      createdAt: "2025-01-12T10:00:00Z"
    },
    {
      id: 4,
      patientName: "David Thompson",
      serviceType: "Lens Cleaning",
      priority: "low",
      estimatedTime: "10 min",
      notes: "Professional cleaning and inspection",
      assignedTo: "You",
      createdAt: "2025-01-12T11:30:00Z"
    }
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'Clock';
      case 'low':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  const handleCompleteService = (serviceId) => {
    setServices(services.filter(service => service.id !== serviceId));
    console.log(`Service ${serviceId} completed`);
  };

  const handleStartService = (serviceId) => {
    console.log(`Starting service ${serviceId}`);
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffInMinutes = Math.floor((now - created) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Clock" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Pending Services</h3>
            <p className="text-sm text-muted-foreground">
              {services.length} services awaiting completion
            </p>
          </div>
        </div>
        <Button variant="outline" iconName="RefreshCw" iconPosition="left">
          Refresh
        </Button>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-hover"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-foreground">{service.patientName}</h4>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(service.priority)}`}>
                    <Icon name={getPriorityIcon(service.priority)} size={12} className="mr-1" />
                    {service.priority.charAt(0).toUpperCase() + service.priority.slice(1)} Priority
                  </div>
                </div>
                
                <p className="text-sm font-medium text-foreground mb-1">{service.serviceType}</p>
                <p className="text-sm text-muted-foreground mb-2">{service.notes}</p>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Icon name="Clock" size={12} className="mr-1" />
                    {service.estimatedTime}
                  </span>
                  <span className="flex items-center">
                    <Icon name="User" size={12} className="mr-1" />
                    {service.assignedTo}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Calendar" size={12} className="mr-1" />
                    {formatTimeAgo(service.createdAt)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  iconName="Play"
                  onClick={() => handleStartService(service.id)}
                >
                  Start
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  iconName="Check"
                  onClick={() => handleCompleteService(service.id)}
                >
                  Complete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">All services completed!</p>
          <p className="text-sm text-muted-foreground mt-1">Great job staying on top of patient care</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">
              {services.filter(s => s.priority === 'high').length}
            </p>
            <p className="text-xs text-muted-foreground">High Priority</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">
              {services.filter(s => s.assignedTo === 'You').length}
            </p>
            <p className="text-xs text-muted-foreground">Assigned to You</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">
              {services.reduce((total, service) => {
                const time = parseInt(service.estimatedTime);
                return total + (isNaN(time) ? 0 : time);
              }, 0)} min
            </p>
            <p className="text-xs text-muted-foreground">Total Time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingServices;