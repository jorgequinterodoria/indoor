import { Layout } from '../components/Layout';
import { DashboardCard } from '../components/DashboardCard';
import { Users,  Wrench, DollarSign, Calendar, AlertTriangle } from 'lucide-react';

export function DashboardPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DashboardCard
            title="Miembros Activos"
            value="156"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <DashboardCard
            title="Ingreso Mensual"
            value="$24,890"
            icon={DollarSign}
            trend={{ value: 8, isPositive: true }}
          />
          <DashboardCard
            title="Entrenamientos Activos"
            value="45"
            icon={Calendar}
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Equipment Status */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Estado de Equipos</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Simuladores en uso</span>
                <span className="font-semibold">8/12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Mantenimientos Requeridos</span>
                <span className="text-red-600 font-semibold">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Promedio de uso diario</span>
                <span className="font-semibold">6.5 horas</span>
              </div>
            </div>
          </div>

          {/* Training Plans Overview */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Planes de Entrenamiento</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Planes Activos</span>
                <span className="font-semibold">45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Planes Congelados</span>
                <span className="text-yellow-600 font-semibold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tasa de cumplimiento</span>
                <span className="text-green-600 font-semibold">78%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity and Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Actividad Reciente</h2>
            <div className="space-y-4">
              {[
                { time: 'Hace 2h', action: 'Nuevo Miembro Registrado', user: 'Alberto Caballero' },
                { time: 'Hace 3h', action: 'Entrenamiento Completado', user: 'Yolima Correa' },
                { time: 'Hace 5h', action: 'Mantenimiento de Simulador', user: 'Juan Madrid' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user} - {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Alertas</h2>
            <div className="space-y-4">
              {[
                { type: 'warning', message: 'Inventario bajo de neumáticos', icon: AlertTriangle },
                { type: 'alert', message: 'Simulador #3 hacer mantenimiento', icon: Wrench },
                { type: 'info', message: '5 planes de entrenamiento finalizan esta semana', icon: Calendar },
              ].map((alert, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm">
                  <alert.icon className={`w-5 h-5 ${
                    alert.type === 'warning' ? 'text-yellow-500' :
                    alert.type === 'alert' ? 'text-red-500' : 'text-blue-500'
                  }`} />
                  <span>{alert.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}