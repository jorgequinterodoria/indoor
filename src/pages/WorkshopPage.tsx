import { Layout } from '../components/Layout';
import { Plus, Search, PenTool as Tool, Clock, CheckCircle } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';

const services = [
  {
    id: '1',
    bikeId: 'BIKE001',
    clientName: 'John Doe',
    type: 'Mantenimiento',
    description: 'Mantenimiento regular y calibración',
    status: 'en curso',
    startDate: '2024-02-20',
    estimatedCompletion: '2024-02-22'
  },
  {
    id: '2',
    bikeId: 'BIKE002',
    clientName: 'Jane Smith',
    type: 'Reparación',
    description: 'Cambio de cadena y ajuste de engranajes',
    status: 'pendiente',
    startDate: '2024-02-21',
    estimatedCompletion: '2024-02-23'
  },
  {
    id: '3',
    bikeId: 'BIKE003',
    clientName: 'Mike Johnson',
    type: 'Mejora',
    description: 'Instalación de nuevos componentes',
    status: 'completado',
    startDate: '2024-02-19',
    estimatedCompletion: '2024-02-21'
  }
];

export function WorkshopPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Talleres</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DashboardCard
            title="Servicios Activos"
            value="5"
            icon={Tool}
            trend={{ value: 10, isPositive: true }}
          />
          <DashboardCard
            title="Servicios Pendientes"
            value="3"
            icon={Clock}
            trend={{ value: 5, isPositive: false }}
          />
          <DashboardCard
            title="Completados Hoy"
            value="7"
            icon={CheckCircle}
            trend={{ value: 15, isPositive: true }}
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
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Servicio
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
                      {service.type}
                    </div>
                    <div className="text-sm text-gray-500">
                      {service.description}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{service.clientName}</div>
                    <div className="text-sm text-gray-500">Bike ID: {service.bikeId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${service.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        service.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Start: {service.startDate}</div>
                    <div className="text-sm text-gray-500">Est. Completion: {service.estimatedCompletion}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Actualizar Estado
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      Ver Detalles
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