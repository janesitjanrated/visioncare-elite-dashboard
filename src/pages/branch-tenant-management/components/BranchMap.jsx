import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BranchMap = ({ branches, selectedBranch, onBranchSelect }) => {
  const [mapView, setMapView] = useState('satellite');

  const getMarkerColor = (performance) => {
    if (performance >= 80) return 'bg-success';
    if (performance >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Map Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Branch Locations</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={mapView === 'satellite' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('satellite')}
            >
              Satellite
            </Button>
            <Button
              variant={mapView === 'roadmap' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('roadmap')}
            >
              Roadmap
            </Button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-96 bg-muted">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Branch Locations Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=40.7128,-74.0060&z=12&output=embed"
          className="w-full h-full"
        />

        {/* Map Overlay with Branch Markers */}
        <div className="absolute inset-0 pointer-events-none">
          {branches.map((branch, index) => (
            <div
              key={branch.id}
              className={`absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                selectedBranch?.id === branch.id ? 'z-10' : 'z-0'
              }`}
              style={{
                left: `${20 + (index * 15)}%`,
                top: `${30 + (index * 10)}%`
              }}
              onClick={() => onBranchSelect(branch)}
            >
              {/* Marker */}
              <div className={`w-6 h-6 ${getMarkerColor(branch.performance)} rounded-full border-2 border-white shadow-lg flex items-center justify-center`}>
                <Icon name="MapPin" size={12} className="text-white" />
              </div>
              
              {/* Branch Info Popup */}
              {selectedBranch?.id === branch.id && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-popover border border-border rounded-lg shadow-modal p-3 min-w-48">
                  <div className="text-center">
                    <h4 className="font-semibold text-popover-foreground text-sm">{branch.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{branch.address}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Revenue:</span>
                        <span className="font-medium text-popover-foreground ml-1">
                          ${branch.dailyRevenue.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Patients:</span>
                        <span className="font-medium text-popover-foreground ml-1">
                          {branch.patientCount}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button
            variant="secondary"
            size="sm"
            iconName="ZoomIn"
            className="w-10 h-10"
          />
          <Button
            variant="secondary"
            size="sm"
            iconName="ZoomOut"
            className="w-10 h-10"
          />
          <Button
            variant="secondary"
            size="sm"
            iconName="RotateCcw"
            className="w-10 h-10"
          />
        </div>
      </div>

      {/* Map Legend */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground">Performance Legend</h4>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full" />
              <span className="text-xs text-muted-foreground">Excellent (80%+)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full" />
              <span className="text-xs text-muted-foreground">Good (60-79%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full" />
              <span className="text-xs text-muted-foreground">Needs Attention (&lt;60%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchMap;