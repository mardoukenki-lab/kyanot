import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Scale, FileText, Globe, ArrowRight } from 'lucide-react';

interface FAQProps {
  onOpenRdv: () => void;
  onOpenDeposit: () => void;
}

interface FAQItem {
  id: string;
  category: 'foncier' | 'diaspora' | 'tarifs' | 'societes';
  question: string;
  answer: string;
  highlight?: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'foncier',
    question: "L'intervention d'un notaire est-elle obligatoire pour acheter un terrain ou une maison en Côte d'Ivoire ?",
    answer: "Oui, la loi ivoirienne rend obligatoire l'acte authentique notarié pour toute transaction immobilière portant sur un bien immatriculé. Seul l'acte de vente notarié permet de transférer valablement la propriété, de purger les hypothèques et d'inscrire votre nom au Livre Foncier à la Conservation de la Propriété Foncière (ACD / Titre Foncier). Les simples actes sous seing privé ne protègent pas l'acquéreur face aux litiges.",
    highlight: "Obligation légale & inscription au Livre Foncier garantie"
  },
  {
    id: 'faq-2',
    category: 'foncier',
    question: "Quelles sont les vérifications préalables effectuées par l'Étude avant une vente ?",
    answer: "Avant toute signature, l'Étude de Me KOFFI Yassoua Alain réquisitionne l'état de situation foncière officiel auprès de la Conservation Foncière (pour s'assurer de l'absence d'hypothèque ou de saisie), vérifie l'authenticité de l'ACD (Arrêté de Concession Définitive) ou du Certificat de Mutation, et contrôle le plan topographique visé par un géomètre expert agréé. Les fonds sont séquestrés en toute sécurité sur le compte de l'Étude.",
    highlight: "Séquestre sécurisé des fonds & contrôle cadastral"
  },
  {
    id: 'faq-3',
    category: 'diaspora',
    question: "Résidant à l'étranger (diaspora), puis-je réaliser mon opération sans voyager à Abidjan ?",
    answer: "Absolument. Une part importante des dossiers de l'Étude concerne les Ivoiriens et investisseurs de la diaspora (Europe, Amérique du Nord, Afrique). Vous transmettez vos documents numérisés, nous instruisons le dossier à distance, et vous pouvez soit signer par procuration authentique certifiée établie auprès d'un consulat ou notaire local, soit participer à une consultation préalable en visioconférence sécurisée avec Me KOFFI Yassoua Alain.",
    highlight: "Accompagnement dédié diaspora & procuration consulaire"
  },
  {
    id: 'faq-4',
    category: 'tarifs',
    question: "Comment sont calculés les frais d'acte et émoluments notariés en Côte d'Ivoire ?",
    answer: "Les frais d'acte ne reviennent pas intégralement au notaire : ils regroupent principalement les droits d'enregistrement et de publicité foncière reversés directement au Trésor Public ivoirien (DGI / Conservation Foncière), les déboursés (frais administratifs, géomètre, états du Livre Foncier) et les émoluments du notaire, strictement encadrés par le décret tarifaire officiel de la République de Côte d'Ivoire.",
    highlight: "Tarifs réglementés par la République de Côte d'Ivoire"
  },
  {
    id: 'faq-5',
    category: 'societes',
    question: "Quels sont les délais pour constituer une société (SARL, SAS) sous l'Acte Uniforme OHADA ?",
    answer: "Grâce à notre rigueur procédurale et à la liaison avec le CEPICI et le Greffe du Tribunal de Commerce (RCCM), la rédaction des statuts authentiques, la déclaration de souscription et de versement (DSV) et l'immatriculation s'effectuent généralement sous 48 à 72 heures ouvrées après réception des pièces complètes des associés.",
    highlight: "Traitement rapide sous 48h à 72h ouvrées (OHADA / RCCM)"
  },
  {
    id: 'faq-6',
    category: 'foncier',
    question: "Comment suis-je informé de l'avancement de mon dossier ?",
    answer: "Dès que vos pièces sont reçues et que l'instruction juridique est achevée, vous êtes directement notifié(e) par téléphone, SMS et email par l'équipe de Maître KOFFI Yassoua Alain avec le projet d'acte finalisé. Un rendez-vous solennel unique est ensuite fixé à l'Étude (Immeuble Balance, Bd. VGE) ou à distance pour la signature de l'acte authentique.",
    highlight: "Notification directe client dès que l'acte est rédigé"
  }
];

export const FAQ: React.FC<FAQProps> = ({ onOpenRdv, onOpenDeposit }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<'all' | 'foncier' | 'diaspora' | 'tarifs' | 'societes'>('all');

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const filteredItems = activeCategory === 'all'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section className="scroll-mt-28 py-20 bg-stone-50 border-b border-stone-200" id="faq">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ec5b13]/10 text-[#ec5b13] text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Questions Fréquentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#221610]">
            Foire Aux Questions Notariales
          </h2>
          <p className="text-stone-600 text-sm mt-3 leading-relaxed">
            Les réponses claires et certifiées de l'Étude de <strong>Me KOFFI Yassoua Alain</strong> pour préparer sereinement votre acquisition, votre succession ou la création de votre société en Côte d'Ivoire.
          </p>

          {/* Filtres par thématique */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#240f1b] text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              Toutes les questions
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('foncier')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeCategory === 'foncier'
                  ? 'bg-[#240f1b] text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              Foncier &amp; Immobilier (ACD)
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('diaspora')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeCategory === 'diaspora'
                  ? 'bg-[#240f1b] text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              Diaspora &amp; Démarches à distance
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('societes')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeCategory === 'societes'
                  ? 'bg-[#240f1b] text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              Sociétés &amp; OHADA
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('tarifs')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeCategory === 'tarifs'
                  ? 'bg-[#240f1b] text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              Frais &amp; Émoluments
            </button>
          </div>
        </div>

        {/* Liste des questions accordéon */}
        <div className="space-y-3.5 max-w-4xl mx-auto">
          {filteredItems.map(item => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl transition border ${
                  isOpen
                    ? 'bg-white border-[#ec5b13]/40 shadow-md ring-1 ring-[#ec5b13]/10'
                    : 'bg-white border-stone-200 hover:border-stone-300 shadow-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#ec5b13] shrink-0"></span>
                    <span className="text-sm sm:text-base font-bold text-[#221610] leading-snug">
                      {item.question}
                    </span>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#ec5b13]/10 text-[#ec5b13]' : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 mt-1">
                    <p>{item.answer}</p>
                    {item.highlight && (
                      <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{item.highlight}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bloc d'action / contact rapide en fin de FAQ */}
        <div className="mt-12 p-6 rounded-2xl bg-[#240f1b] text-white border border-[#4b2038] flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div>
            <h3 className="text-base font-bold text-white">Vous avez une question spécifique sur votre projet ?</h3>
            <p className="text-xs text-slate-300 mt-1">
              Contactez directement l'Étude de Me KOFFI Yassoua Alain pour une analyse confidentielle de vos documents.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenDeposit}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
            >
              Transmettre mes pièces
            </button>
            <button
              type="button"
              onClick={onOpenRdv}
              className="px-4 py-2.5 bg-[#ec5b13] hover:bg-[#d94f0e] text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
            >
              Prendre RDV
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
