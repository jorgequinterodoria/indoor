import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Search, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

interface CartItem extends InventoryItem {
  quantity: number;
}

interface Employee {
  id: string;
  name: string;
  role: string;
}

// Mock data - Replace with actual data from your backend
const inventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Cadena Pro',
    category: 'Piezas',
    price: 89.99,
    stock: 25,
  },
  {
    id: '2',
    name: 'Jersey Premium',
    category: 'Ropa',
    price: 59.99,
    stock: 15,
  },
  {
    id: '3',
    name: 'Kit de Herramientas Multifunción',
    category: 'Accesorios',
    price: 45.99,
    stock: 8,
  },
];

const employees: Employee[] = [
  { id: '1', name: 'John Smith', role: 'Sales' },
  { id: '2', name: 'Maria Garcia', role: 'Sales' },
  { id: '3', name: 'David Wilson', role: 'Manager' },
];

export function POSPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (item: InventoryItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      if (existingItem.quantity < item.stock) {
        setCart(cart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ));
      }
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    const item = inventoryItems.find(i => i.id === itemId);
    if (item && newQuantity > 0 && newQuantity <= item.stock) {
      setCart(cart.map(cartItem =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      ));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    if (!customerName || !customerEmail || !selectedEmployee || cart.length === 0) {
      alert('Por favor, complete todos los campos requeridos');
      return;
    }

    // Aquí típicamente:
    // 1. Crear un registro de venta en la base de datos
    // 2. Actualizar las cantidades de inventario
    // 3. Generar un recibo
    // 4. Limpiar el carrito y el formulario

    const saleData = {
      customerName,
      customerEmail,
      employeeId: selectedEmployee,
      items: cart,
      total: calculateTotal(),
      date: new Date().toISOString(),
    };

    console.log('Processing sale:', saleData);
    
    // Reset form
    setCart([]);
    setCustomerName('');
    setCustomerEmail('');
    setSelectedEmployee('');
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left side - Product list */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Punto de Venta</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 cursor-pointer"
                onClick={() => addToCart(item)}
              >
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold text-blue-600">${item.price.toFixed(2)}</span>
                  <span className="text-sm text-gray-500">Stock: {item.stock}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Cart */}
        <div className="w-96 bg-gray-50 border-l border-gray-200 p-6 overflow-auto">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Carrito de Compras
            </h3>

            {/* Customer Info */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre del Cliente *"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Correo Electrónico del Cliente *"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                <option value="">Seleccionar Vendedor *</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">${item.price.toLocaleString('es-ES')} cada</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-1 text-gray-500 hover:text-blue-600"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      className="p-1 text-gray-500 hover:text-blue-600"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 text-red-500 hover:text-red-700"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total and Checkout */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="text-xl font-bold text-blue-600">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
              <button
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                onClick={handleCheckout}
                disabled={cart.length === 0 || !customerName || !customerEmail || !selectedEmployee}
              >
                Completar Venta
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}