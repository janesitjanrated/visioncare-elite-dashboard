import React from 'react';
import Icon from '../../../../components/AppIcon';

const ExamInfoSection = ({ examData }) => (
  <div className="bg-blue-50 rounded-lg p-4">
    <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
      <Icon name="Calendar" size={16} className="mr-2" />
      Exam Information
    </h4>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-blue-700 font-medium">Date:</span>
        <span className="text-blue-900">{new Date(examData.date).toLocaleDateString()}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-blue-700 font-medium">Type:</span>
        <span className="text-blue-900">{examData.type}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-blue-700 font-medium">Doctor:</span>
        <span className="text-blue-900">{examData.doctor}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-blue-700 font-medium">Duration:</span>
        <span className="text-blue-900">{examData.duration}</span>
      </div>
    </div>
  </div>
);

export default ExamInfoSection; 