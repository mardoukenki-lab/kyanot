import React from 'react';
import { ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ProcessStepsProps {
  onOpenDeposit: () => void;
  onOpenRdv: () => void;
}

export const ProcessSteps: React.FC<ProcessStepsProps> = ({ onOpenDeposit, onOpenRdv }) => {
  return (
    <section className="scroll-mt-28 py-20 bg-[#f8f6f6] border-b border-stone-200" id="parcours-kyanot">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#ec5b13] font-bold text-xs uppercase tracking-widest">Processus Transparent</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#221610] mt-1">
            Comment ça marche : Votre Parcours Simplifié
          </h2>
          <p className="text-stone-600 text-base mt-3 leading-relaxed">
            De l'ouverture de votre démarche à la signature solennelle de l'acte authentique, suivez 4 étapes claires sans complexité administrative.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Étape 1 */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 relative flex flex-col justify-between hover:border-[#ec5b13] transition shadow-sm">
            <div>
              <div className="text-3xl font-black text-[#ec5b13]/30 mb-2 font-mono">01</div>
              <h3 className="text-lg font-bold text-[#221610] mb-2">Dépôt ou Rendez-vous</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Déposez vos informations via notre formulaire sécurisé ou prenez rendez-vous en visio ou à l'étude.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
              <button
                type="button"
                onClick={onOpenDeposit}
                className="text-xs font-semibold text-[#ec5b13] hover:underline inline-flex items-center gap-1"
              >
                <span>Initier un dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Étape 2 */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 relative flex flex-col justify-between hover:border-[#ec5b13] transition shadow-sm">
            <div>
              <div className="text-3xl font-black text-[#ec5b13]/30 mb-2 font-mono">02</div>
              <h3 className="text-lg font-bold text-[#221610] mb-2">Instruction du dossier</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Votre juriste vérifie les justificatifs, purge les formalités préalables (DIA, cadastre, état civil) et rédige l'acte.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100">
              <span className="text-xs font-semibold text-stone-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Contrôle sous 48h
              </span>
            </div>
          </div>

          {/* Étape 3 */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 relative flex flex-col justify-between hover:border-[#ec5b13] transition shadow-sm">
            <div>
              <div className="text-3xl font-black text-[#ec5b13]/30 mb-2 font-mono">03</div>
              <h3 className="text-lg font-bold text-[#221610] mb-2">Notification quand c'est prêt</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Aucun suivi fastidieux à vérifier en ligne : dès que votre projet d'acte est finalisé, vous êtes directement notifié(e) par appel, SMS et email.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100">
              <span className="text-xs font-semibold text-stone-500 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Alerte directe client
              </span>
            </div>
          </div>

          {/* Étape 4 */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 relative flex flex-col justify-between hover:border-[#ec5b13] transition shadow-sm">
            <div>
              <div className="text-3xl font-black text-[#ec5b13]/30 mb-2 font-mono">04</div>
              <h3 className="text-lg font-bold text-[#221610] mb-2">Signature &amp; Archivage</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Signature solennelle en étude (Bd. VGE) ou par visioconférence sécurisée diaspora, suivie de la délivrance de vos attestations authentiques.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100">
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                1 seule visite pour signer
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
