import React from 'react';
import { 
  Bike, 
  Users, 
  Wrench, 
  Calendar,
  CalendarCheck, 
  Package,
  ShoppingCart, 
  UserCog,
  BarChart3,
  Bell,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { logout } = useAuth();
  const currentPath = window.location.pathname;

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/' },
    { icon: Bike, label: 'Simuladores', path: '/simulators' },
    { icon: Users, label: 'Clientes', path: '/clients' },
    { icon: Wrench, label: 'Taller', path: '/workshop' },
    { icon: Calendar, label: 'Planes de Entrenamiento', path: '/training' },
    { icon: CalendarCheck, label: 'Asignación de Entrenamientos', path: '/training-assignments' },
    { icon: Package, label: 'Inventario', path: '/inventory' },
    { icon: ShoppingCart, label: 'Almacén', path: '/pos' },
    { icon: UserCog, label: 'Empleados', path: '/employees' },
    { icon: Bike, label: 'Historial de Bicicletas', path: '/bike-history' },
    { icon: Bike, label: 'CRUD de Bicicletas', path: '/bike-crud' },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">Indoor Cycling Team</h1>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={handleNavigation(item.path)}
              className={`flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600
                ${currentPath === item.path ? 'bg-blue-50 text-blue-600' : ''}`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {menuItems.find(item => item.path === currentPath)?.label || 'Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-blue-600">
                <Bell className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-gray-600 hover:text-blue-600"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}