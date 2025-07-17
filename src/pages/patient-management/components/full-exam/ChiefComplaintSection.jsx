import React from 'react';
import Icon from '../../../../components/AppIcon';

const ChiefComplaintSection = ({ examData }) => (
  <div className="border rounded-lg p-4">
    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
      <Icon name="MessageSquare" size={16} className="mr-2" />
      Chief Complaint
    </h4>
    <div className="space-y-3">
      <div className="space-y-2">
        <div>
          <span className="text-gray-600 text-sm">Primary:</span>
          <p className="text-gray-800 text-sm">{examData.chiefComplaint1}</p>
        </div>
        <div>
          <span className="text-gray-600 text-sm">Secondary:</span>
          <p className="text-gray-800 text-sm">{examData.chiefComplaint2}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center">
          <input type="checkbox" checked={examData.contactLens} readOnly className="mr-2" />
          <span>Contact Lens</span>
        </div>
        <div className="flex items-center">
          <input type="checkbox" checked={examData.glasses} readOnly className="mr-2" />
          <span>Glasses</span>
        </div>
        <div className="flex items-center">
          <input type="checkbox" checked={examData.blurNear} readOnly className="mr-2" />
          <span>Blur Near</span>
        </div>
        <div className="flex items-center">
          <input type="checkbox" checked={examData.blurFar} readOnly className="mr-2" />
          <span>Blur Far</span>
        </div>
      </div>
    </div>
  </div>
);

export default ChiefComplaintSection; 