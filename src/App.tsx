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
    // 1. Search param check: ?page=homeminister or ?homeminister or ?admin
    try {
      const search = window.location.search;
      if (search) {
        const params = new URLSearchParams(search);
        const pageParam = params.get('page') || params.get('route');
        if (pageParam === 'homeminister' || pageParam?.startsWith('homeminister/')) {
          return pageParam;
        }
        if (params.has('homeminister') || params.has('admin')) {
          return 'homeminister';
        }
      }
    } catch {
      // ignore
    }

    // 2. Hash check (supports #/homeminister, #homeminister, #/admin)
    const rawHash = (window.location.hash || '').replace(/^#\/?/, '').replace(/\/+$/, '');
    if (rawHash === 'homeminister' || rawHash.startsWith('homeminister/')) {
      return rawHash;
    }
    if (rawHash === 'admin' || rawHash.startsWith('admin/')) {
      return rawHash.replace(/^admin/, 'homeminister');
    }

    // 3. Pathname check: strip leading & trailing slashes and index.html
    let rawPath = (window.location.pathname || '')
      .replace(/^\/+/, '')
      .replace(/\/+$/, '')
      .replace(/^index\.html\/?/, '');

    if (rawPath === 'homeminister' || rawPath.startsWith('homeminister/')) {
      return rawPath;
    }
    if (rawPath === 'admin' || rawPath.startsWith('admin/')) {
      return rawPath.replace(/^admin/, 'homeminister');
    }

    return rawPath || rawHash || 'home';
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);

  // Sync state and listen to history events
  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(getInitialPath());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAuthChange = () => {
      setAdminSession(db.getSession());
    };

    // Secret Admin Shortcut: Ctrl+Shift+H or Cmd+Shift+H (or Ctrl+Shift+A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key.toLowerCase() === 'h' || e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        navigateTo('homeminister');
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('tecyu_auth_change', handleAuthChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('tecyu_auth_change', handleAuthChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navigateTo = (path: string) => {
    const normalized = path.replace(/^\/+/, '').replace(/\/+$/, '');
    const targetUrl = normalized === '' || normalized === 'home' ? '/' : `/${normalized}`;

    try {
      window.history.pushState(null, '', targetUrl);
    } catch {
      // In restricted iframes fallback to hash
      window.location.hash = targetUrl;
    }
    setCurrentPath(normalized || 'home');
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
            try {
              window.history.replaceState(null, '', '/homeminister');
            } catch {
              // ignore
            }
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
          try {
            window.history.replaceState(null, '', '/homeminister');
          } catch {
            // ignore
          }
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
