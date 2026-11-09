import React, { useState } from 'react';
import { UploadCloud, Calendar, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenRdv: () => void;
  onOpenDeposit: (category?: 'immobilier' | 'succession' | 'entreprise') => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRdv, onOpenDeposit }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative bg-[#240f1b] text-white pt-10 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#ce8db1] text-xs font-semibold uppercase tracking-wider w-fit border border-[#6b2e50]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Office notarial de référence • Me KOFFI Yassoua Alain
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Étude de Me KOFFI Yassoua Alain
              <span className="block text-[#ec5b13] tracking-widest font-black uppercase text-2xl sm:text-3xl lg:text-4xl mt-2">
                NOTAIRE
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Simplifiez vos démarches notariales : foncier, immobilier, succession, droit des sociétés OHADA et famille avec l'Étude de <strong>Me KOFFI Yassoua Alain</strong> à Abidjan et un accompagnement à distance pour la diaspora.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="button"
                onClick={() => onOpenDeposit('immobilier')}
                className="inline-flex items-center justify-center rounded-xl h-12 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-950/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <UploadCloud className="mr-2 w-5 h-5" />
                DÉPÔT EN LIGNE
              </button>
              <button
                type="button"
                onClick={onOpenRdv}
                className="inline-flex items-center justify-center rounded-xl h-12 px-6 bg-[#ec5b13] hover:bg-[#d94f0e] text-white font-bold text-base shadow-lg shadow-[#ec5b13]/20 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar className="mr-2 w-5 h-5" />
                Prendre RDV
              </button>
              <a
                className="inline-flex items-center justify-center gap-1.5 rounded-xl h-12 px-5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition"
                href="#parcours-kyanot"
              >
                Découvrir la méthode
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 pt-6 border-t border-[#4b2038]">
              <div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-xs text-slate-300 mt-1 leading-snug">
                  Force probante &amp; authenticité d'État
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-400">
                  0 VISITE
                </div>
                <div className="text-xs text-slate-300 mt-1 leading-snug">
                  Pré-instruction &amp; dépôt des pièces à distance
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  1 SEULE
                </div>
                <div className="text-xs text-slate-300 mt-1 leading-snug">
                  Signature solennelle à l'Étude (Bd. VGE)
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#6b2e50] bg-[#361728] min-h-[420px]">
              {!imageError ? (
                <img
                  className="w-full h-[440px] object-cover transition duration-300"
                  alt="Étude de Me KOFFI Yassoua Alain - Immeuble Balance, Abidjan"
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1OCpQZYUZe5r6jhAomywcfJcNPJZOnoLCnEDx6I0UvgcmQWXVRjx1huzgSQM0XJGtvtfu9Q09bWS4cMCNJDEFUq7yCaejUYXIoB6Z5NFD2AZ6YCDejX1iOQzxU3xaicH1b41KlTHcVjwtk7liAFdpnN1lTWlFyyrRg3JucFClE1LC9uw_4OFsfxKr_s_oMopmeU6nXKxg0Hz-aqm3JsjuQGOv5Lp4ZoFTMhHHA1Y"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-[440px] bg-gradient-to-br from-[#361728] via-[#240f1b] to-[#1a0a13] p-8 flex flex-col justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#ec5b13]/20 text-[#ec5b13] flex items-center justify-center font-bold">
                      KY
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Étude Me KOFFI Yassoua Alain</div>
                      <div className="text-xs text-slate-400">Bd. V.G.E - Imm. Balance, Abidjan</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span className="text-xs text-slate-200">Actes authentiques notariés &amp; téléactes sécurisés</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#ec5b13] shrink-0" />
                      <span className="text-xs text-slate-200">Droit foncier, immobilier &amp; droit des sociétés OHADA</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#240f1b] via-transparent to-transparent pointer-events-none"></div>

              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#240f1b]/90 backdrop-blur-md border border-[#4b2038]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-bold">Confidentialité garantie</h4>
                    <p className="text-xs text-slate-300">
                      Secret professionnel du notaire et protection absolue de l'ensemble de vos pièces et données.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
