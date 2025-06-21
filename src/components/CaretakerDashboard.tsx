import React, { useState } from 'react';
import { Plus, Users, Shield, TrendingUp, AlertCircle } from 'lucide-react';
import { Medication } from '../types/medication';
import MedicationCard from './MedicationCard';
import MedicationForm from './MedicationForm';
import { calculateAdherence, getWeeklyAdherence } from '../utils/adherence';

interface CaretakerDashboardProps {
  medications: Medication[];
  onAddMedication: (data: any) => void;
  onMarkTaken: (id: string) => void;
  onEditMedication: (id: string, data: any) => void;
  onDeleteMedication: (id: string) => void;
}

const CaretakerDashboard: React.FC<CaretakerDashboardProps> = ({
  medications,
  onAddMedication,
  onMarkTaken,
  onEditMedication,
  onDeleteMedication,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);

  const todayAdherence = calculateAdherence(medications);
  const weeklyAdherence = getWeeklyAdherence(medications);
  const totalMedications = medications.length;
  const medicationsNotTaken = medications.filter(med => !med.takenToday).length;

  const handleEdit = (medication: Medication) => {
    setEditingMedication(medication);
    setShowForm(true);
  };

  const handleFormSubmit = (data: any) => {
    if (editingMedication) {
      onEditMedication(editingMedication.id, data);
    } else {
      onAddMedication(data);
    }
    setShowForm(false);
    setEditingMedication(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingMedication(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Caretaker Dashboard</h1>
          <p className="text-gray-600">Monitor and manage patient medications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Medications</p>
                <p className="text-2xl font-bold text-gray-800">{totalMedications}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Not Taken Today</p>
                <p className="text-2xl font-bold text-gray-800">{medicationsNotTaken}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Today's Adherence</p>
                <p className="text-2xl font-bold text-gray-800">{todayAdherence}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Weekly Adherence</p>
                <p className="text-2xl font-bold text-gray-800">{weeklyAdherence}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Patient Medications</h2>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 font-medium"
          >
            <Plus size={20} />
            Add Patient Medication
          </button>
        </div>

        {/* Medications Overview */}
        {medicationsNotTaken > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-800">Attention Required</h3>
                <p className="text-red-700">
                  {medicationsNotTaken} medication{medicationsNotTaken > 1 ? 's' : ''} not taken today
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Medications Grid */}
        {medications.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <Plus size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No medications added</h3>
              <p className="text-gray-500 mb-4">Add medications for your patient to start monitoring their adherence.</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-medium"
              >
                Add First Medication
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medications.map((medication) => (
              <MedicationCard
                key={medication.id}
                medication={medication}
                userRole="caretaker"
                onMarkTaken={onMarkTaken}
                onEdit={handleEdit}
                onDelete={onDeleteMedication}
              />
            ))}
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <MedicationForm
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            initialData={editingMedication ? {
              name: editingMedication.name,
              dosage: editingMedication.dosage,
              frequency: editingMedication.frequency,
            } : undefined}
            isEditing={!!editingMedication}
          />
        )}
      </div>
    </div>
  );
};

export default CaretakerDashboard;