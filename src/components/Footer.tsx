import React from 'react';
import { Gavel, ShieldCheck, Scale } from 'lucide-react';

interface FooterProps {
  onOpenDeposit: () => void;
  onOpenRdv: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDeposit, onOpenRdv }) => {
  return (
    <footer className="bg-[#240f1b] text-white border-t border-[#4b2038] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#ec5b13] flex items-center justify-center text-white">
                <Gavel className="w-4 h-4" />
              </div>
              <span className="font-bold text-base tracking-tight">KYANOT</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Étude de <strong>Maître KOFFI Yassoua Alain</strong>, Notaire titulaire d'un office public et ministériel en République de Côte d'Ivoire. Sécurité foncière, droit OHADA et rigueur juridique.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#ce8db1]">
              <Scale className="w-3.5 h-3.5 text-[#ec5b13]" />
              <span>Sous l'autorité du Ministère de la Justice de Côte d'Ivoire</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Navigation</h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <a className="hover:text-white transition" href="#vision">
                  L'Étude &amp; Vision
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#expertise">
                  Expertises
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#parcours-kyanot">
                  Comment ça marche
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#faq">
                  Questions Fréquentes (FAQ)
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#contact">
                  Accès &amp; Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Accès Directs</h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={onOpenDeposit}
                  className="hover:text-emerald-400 transition font-medium text-left cursor-pointer"
                >
                  Dépôt de pièces en ligne
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenRdv}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Prendre Rendez-vous
                </button>
              </li>
              <li className="text-slate-400">
                <span className="text-emerald-400 font-medium">Notification client :</span> dès que l'acte est prêt
              </li>
              <li>
                <a className="hover:text-white transition" href="#contact">
                  Plan d'accès (Immeuble Balance)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Mentions Légales</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
              Membre de la <strong>Chambre Nationale des Notaires de Côte d'Ivoire (CNNCI)</strong>.<br />
              Bd. V.GE - Immeuble Balance (face Solibra) - 30 B.P 524 Abidjan 30.<br />
              Actes authentiques régis par le droit ivoirien et les Actes Uniformes de l'OHADA.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Conservation et archivage garanti au rang des minutes de l'Étude</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#4b2038] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>© {new Date().getFullYear()} Étude de Me KOFFI Yassoua Alain (KYANOT). Tous droits réservés.</div>
          <div className="flex gap-4">
            <a className="hover:text-white transition" href="#contact">
              Mentions légales
            </a>
            <a className="hover:text-white transition" href="#contact">
              Confidentialité &amp; Secret professionnel
            </a>
            <a className="hover:text-white transition" href="#contact">
              Protection des données
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
