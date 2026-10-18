import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FloatingActions } from './components/common/FloatingActions';
import { HomePage } from './components/home/HomePage';
import { ServicesPage } from './components/services/ServicesPage';
import { PortfolioPage } from './components/portfolio/PortfolioPage';
import { IndustriesPage } from './components/industries/IndustriesPage';
import { TechnologiesPage } from './components/technologies/TechnologiesPage';
import { AboutPage } from './components/about/AboutPage';
import { CareersPage } from './components/careers/CareersPage';
import { BlogPage } from './components/blog/BlogPage';
import { ContactPage } from './components/contact/ContactPage';
import { LegalPages } from './components/legal/LegalPages';
import { AdminPanel } from './components/admin/AdminPanel';
import { AdminLogin } from './components/admin/AdminLogin';
import { db } from './lib/database';
import { AdminSession } from './types';

export default function App() {
  const [adminSession, setAdminSession] = useState<AdminSession | null>(() => db.getSession());

  const getInitialPath = (): string => {
    const rawPath = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
    const hash = window.location.hash.replace(/^#\/?/, '');

    if (rawPath === 'homeminister' || rawPath.startsWith('homeminister/')) {
      return rawPath;
    }
    if (hash === 'homeminister' || hash.startsWith('homeminister/')) {
      return hash;
    }
    if (rawPath === 'admin' || rawPath.startsWith('admin/')) {
      return rawPath.replace(/^admin/, 'homeminister');
    }
    if (hash === 'admin' || hash.startsWith('admin/')) {
      return hash.replace(/^admin/, 'homeminister');
    }

    return hash || (rawPath && rawPath !== '' ? rawPath : 'home');
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);

  // Keep state in sync with URL hash, popstate, and auth events
  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(getInitialPath());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAuthChange = () => {
      setAdminSession(db.getSession());
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('tecyu_auth_change', handleAuthChange);

    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('tecyu_auth_change', handleAuthChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    window.location.hash = `#/${path}`;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in secret admin mode (/homeminister)
  if (currentPath.startsWith('homeminister') || currentPath.startsWith('admin')) {
    // If not logged in, gate with AdminLogin
    if (!adminSession) {
      return (
        <AdminLogin
          onLoginSuccess={(session) => {
            setAdminSession(session);
          }}
          onBackToSite={() => navigateTo('home')}
        />
      );
    }

    const adminModule = currentPath.split('/')[1] || 'overview';
    return (
      <AdminPanel
        initialModule={adminModule}
        adminUser={adminSession.user}
        onLogout={() => {
          db.clearSession();
          setAdminSession(null);
        }}
        onExitAdmin={() => navigateTo('home')}
      />
    );
  }

  // Parse path for dynamic routes
  const [baseRoute, subParam] = currentPath.split('/');

  // Query parameter parsing (e.g. ?slug=...)
  const getQueryParam = (name: string): string | undefined => {
    const urlParts = currentPath.split('?');
    if (urlParts.length > 1) {
      const searchParams = new URLSearchParams(urlParts[1]);
      return searchParams.get(name) || undefined;
    }
    return undefined;
  };

  const currentSlug = subParam || getQueryParam('slug');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Navigation */}
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />

      {/* Main Page Routing */}
      <main className="flex-1">
        {baseRoute === 'home' && <HomePage onNavigate={navigateTo} />}

        {baseRoute === 'services' && (
          <ServicesPage selectedSlug={currentSlug} onNavigate={navigateTo} />
        )}

        {baseRoute === 'portfolio' && (
          <PortfolioPage selectedSlug={currentSlug} onNavigate={navigateTo} />
        )}

        {baseRoute === 'industries' && <IndustriesPage onNavigate={navigateTo} />}

        {baseRoute === 'technologies' && <TechnologiesPage onNavigate={navigateTo} />}

        {baseRoute === 'about' && <AboutPage onNavigate={navigateTo} />}

        {baseRoute === 'careers' && <CareersPage onNavigate={navigateTo} />}

        {baseRoute === 'blog' && (
          <BlogPage selectedSlug={currentSlug} onNavigate={navigateTo} />
        )}

        {baseRoute === 'contact' && <ContactPage onNavigate={navigateTo} />}

        {(baseRoute === 'privacy' ||
          baseRoute === 'terms' ||
          baseRoute === 'cookies' ||
          baseRoute === 'disclaimer') && (
          <LegalPages
            initialTab={baseRoute as 'privacy' | 'terms' | 'cookies' | 'disclaimer'}
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Floating WhatsApp and Scroll-to-Top Actions */}
      <FloatingActions />
    </div>
  );
}
