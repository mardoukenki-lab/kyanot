import React from 'react';
import { ShieldCheck, Users, Smartphone, CheckCircle, ArrowRight, Award } from 'lucide-react';

interface VisionProps {
  onOpenRdv: () => void;
}

export const Vision: React.FC<VisionProps> = ({ onOpenRdv }) => {
  return (
    <section className="scroll-mt-28 py-20 bg-[#f8f6f6] border-b border-stone-200" id="vision">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-[#ec5b13] font-bold text-xs uppercase tracking-widest">Valeurs &amp; Approche</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#221610] mt-1">
              L'Étude &amp; Vision : Office de Me KOFFI Yassoua Alain
            </h2>
            <p className="text-stone-600 text-base mt-3 leading-relaxed">
              Allier la rigueur institutionnelle du droit ivoirien et des actes uniformes OHADA, la proximité d'un notaire assermenté dédié et la réactivité de transmission pour sécuriser chaque transaction.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenRdv}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#240f1b] text-white hover:bg-black font-semibold text-sm transition shadow-sm"
          >
            Rencontrer Me KOFFI Yassoua Alain
            <ArrowRight className="w-4 h-4 text-[#ec5b13]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-[#ec5b13]/10 text-[#ec5b13] flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#221610] mb-2">Sécurité juridique absolue</h3>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              Purge foncière (ACD, CMP, Livre foncier), vérification de propriété et conformité aux règles de l'OHADA pour garantir l'inattaquabilité de vos actes.
            </p>
            <ul className="text-xs text-stone-500 space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Contrôle rigoureux à la Conservation Foncière</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Conservation perpétuelle au rang des minutes de l'Étude</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-[#ec5b13]/10 text-[#ec5b13] flex items-center justify-center mb-5">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#221610] mb-2">Accompagnement de proximité</h3>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              Me KOFFI Yassoua Alain et ses collaborateurs juristes vous conseillent avec bienveillance, que vous soyez sur place à Abidjan ou dans la diaspora.
            </p>
            <ul className="text-xs text-stone-500 space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Interlocuteur dédié et disponible</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Suivi d'avancement transparent par WhatsApp, appel ou email</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-[#ec5b13]/10 text-[#ec5b13] flex items-center justify-center mb-5">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#221610] mb-2">Outils digitaux fluides</h3>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              Espace client en ligne, transmission instantanée de pièces justificatives et procurations authentiques pour la diaspora ivoirienne.
            </p>
            <ul className="text-xs text-stone-500 space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dépôt dématérialisé 24h/24 et 7j/7</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Visioconférence &amp; signatures à distance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Charte Déontologique */}
        <div className="mt-8 p-5 rounded-2xl bg-white border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#240f1b] text-white flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[#ec5b13]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#221610]">Office Public &amp; Ministériel Assermenté</h4>
              <p className="text-xs text-stone-500">
                Chambre Nationale des Notaires de Côte d'Ivoire (CNNCI) • Actes authentiques sous le sceau de l'État
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-stone-100 text-stone-700">
            Droit Ivoirien &amp; Traités OHADA
          </span>
        </div>
      </div>
    </section>
  );
};
