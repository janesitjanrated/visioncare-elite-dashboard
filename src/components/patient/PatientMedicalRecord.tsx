
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, AlertTriangle, Save, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Patient } from '@/services/patientDataService';

interface PatientMedicalRecordProps {
  patient: Patient;
}

const PatientMedicalRecord: React.FC<PatientMedicalRecordProps> = ({ patient }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [medicalRecord, setMedicalRecord] = useState(patient.medicalRecord);

  const checkAlerts = () => {
    const newAlerts: string[] = [];
    
    // Alert logic based on specifications
    if (medicalRecord.diplopia.headacheFrequency > 2) {
      newAlerts.push('Headache frequency >2/week - Consider evaluation');
    }
    
    if (medicalRecord.reviewOfSystems.familyHistory.glaucoma && patient.age > 40) {
      newAlerts.push('Family history of glaucoma + Age >40 - Suggest IOP + OCT');
    }
    
    if (medicalRecord.diplopia.headacheFrequency > 3 && medicalRecord.diplopia.diplopiaPresence) {
      newAlerts.push('Headache >3x/week + diplopia - Consider neuro referral');
    }
    
    if (medicalRecord.socialHistory.computerUsage === 'high' && medicalRecord.pastOcularHistory.dryEyesSymptoms) {
      newAlerts.push('High computer use + dry eyes - Suggest DED evaluation');
    }

    setAlerts(newAlerts);
  };

  React.useEffect(() => {
    checkAlerts();
  }, [medicalRecord]);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Saving medical record:', medicalRecord);
  };

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {alerts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-800">
              <AlertTriangle className="h-5 w-5 mr-2" />
              การแจ้งเตือน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="text-orange-800">{alert}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Controls */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">ระเบียนการรักษา</h3>
        <div className="space-x-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                บันทึก
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                ยกเลิก
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              แก้ไข
            </Button>
          )}
        </div>
      </div>

      {/* Chief Complaint */}
      <Card>
        <CardHeader>
          <CardTitle>อาการสำคัญ (Chief Complaint)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">อาการแรก *</label>
              {isEditing ? (
                <Select value={medicalRecord.chiefComplaint.firstComplaint}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Blurry vision">มองเห็นไม่ชัด</SelectItem>
                    <SelectItem value="Eye strain">ตาเมื่อย</SelectItem>
                    <SelectItem value="Headache">ปวดหัว</SelectItem>
                    <SelectItem value="Dry eyes">ตาแห้ง</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="p-2 bg-gray-50 rounded">{medicalRecord.chiefComplaint.firstComplaint}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">อาการที่สอง</label>
              {isEditing ? (
                <Input 
                  value={medicalRecord.chiefComplaint.secondComplaint || ''} 
                  placeholder="อาการเพิ่มเติม"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded">{medicalRecord.chiefComplaint.secondComplaint || '-'}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={medicalRecord.chiefComplaint.blurryVisionDistance}
                disabled={!isEditing}
              />
              <label>มองไกลไม่ชัด</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={medicalRecord.chiefComplaint.blurryVisionNear}
                disabled={!isEditing}
              />
              <label>มองใกล้ไม่ชัด</label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Past Ocular History */}
      <Card>
        <CardHeader>
          <CardTitle>ประวัติตา (Past Ocular History)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">วันที่ตรวจครั้งสุดท้าย</label>
              {isEditing ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {medicalRecord.pastOcularHistory.lastExamDate || "เลือกวันที่"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" initialFocus className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              ) : (
                <p className="p-2 bg-gray-50 rounded">{medicalRecord.pastOcularHistory.lastExamDate || '-'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ผู้ตรวจ</label>
              {isEditing ? (
                <Input value={medicalRecord.pastOcularHistory.examiner || ''} />
              ) : (
                <p className="p-2 bg-gray-50 rounded">{medicalRecord.pastOcularHistory.examiner || '-'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ประเภทคอนแทคเลนส์</label>
              {isEditing ? (
                <Select value={medicalRecord.pastOcularHistory.contactLensType || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกประเภท" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Soft Daily">Soft Daily</SelectItem>
                    <SelectItem value="Soft Monthly">Soft Monthly</SelectItem>
                    <SelectItem value="RGP">RGP</SelectItem>
                    <SelectItem value="None">ไม่ใส่</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="p-2 bg-gray-50 rounded">{medicalRecord.pastOcularHistory.contactLensType || '-'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ระยะเวลาใส่ (ปี)</label>
              {isEditing ? (
                <Input 
                  type="number" 
                  step="0.5"
                  value={medicalRecord.pastOcularHistory.contactLensDuration || ''} 
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded">{medicalRecord.pastOcularHistory.contactLensDuration || '-'}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={medicalRecord.pastOcularHistory.floaterSymptoms}
                disabled={!isEditing}
              />
              <label>อาการลูกตาลอย</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={medicalRecord.pastOcularHistory.flashSymptoms}
                disabled={!isEditing}
              />
              <label>อาการแสงแล่บ</label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diplopia/Headache */}
      <Card>
        <CardHeader>
          <CardTitle>อาการปวดหัว / มองภาพซ้อน</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">ความถี่ปวดหัว (ครั้ง/สัปดาห์)</label>
              {isEditing ? (
                <Input 
                  type="number" 
                  value={medicalRecord.diplopia.headacheFrequency}
                  onChange={(e) => setMedicalRecord({
                    ...medicalRecord,
                    diplopia: {
                      ...medicalRecord.diplopia,
                      headacheFrequency: parseInt(e.target.value) || 0
                    }
                  })}
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded">{medicalRecord.diplopia.headacheFrequency}</p>
              )}
              {medicalRecord.diplopia.headacheFrequency > 2 && (
                <p className="text-sm text-orange-600 mt-1">⚠️ ปวดหัวบ่อย ควรติดตาม</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={medicalRecord.diplopia.diplopiaPresence}
                disabled={!isEditing}
                onCheckedChange={(checked) => setMedicalRecord({
                  ...medicalRecord,
                  diplopia: {
                    ...medicalRecord.diplopia,
                    diplopiaPresence: checked
                  }
                })}
              />
              <label>มองภาพซ้อน</label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review of Systems */}
      <Card>
        <CardHeader>
          <CardTitle>ประวัติส่วนตัวและครอบครัว</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">ประวัติส่วนตัว</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(medicalRecord.reviewOfSystems.selfHistory).map(([condition, value]) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox checked={value} disabled={!isEditing} />
                  <label className="capitalize">{condition}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">ประวัติครอบครัว</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(medicalRecord.reviewOfSystems.familyHistory).map(([condition, value]) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox checked={value} disabled={!isEditing} />
                  <label className="capitalize">{condition}</label>
                  {condition === 'glaucoma' && value && patient.age > 40 && (
                    <Badge variant="destructive" className="text-xs">ความเสี่ยงสูง</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social History */}
      <Card>
        <CardHeader>
          <CardTitle>ประวัติสังคม</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">อาชีพ</label>
              {isEditing ? (
                <Input value={medicalRecord.socialHistory.occupation || ''} />
              ) : (
                <p className="p-2 bg-gray-50 rounded">{medicalRecord.socialHistory.occupation || '-'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">งานอดิเรก</label>
              {isEditing ? (
                <Input value={medicalRecord.socialHistory.hobbies || ''} />
              ) : (
                <p className="p-2 bg-gray-50 rounded">{medicalRecord.socialHistory.hobbies || '-'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">การใช้คอมพิวเตอร์</label>
              {isEditing ? (
                <Select value={medicalRecord.socialHistory.computerUsage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">น้อย (&lt; 2 ชั่วโมง)</SelectItem>
                    <SelectItem value="medium">ปานกลาง (2-4 ชั่วโมง)</SelectItem>
                    <SelectItem value="high">มาก (&gt; 4 ชั่วโมง)</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="p-2 bg-gray-50 rounded">
                  {medicalRecord.socialHistory.computerUsage === 'high' ? 'มาก (> 4 ชั่วโมง)' :
                   medicalRecord.socialHistory.computerUsage === 'medium' ? 'ปานกลาง (2-4 ชั่วโมง)' : 'น้อย (< 2 ชั่วโมง)'}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Switch checked={medicalRecord.socialHistory.driving} disabled={!isEditing} />
              <label>ขับรถ</label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch checked={medicalRecord.socialHistory.alcoholUse} disabled={!isEditing} />
              <label>ดื่มแอลกอฮอล์</label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch checked={medicalRecord.socialHistory.smoking} disabled={!isEditing} />
              <label>สูบบุหรี่</label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Doctor's Notes */}
      <Card>
        <CardHeader>
          <CardTitle>บันทึกแพทย์</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">ความเห็นแพทย์</label>
            {isEditing ? (
              <Textarea 
                value={medicalRecord.doctorNotes.comment}
                rows={3}
              />
            ) : (
              <p className="p-3 bg-gray-50 rounded">{medicalRecord.doctorNotes.comment}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">การวินิจฉัย</label>
            {isEditing ? (
              <Input value={medicalRecord.doctorNotes.diagnosis} />
            ) : (
              <p className="p-2 bg-gray-50 rounded">{medicalRecord.doctorNotes.diagnosis}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">แผนการรักษา</label>
            {isEditing ? (
              <Textarea 
                value={medicalRecord.doctorNotes.planManagement}
                rows={3}
              />
            ) : (
              <p className="p-3 bg-gray-50 rounded">{medicalRecord.doctorNotes.planManagement}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">วันนัดติดตาม</label>
              {isEditing ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {medicalRecord.doctorNotes.followUpDate || "เลือกวันที่"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" initialFocus className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              ) : (
                <p className="p-2 bg-gray-50 rounded">{medicalRecord.doctorNotes.followUpDate || '-'}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={medicalRecord.doctorNotes.referred}
                disabled={!isEditing}
              />
              <label>ส่งต่อแพทย์เชี่ยวชาญ</label>
            </div>
          </div>

          {medicalRecord.doctorNotes.referred && (
            <div>
              <label className="block text-sm font-medium mb-2">แผนกที่ส่งต่อ</label>
              {isEditing ? (
                <Input value={medicalRecord.doctorNotes.referralSpecialty || ''} />
              ) : (
                <p className="p-2 bg-gray-50 rounded">{medicalRecord.doctorNotes.referralSpecialty || '-'}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientMedicalRecord;
