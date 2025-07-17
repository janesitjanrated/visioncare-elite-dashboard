import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CustomizeQuickActionsModal = ({ isOpen, onClose, quickActions, onSave, onReset }) => {
  const [customActions, setCustomActions] = useState([...quickActions]);

  const removeAction = (index) => {
    const updatedActions = customActions.filter((_, i) => i !== index);
    setCustomActions(updatedActions);
  };

  const moveAction = (index, direction) => {
    if (direction === 'up' && index > 0) {
      const newActions = [...customActions];
      [newActions[index], newActions[index - 1]] = [newActions[index - 1], newActions[index]];
      setCustomActions(newActions);
    } else if (direction === 'down' && index < customActions.length - 1) {
      const newActions = [...customActions];
      [newActions[index], newActions[index + 1]] = [newActions[index + 1], newActions[index]];
      setCustomActions(newActions);
    }
  };

  const handleSave = () => {
    onSave(customActions);
    onClose();
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Settings" size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Customize Quick Actions</h2>
                <p className="text-sm text-muted-foreground">Reorder, add, or remove quick actions</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Current Actions */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Current Quick Actions</h3>
            <div className="space-y-3">
              {customActions.map((action, index) => (
                <div key={action.id || index} className="flex items-center space-x-3 p-4 border border-border rounded-lg bg-muted/30">
                  <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                    <Icon name={action.icon} size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{action.title}</h4>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveAction(index, 'up')}
                      disabled={index === 0}
                    >
                      <Icon name="ChevronUp" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveAction(index, 'down')}
                      disabled={index === customActions.length - 1}
                    >
                      <Icon name="ChevronDown" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAction(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>



          {/* Preview */}
          {customActions.length > 0 && (
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Preview</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {customActions.slice(0, 6).map((action, index) => (
                  <div key={action.id || index} className="group relative overflow-hidden bg-gradient-to-br from-background to-muted/30 border border-border rounded-xl p-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative mb-3">
                      <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                        <Icon name={action.icon} size={20} />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <h4 className="font-medium text-foreground text-sm mb-1">
                        {action.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background border-t border-border px-6 py-4 rounded-b-xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {customActions.length} actions configured
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              {onReset && (
                <Button variant="outline" onClick={handleReset} className="text-warning hover:text-warning">
                  <Icon name="RotateCcw" size={16} className="mr-2" />
                  Reset to Default
                </Button>
              )}
              <Button onClick={handleSave}>
                <Icon name="Save" size={16} className="mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeQuickActionsModal; 