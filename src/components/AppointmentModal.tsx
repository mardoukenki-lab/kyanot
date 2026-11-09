import React, { useState } from 'react';
import { X, Calendar, Video, MapPin, CheckCircle2, Download, Clock } from 'lucide-react';
import { AppointmentData } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirmed: (data: AppointmentData) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  onBookingConfirmed
}) => {
  const [motive, setMotive] = useState('Foncier & Achat / Vente immobilière (ACD)');
  const [format, setFormat] = useState<'visio' | 'etude'>('etude');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('10:00');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentData | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const ref = `RDV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const data: AppointmentData = {
      motive,
      format,
      date,
      timeSlot,
      fullName,
      phone,
      email,
      notes,
      referenceId: ref
    };

    const payload = {
      type: 'Demande de Rendez-vous Notarial',
      reference: ref,
      motif: motive,
      format: format === 'visio' ? 'Visioconférence certifiée (Diaspora / Hors Abidjan)' : 'À l\'Étude (Immeuble Balance, Bd. VGE)',
      date_souhaitee: date,
      creneau: timeSlot,
      nom_client: fullName,
      telephone: phone,
      email: email,
      remarques: notes || 'Aucune remarque',
      date_demande: new Date().toLocaleString('fr-FR')
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
      // Continuer le flux
    } finally {
      setIsSubmitting(false);
      setConfirmedBooking(data);
      onBookingConfirmed(data);
    }
  };

  const handleDownloadIcs = () => {
    if (!confirmedBooking) return;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Etude Me KOFFI Yassoua Alain//Rendez-vous//CI',
      'BEGIN:VEVENT',
      `SUMMARY:Rendez-vous Notaire Me KOFFI Yassoua Alain - ${confirmedBooking.motive}`,
      `DESCRIPTION:Rendez-vous avec Maître KOFFI Yassoua Alain.\\nFormat: ${
        confirmedBooking.format === 'visio'
          ? 'Visioconférence certifiée'
          : 'Bd. V.GE - Immeuble Balance (face Solibra), Abidjan 30'
      }\\nRéf: ${confirmedBooking.referenceId}`,
      `LOCATION:${
        confirmedBooking.format === 'visio'
          ? 'Visioconférence sécurisée'
          : 'Bd. V.GE - Immeuble Balance (face Solibra), Abidjan, Côte d\'Ivoire'
      }`,
      `DTSTART:${confirmedBooking.date.replace(/-/g, '')}T${confirmedBooking.timeSlot.replace(':', '')}00`,
      `DTEND:${confirmedBooking.date.replace(/-/g, '')}T${Number(confirmedBooking.timeSlot.split(':')[0]) + 1}${confirmedBooking.timeSlot.split(':')[1]}00`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Rendez-vous_Me_KOFFI_${confirmedBooking.referenceId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const availableSlots = ['08:30', '10:00', '11:30', '14:30', '16:00', '17:00'];

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

        {!confirmedBooking ? (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#ec5b13]/10 text-[#ec5b13] flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#221610]">Prendre Rendez-vous</h3>
                <p className="text-xs text-stone-500">Étude de Maître KOFFI Yassoua Alain</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Objet de la consultation</label>
                <select
                  value={motive}
                  onChange={e => setMotive(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-sm focus:border-[#ec5b13] focus:ring-[#ec5b13]"
                >
                  <option>Foncier &amp; Achat / Vente immobilière (ACD)</option>
                  <option>Succession, partage &amp; donation</option>
                  <option>Création de société (OHADA) &amp; RCCM</option>
                  <option>Contrat de mariage &amp; régime matrimonial</option>
                  <option>Conseil &amp; Sécurisation foncière diaspora</option>
                  <option>Autre acte authentique / consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Format souhaité</label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`border p-3 rounded-xl flex items-center gap-2 cursor-pointer transition ${
                      format === 'etude' ? 'border-[#ec5b13] bg-[#ec5b13]/5 ring-1 ring-[#ec5b13]' : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value="etude"
                      checked={format === 'etude'}
                      onChange={() => setFormat('etude')}
                      className="text-[#ec5b13] focus:ring-[#ec5b13]"
                    />
                    <div className="text-xs">
                      <div className="font-bold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#ec5b13]" />
                        À l'étude
                      </div>
                      <div className="text-[10px] text-stone-500">Bd. V.GE - Imm. Balance</div>
                    </div>
                  </label>

                  <label
                    className={`border p-3 rounded-xl flex items-center gap-2 cursor-pointer transition ${
                      format === 'visio' ? 'border-[#ec5b13] bg-[#ec5b13]/5 ring-1 ring-[#ec5b13]' : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value="visio"
                      checked={format === 'visio'}
                      onChange={() => setFormat('visio')}
                      className="text-[#ec5b13] focus:ring-[#ec5b13]"
                    />
                    <div className="text-xs">
                      <div className="font-bold flex items-center gap-1">
                        <Video className="w-3.5 h-3.5 text-[#ec5b13]" />
                        Visioconférence
                      </div>
                      <div className="text-[10px] text-stone-500">Diaspora &amp; Hors Abidjan</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Date souhaitée</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 p-2 text-sm focus:border-[#ec5b13] focus:ring-[#ec5b13]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Créneau horaire</label>
                  <select
                    value={timeSlot}
                    onChange={e => setTimeSlot(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 p-2 text-sm focus:border-[#ec5b13] focus:ring-[#ec5b13]"
                  >
                    {availableSlots.map(slot => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Nom &amp; Prénom(s)</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex : Kouadio Marc"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 p-2 text-sm focus:border-[#ec5b13] focus:ring-[#ec5b13]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Numéro de téléphone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+225 07 00 00 00 00"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 p-2 text-sm focus:border-[#ec5b13] focus:ring-[#ec5b13]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Adresse email</label>
                <input
                  type="email"
                  required
                  placeholder="contact@exemple.ci"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 p-2 text-sm focus:border-[#ec5b13] focus:ring-[#ec5b13]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Précisions sur votre dossier (optionnel)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex : Acquisition de terrain avec ACD à Bingerville, création de SARL pluripersonnelle..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 p-2 text-xs focus:border-[#ec5b13] focus:ring-[#ec5b13]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#ec5b13] hover:bg-[#d94f0e] text-white rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Transmission de votre rendez-vous...</span>
                  </>
                ) : (
                  <span>Confirmer la demande de RDV</span>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-black text-[#221610]">Rendez-vous Enregistré !</h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
              Votre demande a bien été transmise à l'Étude de <strong>Me KOFFI Yassoua Alain</strong> sous la référence{' '}
              <strong className="text-[#221610] font-mono">{confirmedBooking.referenceId}</strong>.
            </p>

            <div className="bg-[#f8f6f6] p-4 rounded-xl border border-stone-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">Objet :</span>
                <span className="font-semibold text-stone-800">{confirmedBooking.motive}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Date &amp; Heure :</span>
                <span className="font-semibold text-stone-800">
                  {confirmedBooking.date} à {confirmedBooking.timeSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Lieu :</span>
                <span className="font-semibold text-stone-800">
                  {confirmedBooking.format === 'visio'
                    ? 'Visioconférence certifiée'
                    : 'Bd. V.GE - Immeuble Balance (face Solibra), Abidjan'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                type="button"
                onClick={handleDownloadIcs}
                className="flex-1 py-2.5 px-3 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-4 h-4" />
                Ajouter au calendrier (.ics)
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 border border-stone-300 hover:bg-stone-50 text-xs font-semibold rounded-xl text-stone-700 transition"
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
