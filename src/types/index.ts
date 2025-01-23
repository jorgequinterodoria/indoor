export interface Simulator {
  id: string;
  model: string;
  status: 'available' | 'in-use' | 'maintenance';
  lastMaintenance: Date;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipStatus: 'active' | 'inactive';
}

export interface Bike {
  id: string;
  clientId: string;
  brand: string;
  model: string;
  serviceHistory: ServiceRecord[];
}

export interface ServiceRecord {
  id: string;
  bikeId: string;
  date: Date;
  type: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface TrainingPlan {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'active' | 'frozen';
}

export interface DashboardMetrics {
  activeClients: number;
  availableSimulators: number;
  pendingServices: number;
  monthlyRevenue: number;
}