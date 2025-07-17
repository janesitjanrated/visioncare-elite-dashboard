import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ShiftInformation = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnBreak, setIsOnBreak] = useState(false);

  const shiftData = {
    startTime: "09:00 AM",
    endTime: "06:00 PM",
    breakTime: "01:00 PM - 02:00 PM",
    totalHours: 8,
    workedHours: 4.5,
    remainingHours: 3.5,
    status: "active",
    location: "Main Branch - Downtown"
  };

  const todayStats = {
    patientsServed: 12,
    appointmentsCompleted: 8,
    salesMade: 5,
    tasksCompleted: 15
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getProgressPercentage = () => {
    return Math.round((shiftData.workedHours / shiftData.totalHours) * 100);
  };

  const handleBreakToggle = () => {
    setIsOnBreak(!isOnBreak);
    console.log(isOnBreak ? 'Break ended' : 'Break started');
  };

  const handleClockOut = () => {
    console.log('Clocking out...');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Clock" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Shift Information</h3>
            <p className="text-sm text-muted-foreground">{shiftData.location}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          isOnBreak 
            ? 'bg-yellow-100 text-yellow-800' :'bg-green-100 text-green-800'
        }`}>
          {isOnBreak ? 'On Break' : 'Active'}
        </div>
      </div>

      {/* Current Time */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-foreground mb-1">
          {formatTime(currentTime)}
        </div>
        <p className="text-sm text-muted-foreground">
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Shift Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Shift Progress</span>
          <span className="text-sm text-muted-foreground">{getProgressPercentage()}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-success h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{shiftData.startTime}</span>
          <span>{shiftData.endTime}</span>
        </div>
      </div>

      {/* Shift Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Worked Hours</span>
          </div>
          <p className="text-lg font-semibold text-foreground">{shiftData.workedHours}h</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Timer" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Remaining</span>
          </div>
          <p className="text-lg font-semibold text-foreground">{shiftData.remainingHours}h</p>
        </div>
      </div>

      {/* Today's Performance */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Today's Performance</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-blue-500" />
            <div>
              <p className="text-sm font-medium text-foreground">{todayStats.patientsServed}</p>
              <p className="text-xs text-muted-foreground">Patients Served</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-green-500" />
            <div>
              <p className="text-sm font-medium text-foreground">{todayStats.appointmentsCompleted}</p>
              <p className="text-xs text-muted-foreground">Appointments</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="ShoppingCart" size={16} className="text-purple-500" />
            <div>
              <p className="text-sm font-medium text-foreground">{todayStats.salesMade}</p>
              <p className="text-xs text-muted-foreground">Sales Made</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-orange-500" />
            <div>
              <p className="text-sm font-medium text-foreground">{todayStats.tasksCompleted}</p>
              <p className="text-xs text-muted-foreground">Tasks Done</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button 
          variant={isOnBreak ? "default" : "outline"} 
          size="sm" 
          iconName={isOnBreak ? "Play" : "Pause"}
          onClick={handleBreakToggle}
          fullWidth
        >
          {isOnBreak ? 'End Break' : 'Take Break'}
        </Button>
        <Button 
          variant="destructive" 
          size="sm" 
          iconName="LogOut"
          onClick={handleClockOut}
        >
          Clock Out
        </Button>
      </div>

      {/* Break Schedule */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Scheduled Break:</span>
          <span className="font-medium text-foreground">{shiftData.breakTime}</span>
        </div>
      </div>
    </div>
  );
};

export default ShiftInformation;