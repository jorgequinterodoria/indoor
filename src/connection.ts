import mongoose from 'mongoose';

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  throw new Error('MONGODB_URI is not defined');
}
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)
.then(() => {
  console.log('Conectado a MongoDB');
})
.catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});
