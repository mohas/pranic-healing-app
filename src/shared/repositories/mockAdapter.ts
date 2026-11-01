import { IPatientRepository, ICaseRepository, IRecordRepository } from './interfaces';
import { Patient, Case, Record } from '../schemas';

class MockPatientRepository implements IPatientRepository {
  private patients: Patient[] = [
    {
      id: 'p1',
      fullName: 'علی محمدی',
      phoneNumber: '09123456789',
      email: 'ali@example.com',
      gender: 'male',
      dateOfBirth: '1985-05-12',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'p2',
      fullName: 'سارا احمدی',
      phoneNumber: '09129876543',
      email: 'sara@example.com',
      gender: 'female',
      dateOfBirth: '1992-11-20',
      createdAt: new Date().toISOString(),
    },
  ];

  async getAll() { return [...this.patients]; }
  async getById(id: string) { return this.patients.find(p => p.id === id) || null; }
  async create(p: any) {
    const newP = { ...p, id: `p${Date.now()}`, createdAt: new Date().toISOString() };
    this.patients.push(newP);
    return newP;
  }
  async update(id: string, updates: any) {
    const idx = this.patients.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Not found');
    this.patients[idx] = { ...this.patients[idx], ...updates };
    return this.patients[idx];
  }
  async delete(id: string) { this.patients = this.patients.filter(p => p.id !== id); }
}

class MockCaseRepository implements ICaseRepository {
  private cases: Case[] = [
    {
      id: 'c1',
      patientId: 'p1',
      healerId: 'h1',
      title: 'درد کمر مزمن',
      description: 'بیمار از درد شدید در ناحیه کمر شکایت دارد',
      status: 'open',
      priority: 'high',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  async getByPatientId(patientId: string) { return this.cases.filter(c => c.patientId === patientId); }
  async getById(id: string) { return this.cases.find(c => c.id === id) || null; }
  async create(c: any) {
    const newC = { ...c, id: `c${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    this.cases.push(newC);
    return newC;
  }
  async update(id: string, updates: any) {
    const idx = this.cases.findIndex(c => c.id === id);
    if (idx === -1) throw new Error('Not found');
    this.cases[idx] = { ...this.cases[idx], ...updates, updatedAt: new Date().toISOString() };
    return this.cases[idx];
  }
  async delete(id: string) { this.cases = this.cases.filter(c => c.id !== id); }
}

class MockRecordRepository implements IRecordRepository {
  private records: Record[] = [
    {
      id: 'r1',
      caseId: 'c1',
      timestamp: new Date().toISOString(),
      type: 'session',
      chakraStatus: {
        root: 'OA', sacral: 'N', solar_plexus: 'UA', heart: 'N', throat: 'N', third_eye: 'N', crown: 'N',
      },
      symptoms: [{ point: 'lower_back', intensity: 8, description: 'درد تیز' }],
      notes: 'جلسه اول: پاکسازی اولیه انجام شد',
      afterVisitInstructions: [{ instruction: 'نوشیدن آب زیاد', isCompleted: false }],
    },
  ];

  async getByCaseId(caseId: string) { return this.records.filter(r => r.caseId === caseId); }
  async getById(id: string) { return this.records.find(r => r.id === id) || null; }
  async create(r: any) {
    const newR = { ...r, id: `r${Date.now()}` };
    this.records.push(newR);
    return newR;
  }
  async update(id: string, updates: any) {
    const idx = this.records.findIndex(r => r.id === id);
    if (idx === -1) throw new Error('Not found');
    this.records[idx] = { ...this.records[idx], ...updates };
    return this.records[idx];
  }
}

export const MockRepositories = {
  patients: new MockPatientRepository(),
  cases: new MockCaseRepository(),
  records: new MockRecordRepository(),
};
