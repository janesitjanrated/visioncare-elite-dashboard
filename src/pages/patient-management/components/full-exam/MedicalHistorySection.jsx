import React from 'react';
import Icon from '../../../../components/AppIcon';

const MedicalHistorySection = ({ examData }) => (
  <div className="border rounded-lg p-4">
    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
      <Icon name="FileText" size={16} className="mr-2" />
      Medical History
    </h4>
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2 text-sm">
        <div className="flex items-center">
          <input type="checkbox" checked={examData.diabetes} readOnly className="mr-2" />
          <span>Diabetes</span>
        </div>
        <div className="flex items-center">
          <input type="checkbox" checked={examData.hypertension} readOnly className="mr-2" />
          <span>Hypertension</span>
        </div>
        <div className="flex items-center">
          <input type="checkbox" checked={examData.heartDisease} readOnly className="mr-2" />
          <span>Heart Disease</span>
        </div>
      </div>
      <div className="space-y-2">
        <div>
          <span className="text-gray-600 text-sm">Allergies:</span>
          <p className="text-gray-800 text-sm">{examData.allergies}</p>
        </div>
        <div>
          <span className="text-gray-600 text-sm">Medications:</span>
          <p className="text-gray-800 text-sm">{examData.medications}</p>
        </div>
      </div>
    </div>
  </div>
);

export default MedicalHistorySection; 