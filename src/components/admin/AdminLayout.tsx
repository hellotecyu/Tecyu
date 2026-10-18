import React, { useState } from 'react';
import { TecyuLogo } from '../common/TecyuLogo';
import { UserRole } from '../../types';
import { db } from '../../lib/database';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  FolderGit2,
  Settings,
  Bell,
  Search,
  LogOut,
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
  Award,
  Globe,
  Sliders,
  Menu,
  X,
  History,
  Palette,
  Image,
} from 'lucide-react';

interface AdminLayoutProps {
  currentModule: string;
  onSelectModule: (module: string) => void;
  onExitAdmin: () => void;
  onLogout?: () => void;
  adminUser?: {
    name: string;
    email: string;
    role: UserRole;
  };
  currentRole: UserRole;
  onChangeRole?: (role: UserRole) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentModule,
  onSelectModule,
  onExitAdmin,
  onLogout,
  adminUser,
  currentRole,
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifications = db.getNotifications();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const roleLabels: Record<UserRole, string> = {
    super_admin: 'Super Admin',
    admin: 'Admin',
    content_editor: 'Content Editor',
    sales_manager: 'Sales Manager',
    hr_manager: 'HR Manager',
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, roles: ['super_admin', 'admin', 'sales_manager', 'hr_manager', 'content_editor'] },
    { id: 'leads', label: 'Leads & CRM', icon: Users, badge: db.getInquiries().filter((i) => i.status === 'New').length, roles: ['super_admin', 'admin', 'sales_manager'] },
    { id: 'services', label: 'Services CMS', icon: Layers, roles: ['super_admin', 'admin', 'content_editor'] },
    { id: 'portfolio', label: 'Portfolio CMS', icon: FolderGit2, roles: ['super_admin', 'admin', 'content_editor'] },
    { id: 'blog', label: 'Blog & Articles', icon: FileText, roles: ['super_admin', 'admin', 'content_editor'] },
    { id: 'careers', label: 'Careers & Hiring', icon: Briefcase, badge: db.getApplications().filter((a) => a.status === 'New').length, roles: ['super_admin', 'admin', 'hr_manager'] },
    { id: 'team', label: 'Team Members', icon: Users, roles: ['super_admin', 'admin'] },
    { id: 'testimonials', label: 'Testimonials', icon: Award, roles: ['super_admin', 'admin'] },
    { id: 'homepage', label: 'Homepage Builder', icon: Sliders, roles: ['super_admin', 'admin', 'content_editor'] },
    { id: 'seo', label: 'SEO Management', icon: Globe, roles: ['super_admin', 'admin'] },
    { id: 'branding', label: 'Branding & Logos', icon: Palette, roles: ['super_admin', 'admin'] },
    { id: 'media', label: 'Media Library', icon: Image, roles: ['super_admin', 'admin', 'content_editor'] },
    { id: 'settings', label: 'Business Settings', icon: Settings, roles: ['super_admin', 'admin'] },
    { id: 'users', label: 'Roles & Access', icon: Shield, roles: ['super_admin'] },
    { id: 'logs', label: 'Activity Logs', icon: History, roles: ['super_admin', 'admin'] },
  ];

  const allowedMenuItems = menuItems.filter((item) => item.roles.includes(currentRole));

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex text-slate-800 antialiased font-sans">
      {/* SIDEBAR DESKTOP */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#08152F] text-slate-300 border-r border-slate-800 shrink-0 select-none">
        {/* Brand header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <TecyuLogo variant="dark" size="sm" tagline="" />
          <span className="text-[10px] font-mono uppercase bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded border border-blue-700/50">
            Console
          </span>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
            Workspace Modules
          </div>

          {allowedMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectModule(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#2563EB] text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info & Logout & Return button */}
        <div className="p-3 border-t border-slate-800/80 space-y-2">
          {adminUser && (
            <div className="px-3 py-2 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-7 h-7 rounded-lg bg-blue-600/30 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0">
                  {adminUser.name[0].toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-semibold text-white truncate">{adminUser.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{adminUser.email}</div>
                </div>
              </div>
            </div>
          )}

          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-400 hover:text-white hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>Log Out & Lock</span>
            </button>
          )}

          <button
            onClick={onExitAdmin}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Return to Website</span>
          </button>
        </div>
      </aside>

      {/* MOBILE DRAWER */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-950/60" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 bg-[#08152F] text-slate-300 flex flex-col h-full z-10">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <TecyuLogo variant="dark" size="sm" />
              <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {allowedMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectModule(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium ${
                      isActive ? 'bg-[#2563EB] text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-sm font-bold text-[#08152F] capitalize">
              Workspace / {currentModule.replace('-', ' ')}
            </div>
          </div>

          {/* Role switcher & notification controls */}
          <div className="flex items-center gap-4">
            {/* Authenticated User Role Badge (Read-Only: Super Admin controls roles via Access module) */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 hidden sm:inline">Role:</span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                  currentRole === 'super_admin'
                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                    : currentRole === 'admin'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : currentRole === 'sales_manager'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : currentRole === 'content_editor'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                }`}
                title="Your assigned role. Only Super Admin can change user roles."
              >
                <Shield className="w-3 h-3" />
                <span>{roleLabels[currentRole] || currentRole}</span>
              </span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
                )}
              </button>

              {/* Notification Drawer */}
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900">Notifications</span>
                    <button
                      onClick={() => db.markAllNotificationsRead()}
                      className="text-[11px] text-[#2563EB] hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <div className="text-xs text-slate-400 py-4 text-center">No notifications</div>
                    ) : (
                      notifications.slice(0, 6).map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            db.markNotificationAsRead(n.id);
                            if (n.link?.includes('leads')) onSelectModule('leads');
                            if (n.link?.includes('careers')) onSelectModule('careers');
                            setNotifOpen(false);
                          }}
                          className={`p-2.5 rounded-xl text-xs cursor-pointer transition-colors ${
                            n.isRead ? 'bg-slate-50 text-slate-600' : 'bg-blue-50/80 text-blue-900 font-medium'
                          }`}
                        >
                          <div className="font-bold">{n.title}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{n.message}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Exit */}
            <button
              onClick={onExitAdmin}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#08152F] hover:bg-slate-800 rounded-lg cursor-pointer transition-colors"
            >
              <span>Live Site</span>
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg cursor-pointer transition-colors border border-rose-200"
                title="Log Out of Admin Console"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            )}
          </div>
        </header>

        {/* BODY CONTAINER */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
