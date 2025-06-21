import React, { useState } from 'react';
import { Plus, Activity, Calendar, TrendingUp } from 'lucide-react';
import { Medication, UserRole } from '../types/medication';
import MedicationCard from './MedicationCard';
import MedicationForm from './MedicationForm';
import { calculateAdherence, getWeeklyAdherence } from '../utils/adherence';

interface PatientDashboardProps {
  medications: Medication[];
  onAddMedication: (data: any) => void;
  onMarkTaken: (id: string) => void;
  onEditMedication: (id: string, data: any) => void;
  onDeleteMedication: (id: string) => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({
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
  const todayTaken = medications.filter(med => med.takenToday).length;
  const totalToday = medications.length;

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Patient Dashboard</h1>
          <p className="text-gray-600">Manage your medications and track your progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Today's Progress</p>
                <p className="text-2xl font-bold text-gray-800">{todayTaken}/{totalToday}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
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

        {/* Add Medication Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">My Medications</h2>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 font-medium"
          >
            <Plus size={20} />
            Add Medication
          </button>
        </div>

        {/* Medications Grid */}
        {medications.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <Plus size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No medications yet</h3>
              <p className="text-gray-500 mb-4">Start by adding your first medication to track your adherence.</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-medium"
              >
                Add Your First Medication
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medications.map((medication) => (
              <MedicationCard
                key={medication.id}
                medication={medication}
                userRole="patient"
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

export default PatientDashboard;