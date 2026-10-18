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
  onLogout: () => void;
  initialModule?: string;
  adminUser?: {
    id: string;
    name: string;
    email: string;
    username: string;
    role: UserRole;
  };
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onExitAdmin,
  onLogout,
  initialModule = 'overview',
  adminUser,
}) => {
  const [currentModule, setCurrentModule] = useState(initialModule);
  const [currentRole, setCurrentRole] = useState<UserRole>(adminUser?.role || 'super_admin');

  const handleSelectModule = (mod: string) => {
    setCurrentModule(mod);
    const targetUrl = mod === 'overview' ? '/homeminister' : `/homeminister/${mod}`;
    try {
      window.history.pushState(null, '', targetUrl);
    } catch {
      // fallback if pushState is restricted
    }
  };

  return (
    <AdminLayout
      currentModule={currentModule}
      onSelectModule={handleSelectModule}
      onExitAdmin={onExitAdmin}
      onLogout={onLogout}
      adminUser={adminUser}
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
