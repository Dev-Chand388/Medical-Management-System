export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: number; // per day
  createdAt: Date;
  takenToday: boolean;
  takenDates: string[]; // ISO date strings
  addedBy: 'patient' | 'caretaker';
}

export interface MedicationFormData {
  name: string;
  dosage: string;
  frequency: number;
}

export type UserRole = 'patient' | 'caretaker';