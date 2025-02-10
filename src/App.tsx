import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { SimulatorsPage } from './pages/SimulatorsPage';
import { ClientsPage } from './pages/ClientsPage';
import { WorkshopPage } from './pages/WorkshopPage';
import { TrainingPlansPage } from './pages/TrainingPlansPage';
import { InventoryPage } from './pages/InventoryPage';
import { POSPage } from './pages/POSPage';
import { DashboardPage } from './pages/DashboardPage';
import { EmployeesPage } from './pages/EmployeesPage';
import { TrainingAssignmentsPage } from './pages/TrainingAssignmentsPage';
import { BikeHistorySelector } from './pages/BikeHistorySelector';
import { BikeCrud } from './pages/BikeCrud';


function AppContent() {
  const { isAuthenticated } = useAuth();
  const path = window.location.pathname;

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Route to the appropriate page based on the path
  switch (path) {
    case '/':
      return <DashboardPage />;
    case '/clients':
      return <ClientsPage />;
    case '/workshop':
      return <WorkshopPage />;
    case '/training':
      return <TrainingPlansPage />;
    case '/training-assignments':
      return <TrainingAssignmentsPage />;
    case '/inventory':
      return <InventoryPage />;
    case '/pos':
      return <POSPage />;
    case '/employees':
      return <EmployeesPage />;
    case '/simulators':
      return <SimulatorsPage />;
    case '/bike-history':
      return <BikeHistorySelector />;
    case '/bike-crud':
      return <BikeCrud />;
    default:
      return <DashboardPage />;
  }
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;