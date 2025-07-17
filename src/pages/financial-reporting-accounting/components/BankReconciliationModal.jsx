import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const BankReconciliationModal = ({ isOpen, onClose, onReconcile }) => {
  const [reconciliationData, setReconciliationData] = useState({
    bankName: '',
    accountNumber: '',
    statementDate: '',
    endingBalance: '',
    transactions: []
  });

  const [newTransaction, setNewTransaction] = useState({
    date: '',
    description: '',
    amount: '',
    type: 'deposit'
  });

  const addTransaction = () => {
    if (newTransaction.date && newTransaction.description && newTransaction.amount) {
      setReconciliationData({
        ...reconciliationData,
        transactions: [...reconciliationData.transactions, {
          id: Date.now(),
          ...newTransaction,
          amount: parseFloat(newTransaction.amount)
        }]
      });
      setNewTransaction({ date: '', description: '', amount: '', type: 'deposit' });
    }
  };

  const removeTransaction = (id) => {
    setReconciliationData({
      ...reconciliationData,
      transactions: reconciliationData.transactions.filter(t => t.id !== id)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reconciliation = {
      id: `REC-${Date.now()}`,
      ...reconciliationData,
      status: 'completed',
      createdAt: new Date().toISOString(),
      endingBalance: parseFloat(reconciliationData.endingBalance)
    };
    onReconcile(reconciliation);
    onClose();
    setReconciliationData({
      bankName: '',
      accountNumber: '',
      statementDate: '',
      endingBalance: '',
      transactions: []
    });
  };

  const calculateTotal = () => {
    return reconciliationData.transactions.reduce((total, t) => {
      return total + (t.type === 'deposit' ? t.amount : -t.amount);
    }, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background border border-border rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Bank Reconciliation</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bank Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Bank Name *
              </label>
              <Input
                value={reconciliationData.bankName}
                onChange={(e) => setReconciliationData({...reconciliationData, bankName: e.target.value})}
                placeholder="Enter bank name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Account Number *
              </label>
              <Input
                value={reconciliationData.accountNumber}
                onChange={(e) => setReconciliationData({...reconciliationData, accountNumber: e.target.value})}
                placeholder="Enter account number"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Statement Date *
              </label>
              <Input
                type="date"
                value={reconciliationData.statementDate}
                onChange={(e) => setReconciliationData({...reconciliationData, statementDate: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Ending Balance (THB) *
              </label>
              <Input
                type="number"
                value={reconciliationData.endingBalance}
                onChange={(e) => setReconciliationData({...reconciliationData, endingBalance: e.target.value})}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Add Transaction */}
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-lg font-medium text-foreground mb-4">Add Transaction</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date
                </label>
                <Input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <Input
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  placeholder="Transaction description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Amount (THB)
                </label>
                <Input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Type
                </label>
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value})}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="deposit">Deposit</option>
                  <option value="withdrawal">Withdrawal</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <Button type="button" onClick={addTransaction} variant="outline">
                <Icon name="Plus" size={16} className="mr-2" />
                Add Transaction
              </Button>
            </div>
          </div>

          {/* Transactions List */}
          {reconciliationData.transactions.length > 0 && (
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-lg font-medium text-foreground mb-4">Transactions</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {reconciliationData.transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium">{transaction.date}</span>
                        <span className="text-sm">{transaction.description}</span>
                        <span className={`text-sm font-medium ${
                          transaction.type === 'deposit' ? 'text-success' : 'text-error'
                        }`}>
                          {transaction.type === 'deposit' ? '+' : '-'}฿{transaction.amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTransaction(transaction.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Adjustment:</span>
                  <span className={`font-bold ${
                    calculateTotal() >= 0 ? 'text-success' : 'text-error'
                  }`}>
                    {calculateTotal() >= 0 ? '+' : ''}฿{calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              <Icon name="Building2" size={16} className="mr-2" />
              Complete Reconciliation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankReconciliationModal; 