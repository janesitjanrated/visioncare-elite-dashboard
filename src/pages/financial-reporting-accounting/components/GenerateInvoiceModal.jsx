import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const GenerateInvoiceModal = ({ isOpen, onClose, onGenerate }) => {
  const [invoiceData, setInvoiceData] = useState({
    patientName: '',
    patientId: '',
    serviceType: '',
    amount: '',
    description: '',
    dueDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const invoice = {
      id: `INV-${Date.now()}`,
      ...invoiceData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      amount: parseFloat(invoiceData.amount)
    };
    onGenerate(invoice);
    onClose();
    setInvoiceData({
      patientName: '',
      patientId: '',
      serviceType: '',
      amount: '',
      description: '',
      dueDate: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="FileText" size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Generate Invoice</h2>
                <p className="text-sm text-muted-foreground">Create a new patient invoice</p>
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

        {/* Form Content */}
        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Patient Name *
              </label>
              <Input
                value={invoiceData.patientName}
                onChange={(e) => setInvoiceData({...invoiceData, patientName: e.target.value})}
                placeholder="Enter patient name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Patient ID
              </label>
              <Input
                value={invoiceData.patientId}
                onChange={(e) => setInvoiceData({...invoiceData, patientId: e.target.value})}
                placeholder="Enter patient ID"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Service Type *
              </label>
              <select
                value={invoiceData.serviceType}
                onChange={(e) => setInvoiceData({...invoiceData, serviceType: e.target.value})}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="">Select service type</option>
                <option value="consultation">Consultation</option>
                <option value="examination">Eye Examination</option>
                <option value="surgery">Surgery</option>
                <option value="lenses">Contact Lenses</option>
                <option value="glasses">Eyeglasses</option>
                <option value="medication">Medication</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Amount (THB) *
              </label>
              <Input
                type="number"
                value={invoiceData.amount}
                onChange={(e) => setInvoiceData({...invoiceData, amount: e.target.value})}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              value={invoiceData.description}
              onChange={(e) => setInvoiceData({...invoiceData, description: e.target.value})}
              placeholder="Enter service description"
              className="w-full h-20 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Due Date
            </label>
            <Input
              type="date"
              value={invoiceData.dueDate}
              onChange={(e) => setInvoiceData({...invoiceData, dueDate: e.target.value})}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              <Icon name="FileText" size={16} className="mr-2" />
              Generate Invoice
            </Button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default GenerateInvoiceModal; 