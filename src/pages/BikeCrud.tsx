import { useState } from 'react';
import { Layout } from '../components/Layout';
import './BikeCrud.css'; // Asegúrate de crear este archivo CSS

// Define a type for the bike
type Bike = {
  id: number;
  brand: string;
  model: string;
  owner_id: string;
};

export function BikeCrud() {
  // Use the Bike type for the bikes state
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [newBike, setNewBike] = useState<Omit<Bike, 'id'>>({ brand: '', model: '', owner_id: '' });

  const handleAddBike = () => {
    // Add a new bike with a unique id
    setBikes([...bikes, { ...newBike, id: bikes.length + 1 }]);
    setNewBike({ brand: '', model: '', owner_id: '' });
  };

  const handleDeleteBike = (id: number) => {
    // Remove the bike with the specified id
    setBikes(bikes.filter(bike => bike.id !== id));
  };

  return (
    <Layout>
      <div className="bike-crud-container">
        <h2>CRUD de Bicicletas</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Marca"
            value={newBike.brand}
            onChange={(e) => setNewBike({ ...newBike, brand: e.target.value })}
          />
          <input
            type="text"
            placeholder="Modelo"
            value={newBike.model}
            onChange={(e) => setNewBike({ ...newBike, model: e.target.value })}
          />
          <input
            type="text"
            placeholder="ID del Propietario"
            value={newBike.owner_id}
            onChange={(e) => setNewBike({ ...newBike, owner_id: e.target.value })}
          />
          <button className="add-bike-button" onClick={handleAddBike}>Agregar Bicicleta</button>
        </div>

        <ul className="bike-list">
          {bikes.map(bike => (
            <li key={bike.id} className="bike-item">
              {bike.brand} - {bike.model} (Propietario: {bike.owner_id})
              <button className="delete-bike-button" onClick={() => handleDeleteBike(bike.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
