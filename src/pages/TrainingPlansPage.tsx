import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import Loader from '../components/Loader'
import { Plus, Dumbbell, Users, Trophy, X } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';

interface TrainingPlan {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: 'X12' | 'X6' | 'Estudiante' | "1 Clase";
  activeUsers: number;
  status: 'Activo' | 'Congelado';
  price: number;
  sessionsperweek: number;
}

export function TrainingPlansPage() {
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true)
  const [newPlan, setNewPlan] = useState({
    id: '',
    name: '',
    description: '',
    difficulty: 'beginner',
    price: '',
    sessionsperweek: ''
  });

  useEffect(() => {
    const fetchTrainingPlans = async () => {
      setLoading(true)
      try {
        const response = await fetch('https://indoor-api.onrender.com/api/trainingplans');
        const data = await response.json();
        setTrainingPlans(data);
      } catch (error) {
        console.error('Error fetching data:', error)
      }finally {
        setLoading(false); // Set loading to false after fetching data
      }

    };
    fetchTrainingPlans();
  }, []);

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPlanData = {
      ...newPlan,
      duration: 35, // Fijar duración a 35 días
      status: 'Activo', // Cambiado a 'Activo' para coincidir con la interfaz
      activeUsers: 0, // Fijar usuarios activos a 0
      price: parseFloat(newPlan.price), // Asegurarse de que el precio sea un número
      sessionsperweek: parseInt(newPlan.sessionsperweek, 10) // Asegurarse de que las sesiones por semana sean un número
    };

    try {
      const response = await fetch('https://indoor-api.onrender.com/api/trainingplans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlanData),
      });

      if (!response.ok) {
        throw new Error('Error al crear el plan');
      }

      const createdPlan = await response.json();
      console.log('Plan creado:', createdPlan);
      setTrainingPlans((prevPlans) => [...prevPlans, createdPlan]); // Agregar el nuevo plan a la lista
    } catch (error) {
      console.error('Error creando el plan:', error);
    } finally {
      setShowCreateModal(false);
      setNewPlan({
        id: '',
        name: '',
        description: '',
        difficulty: 'beginner',
        price: '',
        sessionsperweek: ''
      });
    }
  };

  const handleEditPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedPlanData = {
      ...newPlan,
      duration: 35, // Fijar duración a 35 días
      status: 'Activo', // Cambiado a 'Activo' para coincidir con la interfaz
      activeUsers: 0, // Fijar usuarios activos a 0
      price: parseFloat(newPlan.price), // Asegurarse de que el precio sea un número
      sessionsperweek: parseInt(newPlan.sessionsperweek, 10) // Asegurarse de que las sesiones por semana sean un número
    };

    try {
      const response = await fetch(`https://indoor-api.onrender.com/api/trainingplans/${newPlan.id}`, {
        method: 'PUT', // Usar PUT para actualizar el plan
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPlanData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el plan');
      }

      const updatedPlan = await response.json();
      console.log('Plan actualizado:', updatedPlan);
      setTrainingPlans((prevPlans) => 
        prevPlans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan)) // Actualizar el plan en la lista
      );
    } catch (error) {
      console.error('Error actualizando el plan:', error);
    } finally {
      setShowCreateModal(false);
      setNewPlan({
        id: '',
        name: '',
        description: '',
        difficulty: 'beginner',
        price: '',
        sessionsperweek: ''
      });
    }
  };

  if (loading) {
    return <Loader />
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Planes de Entrenamiento</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DashboardCard
            title="Planes Activos"
            value="4"
            icon={Dumbbell}
          />
          <DashboardCard
            title="Usuarios Activos"
            value="45"
            icon={Users}
          />
          <DashboardCard
            title="Tasa de Completación"
            value="78%"
            icon={Trophy}
          />
        </div>

        <div className="flex justify-between items-center">

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
                    ${plan.difficulty === 'X6' ? 'bg-green-100 text-green-800' :
                      plan.difficulty === 'X12' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                    {plan.difficulty}
                  </span>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full
                  ${plan.status === 'Activo' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
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
                  <span>{plan.sessionsperweek}</span>
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
                <button
                  className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    setNewPlan({
                      ...plan,
                      price: plan.price.toString(),
                      sessionsperweek: plan.sessionsperweek.toString()
                    });
                    setShowCreateModal(true);
                  }}
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Create/Edit Plan Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{newPlan.id ? 'Editar Plan' : 'Crear Nuevo Plan'}</h2>
                <button onClick={() => setShowCreateModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={newPlan.id ? handleEditPlan : handleCreatePlan} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descripción</label>
                  <textarea
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                    value={newPlan.description}
                    onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dificultad</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newPlan.difficulty}
                    onChange={(e) => setNewPlan({ ...newPlan, difficulty: e.target.value as any })}
                  >
                    <option value="X1">X1</option>
                    <option value="X6">X6</option>
                    <option value="Estudiante">Estudiante</option>
                    <option value="X12">X12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Precio ($)</label>
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
                  <label className="block text-sm font-medium text-gray-700">Sesiones por mes</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="12"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newPlan.sessionsperweek}
                    onChange={(e) => setNewPlan({ ...newPlan, sessionsperweek: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    {newPlan.id ? 'Actualizar Plan' : 'Crear Plan'}
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
