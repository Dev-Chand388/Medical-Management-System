import { Medication } from '../types/medication';

export const calculateAdherence = (medications: Medication[]): number => {
  if (medications.length === 0) return 0;
  
  const today = new Date().toDateString();
  const totalMedications = medications.length;
  const takenToday = medications.filter(med => med.takenToday).length;
  
  return Math.round((takenToday / totalMedications) * 100);
};

export const getWeeklyAdherence = (medications: Medication[]): number => {
  if (medications.length === 0) return 0;
  
  const past7Days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    past7Days.push(date.toISOString().split('T')[0]);
  }
  
  let totalDoses = medications.length * 7;
  let takenDoses = 0;
  
  medications.forEach(med => {
    past7Days.forEach(date => {
      if (med.takenDates.includes(date)) {
        takenDoses++;
      }
    });
  });
  
  return Math.round((takenDoses / totalDoses) * 100);
};

export const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};