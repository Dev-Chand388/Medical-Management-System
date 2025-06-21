import { Medication } from '../types/medication';

const STORAGE_KEY = 'medication-management-data';

export const loadMedications = (): Medication[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const medications = JSON.parse(data);
    return medications.map((med: any) => ({
      ...med,
      createdAt: new Date(med.createdAt),
    }));
  } catch (error) {
    console.error('Failed to load medications:', error);
    return [];
  }
};

export const saveMedications = (medications: Medication[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(medications));
  } catch (error) {
    console.error('Failed to save medications:', error);
  }
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};