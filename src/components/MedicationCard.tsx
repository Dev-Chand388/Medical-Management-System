import React from 'react';
import { Pill, Clock, Check, Edit2, Trash2 } from 'lucide-react';
import { Medication, UserRole } from '../types/medication';

interface MedicationCardProps {
  medication: Medication;
  userRole: UserRole;
  onMarkTaken: (id: string) => void;
  onEdit: (medication: Medication) => void;
  onDelete: (id: string) => void;
}

const MedicationCard: React.FC<MedicationCardProps> = ({
  medication,
  userRole,
  onMarkTaken,
  onEdit,
  onDelete,
}) => {
  const frequencyText = {
    1: 'Once daily',
    2: 'Twice daily',
    3: 'Three times daily',
    4: 'Four times daily',
  }[medication.frequency] || `${medication.frequency} times daily`;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${medication.takenToday ? 'bg-green-100' : 'bg-blue-100'}`}>
            <Pill className={`h-5 w-5 ${medication.takenToday ? 'text-green-600' : 'text-blue-600'}`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">{medication.name}</h3>
            <p className="text-gray-600">{medication.dosage}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(medication)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            title="Edit medication"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(medication.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            title="Delete medication"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
        <Clock size={16} />
        <span>{frequencyText}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Added by {medication.addedBy}
        </div>
        <button
          onClick={() => onMarkTaken(medication.id)}
          disabled={medication.takenToday}
          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
            medication.takenToday
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm hover:shadow-md'
          }`}
        >
          <Check size={16} />
          {medication.takenToday ? 'Taken Today' : 'Mark as Taken'}
        </button>
      </div>
    </div>
  );
};

export default MedicationCard;