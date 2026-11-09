import React, { useState, useEffect } from 'react';
import SplashCursor from './SplashCursor';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Vision } from './components/Vision';
import { Expertises } from './components/Expertises';
import { ProcessSteps } from './components/ProcessSteps';
import { FAQ } from './components/FAQ';
import { AccessContact } from './components/AccessContact';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { DepositModal } from './components/DepositModal';
import { AppointmentData, DossierCategory, ClientDossier } from './types';

export default function App() {
  const [isRdvModalOpen, setIsRdvModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [depositCategory, setDepositCategory] = useState<DossierCategory>('immobilier');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenRdv = () => {
    setIsRdvModalOpen(true);
  };

  const handleOpenDeposit = (category: DossierCategory = 'immobilier') => {
    setDepositCategory(category);
    setIsDepositModalOpen(true);
  };

  const handleDossierCreated = (_newDossier: ClientDossier) => {
    showToast("Vos pièces ont bien été transmises à l'Étude. Vous serez directement notifié(e) par téléphone/SMS dès que l'acte sera prêt.");
  };

  const handleBookingConfirmed = (booking: AppointmentData) => {
    showToast(`Rendez-vous ${booking.referenceId} enregistré pour le ${booking.date} à ${booking.timeSlot}.`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  // Fermeture des modales via touche Echap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsRdvModalOpen(false);
        setIsDepositModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f8f6f6] font-display text-[#221610] antialiased selection:bg-[#ec5b13] selection:text-white">
      {/* SplashCursor interactif */}
      <SplashCursor
        rainbow
        size={1.6}
        force={0.8}
        swirl={18}
        trail={2.5}
        clickSplash={false}
        intensity={0.7}
        shading={0.4}
        contained
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#240f1b] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-[#4b2038] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header & Barre supérieure */}
      <Header onOpenRdv={handleOpenRdv} onOpenDeposit={handleOpenDeposit} />

      {/* Hero Section */}
      <Hero onOpenRdv={handleOpenRdv} onOpenDeposit={handleOpenDeposit} />

      {/* Section 1: L'Étude & Vision */}
      <Vision onOpenRdv={handleOpenRdv} />

      {/* Section 2: Expertises */}
      <Expertises onOpenDeposit={handleOpenDeposit} onOpenRdv={handleOpenRdv} />

      {/* Section 3: Comment ça marche (Dépôt -> Instruction -> Notification client -> Signature) */}
      <ProcessSteps
        onOpenDeposit={() => handleOpenDeposit('immobilier')}
        onOpenRdv={handleOpenRdv}
      />

      {/* Section 4: Foire Aux Questions (FAQ) recommandée par l'audit */}
      <FAQ
        onOpenRdv={handleOpenRdv}
        onOpenDeposit={() => handleOpenDeposit('immobilier')}
      />

      {/* Section 5: Accès & Contact */}
      <AccessContact onOpenRdv={handleOpenRdv} />

      {/* Footer */}
      <Footer
        onOpenDeposit={() => handleOpenDeposit('immobilier')}
        onOpenRdv={handleOpenRdv}
      />

      {/* Modales */}
      <AppointmentModal
        isOpen={isRdvModalOpen}
        onClose={() => setIsRdvModalOpen(false)}
        onBookingConfirmed={handleBookingConfirmed}
      />

      <DepositModal
        isOpen={isDepositModalOpen}
        initialCategory={depositCategory}
        onClose={() => setIsDepositModalOpen(false)}
        onDossierCreated={handleDossierCreated}
      />
    </div>
  );
}
