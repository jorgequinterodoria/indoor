import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { Plus, Search } from 'lucide-react';

interface Simulator {
  id: number;
  model: string;
  status: string;
  lastService: string; // Add other properties as needed
}

export function SimulatorsPage() {
  const [simulators, setSimulators] = useState<Simulator[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSimulator, setNewSimulator] = useState({ model: '', status: '', lastService: '' });
  const [selectedSimulator, setSelectedSimulator] = useState<Simulator | null>(null);

  useEffect(() => {
    const fetchSimulators = async () => {
      const response = await fetch(`https://indoor-api.onrender.com/api/simulators`);
      const data: Simulator[] = await response.json();
      setSimulators(data);
    };

    fetchSimulators();
  }, []);

  const handleAddSimulator = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = selectedSimulator ? 'PUT' : 'POST';
    const url = selectedSimulator 
      ? `https://indoor-api.onrender.com/api/simulators/${selectedSimulator.id}` 
      : `https://indoor-api.onrender.com/api/simulators`;

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSimulator),
    });

    if (response.ok) {
      const addedOrUpdatedSimulator = await response.json();
      if (method === 'POST') {
        setSimulators([...simulators, addedOrUpdatedSimulator]);
      } else {
        setSimulators(simulators.map(simulator => 
          simulator.id === addedOrUpdatedSimulator.id ? addedOrUpdatedSimulator : simulator
        ));
      }
      setNewSimulator({ model: '', status: '', lastService: '' });
      setSelectedSimulator(null);
      setIsModalOpen(false);
    } else {
      console.error('Error al agregar o editar el simulador');
    }
  };

  const handleEditSimulator = (simulator: Simulator) => {
    setSelectedSimulator(simulator);
    setNewSimulator({ model: simulator.model, status: simulator.status, lastService: simulator.lastService });
    setIsModalOpen(true);
  };

  const handleDeleteSimulator = async (id: number) => {
    const response = await fetch(`https://indoor-api.onrender.com/api/simulators/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setSimulators(simulators.filter((simulator) => simulator.id !== id));
    } else {
      console.error('Error al eliminar el simulador');
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Simuladores</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar simuladores..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <button 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Agregar Simulador
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4">Agregar Simulador</h2>
              <form onSubmit={handleAddSimulator}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Modelo</label>
                  <input
                    type="text"
                    value={newSimulator.model}
                    onChange={(e) => setNewSimulator({ ...newSimulator, model: e.target.value })}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <select
                    value={newSimulator.status}
                    onChange={(e) => setNewSimulator({ ...newSimulator, status: e.target.value })}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="">Seleccionar estado</option>
                    <option value="Disponible">Disponible</option>
                    <option value="En uso">En uso</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Último Mantenimiento</label>
                  <input
                    type="date"
                    value={newSimulator.lastService}
                    onChange={(e) => setNewSimulator({ ...newSimulator, lastService: e.target.value })}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="mr-2 text-gray-500">
                    Cancelar
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modelo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Mantenimiento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {simulators.map((simulator) => (
                <tr key={simulator.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {simulator.model}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${simulator.status === 'Disponible' ? 'bg-green-100 text-green-800' : 
                        simulator.status === 'En uso' ? 'bg-blue-100 text-blue-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {simulator.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(simulator.lastService).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-900 mr-4"
                      onClick={() => handleEditSimulator(simulator)}
                    >
                      Editar
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteSimulator(simulator.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}