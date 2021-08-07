import { UsuarioDocument, UsuarioModel } from '../../interfaces/usuarios';
import mongoose from 'mongoose';
const { Schema, Types } = mongoose;

const usuarios = new Schema<UsuarioDocument, UsuarioModel>({
  _id: Types.ObjectId,
  usuario: {
    type: String,
    required: true,
    unique: true,
  },

  contrasena: {
    type: String,
    required: true,
  },

  autobuses: {
    lineas: [String],
    tarjetas: [{
      _id: Types.ObjectId,
      nombre: String,
      saldo: Number,
    }],
    recorridos: [Object],
  },
});

export default usuarios;
