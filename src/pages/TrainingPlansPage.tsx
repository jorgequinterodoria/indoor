import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Plus, Search, Dumbbell, Users, Trophy, X } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';

interface TrainingPlan {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  activeUsers: number;
  status: 'active' | 'frozen';
  price: number;
  sessionsPerWeek: number;
}

const trainingPlans: TrainingPlan[] = [
  {
    id: '1',
    name: 'Resistencia para Principiantes',
    description: 'Perfecto para aquellos que comienzan su viaje en ciclismo',
    duration: 35,
    difficulty: 'beginner',
    activeUsers: 15,
    status: 'active',
    price: 99.99,
    sessionsPerWeek: 3
  },
  {
    id: '2',
    name: 'HIIT Avanzado',
    description: 'Entrenamiento de alta intensidad para ciclistas experimentados',
    duration: 35,
    difficulty: 'advanced',
    activeUsers: 8,
    status: 'active',
    price: 149.99,
    sessionsPerWeek: 5
  }
];

export function TrainingPlansPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    description: '',
    difficulty: 'beginner',
    price: '',
    sessionsPerWeek: ''
  });

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the plan to your backend
    console.log('Creating new plan:', {
      ...newPlan,
      duration: 35, // Fixed duration of 35 days
      status: 'active',
      activeUsers: 0
    });
    setShowCreateModal(false);
    setNewPlan({
      name: '',
      description: '',
      difficulty: 'beginner',
      price: '',
      sessionsPerWeek: ''
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Planes de Entrenamiento</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DashboardCard
            title="Planes Activos"
            value="8"
            icon={Dumbbell}
            trend={{ value: 12, isPositive: true }}
          />
          <DashboardCard
            title="Usuarios Activos"
            value="45"
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <DashboardCard
            title="Tasa de Completación"
            value="78%"
            icon={Trophy}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar planes de entrenamiento..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Crear Plan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                  <span className={`mt-1 px-2 py-1 text-xs font-semibold rounded-full
                    ${plan.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      plan.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                    {plan.difficulty}
                  </span>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full
                  ${plan.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                  {plan.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Duración:</span>
                  <span>{plan.duration} días</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Sesiones/Semana:</span>
                  <span>{plan.sessionsPerWeek}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Precio:</span>
                  <span>${plan.price}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Usuarios Activos:</span>
                  <span>{plan.activeUsers}</span>
                </div>
              </div>
              <div className="mt-4 flex space-x-3">
                <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md">
                  Editar
                </button>
                <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Create Plan Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Create New Training Plan</h2>
                <button onClick={() => setShowCreateModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleCreatePlan} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                    value={newPlan.description}
                    onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newPlan.difficulty}
                    onChange={(e) => setNewPlan({ ...newPlan, difficulty: e.target.value as any })}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newPlan.price}
                    onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sessions per Week</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="7"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newPlan.sessionsPerWeek}
                    onChange={(e) => setNewPlan({ ...newPlan, sessionsPerWeek: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    Create Plan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}