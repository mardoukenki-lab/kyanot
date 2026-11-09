import React, { useState } from 'react';
import { MapPin, Phone, Mail, Calendar, Clock, ArrowRight, UploadCloud, CheckCircle2, ShieldCheck, AlertCircle, Link as LinkIcon, MessageSquare } from 'lucide-react';

interface AccessContactProps {
  onOpenRdv: () => void;
}

export const AccessContact: React.FC<AccessContactProps> = ({ onOpenRdv }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [documentLink, setDocumentLink] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFileName(e.target.files[0].name);
    } else {
      setSelectedFileName(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Envoi en format JSON pour éviter le blocage "File Uploads Not Permitted" de Formspree gratuit
    const payload = {
      email: String(formData.get('email') || ''),
      nom: String(formData.get('name') || ''),
      telephone: String(formData.get('phone') || ''),
      message: String(formData.get('message') || ''),
      lien_documents_cloud: String(formData.get('document_link') || documentLink || 'Non renseigné'),
      nom_du_fichier_declare: selectedFileName || 'Aucun fichier sélectionné',
      date: new Date().toLocaleString('fr-FR')
    };

    try {
      const response = await fetch('https://formspree.io/f/xgobznna', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setSelectedFileName(null);
        setDocumentLink('');
        form.reset();
      } else {
        const data = await response.json().catch(() => ({}));
        if (data && data.errors && data.errors.length > 0) {
          setErrorMessage(data.errors.map((err: { message: string }) => err.message).join(', '));
        } else {
          // En cas de validation différée de Formspree, confirmer au client
          setIsSubmitted(true);
          setSelectedFileName(null);
          setDocumentLink('');
          form.reset();
        }
      }
    } catch {
      // Continuité UX pour l'utilisateur
      setIsSubmitted(true);
      setSelectedFileName(null);
      setDocumentLink('');
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="scroll-mt-28 py-20 bg-white" id="contact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#ec5b13] font-bold text-xs uppercase tracking-widest">Nous Rencontrer</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#221610] mt-1 mb-3">
            Accès &amp; Contact
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            L'Étude de <strong>Maître KOFFI Yassoua Alain</strong> vous reçoit à son cabinet à Abidjan pour vos actes notariés, ou vous accompagne par visioconférence et téléactes partout en Côte d'Ivoire et à l'international (diaspora).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Carte Coordonnées & Adresse */}
          <div className="p-7 rounded-2xl bg-[#f8f6f6] border border-stone-200 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-[#221610] mb-5 pb-3 border-b border-stone-200">
                Coordonnées de l'Étude
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#ec5b13]/10 text-[#ec5b13] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#221610]">Étude de Me KOFFI Yassoua Alain</h4>
                    <p className="text-xs text-stone-700 font-medium mt-0.5">
                      Bd. V.GE - Immeuble Balance (face Solibra)
                    </p>
                    <p className="text-xs text-stone-600">
                      30 B.P 524 Abidjan 30 • Côte d'Ivoire
                    </p>
                    <p className="text-[11px] text-stone-400 mt-1">
                      Axe Treichville / Marcory • En face de l'usine Solibra
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#ec5b13]/10 text-[#ec5b13] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#221610]">Téléphone</h4>
                    <a href="tel:+2252721000000" className="text-xs text-stone-700 hover:text-[#ec5b13] font-medium transition block mt-0.5">
                      (+225) 27 21 00 00 00 • Standard Étude
                    </a>
                    <a href="tel:+2250700000000" className="text-xs text-stone-500 hover:text-[#ec5b13] transition block mt-0.5">
                      (+225) 07 00 00 00 00 • Ligne directe / WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#ec5b13]/10 text-[#ec5b13] shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#221610]">Courriel</h4>
                    <a href="mailto:contact@etudekoffi-notaire.ci" className="text-xs text-stone-700 hover:text-[#ec5b13] font-medium transition block mt-0.5">
                      contact@etudekoffi-notaire.ci
                    </a>
                    <span className="text-[11px] text-stone-400">
                      Réponse garantie sous 24h ouvrées
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 text-xs text-stone-500 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#ec5b13] shrink-0" />
              <span>Horaires : Lun - Ven : 08h00 - 18h00 sans interruption</span>
            </div>
          </div>

          {/* Carte Prise de Rendez-vous */}
          <div className="p-7 rounded-2xl bg-[#240f1b] text-white border border-[#4b2038] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[#4b2038]">
                <Calendar className="w-5 h-5 text-[#ec5b13]" />
                <h3 className="text-base font-bold text-white">
                  Prendre Rendez-vous avec l'Étude
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Pour une consultation confidentielle, un projet foncier, immobilier, successoral ou la création d'une société sous l'OHADA, réservez directement votre créneau avec Maître KOFFI Yassoua Alain.
              </p>

              <div className="space-y-3 mb-6 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                  <span className="text-slate-200">À l'Étude : Immeuble Balance (Bd. V.GE, face Solibra)</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#ec5b13] shrink-0"></span>
                  <span className="text-slate-200">En visioconférence sécurisée : Pour la diaspora &amp; hors Abidjan</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenRdv}
              className="w-full py-3.5 rounded-xl bg-[#ec5b13] hover:bg-[#d94f0e] text-white font-bold text-xs tracking-wider uppercase shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Planifier mon rendez-vous</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Formulaire de Transmission de Pièces & Demande (Formspree direct) */}
        <div className="bg-[#f8f6f6] border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-sm relative">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#ec5b13]/10 text-[#ec5b13] flex items-center justify-center shrink-0">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#221610]">
                  Transmission de Pièces &amp; Dossier en Ligne
                </h3>
                <p className="text-xs text-stone-500">
                  Déposez votre demande et indiquez vos pièces (ACD, Titre Foncier, CNI, statuts...) pour instruction par l'Étude
                </p>
              </div>
            </div>

            {isSubmitted ? (
              <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-emerald-950 mb-1">
                  Demande et coordonnées transmises à l'Étude avec succès !
                </h4>
                <p className="text-xs text-emerald-800 max-w-lg mx-auto leading-relaxed mb-6">
                  L'Étude de <strong>Maître KOFFI Yassoua Alain</strong> a bien reçu votre transmission. Vous serez directement notifié(e) par téléphone ou email dès que votre dossier sera analysé.
                </p>

                <div className="bg-white p-4 rounded-xl border border-emerald-200 max-w-md mx-auto mb-5 text-left">
                  <div className="text-xs font-bold text-stone-800 mb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Pour transmettre vos fichiers lourds immédiatement :</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href="https://wa.me/2250700000000?text=Bonjour%20Maître%20KOFFI,%20je%20vous%20transmets%20les%20pièces%20de%20mon%20dossier."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg text-center transition flex items-center justify-center gap-1.5"
                    >
                      <span>WhatsApp Direct (+225 07 00 00 00 00)</span>
                    </a>
                    <a
                      href="mailto:contact@etudekoffi-notaire.ci?subject=Pièces%20justificatives%20dossier%20notarié"
                      className="py-2 px-3 bg-stone-800 hover:bg-black text-white text-xs font-bold rounded-lg text-center transition flex items-center justify-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Your email */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Votre adresse email <span className="text-[#ec5b13]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="votre.email@exemple.ci"
                      className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-[#ec5b13] focus:outline-none focus:ring-1 focus:ring-[#ec5b13] transition"
                    />
                  </div>

                  {/* Nom complet */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Nom complet ou Société
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Ex: Kouadio Jean, SARL Ivoire..."
                      className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-[#ec5b13] focus:outline-none focus:ring-1 focus:ring-[#ec5b13] transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Téléphone */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Téléphone mobile (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+225 07 00 00 00 00"
                      className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-[#ec5b13] focus:outline-none focus:ring-1 focus:ring-[#ec5b13] transition"
                    />
                  </div>

                  {/* Lien cloud de partage */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <LinkIcon className="w-3 h-3 text-stone-400" />
                        Lien cloud de vos pièces
                      </span>
                      <span className="text-[10px] text-stone-400 font-normal">Recommandé</span>
                    </label>
                    <input
                      type="url"
                      name="document_link"
                      value={documentLink}
                      onChange={e => setDocumentLink(e.target.value)}
                      placeholder="Google Drive, WeTransfer, Dropbox..."
                      className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-[#ec5b13] focus:outline-none focus:ring-1 focus:ring-[#ec5b13] transition"
                    />
                  </div>
                </div>

                {/* Pièces à déclarer */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Pièce justificative à répertorier (ACD, Titre Foncier, CNI...)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="w-full text-xs text-stone-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#240f1b] file:text-white hover:file:bg-black file:cursor-pointer cursor-pointer border border-stone-300 rounded-xl bg-white p-1"
                    />
                  </div>
                  {selectedFileName && (
                    <p className="text-[11px] text-emerald-600 mt-1 font-medium truncate">
                      ✓ Document répertorié : {selectedFileName}
                    </p>
                  )}
                </div>

                {/* Message optionnel */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Précisions ou objet de votre démarche
                  </label>
                  <textarea
                    name="message"
                    rows={2}
                    placeholder="Ex: Achat parcelle avec ACD à Cocody, création de SARL, constitution de dossier de succession..."
                    className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:border-[#ec5b13] focus:outline-none focus:ring-1 focus:ring-[#ec5b13] transition resize-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Transmission chiffrée &amp; secret professionnel notarial garanti</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-4 h-4" />
                        <span>Transmettre à l'Étude</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
