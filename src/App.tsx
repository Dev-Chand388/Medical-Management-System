import React, { useState, useEffect } from 'react';
import { User, Heart, RefreshCw } from 'lucide-react';
import { Medication, UserRole, MedicationFormData } from './types/medication';
import { loadMedications, saveMedications, generateId } from './utils/storage';
import { getTodayString } from './utils/adherence';
import PatientDashboard from './components/PatientDashboard';
import CaretakerDashboard from './components/CaretakerDashboard';

function App() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    const savedMedications = loadMedications();
    setMedications(savedMedications);
    
    // Reset daily status if it's a new day
    const today = getTodayString();
    const updatedMedications = savedMedications.map(med => ({
      ...med,
      takenToday: med.takenDates.includes(today)
    }));
    
    if (JSON.stringify(updatedMedications) !== JSON.stringify(savedMedications)) {
      setMedications(updatedMedications);
      saveMedications(updatedMedications);
    }
  }, []);

  const handleAddMedication = (data: MedicationFormData) => {
    const newMedication: Medication = {
      id: generateId(),
      name: data.name,
      dosage: data.dosage,
      frequency: data.frequency,
      createdAt: new Date(),
      takenToday: false,
      takenDates: [],
      addedBy: userRole!,
    };

    const updatedMedications = [...medications, newMedication];
    setMedications(updatedMedications);
    saveMedications(updatedMedications);
  };

  const handleMarkTaken = (id: string) => {
    const today = getTodayString();
    const updatedMedications = medications.map(med => {
      if (med.id === id) {
        const takenDates = med.takenDates.includes(today) 
          ? med.takenDates 
          : [...med.takenDates, today];
        
        return {
          ...med,
          takenToday: true,
          takenDates,
        };
      }
      return med;
    });

    setMedications(updatedMedications);
    saveMedications(updatedMedications);
  };

  const handleEditMedication = (id: string, data: MedicationFormData) => {
    const updatedMedications = medications.map(med =>
      med.id === id
        ? { ...med, name: data.name, dosage: data.dosage, frequency: data.frequency }
        : med
    );

    setMedications(updatedMedications);
    saveMedications(updatedMedications);
  };

  const handleDeleteMedication = (id: string) => {
    if (window.confirm('Are you sure you want to delete this medication?')) {
      const updatedMedications = medications.filter(med => med.id !== id);
      setMedications(updatedMedications);
      saveMedications(updatedMedications);
    }
  };

  const resetData = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      setMedications([]);
      saveMedications([]);
    }
  };

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="bg-white p-4 rounded-full shadow-lg inline-block mb-4">
              <Heart className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">MedTracker</h1>
            <p className="text-gray-600">Comprehensive medication management</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Select Your Role</h2>
            <p className="text-gray-600 mb-6">Choose how you'd like to use the app</p>
            
            <div className="space-y-4">
              <button
                onClick={() => setUserRole('patient')}
                className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Patient</h3>
                    <p className="text-sm text-gray-600">Manage your own medications</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setUserRole('caretaker')}
                className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Caretaker</h3>
                    <p className="text-sm text-gray-600">Monitor patient medications</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="text-center mt-6 text-sm text-gray-500">
            Made by <span className="font-semibold text-gray-700">Kethe Dev Chand</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">MedTracker</h1>
                <p className="text-sm text-gray-600 capitalize">{userRole} Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={resetData}
                className="px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all flex items-center gap-2"
                title="Reset all data"
              >
                <RefreshCw size={16} />
                Reset Data
              </button>
              <button
                onClick={() => setUserRole(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
              >
                <User size={16} />
                Switch Role
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      {userRole === 'patient' ? (
        <PatientDashboard
          medications={medications}
          onAddMedication={handleAddMedication}
          onMarkTaken={handleMarkTaken}
          onEditMedication={handleEditMedication}
          onDeleteMedication={handleDeleteMedication}
        />
      ) : (
        <CaretakerDashboard
          medications={medications}
          onAddMedication={handleAddMedication}
          onMarkTaken={handleMarkTaken}
          onEditMedication={handleEditMedication}
          onDeleteMedication={handleDeleteMedication}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            Made with ❤️ by <span className="font-semibold text-gray-800">Kethe Dev Chand</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;