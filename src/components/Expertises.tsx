import React, { useState } from 'react';
import { Home, Users, Building2, Landmark, ArrowRight, FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface ExpertisesProps {
  onOpenDeposit: (category: 'immobilier' | 'succession' | 'entreprise') => void;
  onOpenRdv: () => void;
}

export const Expertises: React.FC<ExpertisesProps> = ({ onOpenDeposit, onOpenRdv }) => {
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);

  const toggleDomain = (id: string) => {
    setExpandedDomain(prev => (prev === id ? null : id));
  };

  const domainChecklists: Record<string, string[]> = {
    immobilier: [
      'Arrêté de Concession Définitive (ACD) ou Titre Foncier (TF)',
      'Extrait topographique avec coordonnées géoréférencées',
      'Certificat d\'urbanisme et état de situation au Livre Foncier',
      'Pièces d\'identité officielles (CNI, Passeport, Attestation)',
      'Protocole d\'accord d\'achat ou promesse de cession'
    ],
    succession: [
      'Extrait d\'acte de décès et livret de famille',
      'Jugement d\'hérédité délivré par le Tribunal de Première Instance',
      'Testament déposé ou acte de donation antérieur',
      'États des comptes bancaires et actifs fonciers du de cujus',
      'Pièces d\'identité et coordonnées de l\'ensemble des héritiers légaux'
    ],
    entreprise: [
      'Projet de statuts (SARL, SAS, SA, SCI) conformes aux Actes Uniformes OHADA',
      'Déclaration de souscription et de versement du capital social',
      'Pièces d\'identité des associés et gérants / dirigeants',
      'Contrat de bail professionnel ou attestation de domiciliation',
      'Immatriculation au RCCM et Déclaration Fiscale d\'Existence (DFE)'
    ],
    patrimoine: [
      'Inventaire des terrains, résidences et actifs professionnels en Côte d\'Ivoire',
      'Procuration notariée pour investisseur ou membre de la diaspora',
      'Plan de transmission et démembrement de propriété foncière',
      'Tableau des garanties hypothécaires et sûretés OHADA'
    ]
  };

  return (
    <section className="scroll-mt-28 py-20 bg-white border-b border-stone-200" id="expertise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#ec5b13] font-bold text-xs uppercase tracking-widest">Champs d'intervention</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#221610] mt-1">
            Nos Expertises Notariales
          </h2>
          <p className="text-stone-600 text-base mt-3 leading-relaxed">
            Maître KOFFI Yassoua Alain et son équipe vous assistent dans tous les domaines du droit foncier, des affaires OHADA, de la famille et du patrimoine en Côte d'Ivoire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Carte Foncier & Immobilier */}
          <div className="bg-[#f8f6f6] p-6 rounded-2xl border border-stone-200 hover:border-[#ec5b13] transition group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#ec5b13]/10 text-[#ec5b13] flex items-center justify-center mb-4 group-hover:bg-[#ec5b13] group-hover:text-white transition">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#221610] mb-2">Foncier &amp; Immobilier</h3>
              <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                Vérification de l'ACD, compromis et actes authentiques de vente, mutation de propriété, baux et lotissements.
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-stone-200/60">
              <button
                type="button"
                onClick={() => onOpenDeposit('immobilier')}
                className="w-full text-xs font-bold text-[#ec5b13] inline-flex items-center justify-between group-hover:underline"
              >
                <span>Déposer une vente / achat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => toggleDomain('immobilier')}
                className="text-[11px] text-stone-500 hover:text-stone-900 inline-flex items-center gap-1 w-full justify-between pt-1"
              >
                <span>Checklist pièces requises</span>
                {expandedDomain === 'immobilier' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Carte Famille & Succession */}
          <div className="bg-[#f8f6f6] p-6 rounded-2xl border border-stone-200 hover:border-[#ec5b13] transition group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#ec5b13]/10 text-[#ec5b13] flex items-center justify-center mb-4 group-hover:bg-[#ec5b13] group-hover:text-white transition">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#221610] mb-2">Famille &amp; Succession</h3>
              <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                Liquidation de successions, partages amiables, donations entre vifs, testaments authentiques et régimes matrimoniaux.
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-stone-200/60">
              <button
                type="button"
                onClick={() => onOpenDeposit('succession')}
                className="w-full text-xs font-bold text-[#ec5b13] inline-flex items-center justify-between group-hover:underline"
              >
                <span>Initier une succession</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => toggleDomain('succession')}
                className="text-[11px] text-stone-500 hover:text-stone-900 inline-flex items-center gap-1 w-full justify-between pt-1"
              >
                <span>Checklist pièces requises</span>
                {expandedDomain === 'succession' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Carte Sociétés & Droit OHADA */}
          <div className="bg-[#f8f6f6] p-6 rounded-2xl border border-stone-200 hover:border-[#ec5b13] transition group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#ec5b13]/10 text-[#ec5b13] flex items-center justify-center mb-4 group-hover:bg-[#ec5b13] group-hover:text-white transition">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#221610] mb-2">Sociétés &amp; Droit OHADA</h3>
              <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                Constitution de SARL, SAS, SA, statuts de SCI, immatriculation au RCCM, cessions de parts et baux commerciaux.
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-stone-200/60">
              <button
                type="button"
                onClick={() => onOpenDeposit('entreprise')}
                className="w-full text-xs font-bold text-[#ec5b13] inline-flex items-center justify-between group-hover:underline"
              >
                <span>Créer une société</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => toggleDomain('entreprise')}
                className="text-[11px] text-stone-500 hover:text-stone-900 inline-flex items-center gap-1 w-full justify-between pt-1"
              >
                <span>Checklist pièces requises</span>
                {expandedDomain === 'entreprise' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Carte Conseil & Diaspora */}
          <div className="bg-[#f8f6f6] p-6 rounded-2xl border border-stone-200 hover:border-[#ec5b13] transition group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#ec5b13]/10 text-[#ec5b13] flex items-center justify-center mb-4 group-hover:bg-[#ec5b13] group-hover:text-white transition">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#221610] mb-2">Sécurisation Diaspora</h3>
              <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                Vérification foncière anti-litiges, procurations notariées pour acquisition à distance et conseil en investissement.
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-stone-200/60">
              <button
                type="button"
                onClick={onOpenRdv}
                className="w-full text-xs font-bold text-[#ec5b13] inline-flex items-center justify-between group-hover:underline"
              >
                <span>Conseil &amp; Procuration</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => toggleDomain('patrimoine')}
                className="text-[11px] text-stone-500 hover:text-stone-900 inline-flex items-center gap-1 w-full justify-between pt-1"
              >
                <span>Checklist pièces requises</span>
                {expandedDomain === 'patrimoine' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>

        {/* Modal / Drawer dépliable checklist pour le domaine actif */}
        {expandedDomain && (
          <div className="mt-8 p-6 bg-[#f8f6f6] rounded-2xl border border-[#ec5b13]/30 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#ec5b13]" />
                <h4 className="font-bold text-sm text-[#221610]">
                  Documents recommandés pour votre démarche :{' '}
                  <span className="capitalize text-[#ec5b13]">{expandedDomain}</span>
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setExpandedDomain(null)}
                className="text-xs text-stone-500 hover:text-stone-800"
              >
                Fermer
              </button>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-stone-700">
              {domainChecklists[expandedDomain]?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-stone-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[11px] text-stone-500">
                Vous n'avez pas toutes les pièces ? Pas d'inquiétude, vous pouvez commencer votre dossier dès maintenant et nous vous guidons pour les pièces complémentaires.
              </p>
              {expandedDomain !== 'patrimoine' ? (
                <button
                  type="button"
                  onClick={() => onOpenDeposit(expandedDomain as any)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm transition"
                >
                  Téléverser ces pièces maintenant
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOpenRdv}
                  className="px-4 py-2 bg-[#ec5b13] hover:bg-[#d94f0e] text-white font-bold text-xs rounded-xl shadow-sm transition"
                >
                  Prendre rendez-vous avec l'Étude
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
