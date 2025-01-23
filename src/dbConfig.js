import mysql from 'mysql2';

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost', // Cambia esto si tu base de datos está en otro host
  user: 'root', // Cambia esto por tu usuario de MySQL
  password: 'yourpassword', // Cambia esto por tu contraseña de MySQL
  database: 'indoor' // Cambia esto por el nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

export default connection; 