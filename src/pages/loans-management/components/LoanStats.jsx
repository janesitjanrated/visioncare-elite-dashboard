import React from 'react';
import Icon from '../../../components/AppIcon';

const LoanStats = ({ loans }) => {
  const totalLoans = loans.length;
  const totalOriginalAmount = loans.reduce((sum, loan) => sum + loan.originalAmount, 0);
  const totalRemainingBalance = loans.reduce((sum, loan) => sum + loan.remainingBalance, 0);
  const totalMonthlyPayments = loans.reduce((sum, loan) => sum + loan.monthlyPayment, 0);
  const currentLoans = loans.filter(loan => loan.status === 'current').length;
  const overdueLoans = loans.filter(loan => loan.status === 'overdue').length;
  
  const averageInterestRate = loans.length > 0 
    ? (loans.reduce((sum, loan) => sum + loan.interestRate, 0) / loans.length).toFixed(1)
    : 0;

  const totalPaid = totalOriginalAmount - totalRemainingBalance;
  const paymentProgress = totalOriginalAmount > 0 ? (totalPaid / totalOriginalAmount * 100).toFixed(1) : 0;

  const stats = [
    {
      title: 'Total Loans',
      value: totalLoans,
      change: `${currentLoans} current`,
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Total Debt',
      value: `$${(totalRemainingBalance / 1000).toFixed(0)}K`,
      change: `$${(totalOriginalAmount / 1000).toFixed(0)}K original`,
      icon: 'DollarSign',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      title: 'Monthly Payments',
      value: `$${(totalMonthlyPayments / 1000).toFixed(1)}K`,
      change: `${paymentProgress}% paid`,
      icon: 'CreditCard',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Avg Interest Rate',
      value: `${averageInterestRate}%`,
      change: `${overdueLoans} overdue`,
      icon: 'TrendingUp',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
          <p className="text-sm text-muted-foreground">{stat.title}</p>
        </div>
      ))}
    </div>
  );
};

export default LoanStats; 