
import { apiClient } from './api';

export interface PrescriptionData {
  sphere: string;
  cylinder: string;
  axis: string;
  add?: string;
}

export interface VisualAcuity {
  distance: string;
  near: string;
  withCorrection: string;
}

export interface Patient {
  id: string;
  fullName: string;
  dateOfBirth: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email?: string;
  address: {
    street: string;
    district: string;
    province: string;
    postalCode: string;
  };
  currentPrescription: {
    od: PrescriptionData;
    os: PrescriptionData;
  };
  visualAcuity: {
    od: VisualAcuity;
    os: VisualAcuity;
  };
  doctorComment: string;
  lastVisitDate: string;
  followUpStatus: 'normal' | 'follow-up' | 'urgent';
  medicalRecord: MedicalRecord;
  prescriptionHistory: PrescriptionHistory[];
  billingHistory: BillingRecord[];
}

export interface MedicalRecord {
  chiefComplaint: {
    firstComplaint: string;
    secondComplaint?: string;
    blurryVisionDistance: boolean;
    blurryVisionNear: boolean;
  };
  pastOcularHistory: {
    lastExamDate?: string;
    examiner?: string;
    contactLensType?: string;
    contactLensDuration?: number;
    eyeglassesType?: string;
    surgeryHistory?: string;
    injuryHistory?: string;
    inflammationHistory?: string;
    floaterSymptoms: boolean;
    flashSymptoms: boolean;
    dryEyesSymptoms?: string;
  };
  diplopia: {
    headacheFrequency: number;
    diplopiaPresence: boolean;
  };
  pastMedicalHistory: {
    lastCheckupDate?: string;
    examinerLocation?: string;
    allergyHistory?: string;
    currentMedications?: string;
  };
  reviewOfSystems: {
    selfHistory: {
      glaucoma: boolean;
      diabetes: boolean;
      hypertension: boolean;
      thyroid: boolean;
    };
    familyHistory: {
      glaucoma: boolean;
      diabetes: boolean;
      hypertension: boolean;
      thyroid: boolean;
    };
  };
  socialHistory: {
    occupation?: string;
    hobbies?: string;
    computerUsage: 'low' | 'medium' | 'high';
    driving: boolean;
    alcoholUse: boolean;
    smoking: boolean;
  };
  pupillaryDistance: {
    od: number;
    os: number;
    total: number;
  };
  keratometry: {
    od: { k1: number; k1Axis: number; k2: number; k2Axis: number };
    os: { k1: number; k1Axis: number; k2: number; k2Axis: number };
  };
  pupilExam: {
    od: { photopicSize: number; mesopicSize: number; reaction: string };
    os: { photopicSize: number; mesopicSize: number; reaction: string };
  };
  retinoscopy: {
    od: PrescriptionData;
    os: PrescriptionData;
  };
  subjectiveRefraction: {
    od: PrescriptionData;
    os: PrescriptionData;
  };
  bestVisionAcuity: {
    od: string;
    os: string;
  };
  preliminaryTests: {
    versionPursuits: string;
    pupilConstriction: string;
    painOnEOM: boolean;
    coverTest: string;
    npc: number;
    npa: number;
    stereopsis: number;
    colorVision: string;
    amslerGrid: string;
    visualField: string;
  };
  doctorNotes: {
    comment: string;
    diagnosis: string;
    planManagement: string;
    followUpDate?: string;
    referred: boolean;
    referralSpecialty?: string;
  };
}

export interface PrescriptionHistory {
  id: string;
  date: string;
  od: PrescriptionData;
  os: PrescriptionData;
  doctorName: string;
  notes?: string;
}

export interface BillingRecord {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'cancelled';
  paymentMethod?: string;
}

class PatientDataService {
  async getPatients(): Promise<Patient[]> {
    try {
      const response = await apiClient.get('/users');
      return response.data.slice(0, 10).map((user: any, index: number) => ({
        id: `P${String(user.id).padStart(3, '0')}`,
        fullName: user.name,
        dateOfBirth: '1985-06-15',
        age: 35 + index,
        gender: index % 2 === 0 ? 'female' : 'male',
        phone: `081-234-${String(5678 + index).padStart(4, '0')}`,
        email: user.email,
        address: {
          street: `${123 + index} ถนนสุขุมวิท แขวงคลองตัน`,
          district: 'เขตวัฒนา',
          province: 'กรุงเทพมหานคร',
          postalCode: '10110'
        },
        currentPrescription: {
          od: { sphere: `-${(index + 1) * 0.5}`, cylinder: `-${index * 0.25}`, axis: `${90 + index * 10}` },
          os: { sphere: `-${(index + 1) * 0.5 + 0.25}`, cylinder: `-${index * 0.25}`, axis: `${85 + index * 10}` }
        },
        visualAcuity: {
          od: { distance: '20/40', near: 'J2', withCorrection: '20/20' },
          os: { distance: '20/30', near: 'J2', withCorrection: '20/20' }
        },
        doctorComment: this.getMockDoctorComment(index),
        lastVisitDate: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(),
        followUpStatus: this.getMockFollowUpStatus(index),
        medicalRecord: this.getMockMedicalRecord(index),
        prescriptionHistory: this.getMockPrescriptionHistory(user.id),
        billingHistory: this.getMockBillingHistory(user.id)
      }));
    } catch (error) {
      console.error('Error fetching patients:', error);
      return [];
    }
  }

  async getPatientById(id: string): Promise<Patient | null> {
    try {
      const patients = await this.getPatients();
      return patients.find(p => p.id === id) || null;
    } catch (error) {
      console.error('Error fetching patient:', error);
      return null;
    }
  }

