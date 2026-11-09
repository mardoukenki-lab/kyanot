import React, { useState } from 'react';
import { Phone, Clock, MapPin, Laptop, Menu, X, Calendar, UploadCloud, Mail } from 'lucide-react';

interface HeaderProps {
  onOpenRdv: () => void;
  onOpenDeposit: (category?: 'immobilier' | 'succession' | 'entreprise') => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenRdv, onOpenDeposit }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* BARRE SUPÉRIEURE (Top Utility Bar) */}
      <div className="bg-[#240f1b] text-white text-xs py-2 px-4 sm:px-8 border-b border-[#4b2038] z-50 relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-6 text-slate-300">
            <span className="flex items-center gap-1.5 hover:text-white transition">
              <MapPin className="w-3.5 h-3.5 text-[#ec5b13]" />
              Bd. V.G.E - Imm. Balance (face Solibra), Abidjan 30 • Côte d'Ivoire
            </span>
            <span className="hidden md:flex items-center gap-1.5 hover:text-white transition">
              <Clock className="w-3.5 h-3.5 text-[#ec5b13]" />
              Lun-Ven: 08h00 - 18h00
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              className="hover:text-[#ec5b13] transition hidden xl:flex items-center gap-1 font-medium text-slate-200"
              href="mailto:kyanot.etudedemaitrekoffi@gmail.com"
            >
              <Mail className="w-3.5 h-3.5 text-[#ec5b13]" />
              kyanot.etudedemaitrekoffi@gmail.com
            </a>
            <span className="hidden xl:inline text-white/20">|</span>
            <a
              className="hover:text-[#ec5b13] transition flex items-center gap-1 font-medium text-slate-200"
              href="tel:+2252721000000"
            >
              <Phone className="w-3.5 h-3.5" />
              (+225) 27 21 00 00 00
            </a>
            <span className="text-white/20">|</span>
            <button
              type="button"
              className="text-white hover:text-[#ec5b13] font-medium transition flex items-center gap-1.5 underline underline-offset-4 decoration-[#ec5b13]/50 cursor-pointer"
              onClick={() => onOpenDeposit()}
            >
              <Laptop className="w-3.5 h-3.5 text-[#ec5b13]" />
              Démarrer un dossier à distance
            </button>
          </div>
        </div>
      </div>

      {/* NAVIGATION PRINCIPALE (Sticky Header Desktop & Mobile) */}
      <header className="sticky top-0 z-40 bg-[#240f1b]/95 backdrop-blur-md border-b border-[#4b2038] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a className="flex items-center gap-3 text-white group" href="#">
              <div className="w-10 h-10 rounded-xl bg-[#ec5b13] flex items-center justify-center shadow-lg shadow-[#ec5b13]/30 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight leading-tight text-white">KYANOT</span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#ce8db1]">
                  Étude Me KOFFI Yassoua Alain
                </span>
              </div>
            </a>

            {/* Liens Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              <a className="text-white/90 hover:text-white text-sm font-medium transition py-1 hover:border-b-2 hover:border-[#ec5b13]" href="#vision">
                L'Étude &amp; Vision
              </a>
              <a className="text-white/90 hover:text-white text-sm font-medium transition py-1 hover:border-b-2 hover:border-[#ec5b13]" href="#expertise">
                Expertises
              </a>
              <a className="text-white/90 hover:text-white text-sm font-medium transition py-1 hover:border-b-2 hover:border-[#ec5b13]" href="#parcours-kyanot">
                Comment ça marche
              </a>
              <a className="text-white/90 hover:text-white text-sm font-medium transition py-1 hover:border-b-2 hover:border-[#ec5b13]" href="#faq">
                FAQ
              </a>
              <a className="text-white/90 hover:text-white text-sm font-medium transition py-1 hover:border-b-2 hover:border-[#ec5b13]" href="#contact">
                Accès &amp; Contact
              </a>
            </nav>

            {/* CTA Buttons Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenDeposit('immobilier')}
                className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl h-10 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-md shadow-emerald-950/40 transition active:scale-95"
              >
                <UploadCloud className="w-4 h-4" />
                <span className="truncate">DÉPÔT EN LIGNE</span>
              </button>
              <button
                type="button"
                onClick={onOpenRdv}
                className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl h-10 px-4 bg-[#ec5b13] hover:bg-[#d94f0e] text-white text-sm font-bold shadow-md shadow-[#ec5b13]/20 transition active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span className="truncate">Prendre RDV</span>
              </button>
            </div>

            {/* Bouton Burger Mobile */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={onOpenRdv}
                className="text-xs font-bold px-3 py-2 bg-[#ec5b13] text-white rounded-lg flex items-center gap-1"
              >
                <Calendar className="w-3.5 h-3.5" />
                RDV
              </button>
              <button
                type="button"
                aria-label="Menu"
                className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Tiroir Mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#240f1b] border-t border-[#4b2038] px-6 py-6 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-4">
              <a className="text-white text-base font-semibold py-2 border-b border-[#4b2038]" href="#vision" onClick={closeMobileMenu}>
                L'Étude &amp; Vision
              </a>
              <a className="text-white text-base font-semibold py-2 border-b border-[#4b2038]" href="#expertise" onClick={closeMobileMenu}>
                Expertises
              </a>
              <a className="text-white text-base font-semibold py-2 border-b border-[#4b2038]" href="#parcours-kyanot" onClick={closeMobileMenu}>
                Comment ça marche
              </a>
              <a className="text-white text-base font-semibold py-2 border-b border-[#4b2038]" href="#faq" onClick={closeMobileMenu}>
                Questions Fréquentes (FAQ)
              </a>
              <a className="text-white text-base font-semibold py-2 border-b border-[#4b2038]" href="#contact" onClick={closeMobileMenu}>
                Accès &amp; Contact
              </a>
              <div className="pt-4 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    onOpenDeposit('immobilier');
                  }}
                  className="w-full flex justify-center items-center gap-2 rounded-xl h-11 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wider uppercase shadow-md transition"
                >
                  <UploadCloud className="w-4 h-4" />
                  DÉPÔT EN LIGNE
                </button>
                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    onOpenRdv();
                  }}
                  className="w-full flex justify-center items-center gap-2 rounded-xl h-11 bg-[#ec5b13] hover:bg-[#d94f0e] text-white font-bold text-sm shadow-md transition"
                >
                  <Calendar className="w-4 h-4" />
                  Prendre RDV
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
