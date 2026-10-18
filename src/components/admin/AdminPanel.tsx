import React, { useState } from 'react';
import { UserRole } from '../../types';
import { AdminLayout } from './AdminLayout';
import { AdminDashboardOverview } from './AdminDashboardOverview';
import { AdminLeadsCRM } from './AdminLeadsCRM';
import { AdminServices } from './AdminServices';
import { AdminPortfolio } from './AdminPortfolio';
import { AdminBlog } from './AdminBlog';
import { AdminCareers } from './AdminCareers';
import { AdminTeam } from './AdminTeam';
import { AdminTestimonials } from './AdminTestimonials';
import { AdminHomepage } from './AdminHomepage';
import { AdminSEO } from './AdminSEO';
import { AdminBranding } from './AdminBranding';
import { AdminMedia } from './AdminMedia';
import { AdminSettings } from './AdminSettings';
import { AdminUsers } from './AdminUsers';
import { AdminLogs } from './AdminLogs';

interface AdminPanelProps {
  onExitAdmin: () => void;
  initialModule?: string;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onExitAdmin, initialModule = 'overview' }) => {
  const [currentModule, setCurrentModule] = useState(initialModule);
  const [currentRole, setCurrentRole] = useState<UserRole>('super_admin');

  return (
    <AdminLayout
      currentModule={currentModule}
      onSelectModule={setCurrentModule}
      onExitAdmin={onExitAdmin}
      currentRole={currentRole}
      onChangeRole={setCurrentRole}
    >
      {currentModule === 'overview' && (
        <AdminDashboardOverview onNavigateModule={setCurrentModule} />
      )}
      {currentModule === 'leads' && <AdminLeadsCRM />}
      {currentModule === 'services' && <AdminServices />}
      {currentModule === 'portfolio' && <AdminPortfolio />}
      {currentModule === 'blog' && <AdminBlog />}
      {currentModule === 'careers' && <AdminCareers />}
      {currentModule === 'team' && <AdminTeam />}
      {currentModule === 'testimonials' && <AdminTestimonials />}
      {currentModule === 'homepage' && <AdminHomepage />}
      {currentModule === 'seo' && <AdminSEO />}
      {currentModule === 'branding' && <AdminBranding />}
      {currentModule === 'media' && <AdminMedia />}
      {currentModule === 'settings' && <AdminSettings />}
      {currentModule === 'users' && <AdminUsers />}
      {currentModule === 'logs' && <AdminLogs />}
    </AdminLayout>
  );
};
