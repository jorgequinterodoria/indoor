import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import Loader from '../components/Loader'
import { Plus, Search, PenTool as Tool, Clock, CheckCircle } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';

interface Service {
  id: string ;
  bike_id: string;
  cliente_id: string;
  tipo_id: string;
  detalles: string;
  estado_id: string;
  fecha_inicio: string;
  fecha_fin: string;
}

interface Client {
  id: string;
  name: string;
}

interface ServiceType {
  id: string;
  nombre: string;
}

interface ServiceStatus {
  id: string;
  estado: string;
}

interface Bike {
  id: string;
  owner_id: string; // ID del cliente propietario
  brand: string; // Modelo de la bicicleta
}

export function WorkshopPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [serviceStatuses, setServiceStatuses] = useState<ServiceStatus[]>([]);
  const [bikes, setBikes] = useState<Bike[]>([]); // Estado para bicicletas
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<Service>({
    id: '',
    bike_id: '',
    cliente_id: '',
    tipo_id: '',
    detalles: '',
    estado_id: '',
    fecha_inicio: '',
    fecha_fin: '',
  });

  const [loading, setLoading] = useState(true); // Loading state

useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const servicesResponse = await fetch('https://indoor-api.onrender.com/api/services');
        const clientsResponse = await fetch('https://indoor-api.onrender.com/api/clients');
        const serviceTypesResponse = await fetch('https://indoor-api.onrender.com/api/tipos_servicio');
        const serviceStatusesResponse = await fetch('https://indoor-api.onrender.com/api/estado_servicio');
        const bikesResponse = await fetch('https://indoor-api.onrender.com/api/bikes'); // Obtener bicicletas

        const servicesData = await servicesResponse.json();
        const clientsData = await clientsResponse.json();
        const serviceTypesData = await serviceTypesResponse.json();
        const serviceStatusesData = await serviceStatusesResponse.json();
        const bikesData = await bikesResponse.json(); // Obtener datos de bicicletas

        setServices(servicesData);
        setClients(clientsData);
        setServiceTypes(serviceTypesData);
        setServiceStatuses(serviceStatusesData);
        setBikes(bikesData); // Establecer bicicletas
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, []);




  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Desconocido';
  };

  const getServiceTypeName = (typeId: string) => {
    const type = serviceTypes.find(t => t.id === typeId);
    return type ? type.nombre : 'Desconocido';
  };

  const getServiceStatusName = (statusId: string) => {
    const status = serviceStatuses.find(s => s.id === statusId);
    return status ? status.estado : 'Desconocido';
  };

  const getBikeModel = (bikeId: string) => {
    const bike = bikes.find(b => b.id === bikeId);
    return bike ? bike.brand : 'Desconocida';
  };

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setSelectedService(service);
      setNewService(service);
    } else {
      setSelectedService(null);
      setNewService({
        id: '',
        bike_id: '',
        cliente_id: '',
        tipo_id: '',
        detalles: '',
        estado_id: '',
        fecha_inicio: '',
        fecha_fin: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleClientChange = (clientId: string) => {
    setNewService({ ...newService, cliente_id: clientId, bike_id: '' }); // Reset bike_id when client changes
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = selectedService ? 'PUT' : 'POST';
    const url = selectedService 
      ? `https://indoor-api.onrender.com/api/services/${selectedService.id}` 
      : 'https://indoor-api.onrender.com/api/services';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newService),
    });

    if (response.ok) {
      const savedService = await response.json();
      if (method === 'POST') {
        setServices([...services, savedService]);
      } else {
        setServices(services.map(service => 
          service.id === savedService.id ? savedService : service
        ));
      }
      handleCloseModal();
    } else {
      console.error('Error al guardar el servicio');
    }
  };

  const handleOpenStatusModal = (service: Service) => {
    setSelectedService(service);
    setIsStatusModalOpen(true);
  };

  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);
    setSelectedService(null);
  };

  const handleUpdateStatus = async (newStatusId: string) => {
    if (selectedService) {
      const response = await fetch(`https://indoor-api.onrender.com/api/services/${selectedService.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...selectedService, estado_id: newStatusId }),
      });

      if (response.ok) {
        const updatedService = await response.json();
        setServices(services.map(service => 
          service.id === updatedService.id ? updatedService : service
        ));
        handleCloseStatusModal();
      } else {
        console.error('Error al actualizar el estado del servicio');
      }
    }
  };


  if (loading) {
    return <Loader />; // Use the Loader component while loading
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Talleres</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DashboardCard
            title="Servicios Activos"
            value={services.filter(service => parseInt(service.estado_id) === 1).length.toString()}
            icon={Tool}
          />
          <DashboardCard
            title="Servicios Pendientes"
            value={services.filter(service => parseInt(service.estado_id) === 2).length.toString()}
            icon={Clock}
          />
          <DashboardCard
            title="Completados Hoy"
            value={services.filter(service => parseInt(service.estado_id) === 3).length.toString()}
            icon={CheckCircle}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar servicios..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => handleOpenModal()}
          >
            <Plus className="w-5 h-5 mr-2" />
            Agregar Servicio
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Detalles del Servicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bicicleta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fechas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {service.detalles}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{getClientName(service.cliente_id)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{getBikeModel(service.bike_id)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{getServiceTypeName(service.tipo_id)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${getServiceStatusName(service.estado_id) === 'Completado' ? 'bg-green-100 text-green-800' : 
                        getServiceStatusName(service.estado_id) === 'En curso' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {getServiceStatusName(service.estado_id)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Inicio: {new Date(service.fecha_inicio).toLocaleDateString('es-ES')}</div>
                    <div className="text-sm text-gray-500">Fin: {new Date(service.fecha_fin).toLocaleDateString('es-ES')}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => handleOpenModal(service)}
                    >
                      Editar
                    </button>
                    <button 
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => handleOpenStatusModal(service)}
                    >
                      Actualizar Estado
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal para crear/editar servicio */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4">{selectedService ? 'Editar Servicio' : 'Agregar Servicio'}</h2>
              <form onSubmit={handleSaveService}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Detalles</label>
                  <input
                    type="text"
                    value={newService.detalles}
                    onChange={(e) => setNewService({ ...newService, detalles: e.target.value })}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Cliente</label>
                  <select
                    value={newService.cliente_id}
                    onChange={(e) => handleClientChange(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="">Seleccionar Cliente</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Bicicleta</label>
                  <select
                    value={newService.bike_id}
                    onChange={(e) => setNewService({ ...newService, bike_id: e.target.value })}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="">Seleccionar Bicicleta</option>
                    {bikes.filter(bike => parseInt(bike.owner_id) === parseInt(newService.cliente_id)).map(bike => (
                      <option key={bike.id} value={bike.id}>{bike.brand}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Tipo de Servicio</label>
                  <select
                    value={newService.tipo_id}
                    onChange={(e) => setNewService({ ...newService, tipo_id: e.target.value })}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="">Seleccionar Tipo</option>
                    {serviceTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <select
                    value={newService.estado_id}
                    onChange={(e) => setNewService({ ...newService, estado_id: e.target.value })}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="">Seleccionar Estado</option>
                    {serviceStatuses.map(status => (
                      <option key={status.id} value={status.id}>{status.estado}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
                  <input
                    type="date"
                    value={newService.fecha_inicio}
                    onChange={(e) => setNewService({ ...newService, fecha_inicio: e.target.value })}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Fecha de Fin</label>
                  <input
                    type="date"
                    value={newService.fecha_fin}
                    onChange={(e) => setNewService({ ...newService, fecha_fin: e.target.value })}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={handleCloseModal} className="mr-2 text-gray-500">
                    Cancelar
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    {selectedService ? 'Actualizar' : 'Agregar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Modal para actualizar estado */}
        {isStatusModalOpen && selectedService && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4">Actualizar Estado</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleUpdateStatus(newService.estado_id); }}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Nuevo Estado</label>
                  <select
                    value={selectedService.estado_id}
                    onChange={(e) => setNewService({ ...selectedService, estado_id: e.target.value })}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  >
                    {serviceStatuses.map(status => (
                      <option key={status.id} value={status.id}>{status.estado}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={handleCloseStatusModal} className="mr-2 text-gray-500">
                    Cancelar
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Actualizar
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