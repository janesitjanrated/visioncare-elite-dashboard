
import { ExamFormRepository } from '../repositories/ExamFormRepository';
import { ExamForm, ExamFormCreateRequest, PatientInfo, VisualAcuity, Refraction, SlitLamp, Fundus, Diagnosis } from '../models/ExamForm';

export class ExamFormService {
  constructor(private examFormRepository: ExamFormRepository) {}

  async getAllExamForms(): Promise<ExamForm[]> {
    return await this.examFormRepository.findAll();
  }

  async getExamFormById(id: number): Promise<any> {
    const examForm = await this.examFormRepository.findById(id);
    
    if (!examForm) {
      return null;
    }

    // Get all related data
    const patientInfo = await this.examFormRepository.findPatientInfo(id);
    const visualAcuity = await this.examFormRepository.findVisualAcuity(id);
    const refraction = await this.examFormRepository.findRefraction(id);
    const slitLamp = await this.examFormRepository.findSlitLamp(id);
    const fundus = await this.examFormRepository.findFundus(id);
    const diagnosis = await this.examFormRepository.findDiagnosis(id);

    return {
      ...examForm,
      patient_info: patientInfo,
      visual_acuity: visualAcuity,
      refraction: refraction,
      slit_lamp: slitLamp,
      fundus: fundus,
      diagnosis: diagnosis
    };
  }

  async getExamFormsByPatientId(patientId: number): Promise<ExamForm[]> {
    return await this.examFormRepository.findByPatientId(patientId);
  }

  async createExamForm(examFormData: ExamFormCreateRequest): Promise<ExamForm> {
    return await this.examFormRepository.create(examFormData);
  }

  async updatePatientInfo(examFormId: number, patientInfo: Omit<PatientInfo, 'id' | 'exam_form_id'>): Promise<PatientInfo> {
    return await this.examFormRepository.upsertPatientInfo({ ...patientInfo, exam_form_id: examFormId });
  }

  async updateVisualAcuity(examFormId: number, visualAcuity: Omit<VisualAcuity, 'id' | 'exam_form_id'>): Promise<VisualAcuity> {
    return await this.examFormRepository.upsertVisualAcuity({ ...visualAcuity, exam_form_id: examFormId });
  }

  async updateRefraction(examFormId: number, refraction: Omit<Refraction, 'id' | 'exam_form_id'>): Promise<Refraction> {
    return await this.examFormRepository.upsertRefraction({ ...refraction, exam_form_id: examFormId });
  }

  async updateSlitLamp(examFormId: number, slitLamp: Omit<SlitLamp, 'id' | 'exam_form_id'>): Promise<SlitLamp> {
    return await this.examFormRepository.upsertSlitLamp({ ...slitLamp, exam_form_id: examFormId });
  }

  async updateFundus(examFormId: number, fundus: Omit<Fundus, 'id' | 'exam_form_id'>): Promise<Fundus> {
    return await this.examFormRepository.upsertFundus({ ...fundus, exam_form_id: examFormId });
  }

  async updateDiagnosis(examFormId: number, diagnosis: Omit<Diagnosis, 'id' | 'exam_form_id'>): Promise<Diagnosis> {
    return await this.examFormRepository.upsertDiagnosis({ ...diagnosis, exam_form_id: examFormId });
  }
}
