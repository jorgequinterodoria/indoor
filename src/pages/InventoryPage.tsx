import { Plus, Search, Package, TrendingUp, DollarSign } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';
import { Layout } from '../components/Layout';

const inventory = [
  {
    id: '1',
    name: 'Cadena Pro',
    category: 'Piezas',
    stock: 25,
    minStock: 10,
    price: 89.99,
    supplier: 'BikePartsInc'
  },
  {
    id: '2',
    name: 'Jersey Premium',
    category: 'Ropa',
    stock: 15,
    minStock: 5,
    price: 59.99,
    supplier: 'SportWear Co'
  },
  {
    id: '3',
    name: 'Kit de Herramientas Multifunción',
    category: 'Accesorios',
    stock: 8,
    minStock: 12,
    price: 45.99,
    supplier: 'ToolMaster'
  }
];

export function InventoryPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Inventario</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DashboardCard
            title="Total de Artículos"
            value="234"
            icon={Package}
            trend={{ value: 8, isPositive: true }}
          />
          <DashboardCard
            title="Artículos con Stock Bajo"
            value="12"
            icon={TrendingUp}
            trend={{ value: 3, isPositive: false }}
          />
          <DashboardCard
            title="Valor Total"
            value="$12,458"
            icon={DollarSign}
            trend={{ value: 12, isPositive: true }}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar inventario..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-x-4">
            <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md">
              Exportar
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Plus className="w-5 h-5 mr-2" />
              Agregar Artículo
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Detalles del Artículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proveedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.category}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {item.stock} unidades
                    </div>
                    <div className={`text-sm ${item.stock < item.minStock ? 'text-red-600' : 'text-gray-500'}`}>
                      Mín: {item.minStock}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      ${item.price.toLocaleString('es-ES')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{item.supplier}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Editar
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Reponer
                    </button>
                    <button className="text-red-600 hover:text-red-900">
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