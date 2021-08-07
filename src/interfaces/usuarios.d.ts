import { Document, Model } from 'mongoose';

interface UsuarioSchema {
  _id: string;
  usuario: string;
  contrasena: string;
  autobuses: {
    lineas: string[];
    tarjetas: TarjetaSchema[];
    recorridos: object[];
  };
}

interface TarjetaSchema {
  _id: string;
  nombre: string;
  saldo: number;
}

interface UsuarioDocument extends UsuarioSchema, Document {}
interface UsuarioModel extends Model<UsuarioDocument> {}
