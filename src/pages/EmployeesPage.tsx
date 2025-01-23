import { Layout } from '../components/Layout';
import { Plus, Search, Mail, Phone } from 'lucide-react';

const employees = [
  {
    id: '1',
    name: 'Manuela Hernandez',
    role: 'Gerente',
    email: 'manuela@example.com',
    phone: '+1234567890',
    status: 'activo',
    department: 'Gestión'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    role: 'Representante de Ventas',
    email: 'maria@example.com',
    phone: '+1234567891',
    status: 'activo',
    department: 'Ventas'
  },
  {
    id: '3',
    name: 'David Wilson',
    role: 'Instructor',
    email: 'david@example.com',
    phone: '+1234567892',
    status: 'activo',
    department: 'Entrenamiento'
  }
];

export function EmployeesPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Empleados</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar empleados..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" />
            Agregar Empleado
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <div key={employee.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                  <p className="text-sm text-gray-500">{employee.role}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full
                  ${employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {employee.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {employee.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {employee.phone}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <button className="text-blue-600 hover:text-blue-800">
                    Editar
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    Desactivar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}