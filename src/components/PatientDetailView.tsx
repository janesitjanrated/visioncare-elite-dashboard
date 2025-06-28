import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Phone, Calendar, Mail, MapPin } from 'lucide-react';
import { Patient } from '@/hooks/usePatients';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface PatientDetailViewProps {
  patient: Patient;
  onBack: () => void;
}

interface ExamForm {
  id: number;
  exam_date: string;
  doctor_name?: string;
  status: string;
  // สามารถเพิ่ม field อื่น ๆ ตาม schema ได้
}

interface ExamFormDetail {
  id: number;
  exam_date: string;
  doctor_name?: string;
  status: string;
  patient_info?: any;
  visual_acuity?: any;
  refraction?: any;
  slit_lamp?: any;
  fundus?: any;
  diagnosis?: any;
}

export const PatientDetailView: React.FC<PatientDetailViewProps> = ({ patient, onBack }) => {
  const [examForms, setExamForms] = useState<ExamForm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [examDetail, setExamDetail] = useState<ExamFormDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExamForms = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/exam-forms/patient/${patient.id}`);
        if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลการตรวจได้');
        const data = await res.json();
        setExamForms(data);
      } catch (err: any) {
        setError(err.message || 'เกิดข้อผิดพลาด');
      } finally {
        setLoading(false);
      }
    };
    fetchExamForms();
  }, [patient.id]);

  useEffect(() => {
    if (selectedExamId) {
      setDetailLoading(true);
      setDetailError(null);
      setExamDetail(null);
      fetch(`/api/exam-forms/${selectedExamId}`)
        .then(res => {
          if (!res.ok) throw new Error('ไม่สามารถโหลดรายละเอียดการตรวจ');
          return res.json();
        })
        .then(data => setExamDetail(data))
        .catch(err => setDetailError(err.message || 'เกิดข้อผิดพลาด'))
        .finally(() => setDetailLoading(false));
    }
  }, [selectedExamId]);

  function formatDateTime(dateStr?: string) {
    if (!dateStr || typeof dateStr !== 'string') return '-';
    // ตรวจสอบ pattern YYYY-MM-DD หรือ YYYY-MM-DDTHH:mm:ss
    if (!/^\d{4}-\d{2}-\d{2}/.test(dateStr)) return '-';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? '-' : d.toLocaleString('th-TH');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>กลับ</span>
                </Button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
                  <p className="text-gray-600">ข้อมูลผู้ป่วย</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-900">ข้อมูลส่วนบุคคล</h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">ชื่อ-นามสกุล</p>
                        <p className="font-medium">{patient.name}</p>
                      </div>
                    </div>

                    {patient.email && (
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">อีเมล</p>
                          <p className="font-medium">{patient.email}</p>
                        </div>
                      </div>
                    )}

                    {patient.phone && (
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">เบอร์โทรศัพท์</p>
                          <p className="font-medium">{patient.phone}</p>
                        </div>
                      </div>
                    )}

                    {patient.date_of_birth && (
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">วันเกิด</p>
                          <p className="font-medium">
                            {new Date(patient.date_of_birth).toLocaleDateString('th-TH')}
                          </p>
                        </div>
                      </div>
                    )}

                    {patient.address && (
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">ที่อยู่</p>
                          <p className="font-medium">{patient.address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-900">ข้อมูลเพิ่มเติม</h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">วันที่สร้างข้อมูล</p>
                        <p className="font-medium">
                          {new Date(patient.created_at).toLocaleDateString('th-TH')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">ประวัติการตรวจ (Exam Forms)</h2>
                {loading && <p>กำลังโหลด...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && (
                  <div className="space-y-4">
                    {examForms.length === 0 ? (
                      <p>ยังไม่มีข้อมูลการตรวจ</p>
                    ) : (
                      <ul className="divide-y divide-gray-200">
                        {examForms.map((exam) => (
                          <li key={exam.id} className="py-2 flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <span className="font-medium text-emerald-700">{formatDateTime(exam.exam_date)}</span>
                              {exam.doctor_name && (
                                <span className="ml-2 text-gray-500">โดย {exam.doctor_name}</span>
                              )}
                            </div>
                            <div>
                              <span className="inline-block px-2 py-1 rounded text-xs bg-gray-100 text-gray-700 mr-2">{exam.status}</span>
                              <Button size="sm" variant="outline" className="mt-2 md:mt-0" onClick={() => setSelectedExamId(exam.id)}>ดูรายละเอียด</Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการ</h2>
                <div className="flex space-x-4">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    แก้ไขข้อมูล
                  </Button>
                  <Button variant="outline">
                    สร้างนัดหมาย
                  </Button>
                  <Button variant="outline">
                    ดูประวัติการรักษา
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Modal for exam detail */}
      <Dialog open={!!selectedExamId} onOpenChange={open => !open && setSelectedExamId(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>รายละเอียดการตรวจ</DialogTitle>
            <DialogDescription>
              {detailLoading && <p>กำลังโหลด...</p>}
              {detailError && <p className="text-red-500">{detailError}</p>}
            </DialogDescription>
          </DialogHeader>
          {examDetail && !detailLoading && !detailError && (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <div className="text-sm text-gray-500">วันที่ตรวจ</div>
                <div className="font-medium">{formatDateTime(examDetail.exam_date)}</div>
                {examDetail.doctor_name && (
                  <div className="text-sm text-gray-500">แพทย์ผู้ตรวจ: {examDetail.doctor_name}</div>
                )}
                <div className="text-sm text-gray-500">สถานะ: {examDetail.status}</div>
              </div>
              {examDetail.patient_info && (
                <div>
                  <div className="font-semibold">Chief Complaint</div>
                  <div className="text-gray-700">{examDetail.patient_info.chief_complaint}</div>
                  <div className="font-semibold mt-2">Present Illness</div>
                  <div className="text-gray-700">{examDetail.patient_info.present_illness}</div>
                  <div className="font-semibold mt-2">Past Medical History</div>
                  <div className="text-gray-700">{examDetail.patient_info.past_medical_history}</div>
                </div>
              )}
              {examDetail.visual_acuity && (
                <div>
                  <div className="font-semibold">Visual Acuity</div>
                  <div className="text-gray-700">ขวา (unaided): {examDetail.visual_acuity.right_eye_unaided} | ซ้าย (unaided): {examDetail.visual_acuity.left_eye_unaided}</div>
                  <div className="text-gray-700">ขวา (aided): {examDetail.visual_acuity.right_eye_aided} | ซ้าย (aided): {examDetail.visual_acuity.left_eye_aided}</div>
                </div>
              )}
              {examDetail.refraction && (
                <div>
                  <div className="font-semibold">Refraction</div>
                  <div className="text-gray-700">ขวา: Sph {examDetail.refraction.right_eye_sphere}, Cyl {examDetail.refraction.right_eye_cylinder}, Axis {examDetail.refraction.right_eye_axis}</div>
                  <div className="text-gray-700">ซ้าย: Sph {examDetail.refraction.left_eye_sphere}, Cyl {examDetail.refraction.left_eye_cylinder}, Axis {examDetail.refraction.left_eye_axis}</div>
                </div>
              )}
              {examDetail.diagnosis && (
                <div>
                  <div className="font-semibold">Diagnosis</div>
                  <div className="text-gray-700">{examDetail.diagnosis.primary_diagnosis}</div>
                  <div className="font-semibold mt-2">Treatment Plan</div>
                  <div className="text-gray-700">{examDetail.diagnosis.treatment_plan}</div>
                  <div className="font-semibold mt-2">Follow Up</div>
                  <div className="text-gray-700">{examDetail.diagnosis.follow_up_plan}</div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
