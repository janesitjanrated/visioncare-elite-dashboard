
export interface ExamForm {
  id: number;
  patient_id: number;
  doctor_id: number;
  exam_date: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
  patient_name?: string;
  patient_phone?: string;
  doctor_name?: string;
}

export interface ExamFormCreateRequest {
  patient_id: number;
  doctor_id: number;
  exam_date: string;
  status: string;
}

export interface PatientInfo {
  id?: number;
  exam_form_id: number;
  chief_complaint: string;
  present_illness: string;
  past_medical_history: string;
  family_history: string;
  social_history: string;
  medications: string;
  allergies: string;
}

export interface VisualAcuity {
  id?: number;
  exam_form_id: number;
  right_eye_unaided: string;
  left_eye_unaided: string;
  right_eye_aided: string;
  left_eye_aided: string;
  right_eye_pinhole: string;
  left_eye_pinhole: string;
}

export interface Refraction {
  id?: number;
  exam_form_id: number;
  right_eye_sphere: string;
  right_eye_cylinder: string;
  right_eye_axis: string;
  right_eye_add: string;
  left_eye_sphere: string;
  left_eye_cylinder: string;
  left_eye_axis: string;
  left_eye_add: string;
}

export interface Diagnosis {
  id?: number;
  exam_form_id: number;
  primary_diagnosis: string;
  secondary_diagnosis: string;
  differential_diagnosis: string;
  treatment_plan: string;
  follow_up_plan: string;
}
