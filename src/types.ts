export type DossierCategory = 'immobilier' | 'succession' | 'entreprise' | 'famille';

export interface DossierStep {
  id: number;
  label: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  date?: string;
}

export interface DossierDocument {
  id: string;
  name: string;
  size: string;
  status: 'validated' | 'pending' | 'required';
  uploadDate?: string;
}

export interface ClientDossier {
  id: string;
  category: DossierCategory;
  title: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notaryReferent: string;
  progressPercent: number;
  statusLabel: string;
  lastUpdated: string;
  steps: DossierStep[];
  documents: DossierDocument[];
}

export interface AppointmentData {
  motive: string;
  format: 'visio' | 'etude';
  date: string;
  timeSlot: string;
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
  referenceId: string;
}
