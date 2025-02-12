import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import Loader from '../components/Loader';
import { Plus, Search, Package, TrendingUp, DollarSign} from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';
import AddItemModal from '../components/AddItemModal';
import EditItemModal from '../components/EditItemModal';
import { Item } from '../types';

export function InventoryPage() {
  const [inventory, setInventory] = useState<Item[]>([]);
  const [categories, setCategories] = useState<{ id: string; nombre: string }[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://indoor-api.onrender.com/api/inventoryitems');
        const data = await response.json();
        setInventory(data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('https://indoor-api.onrender.com/api/inventorycategories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchInventory();
    fetchCategories();
  }, []);

  const handleAddItem = async (newItem: Item) => {
    try {
      const response = await fetch('https://indoor-api.onrender.com/api/inventoryitems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error('Error al agregar el artículo');
      }

      const createdItem = await response.json();
      setInventory((prev) => [...prev, createdItem]);
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleEditItem = async (updatedItem: Item) => {
    try {
      const response = await fetch(`https://indoor-api.onrender.com/api/inventoryitems/${updatedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el artículo');
      }

      const editedItem = await response.json();
      setInventory((prev) =>
        prev.map((item) => (item.id === editedItem.id ? editedItem : item))
      );
      setShowEditModal(false);
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const response = await fetch(`https://indoor-api.onrender.com/api/inventoryitems/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el artículo');
      }

      setInventory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Inventario</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DashboardCard title="Total de Artículos" value={inventory.length.toString()} icon={Package} />
          <DashboardCard title="Artículos con Stock Bajo" value="12" icon={TrendingUp} />
          <DashboardCard title="Valor Total" value="$12,458" icon={DollarSign} />
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
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={() => setShowAddModal(true)}>
            <Plus className="w-5 h-5 mr-2" />
            Agregar Artículo
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles del Artículo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock mínimo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">{categories.find(cat => cat.id === item.category)?.nombre}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{item.stock} unidades</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{item.minStock} unidades</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">${item.price.toLocaleString('es-ES')}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{item.supplier}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => { setSelectedItem(item); setShowEditModal(true); }}>
                      Editar
                    </button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteItem(item.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AddItemModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onAdd={handleAddItem} categories={categories} />
        <EditItemModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} item={selectedItem} onEdit={handleEditItem} categories={categories} />
      </div>
    </Layout>
  );
}