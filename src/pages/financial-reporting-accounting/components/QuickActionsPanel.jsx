import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import GenerateInvoiceModal from './GenerateInvoiceModal';
import RecordPaymentModal from './RecordPaymentModal';
import AddExpenseModal from './AddExpenseModal';
import BankReconciliationModal from './BankReconciliationModal';
import PayrollProcessingModal from './PayrollProcessingModal';
import TaxCalculationModal from './TaxCalculationModal';
import CustomizeQuickActionsModal from './CustomizeQuickActionsModal';

const QuickActionsPanel = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [financialRecords, setFinancialRecords] = useState({
    invoices: [],
    payments: [],
    expenses: [],
    reconciliations: [],
    payrolls: [],
    taxCalculations: []
  });

  const defaultQuickActions = [
    {
      title: 'Generate Invoice',
      description: 'Create patient invoices',
      icon: 'FileText',
      color: 'bg-primary/10 text-primary',
      action: () => setActiveModal('invoice')
    },
    {
      title: 'Record Payment',
      description: 'Log patient payments',
      icon: 'CreditCard',
      color: 'bg-success/10 text-success',
      action: () => setActiveModal('payment')
    },
    {
      title: 'Add Expense',
      description: 'Track business expenses',
      icon: 'Minus',
      color: 'bg-warning/10 text-warning',
      action: () => setActiveModal('expense')
    },
    {
      title: 'Bank Reconciliation',
      description: 'Reconcile bank statements',
      icon: 'Building2',
      color: 'bg-accent/10 text-accent',
      action: () => setActiveModal('reconciliation')
    },
    {
      title: 'Payroll Processing',
      description: 'Process staff payroll',
      icon: 'Users',
      color: 'bg-secondary/10 text-secondary',
      action: () => setActiveModal('payroll')
    },
    {
      title: 'Tax Calculation',
      description: 'Calculate tax obligations',
      icon: 'Calculator',
      color: 'bg-error/10 text-error',
      action: () => setActiveModal('tax')
    }
  ];

  const [quickActions, setQuickActions] = useState(defaultQuickActions);

  // Load saved quick actions from localStorage
  useEffect(() => {
    const savedActions = localStorage.getItem('customQuickActions');
    if (savedActions) {
      try {
        const parsedActions = JSON.parse(savedActions);
        // Restore action functions
        const restoredActions = parsedActions.map(action => ({
          ...action,
          action: () => {
            // Map action titles to modal types
            const actionMap = {
              'Generate Invoice': 'invoice',
              'Record Payment': 'payment',
              'Add Expense': 'expense',
              'Bank Reconciliation': 'reconciliation',
              'Payroll Processing': 'payroll',
              'Tax Calculation': 'tax'
            };
            const modalType = actionMap[action.title];
            if (modalType) {
              setActiveModal(modalType);
            } else {
              console.log(`Custom action: ${action.title}`);
            }
          }
        }));
        setQuickActions(restoredActions);
      } catch (error) {
        console.error('Error loading saved quick actions:', error);
      }
    }
  }, []);

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleGenerateInvoice = (invoice) => {
    setFinancialRecords(prev => ({
      ...prev,
      invoices: [invoice, ...prev.invoices]
    }));
    alert(`Invoice ${invoice.id} generated successfully!`);
  };

  const handleRecordPayment = (payment) => {
    setFinancialRecords(prev => ({
      ...prev,
      payments: [payment, ...prev.payments]
    }));
    alert(`Payment ${payment.id} recorded successfully!`);
  };

  const handleAddExpense = (expense) => {
    setFinancialRecords(prev => ({
      ...prev,
      expenses: [expense, ...prev.expenses]
    }));
    alert(`Expense ${expense.id} added successfully!`);
  };

  const handleReconcile = (reconciliation) => {
    setFinancialRecords(prev => ({
      ...prev,
      reconciliations: [reconciliation, ...prev.reconciliations]
    }));
    alert(`Bank reconciliation ${reconciliation.id} completed successfully!`);
  };

  const handleProcessPayroll = (payroll) => {
    setFinancialRecords(prev => ({
      ...prev,
      payrolls: [payroll, ...prev.payrolls]
    }));
    alert(`Payroll ${payroll.id} processed successfully! Total: ฿${payroll.totalPayroll.toLocaleString()}`);
  };

  const handleCalculateTax = (taxCalculation) => {
    setFinancialRecords(prev => ({
      ...prev,
      taxCalculations: [taxCalculation, ...prev.taxCalculations]
    }));
    alert(`Tax calculation ${taxCalculation.id} saved successfully! Tax amount: ฿${taxCalculation.taxAmount.toLocaleString()}`);
  };

  const handleCustomizeSave = (customActions) => {
    // Save to localStorage (without functions)
    const actionsToSave = customActions.map(action => ({
      title: action.title,
      description: action.description,
      icon: action.icon,
      color: action.color
    }));
    localStorage.setItem('customQuickActions', JSON.stringify(actionsToSave));
    
    // Restore action functions
    const restoredActions = customActions.map(action => ({
      ...action,
      action: () => {
        // Map action titles to modal types
        const actionMap = {
          'Generate Invoice': 'invoice',
          'Record Payment': 'payment',
          'Add Expense': 'expense',
          'Bank Reconciliation': 'reconciliation',
          'Payroll Processing': 'payroll',
          'Tax Calculation': 'tax'
        };
        const modalType = actionMap[action.title];
        if (modalType) {
          setActiveModal(modalType);
        } else {
          console.log(`Custom action: ${action.title}`);
        }
      }
    }));
    
    setQuickActions(restoredActions);
    alert('Quick actions customized successfully!');
  };

  const handleResetToDefault = () => {
    localStorage.removeItem('customQuickActions');
    setQuickActions(defaultQuickActions);
    alert('Quick actions reset to default successfully!');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-foreground">Quick Actions</h3>
            <p className="text-sm text-muted-foreground mt-1">Essential financial operations at your fingertips</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            iconName="Settings"
            onClick={() => setShowCustomizeModal(true)}
          >
          Customize
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="group relative overflow-hidden bg-gradient-to-br from-background to-muted/30 border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 text-left"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Icon Container */}
            <div className="relative mb-4">
              <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                <Icon name={action.icon} size={24} />
              </div>
            </div>
            
            {/* Content */}
            <div className="relative">
              <h4 className="font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                {action.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {action.description}
              </p>
              
              {/* Hover Indicator */}
              <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Icon name="ArrowRight" size={16} className="text-primary" />
              </div>
            </div>
            
            {/* Ripple Effect */}
            <div className="absolute inset-0 bg-primary/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" />
          </button>
        ))}
      </div>

      {/* Modals */}
      <GenerateInvoiceModal
        isOpen={activeModal === 'invoice'}
        onClose={handleCloseModal}
        onGenerate={handleGenerateInvoice}
      />
      
      <RecordPaymentModal
        isOpen={activeModal === 'payment'}
        onClose={handleCloseModal}
        onRecord={handleRecordPayment}
      />
      
      <AddExpenseModal
        isOpen={activeModal === 'expense'}
        onClose={handleCloseModal}
        onAdd={handleAddExpense}
      />
      
      <BankReconciliationModal
        isOpen={activeModal === 'reconciliation'}
        onClose={handleCloseModal}
        onReconcile={handleReconcile}
      />
      
      <PayrollProcessingModal
        isOpen={activeModal === 'payroll'}
        onClose={handleCloseModal}
        onProcess={handleProcessPayroll}
      />
      
              <TaxCalculationModal
          isOpen={activeModal === 'tax'}
          onClose={handleCloseModal}
          onCalculate={handleCalculateTax}
        />

        {/* Customize Modal */}
        <CustomizeQuickActionsModal
          isOpen={showCustomizeModal}
          onClose={() => setShowCustomizeModal(false)}
          quickActions={quickActions}
          onSave={handleCustomizeSave}
          onReset={handleResetToDefault}
        />
    </div>
  );
};

export default QuickActionsPanel;