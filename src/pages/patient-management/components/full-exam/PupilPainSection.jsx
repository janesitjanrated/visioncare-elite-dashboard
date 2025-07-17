import React from 'react';
import Icon from '../../../../components/AppIcon';

const statusIcon = (value) => {
  if (!value) return null;
  const v = value.toLowerCase();
  if (v === 'normal' || v === 'none') return <span className="text-success mr-1">✔️</span>;
  if (v === 'abnormal' || v === 'pain') return <span className="text-error mr-1">❌</span>;
  if (v === 'borderline') return <span className="text-warning mr-1">⚠️</span>;
  return null;
};

const highlight = (value) => {
  if (!value) return '';
  const v = value.toLowerCase();
  if (v === 'normal' || v === 'none') return 'text-success font-semibold';
  if (v === 'abnormal' || v === 'pain') return 'text-error font-semibold';
  if (v === 'borderline') return 'text-warning font-semibold';
  return 'font-semibold';
};

const PupilPainSection = ({ examData }) => (
  <div className="border rounded-lg p-4">
    <h4 className="font-semibold text-gray-800 mb-2 flex items-center text-base">
      <Icon name="Eye" size={16} className="mr-2" />
      Pupil & Pain Assessment
    </h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
      {/* Left Column */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <div className="text-muted-foreground">Constriction</div>
          <div className={highlight(examData.constriction) + " flex items-center"}>
            {statusIcon(examData.constriction)}{examData.constriction}
          </div>
          <div className="text-muted-foreground">Pain</div>
          <div className={highlight(examData.pain) + " flex items-center"}>
            {statusIcon(examData.pain)}{examData.pain}
          </div>
        </div>
        {/* Cover Test */}
        <div>
          <h5 className="font-medium text-gray-700 mb-1">Cover Test</h5>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <div className="text-muted-foreground">Result</div>
            <div className={highlight(examData.covertest)}>{examData.covertest}</div>
          </div>
        </div>
        {/* Near Point */}
        <div>
          <h5 className="font-medium text-gray-700 mb-1">Near Point</h5>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <div className="text-muted-foreground">NPC</div>
            <div className="font-semibold">{examData.npc}</div>
            <div className="text-muted-foreground">NPA</div>
            <div className="font-semibold">{examData.npa}</div>
          </div>
        </div>
      </div>
      {/* Right Column */}
      <div className="space-y-4 mt-4 md:mt-0">
        {/* Stereopsis & Color Vision */}
        <div>
          <h5 className="font-medium text-gray-700 mb-1">Stereopsis & Color Vision</h5>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <div className="text-muted-foreground">Stereopsis</div>
            <div className="font-semibold">{examData.stereopsis} <span className="text-muted-foreground">({examData.stereopsisType})</span></div>
            <div className="text-muted-foreground">Color Vision</div>
            <div className={highlight(examData.colorVision) + " flex items-center"}>
              {statusIcon(examData.colorVision)}{examData.colorVision} <span className="text-muted-foreground ml-1">({examData.colorVisionType})</span>
            </div>
          </div>
        </div>
        {/* Amsler & Visual Field */}
        <div>
          <h5 className="font-medium text-gray-700 mb-1">Amsler & Visual Field</h5>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <div className="text-muted-foreground">Amsler</div>
            <div className={highlight(examData.amsler) + " flex items-center"}>
              {statusIcon(examData.amsler)}{examData.amsler}
            </div>
            <div className="text-muted-foreground">VF</div>
            <div className="font-semibold">{examData.vf} <span className="text-muted-foreground">({examData.vfType})</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PupilPainSection; 