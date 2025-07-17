import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CustomReportsTab = () => {
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedBranch, setSelectedBranch] = useState('');
  const [reportName, setReportName] = useState('');

  const reportTypes = [
    { value: 'revenue', label: 'Revenue Analysis' },
    { value: 'expense', label: 'Expense Report' },
    { value: 'profit-loss', label: 'Profit & Loss Statement' },
    { value: 'cash-flow', label: 'Cash Flow Statement' },
    { value: 'patient-revenue', label: 'Patient Revenue Analysis' },
    { value: 'inventory-cost', label: 'Inventory Cost Analysis' },
    { value: 'staff-performance', label: 'Staff Performance Report' },
    { value: 'branch-comparison', label: 'Branch Comparison Report' }
  ];

  const branchOptions = [
    { value: 'all', label: 'All Branches' },
    { value: 'main', label: 'Main Branch - Downtown' },
    { value: 'north', label: 'North Branch - Mall Plaza' },
    { value: 'south', label: 'South Branch - Medical Center' }
  ];

  const savedReports = [
    {
      id: 1,
      name: 'Monthly Revenue Summary',
      type: 'Revenue Analysis',
      lastRun: '2025-07-10',
      schedule: 'Monthly',
      status: 'active'
    },
    {
      id: 2,
      name: 'Quarterly P&L Statement',
      type: 'Profit & Loss Statement',
      lastRun: '2025-07-01',
      schedule: 'Quarterly',
      status: 'active'
    },
    {
      id: 3,
      name: 'Branch Performance Comparison',
      type: 'Branch Comparison Report',
      lastRun: '2025-07-08',
      schedule: 'Weekly',
      status: 'paused'
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: 'June 2025 Revenue Report',
      type: 'Revenue Analysis',
      generatedDate: '2025-07-01',
      size: '2.4 MB',
      format: 'PDF'
    },
    {
      id: 2,
      name: 'Q2 2025 Expense Analysis',
      type: 'Expense Report',
      generatedDate: '2025-06-30',
      size: '1.8 MB',
      format: 'Excel'
    },
    {
      id: 3,
      name: 'Patient Revenue Breakdown',
      type: 'Patient Revenue Analysis',
      generatedDate: '2025-06-28',
      size: '3.1 MB',
      format: 'PDF'
    }
  ];

  const handleGenerateReport = () => {
    console.log('Generating report:', {
      type: selectedReport,
      dateRange,
      branch: selectedBranch
    });
  };

  const handleSaveReport = () => {
    console.log('Saving report template:', {
      name: reportName,
      type: selectedReport,
      dateRange,
      branch: selectedBranch
    });
  };

  const handleDownloadReport = (reportId, format) => {
    console.log(`Downloading report ${reportId} in ${format} format`);
  };

  return (
    <div className="space-y-6">
      {/* Report Generator */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Generate Custom Report</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Select
            label="Report Type"
            options={reportTypes}
            value={selectedReport}
            onChange={setSelectedReport}
            placeholder="Select report type"
            required
          />
          
          <Select
            label="Branch"
            options={branchOptions}
            value={selectedBranch}
            onChange={setSelectedBranch}
            placeholder="Select branch"
            required
          />
          
          <Input
            label="Start Date"
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
            required
          />
          
          <Input
            label="End Date"
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
            required
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button
            variant="default"
            iconName="FileText"
            iconPosition="left"
            onClick={handleGenerateReport}
            disabled={!selectedReport || !selectedBranch || !dateRange.start || !dateRange.end}
          >
            Generate Report
          </Button>
          
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
          >
            Export as PDF
          </Button>
          
          <Button
            variant="outline"
            iconName="FileSpreadsheet"
            iconPosition="left"
          >
            Export as Excel
          </Button>
          
          <div className="flex items-center space-x-2 ml-auto">
            <Input
              placeholder="Report template name"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              className="w-48"
            />
            <Button
              variant="secondary"
              iconName="Save"
              iconPosition="left"
              onClick={handleSaveReport}
              disabled={!reportName || !selectedReport}
            >
              Save Template
            </Button>
          </div>
        </div>
      </div>

      {/* Saved Reports & Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Saved Report Templates */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Saved Report Templates</h3>
            <Button variant="ghost" size="sm" iconName="Plus">
              New Template
            </Button>
          </div>
          
          <div className="space-y-4">
            {savedReports.map((report) => (
              <div key={report.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-foreground">{report.name}</h4>
                    <p className="text-sm text-muted-foreground">{report.type}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      report.status === 'active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    }`}>
                      {report.status}
                    </span>
                    <button className="p-1 hover:bg-muted rounded">
                      <Icon name="MoreVertical" size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Last Run: {report.lastRun}</p>
                    <p className="text-muted-foreground">Schedule: {report.schedule}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Play">
                      Run
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Edit">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Reports</h3>
            <Button variant="ghost" size="sm" iconName="Archive">
              View Archive
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-foreground">{report.name}</h4>
                    <p className="text-sm text-muted-foreground">{report.type}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-muted rounded text-xs font-medium text-foreground">
                      {report.format}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Generated: {report.generatedDate}</p>
                    <p className="text-muted-foreground">Size: {report.size}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      iconName="Download"
                      onClick={() => handleDownloadReport(report.id, report.format)}
                    >
                      Download
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Eye">
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Parameters Help */}
      <div className="bg-muted/50 border border-border rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-1" />
          <div>
            <h4 className="font-medium text-foreground mb-2">Report Generation Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Select appropriate date ranges for accurate financial analysis</li>
              <li>• Use "All Branches" for consolidated reports or specific branches for detailed analysis</li>
              <li>• Save frequently used report configurations as templates for quick access</li>
              <li>• Schedule automated reports to receive regular financial updates</li>
              <li>• Export reports in PDF format for sharing or Excel for further analysis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomReportsTab;