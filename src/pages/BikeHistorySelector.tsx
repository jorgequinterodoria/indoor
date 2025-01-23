import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { MaintenanceHistory } from './MaintenanceHistory';

// Define a type for the client
type Client = {
  id: number;
  name: string;
};

// Define a type for the bike
type Bike = {
  id: number;
  brand: string;
  model: string;
};

export function BikeHistorySelector() {
  // Use the Client type for the clients state
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [selectedBike, setSelectedBike] = useState<number | null>(null);

  useEffect(() => {
    // Simular la obtención de clientes
    setClients([
      { id: 1, name: 'Cliente 1' },
      { id: 2, name: 'Cliente 2' },
    ]);
  }, []);

  useEffect(() => {
    if (selectedClient !== null) {
      // Simular la obtención de bicicletas para el cliente seleccionado
      setBikes([
        { id: 1, brand: 'Marca A', model: 'Modelo X' },
        { id: 2, brand: 'Marca B', model: 'Modelo Y' },
      ]);
    }
  }, [selectedClient]);

  return (
    <Layout>
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Seleccionar Cliente y Bicicleta</h2>
      <div className="mb-4">
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          onChange={(e) => setSelectedClient(Number(e.target.value))}
        >
          <option value="">Seleccionar Cliente</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.name}</option>
          ))}
        </select>
      </div>

      {selectedClient !== null && (
        <div className="mb-4">
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => setSelectedBike(Number(e.target.value))}
          >
            <option value="">Seleccionar Bicicleta</option>
            {bikes.map(bike => (
              <option key={bike.id} value={bike.id}>{bike.brand} - {bike.model}</option>
            ))}
          </select>
        </div>
      )}

      {selectedBike !== null && <MaintenanceHistory bikeId={selectedBike} />}
    </div>
    </Layout>
  );
}