  private getMockDoctorComment(index: number): string {
    const comments = [
      'ต้องใส่แว่นสายตาสั้นเป็นประจำ',
      'สายตาเสื่อมเล็กน้อย ควรพักสายตาบ่อยๆ',
      'ตาแห้ง แนะนำใช้น้ำตาเทียม',
      'สายตาปกติ ควรตรวจสายตาประจำปี',
      'สายตาสั้นเพิ่มขึ้น ต้องเปลี่ยนเลนส์ใหม่'
    ];
    return comments[index % comments.length];
  }

  private getMockFollowUpStatus(index: number): 'normal' | 'follow-up' | 'urgent' {
    const statuses: ('normal' | 'follow-up' | 'urgent')[] = ['normal', 'follow-up', 'normal', 'urgent', 'normal'];
    return statuses[index % statuses.length];
  }

  private getMockMedicalRecord(index: number): MedicalRecord {
    return {
      chiefComplaint: {
        firstComplaint: 'Blurry vision',
        secondComplaint: 'Eye strain',
        blurryVisionDistance: true,
        blurryVisionNear: false
      },
      pastOcularHistory: {
        lastExamDate: '2023-06-15',
        examiner: 'นพ.สมชาย รักษาดี',
        contactLensType: 'Soft Monthly',
        contactLensDuration: 2,
        eyeglassesType: 'Single Vision',
        surgeryHistory: 'None',
        injuryHistory: 'None',
        inflammationHistory: 'None',
        floaterSymptoms: false,
        flashSymptoms: false,
        dryEyesSymptoms: 'Mild'
      },
      diplopia: {
        headacheFrequency: 1,
        diplopiaPresence: false
      },
      pastMedicalHistory: {
        lastCheckupDate: '2024-01-15',
        examinerLocation: 'โรงพยาบาลสมิติเวช',
        allergyHistory: 'No known allergies',
        currentMedications: 'None'
      },
      reviewOfSystems: {
        selfHistory: {
          glaucoma: false,
          diabetes: false,
          hypertension: false,
          thyroid: false
        },
        familyHistory: {
          glaucoma: index % 3 === 0,
          diabetes: false,
          hypertension: false,
          thyroid: false
        }
      },
      socialHistory: {
        occupation: 'Office Worker',
        hobbies: 'Reading, Computer Gaming',
        computerUsage: 'high',
        driving: true,
        alcoholUse: false,
        smoking: false
      },
      pupillaryDistance: {
        od: 32,
        os: 32,
        total: 64
      },
      keratometry: {
        od: { k1: 43.5, k1Axis: 90, k2: 44.0, k2Axis: 180 },
        os: { k1: 43.2, k1Axis: 90, k2: 43.8, k2Axis: 180 }
      },
      pupilExam: {
        od: { photopicSize: 3, mesopicSize: 5, reaction: 'Normal' },
        os: { photopicSize: 3, mesopicSize: 5, reaction: 'Normal' }
      },
      retinoscopy: {
        od: { sphere: '-2.00', cylinder: '-0.50', axis: '90' },
        os: { sphere: '-2.25', cylinder: '-0.50', axis: '85' }
      },
      subjectiveRefraction: {
        od: { sphere: '-2.00', cylinder: '-0.50', axis: '90' },
        os: { sphere: '-2.25', cylinder: '-0.50', axis: '85' }
      },
      bestVisionAcuity: {
        od: '20/20',
        os: '20/20'
      },
      preliminaryTests: {
        versionPursuits: 'Normal',
        pupilConstriction: 'Normal',
        painOnEOM: false,
        coverTest: 'Orthophoria',
        npc: 8,
        npa: 35,
        stereopsis: 40,
        colorVision: 'Normal',
        amslerGrid: 'Normal',
        visualField: 'Normal'
      },
      doctorNotes: {
        comment: 'Progressive myopia with mild astigmatism',
        diagnosis: 'Myopia with Astigmatism',
        planManagement: 'Prescribe corrective lenses, annual follow-up',
        followUpDate: '2025-06-15',
        referred: false
      }
    };
  }

  private getMockPrescriptionHistory(userId: number): PrescriptionHistory[] {
    return [
      {
        id: `PH${userId}-1`,
        date: '2024-06-15',
        od: { sphere: '-2.00', cylinder: '-0.50', axis: '90' },
        os: { sphere: '-2.25', cylinder: '-0.50', axis: '85' },
        doctorName: 'นพ.สมชาย รักษาดี',
        notes: 'ปรับค่าสายตาเล็กน้อย'
      },
      {
        id: `PH${userId}-2`,
        date: '2023-06-15',
        od: { sphere: '-1.75', cylinder: '-0.25', axis: '90' },
        os: { sphere: '-2.00', cylinder: '-0.25', axis: '85' },
        doctorName: 'นพ.สมชาย รักษาดี',
        notes: 'สายตาสั้นเพิ่มขึ้นเล็กน้อย'
      }
    ];
  }

  private getMockBillingHistory(userId: number): BillingRecord[] {
    return [
      {
        id: `B${userId}-1`,
        date: '2024-06-15',
        description: 'ตรวจสายตา + แว่นตา',
        amount: 3500,
        status: 'paid',
        paymentMethod: 'เงินสด'
      },
      {
        id: `B${userId}-2`,
        date: '2023-06-15',
        description: 'ตรวจสายตาประจำปี',
        amount: 1500,
        status: 'paid',
        paymentMethod: 'โอนเงิน'
      }
    ];
  }
}

export const patientDataService = new PatientDataService();
