import { MockRepositories } from './mockAdapter';
import { IPatientRepository, ICaseRepository, IRecordRepository } from './interfaces';

// In a real scenario, you would have a RealPatientRepository that uses fetch()
// For now, we only have the mock.

export const Repositories = {
  patients: MockRepositories.patients as IPatientRepository,
  cases: MockRepositories.cases as ICaseRepository,
  records: MockRepositories.records as IRecordRepository,
};
