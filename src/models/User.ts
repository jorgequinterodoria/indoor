import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: string; // Puedes ajustar esto según tus necesidades
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true, default: 'user' }, // Valor por defecto
}, {
  timestamps: true, // Agrega campos de createdAt y updatedAt
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User; 