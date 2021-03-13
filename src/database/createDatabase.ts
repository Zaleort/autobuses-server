import { LineaDocument, LineaModel } from '@/interfaces/lineas.js';
import { NucleoDocument, NucleoModel } from '@/interfaces/nucleos.js';
import { ParadaDocument, ParadaModel } from '@/interfaces/paradas.js';
import { UsuarioDocument, UsuarioModel } from '@/interfaces/usuarios.js';
import mongoose, { Model } from 'mongoose';
import lineas from './schemas/lineas.js';
import nucleos from './schemas/nucleos.js';
import paradas from './schemas/paradas.js';
import usuarios from './schemas/usuarios.js';

export interface DbModels {
  lineas: Model<LineaDocument, LineaModel>;
  nucleos: Model<NucleoDocument, NucleoModel>;
  paradas: Model<ParadaDocument, ParadaModel>;
  usuarios: Model<UsuarioDocument, UsuarioModel>;
}

export default () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  const autobuses = mongoose.createConnection('mongodb://localhost/autobuses', options);
  const cuentas = mongoose.createConnection('mongodb://localhost/cuentas', options);

  const models: DbModels = {
    lineas: autobuses.model('lineas', lineas),
    nucleos: autobuses.model('nucleos', nucleos),
    paradas: autobuses.model('paradas', paradas),
    usuarios: cuentas.model('usuarios', usuarios),
  };

  return models;
}
