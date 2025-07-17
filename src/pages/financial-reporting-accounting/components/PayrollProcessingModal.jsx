import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PayrollProcessingModal = ({ isOpen, onClose, onProcess }) => {
  const [payrollData, setPayrollData] = useState({
    period: '',
    employees: []
  });

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    baseSalary: '',
    overtime: '',
    bonuses: '',
    deductions: ''
  });

  const addEmployee = () => {
    if (newEmployee.name && newEmployee.baseSalary) {
      const employee = {
        id: Date.now(),
        ...newEmployee,
        baseSalary: parseFloat(newEmployee.baseSalary) || 0,
        overtime: parseFloat(newEmployee.overtime) || 0,
        bonuses: parseFloat(newEmployee.bonuses) || 0,
        deductions: parseFloat(newEmployee.deductions) || 0
      };
      
      employee.netSalary = employee.baseSalary + employee.overtime + employee.bonuses - employee.deductions;
      
      setPayrollData({
        ...payrollData,
        employees: [...payrollData.employees, employee]
      });
      
      setNewEmployee({
        name: '',
        position: '',
        baseSalary: '',
        overtime: '',
        bonuses: '',
        deductions: ''
      });
    }
  };

  const removeEmployee = (id) => {
    setPayrollData({
      ...payrollData,
      employees: payrollData.employees.filter(e => e.id !== id)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payroll = {
      id: `PAY-${Date.now()}`,
      ...payrollData,
      status: 'processed',
      createdAt: new Date().toISOString(),
      totalPayroll: payrollData.employees.reduce((total, emp) => total + emp.netSalary, 0)
    };
    onProcess(payroll);
    onClose();
    setPayrollData({
      period: '',
      employees: []
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background border border-border rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Payroll Processing</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payroll Period */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Payroll Period *
            </label>
            <Input
              value={payrollData.period}
              onChange={(e) => setPayrollData({...payrollData, period: e.target.value})}
              placeholder="e.g., January 2025"
              required
            />
          </div>

          {/* Add Employee */}
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-lg font-medium text-foreground mb-4">Add Employee</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Employee Name *
                </label>
                <Input
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                  placeholder="Enter employee name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Position
                </label>
                <Input
                  value={newEmployee.position}
                  onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                  placeholder="Enter position"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Base Salary (THB) *
                </label>
                <Input
                  type="number"
                  value={newEmployee.baseSalary}
                  onChange={(e) => setNewEmployee({...newEmployee, baseSalary: e.target.value})}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Overtime (THB)
                </label>
                <Input
                  type="number"
                  value={newEmployee.overtime}
                  onChange={(e) => setNewEmployee({...newEmployee, overtime: e.target.value})}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Bonuses (THB)
                </label>
                <Input
                  type="number"
                  value={newEmployee.bonuses}
                  onChange={(e) => setNewEmployee({...newEmployee, bonuses: e.target.value})}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Deductions (THB)
                </label>
                <Input
                  type="number"
                  value={newEmployee.deductions}
                  onChange={(e) => setNewEmployee({...newEmployee, deductions: e.target.value})}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="mt-4">
              <Button type="button" onClick={addEmployee} variant="outline">
                <Icon name="Plus" size={16} className="mr-2" />
                Add Employee
              </Button>
            </div>
          </div>

          {/* Employees List */}
          {payrollData.employees.length > 0 && (
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-lg font-medium text-foreground mb-4">Payroll Summary</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2">Employee</th>
                      <th className="text-left p-2">Position</th>
                      <th className="text-right p-2">Base Salary</th>
                      <th className="text-right p-2">Overtime</th>
                      <th className="text-right p-2">Bonuses</th>
                      <th className="text-right p-2">Deductions</th>
                      <th className="text-right p-2">Net Salary</th>
                      <th className="text-center p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollData.employees.map((employee) => (
                      <tr key={employee.id} className="border-b border-border/50">
                        <td className="p-2 font-medium">{employee.name}</td>
                        <td className="p-2 text-muted-foreground">{employee.position}</td>
                        <td className="p-2 text-right">฿{employee.baseSalary.toFixed(2)}</td>
                        <td className="p-2 text-right">฿{employee.overtime.toFixed(2)}</td>
                        <td className="p-2 text-right">฿{employee.bonuses.toFixed(2)}</td>
                        <td className="p-2 text-right">฿{employee.deductions.toFixed(2)}</td>
                        <td className="p-2 text-right font-bold">฿{employee.netSalary.toFixed(2)}</td>
                        <td className="p-2 text-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEmployee(employee.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-border font-bold">
                      <td colSpan="6" className="p-2 text-right">Total Payroll:</td>
                      <td className="p-2 text-right text-primary">
                        ฿{payrollData.employees.reduce((total, emp) => total + emp.netSalary, 0).toFixed(2)}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={payrollData.employees.length === 0}>
              <Icon name="Users" size={16} className="mr-2" />
              Process Payroll
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayrollProcessingModal; 