export const ROUTES = {
  AUTH: 'auth',
  DASHBOARD: 'dashboard',
  PATIENTS_LIST: 'patients_list',
  PATIENT_DETAIL: 'patient_detail',
  CASE_DETAIL: 'case_detail',
  RECORD_CREATE: 'record_create',
  RECORD_DETAIL: 'record_detail',
  SETTINGS: 'settings',
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];
