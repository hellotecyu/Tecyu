import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { db } from '../../lib/database';

export const FloatingActions: React.FC = () => {
  const [showTop, setShowTop] = useState(false);
  const settings = db.getSettings();

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappCleanNumber = (settings.whatsappNumber || '').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappCleanNumber}?text=${encodeURIComponent(
    'Hello TECYU team, I would like to inquire about digital solutions for my business.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Floating WhatsApp Button */}
      {settings.isWhatsAppEnabled && whatsappCleanNumber && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all focus:outline-hidden"
          aria-label="Chat on WhatsApp with TECYU"
          title="Chat with us on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
          <span className="absolute right-14 bg-slate-900 text-white text-xs font-medium px-2.5 py-1 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat on WhatsApp
          </span>
        </a>
      )}

      {/* Floating Back to Top Button */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-slate-900 text-white shadow-md hover:bg-[#2563EB] hover:shadow-lg hover:scale-105 active:scale-95 transition-all focus:outline-hidden cursor-pointer"
          aria-label="Scroll back to top"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
