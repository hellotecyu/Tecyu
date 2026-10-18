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

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    return hash || 'home';
  });

  // Keep state in sync with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      setCurrentPath(hash || 'home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (path: string) => {
    window.location.hash = `#/${path}`;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in admin mode
  if (currentPath.startsWith('admin')) {
    const adminModule = currentPath.split('/')[1] || 'overview';
    return (
      <AdminPanel
        initialModule={adminModule}
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
