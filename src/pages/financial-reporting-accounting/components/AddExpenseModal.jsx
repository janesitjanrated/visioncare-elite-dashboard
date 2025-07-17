import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AddExpenseModal = ({ isOpen, onClose, onAdd }) => {
  const [expenseData, setExpenseData] = useState({
    description: '',
    amount: '',
    category: '',
    vendor: '',
    date: '',
    paymentMethod: '',
    receipt: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = {
      id: `EXP-${Date.now()}`,
      ...expenseData,
      status: 'recorded',
      createdAt: new Date().toISOString(),
      amount: parseFloat(expenseData.amount)
    };
    onAdd(expense);
    onClose();
    setExpenseData({
      description: '',
      amount: '',
      category: '',
      vendor: '',
      date: '',
      paymentMethod: '',
      receipt: '',
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
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Icon name="Minus" size={20} className="text-warning" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Add Expense</h2>
                <p className="text-sm text-muted-foreground">Track a new business expense</p>
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
                Description *
              </label>
              <Input
                value={expenseData.description}
                onChange={(e) => setExpenseData({...expenseData, description: e.target.value})}
                placeholder="Enter expense description"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Amount (THB) *
              </label>
              <Input
                type="number"
                value={expenseData.amount}
                onChange={(e) => setExpenseData({...expenseData, amount: e.target.value})}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category *
              </label>
              <select
                value={expenseData.category}
                onChange={(e) => setExpenseData({...expenseData, category: e.target.value})}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="">Select category</option>
                <option value="supplies">Medical Supplies</option>
                <option value="equipment">Equipment</option>
                <option value="utilities">Utilities</option>
                <option value="rent">Rent</option>
                <option value="insurance">Insurance</option>
                <option value="marketing">Marketing</option>
                <option value="travel">Travel</option>
                <option value="maintenance">Maintenance</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Vendor/Supplier
              </label>
              <Input
                value={expenseData.vendor}
                onChange={(e) => setExpenseData({...expenseData, vendor: e.target.value})}
                placeholder="Enter vendor name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Expense Date *
              </label>
              <Input
                type="date"
                value={expenseData.date}
                onChange={(e) => setExpenseData({...expenseData, date: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Payment Method
              </label>
              <select
                value={expenseData.paymentMethod}
                onChange={(e) => setExpenseData({...expenseData, paymentMethod: e.target.value})}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select payment method</option>
                <option value="cash">Cash</option>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="check">Check</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Receipt Number
            </label>
            <Input
              value={expenseData.receipt}
              onChange={(e) => setExpenseData({...expenseData, receipt: e.target.value})}
              placeholder="Enter receipt number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Notes
            </label>
            <textarea
              value={expenseData.notes}
              onChange={(e) => setExpenseData({...expenseData, notes: e.target.value})}
              placeholder="Additional expense notes"
              className="w-full h-20 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              <Icon name="Minus" size={16} className="mr-2" />
              Add Expense
            </Button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseModal; 