import React from 'react';
import Icon from '../../../../components/AppIcon';

const POHxSection = ({ examData }) => (
  <div className="border rounded-lg p-4">
    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
      <Icon name="History" size={16} className="mr-2" />
      Past Ocular History
    </h4>
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2 text-sm">
        <div className="flex items-center">
          <input type="checkbox" checked={examData.previousEyeSurgery} readOnly className="mr-2" />
          <span>Previous Eye Surgery</span>
        </div>
        <div className="flex items-center">
          <input type="checkbox" checked={examData.eyeInjury} readOnly className="mr-2" />
          <span>Eye Injury</span>
        </div>
      </div>
      <div>
        <span className="text-gray-600 text-sm">Family History:</span>
        <p className="text-gray-800 text-sm">{examData.familyHistory}</p>
      </div>
    </div>
  </div>
);

export default POHxSection; 