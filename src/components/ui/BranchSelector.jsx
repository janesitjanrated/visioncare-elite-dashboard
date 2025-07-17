import React, { useState } from 'react';
import Icon from '../AppIcon';

const BranchSelector = ({ branches, selectedBranch, onBranchChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleBranchSelect = (branch) => {
    onBranchChange(branch);
    setIsOpen(false);
  };

  if (!branches || branches.length <= 1) {
    return null;
  }

  return (
    <div className="relative">
      {/* Desktop Dropdown */}
      <div className="hidden md:block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-hover"
          aria-label="Select branch"
        >
          <Icon name="Building2" size={16} />
          <span className="text-sm font-medium text-foreground max-w-32 truncate">
            {selectedBranch?.name || 'Select Branch'}
          </span>
          <Icon name="ChevronDown" size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-modal z-dropdown">
            <div className="p-2 border-b border-border">
              <h3 className="text-sm font-medium text-popover-foreground px-2 py-1">
                Select Branch
              </h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {branches.map((branch) => (
                <button
                  key={branch.id}
                  onClick={() => handleBranchSelect(branch)}
                  className={`w-full flex items-center space-x-3 p-3 hover:bg-muted transition-hover text-left ${
                    selectedBranch?.id === branch.id ? 'bg-primary/10 text-primary' : 'text-popover-foreground'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    branch.status === 'active' ? 'bg-success' : 'bg-warning'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{branch.name}</p>
                    <p className="text-xs text-muted-foreground">{branch.address}</p>
                  </div>
                  {selectedBranch?.id === branch.id && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Modal */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-hover"
          aria-label="Select branch"
        >
          <Icon name="Building2" size={20} />
        </button>

        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-modal flex items-center justify-center p-4">
            <div className="bg-popover rounded-lg shadow-modal w-full max-w-sm max-h-96 overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="text-lg font-semibold text-popover-foreground">
                  Select Branch
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-hover"
                  aria-label="Close"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {branches.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => handleBranchSelect(branch)}
                    className={`w-full flex items-center space-x-3 p-4 hover:bg-muted transition-hover text-left ${
                      selectedBranch?.id === branch.id ? 'bg-primary/10 text-primary' : 'text-popover-foreground'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${
                      branch.status === 'active' ? 'bg-success' : 'bg-warning'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{branch.name}</p>
                      <p className="text-xs text-muted-foreground">{branch.address}</p>
                    </div>
                    {selectedBranch?.id === branch.id && (
                      <Icon name="Check" size={20} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Click outside handler for desktop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[999]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default BranchSelector;