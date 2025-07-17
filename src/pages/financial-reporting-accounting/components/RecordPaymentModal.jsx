import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RecordPaymentModal = ({ isOpen, onClose, onRecord }) => {
  const [paymentData, setPaymentData] = useState({
    patientName: '',
    invoiceId: '',
    amount: '',
    paymentMethod: '',
    reference: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payment = {
      id: `PAY-${Date.now()}`,
      ...paymentData,
      status: 'completed',
      createdAt: new Date().toISOString(),
      amount: parseFloat(paymentData.amount)
    };
    onRecord(payment);
    onClose();
    setPaymentData({
      patientName: '',
      invoiceId: '',
      amount: '',
      paymentMethod: '',
      reference: '',
      notes: ''
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
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Icon name="CreditCard" size={20} className="text-success" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Record Payment</h2>
                <p className="text-sm text-muted-foreground">Log a new patient payment</p>
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
                value={paymentData.patientName}
                onChange={(e) => setPaymentData({...paymentData, patientName: e.target.value})}
                placeholder="Enter patient name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Invoice ID
              </label>
              <Input
                value={paymentData.invoiceId}
                onChange={(e) => setPaymentData({...paymentData, invoiceId: e.target.value})}
                placeholder="Enter invoice ID (optional)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Payment Amount (THB) *
              </label>
              <Input
                type="number"
                value={paymentData.amount}
                onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Payment Method *
              </label>
              <select
                value={paymentData.paymentMethod}
                onChange={(e) => setPaymentData({...paymentData, paymentMethod: e.target.value})}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="">Select payment method</option>
                <option value="cash">Cash</option>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="promptpay">PromptPay</option>
                <option value="line_pay">Line Pay</option>
                <option value="true_money">True Money</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Reference Number
            </label>
            <Input
              value={paymentData.reference}
              onChange={(e) => setPaymentData({...paymentData, reference: e.target.value})}
              placeholder="Transaction reference number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Notes
            </label>
            <textarea
              value={paymentData.notes}
              onChange={(e) => setPaymentData({...paymentData, notes: e.target.value})}
              placeholder="Additional payment notes"
              className="w-full h-20 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              <Icon name="CreditCard" size={16} className="mr-2" />
              Record Payment
            </Button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default RecordPaymentModal; 