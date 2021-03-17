import { Document, Model } from 'mongoose';

interface UsuarioSchema {
  _id: string;
  usuario: string;
  contrasena: string;
  autobuses: {
    lineas: string[];
    tarjetas: object[];
    recorridos: object[];
  };
}

interface UsuarioDocument extends UsuarioSchema, Document {}
interface UsuarioModel extends Model<UsuarioDocument> {}
