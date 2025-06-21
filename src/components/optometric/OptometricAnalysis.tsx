
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { OptometricData, AnalysisResult } from '@/types/optometric';
import { analyzeOptometricData } from '@/utils/optometricAnalysis';
import OptometricChart from './OptometricChart';
import AnalysisSummary from './AnalysisSummary';

interface OptometricAnalysisProps {
  data: OptometricData;
}

const OptometricAnalysis: React.FC<OptometricAnalysisProps> = ({ data }) => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    const result = analyzeOptometricData(data);
    setAnalysisResult(result);
  };

  const handleExport = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `optometric-analysis-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handlePrint = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const imgData = canvas.toDataURL();
        printWindow.document.write(`
          <html>
            <head>
              <title>Optometric Analysis Chart</title>
              <style>
                body { margin: 0; padding: 20px; text-align: center; }
                h1 { margin-bottom: 20px; }
                img { max-width: 100%; height: auto; }
                @page { margin: 1cm; }
              </style>
            </head>
            <body>
              <h1>Optometric Binocular Vision Analysis</h1>
              <img src="${imgData}" alt="Analysis Chart" />
              <script>
                window.onload = function() {
                  setTimeout(function() {
                    window.print();
                    window.close();
                  }, 100);
                };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Optometric Binocular Vision Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={handleAnalyze}>
              วิเคราะห์ข้อมูล
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>

          <OptometricChart data={data} />
        </CardContent>
      </Card>

      <AnalysisSummary analysisResult={analysisResult} />
    </div>
  );
};

export default OptometricAnalysis;
