import React, { useState } from 'react';
import { useRouterStore } from './useRouterStore';
import { ROUTES } from './routes';
import { Layout } from '../../components/Layout';
import { AuthPage } from '../../pages/AuthPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { PatientsListPage } from '../../pages/PatientsListPage';
import { RecordCreatePage } from '../../pages/RecordCreatePage';
import { PatientDetailPage } from '../../pages/PatientDetailPage';
import { CaseDetailPage } from '../../pages/CaseDetailPage';
import { DataDebugPage } from '../../pages/DataDebugPage';

export const Router: React.FC = () => {
  const currentRoute = useRouterStore((state) => state.currentRoute);
  const [activePatientId, setActivePatientId] = useState('p1'); // Mock state
  const [activeCaseId, setActiveCaseId] = useState('c1'); // Mock state

  const renderPage = () => {
    switch (currentRoute) {
      case ROUTES.AUTH: return <AuthPage />;
      case ROUTES.DASHBOARD: return <DashboardPage />;
      case ROUTES.PATIENTS_LIST: return <PatientsListPage />;
      case ROUTES.PATIENT_DETAIL: return <PatientDetailPage patientId={activePatientId} />;
      case ROUTES.CASE_DETAIL: return <CaseDetailPage caseId={activeCaseId} />;
      case ROUTES.RECORD_CREATE: return <RecordCreatePage />;
      case ROUTES.RECORD_DETAIL: return <div style={{textAlign:'center'}}>در حال پیاده‌سازی...</div>;
      case ROUTES.SETTINGS: return <div style={{textAlign:'center'}}>در حال پیاده‌سازی...</div>;
      case ROUTES.DEBUG_DATA: return <DataDebugPage />;
      default: return <div style={{textAlign:'center'}}>صفحه یافت نشد</div>;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
};
