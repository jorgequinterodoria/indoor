import React, { useState } from 'react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`min-h-screen bg-gray-50 flex ${isMenuOpen ? 'overflow-hidden' : ''}`}>
      {/* Botón de menú hamburguesa */}
      <button onClick={toggleMenu} className="md:hidden p-2">
        {/* Icono de menú hamburguesa */}
        <span className="block w-6 h-1 bg-gray-600 mb-1"></span>
        <span className="block w-6 h-1 bg-gray-600 mb-1"></span>
        <span className="block w-6 h-1 bg-gray-600"></span>
      </button>

      {/* Sidebar */}
      <aside className={`w-64 bg-white border-r border-gray-200 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
        <div className="p-3">
          <img src="/logo.png" alt="Logo" className="mx-auto mb-4 w-3/5" />
          <h2 className="text-center">Software de gestión y Control</h2>
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
      <div className={`flex-1 ${isMenuOpen ? 'overflow-hidden' : ''}`}>
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