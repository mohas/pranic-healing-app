import { Patient, Case, Record } from '../schemas';

export interface IPatientRepository {
  getAll(): Promise<Patient[]>;
  getById(id: string): Promise<Patient | null>;
  create(patient: Omit<Patient, 'id' | 'createdAt'>): Promise<Patient>;
  update(id: string, updates: Partial<Patient>): Promise<Patient>;
  delete(id: string): Promise<void>;
}

export interface ICaseRepository {
  getByPatientId(patientId: string): Promise<Case[]>;
  getById(id: string): Promise<Case | null>;
  create(caseData: Omit<Case, 'id' | 'createdAt' | 'updatedAt'>): Promise<Case>;
  update(id: string, updates: Partial<Case>): Promise<Case>;
  delete(id: string): Promise<void>;
}

export interface IRecordRepository {
  getByCaseId(caseId: string): Promise<Record[]>;
  getById(id: string): Promise<Record | null>;
  create(recordData: Omit<Record, 'id'>): Promise<Record>;
  update(id: string, updates: Partial<Record>): Promise<Record>;
}
