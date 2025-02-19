import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import Loader from '../components/Loader'
import { Plus, Search } from 'lucide-react';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  membershipstatus: 'Activo' | 'Inactivo';
}

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', membershipstatus: 'Activo' });
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true)
      try {
        const response = await fetch('https://indoor-api.onrender.com/api/clients');
        const data: Client[] = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }

    };

    fetchClients();
  }, []);

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = selectedClient ? 'PUT' : 'POST';
    const url = selectedClient
      ? `https://indoor-api.onrender.com/api/clients/${selectedClient.id}`
      : 'https://indoor-api.onrender.com/api/clients';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newClient),
    });

    if (response.ok) {
      const addedOrUpdatedClient = await response.json();
      if (method === 'POST') {
        setClients([...clients, addedOrUpdatedClient]);
      } else {
        setClients(clients.map(client =>
          client.id === addedOrUpdatedClient.id ? addedOrUpdatedClient : client
        ));
      }
      setNewClient({ name: '', email: '', phone: '', membershipstatus: 'Activo' });
      setSelectedClient(null);
      setIsModalOpen(false);
    } else {
      console.error('Error al agregar o editar el cliente');
    }
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setNewClient({ name: client.name, email: client.email, phone: client.phone, membershipstatus: client.membershipStatus });
    setIsModalOpen(true);
  };

  const handleDeleteClient = async (id: number) => {
    const response = await fetch(`https://indoor-api.onrender.com/api/clients/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setClients(clients.filter((client) => client.id !== id));
    } else {
      console.error('Error al eliminar el cliente');
    }
  };
  
  if (loading) {
    return <Loader />
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar clientes..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Agregar Cliente
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4">Agregar Cliente</h2>
              <form onSubmit={handleAddClient}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input
                    type="text"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Estado de Membresía</label>
                  <select
                    value={newClient.membershipstatus}
                    onChange={(e) => setNewClient({ ...newClient, membershipstatus: e.target.value })}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
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
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado de Membresía
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {client.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.membershipstatus}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-4"
                      onClick={() => handleEditClient(client)}
                    >
                      Editar
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteClient(client.id)}
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