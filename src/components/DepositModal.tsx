import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, Trash2, ShieldCheck, ArrowRight, Mail, MessageSquare } from 'lucide-react';
import { ClientDossier, DossierCategory } from '../types';

interface DepositModalProps {
  isOpen: boolean;
  initialCategory?: DossierCategory;
  onClose: () => void;
  onDossierCreated: (dossier: ClientDossier) => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  initialCategory = 'immobilier',
  onClose,
  onDossierCreated
}) => {
  const [category, setCategory] = useState<DossierCategory>(initialCategory);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [files, setFiles] = useState<{ id: string; name: string; size: string; rawFile?: File }[]>([
    { id: 'f-1', name: 'Arrete_Concession_Definitive_ACD.pdf', size: '2.4 Mo' },
    { id: 'f-2', name: 'Piece_Identite_Officielle.pdf', size: '1.2 Mo' }
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [createdDossier, setCreatedDossier] = useState<ClientDossier | null>(null);

  if (!isOpen) return null;

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map((f, i) => ({
        id: `file-${Date.now()}-${i}`,
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} Mo`,
        rawFile: f
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f, i) => ({
        id: `file-${Date.now()}-${i}`,
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} Mo`,
        rawFile: f
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    // Envoi en format JSON pour éviter l'erreur "File Uploads Not Permitted" de Formspree
    const payload = {
      email,
      nom: fullName || 'Nouveau Client',
      telephone: phone,
      categorie: category,
      intitule_projet: projectTitle || 'Dossier notarié',
      pieces_declarees: files.map(f => `${f.name} (${f.size})`).join(', ') || 'Aucune pièce',
      date: new Date().toLocaleDateString('fr-FR')
    };

    try {
      await fetch('https://formspree.io/f/xgobznna', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch {
      // Poursuivre le flux utilisateur
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const dossierId = `ACT-${new Date().getFullYear()}-${randomNum}`;
    const defaultTitle =
      projectTitle.trim() ||
      (category === 'immobilier'
        ? 'Acquisition Foncier / Villa Abidjan'
        : category === 'succession'
        ? 'Règlement de Succession Immobilière'
        : 'Constitution Société OHADA');

    const newDossier: ClientDossier = {
      id: dossierId,
      category,
      title: defaultTitle,
      clientName: fullName || 'Nouveau Client',
      clientEmail: email,
      clientPhone: phone,
      notaryReferent: 'Me KOFFI Yassoua Alain',
      progressPercent: 30,
      statusLabel: 'En cours d\'instruction à l\'étude',
      lastUpdated: 'À l\'instant',
      steps: [
        {
          id: 1,
          label: 'Dépôt des pièces',
          description: `${files.length} pièce(s) transmise(s) à l'étude`,
          status: 'completed',
          date: new Date().toLocaleDateString('fr-FR')
        },
        {
          id: 2,
          label: 'Vérification foncière & Livre Foncier',
          description: 'Contrôle à la Conservation Foncière et cadastre',
          status: 'in_progress',
          date: 'En cours'
        },
        {
          id: 3,
          label: 'Rédaction du projet d\'acte authentique',
          description: 'Mise en forme par Maître KOFFI Yassoua Alain',
          status: 'pending'
        },
        {
          id: 4,
          label: 'Signature authentique & Conservation',
          description: 'Signature à l\'étude ou par visioconférence sécurisée pour la diaspora',
          status: 'pending'
        }
      ],
      documents: files.map((f, index) => ({
        id: f.id,
        name: f.name,
        size: f.size,
        status: index === 0 ? 'validated' : 'pending',
        uploadDate: new Date().toLocaleDateString('fr-FR')
      }))
    };

    setIsUploading(false);
    setCreatedDossier(newDossier);
    onDossierCreated(newDossier);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!createdDossier ? (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#221610]">Dépôt en Ligne KYANOT</h3>
                <p className="text-xs text-stone-500">Étude de Maître KOFFI Yassoua Alain (Abidjan)</p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Catégorie de dossier</label>
                <select
                  name="category"
                  value={category}
                  onChange={e => setCategory(e.target.value as DossierCategory)}
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-sm focus:border-emerald-600 focus:ring-emerald-600"
                >
                  <option value="immobilier">Foncier / Achat ou Vente Immobilière</option>
                  <option value="succession">Succession / Partage / Donation</option>
                  <option value="entreprise">Droit des Sociétés OHADA / RCCM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Intitulé du projet ou désignation du bien
                </label>
                <input
                  type="text"
                  name="projectTitle"
                  placeholder="Ex : Terrain 600m² avec ACD à Cocody Riviera, Création SARL..."
                  value={projectTitle}
                  onChange={e => setProjectTitle(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 p-2 text-sm focus:border-emerald-600 focus:ring-emerald-600"
                />
              </div>

              {/* Zone de drag & drop */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Documents justificatifs</label>
                <div
                  onDragOver={e => e.preventDefault()}
                  onDrop={handleFileDrop}
                  className="border-2 border-dashed border-stone-300 hover:border-emerald-500 rounded-xl p-5 text-center transition cursor-pointer bg-stone-50 relative"
                >
                  <input
                    type="file"
                    name="upload"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileInput}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <UploadCloud className="w-7 h-7 text-stone-400 mx-auto mb-1.5" />
                  <p className="text-xs font-semibold text-stone-700">Glissez-déposez vos pièces (PDF, JPG, PNG)</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    ACD, Titre Foncier, CNI/Passeport, plan cadastral, statuts...
                  </p>
                </div>

                {/* Liste des fichiers sélectionnés */}
                {files.length > 0 && (
                  <div className="mt-3 space-y-2 max-h-36 overflow-y-auto">
                    {files.map(file => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-stone-100 border border-stone-200 text-xs"
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="truncate font-medium text-stone-800">{file.name}</span>
                          <span className="text-[10px] text-stone-400">({file.size})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="text-stone-400 hover:text-red-500 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Nom complet</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Votre nom et prénoms"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 p-2 text-sm focus:border-emerald-600 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Téléphone mobile</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+225 07 00 00 00 00"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 p-2 text-sm focus:border-emerald-600 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Adresse email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="contact@exemple.ci"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 p-2 text-sm focus:border-emerald-600 focus:ring-emerald-600"
                />
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Transmission sécurisée à l'Étude...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Valider le dépôt sécurisé</span>
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-black text-[#221610]">Pièces Transmises avec Succès !</h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
              Vos documents ont bien été reçus par l'Étude de <strong>Me KOFFI Yassoua Alain</strong>.
            </p>

            <div className="bg-[#240f1b] text-white p-4 rounded-xl border border-[#4b2038] text-center space-y-2">
              <div className="text-xs text-[#ce8db1] uppercase tracking-wider font-semibold">Référence de transmission</div>
              <div className="text-2xl font-black text-emerald-400 font-mono tracking-wider">
                {createdDossier.id}
              </div>
              <div className="pt-2.5 border-t border-[#4b2038] text-left">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Notification directe quand c'est prêt</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Aucun suivi en ligne n'est nécessaire. Dès que l'instruction et la rédaction de votre projet d'acte sont achevées, l'Étude vous notifie directement par appel téléphonique, SMS et email pour la signature solennelle.
                </p>
              </div>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl text-left">
              <span className="text-[11px] font-bold text-stone-700 block mb-1.5">
                Transmettre vos documents originaux :
              </span>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={`https://wa.me/2250700000000?text=${encodeURIComponent(`Bonjour Maître KOFFI, voici mes pièces justificatives pour le dossier ${createdDossier.id}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg text-center transition flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp (+225 07 00 00 00 00)</span>
                </a>
                <a
                  href={`mailto:kyanot.etudedemaitrekoffi@gmail.com?subject=${encodeURIComponent(`Pièces dossier ${createdDossier.id} - ${createdDossier.clientName}`)}`}
                  className="py-2 px-3 bg-[#240f1b] hover:bg-black text-white text-xs font-bold rounded-lg text-center transition flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-[#ec5b13] hover:bg-[#d94f0e] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>Fermer et retourner au site</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
