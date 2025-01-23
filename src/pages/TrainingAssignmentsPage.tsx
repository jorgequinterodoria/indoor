import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Plus, Search, Calendar, AlertCircle, CheckCircle, X } from 'lucide-react';

interface TrainingAssignment {
  id: string;
  clientName: string;
  planName: string;
  startDate: string;
  endDate: string;
  status: 'activo' | 'congelado' | 'completado';
  progress: number;
  daysLeft: number;
  totalSessions: number;
  completedSessions: number;
  attendance: {
    date: string;
    attended: boolean;
  }[];
}

const assignments: TrainingAssignment[] = [
  {
    id: '1',
    clientName: 'John Doe',
    planName: 'Resistencia para Principiantes',
    startDate: '2024-02-01',
    endDate: '2024-03-07',
    status: 'activo',
    progress: 45,
    daysLeft: 15,
    totalSessions: 15,
    completedSessions: 7,
    attendance: [
      { date: '2024-02-01', attended: true },
      { date: '2024-02-03', attended: true },
      { date: '2024-02-05', attended: false },
      { date: '2024-02-07', attended: true }
    ]
  },
  {
    id: '2',
    clientName: 'Jane Smith',
    planName: 'HIIT Avanzado',
    startDate: '2024-01-15',
    endDate: '2024-02-19',
    status: 'congelado',
    progress: 60,
    daysLeft: 8,
    totalSessions: 25,
    completedSessions: 15,
    attendance: [
      { date: '2024-01-15', attended: true },
      { date: '2024-01-17', attended: true },
      { date: '2024-01-19', attended: true },
      { date: '2024-01-21', attended: false }
    ]
  }
];

export function TrainingAssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<TrainingAssignment | null>(null);

  const handleAttendanceClick = (assignment: TrainingAssignment) => {
    setSelectedAssignment(assignment);
    setShowAttendanceModal(true);
  };

  const markAttendance = () => {
    // Here you would typically update the attendance in your backend
    console.log('Marking attendance for:', selectedAssignment?.clientName);
    setShowAttendanceModal(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Asignaciones de Entrenamiento</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar asignaciones..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" />
            Nueva Asignación
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{assignment.clientName}</h3>
                  <p className="text-sm text-gray-500">{assignment.planName}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full
                  ${assignment.status === 'activo' ? 'bg-green-100 text-green-800' :
                    assignment.status === 'congelado' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'}`}>
                  {assignment.status}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progreso</span>
                  <span>{assignment.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 rounded-full h-2"
                    style={{ width: `${assignment.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Inicio: {assignment.startDate}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Fin: {assignment.endDate}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Sesiones: {assignment.completedSessions}/{assignment.totalSessions}</span>
                </div>
                {assignment.daysLeft < 10 && (
                  <div className="flex items-center text-sm text-red-600">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    <span>{assignment.daysLeft} días restantes</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                <button 
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleAttendanceClick(assignment)}
                >
                  Marcar Asistencia
                </button>
                {assignment.status === 'activo' ? (
                  <button className="text-yellow-600 hover:text-yellow-800">
                    Congelar Plan
                  </button>
                ) : assignment.status === 'congelado' ? (
                  <button className="text-green-600 hover:text-green-800">
                    Reanudar Plan
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Attendance Modal */}
        {showAttendanceModal && selectedAssignment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Marcar Asistencia</h2>
                <button onClick={() => setShowAttendanceModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">Client: {selectedAssignment.clientName}</p>
                <p className="text-gray-600">Plan: {selectedAssignment.planName}</p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Fecha de Hoy:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sesiones Completadas:</span>
                  <span>{selectedAssignment.completedSessions}/{selectedAssignment.totalSessions}</span>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => setShowAttendanceModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  onClick={markAttendance}
                >
                  Marcar como Asistida
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}