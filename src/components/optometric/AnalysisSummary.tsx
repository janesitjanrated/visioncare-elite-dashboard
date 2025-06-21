
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { AnalysisResult } from '@/types/optometric';

interface AnalysisSummaryProps {
  analysisResult: AnalysisResult | null;
}

const AnalysisSummary: React.FC<AnalysisSummaryProps> = ({ analysisResult }) => {
  if (!analysisResult) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            ผลการวิเคราะห์
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Submit data to see analysis results</p>
        </CardContent>
      </Card>
    );
  }

  const isNormal = analysisResult.interpretation === 'Normal binocular vision function.';
  const issues = isNormal ? [] : analysisResult.interpretation.split('\n').filter(line => line.trim());

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isNormal ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-orange-600" />
          )}
          ผลการวิเคราะห์
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isNormal ? (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              ปกติ
            </Badge>
            <span className="text-green-700">All measurements are within normal limits.</span>
          </div>
        ) : (
          <div className="space-y-2">
            <Badge variant="destructive" className="mb-2">
              พบความผิดปกติ
            </Badge>
            <ul className="space-y-1">
              {issues.map((issue, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span className="text-sm">{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Legend:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><strong>A:</strong> Phoria</div>
            <div><strong>B-D:</strong> Base-In (blur, break, recovery)</div>
            <div><strong>E-G:</strong> Base-Out (blur, break, recovery)</div>
            <div><strong>H:</strong> NRA</div>
            <div><strong>I:</strong> PRA</div>
            <div><strong>NPC:</strong> Near Point of Convergence</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisSummary;
