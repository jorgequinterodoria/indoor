import { useEffect, useState } from 'react';

// Define a type for the maintenance record
type MaintenanceRecord = {
  id: number;
  service_date: string;
  details: string;
};

export function MaintenanceHistory({ bikeId }: { bikeId: number }) {
  // Use the MaintenanceRecord type for the records state
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);

  useEffect(() => {
    // Simular la obtención del historial de mantenimiento
    setRecords([
      { id: 1, service_date: '2023-01-01', details: 'Cambio de llantas' },
      { id: 2, service_date: '2023-02-15', details: 'Ajuste de frenos' },
    ]);
  }, [bikeId]);

  return (
    <div>
      <h3>Historial de Mantenimientos</h3>
      <ul>
        {records.map(record => (
          <li key={record.id}>
            <strong>Fecha:</strong> {record.service_date} <br />
            <strong>Detalles:</strong> {record.details}
          </li>
        ))}
      </ul>
    </div>
  );
}

