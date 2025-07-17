import React from 'react';
import Icon from '../../../../components/AppIcon';

const PreliminaryExamSection = ({ examData }) => (
  <div className="border rounded-lg p-4">
    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
      <Icon name="Activity" size={16} className="mr-2" />
      Preliminary Exam
    </h4>
    <div className="space-y-4">
      {/* Basic Measurements */}
      <div>
        <h5 className="font-medium text-gray-700 mb-2">Basic Measurements</h5>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Blood Pressure:</span>
            <span className="text-gray-800">{examData.bloodPressure}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Weight:</span>
            <span className="text-gray-800">{examData.weight}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Height:</span>
            <span className="text-gray-800">{examData.height}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PreliminaryExamSection; 