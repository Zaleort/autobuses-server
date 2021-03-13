import mongoose from 'mongoose';
import lineas from './schemas/lineas.js';
import nucleos from './schemas/nucleos.js';
import paradas from './schemas/paradas.js';
import usuarios from './schemas/usuarios.js';

export default () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  const autobuses = mongoose.createConnection('mongodb://localhost/autobuses', options);
  const cuentas = mongoose.createConnection('mongodb://localhost/cuentas', options);

  const models = {
    lineas: autobuses.model('lineas', lineas),
    nucleos: autobuses.model('nucleos', nucleos),
    paradas: autobuses.model('paradas', paradas),
    usuarios: cuentas.model('usuarios', usuarios),
  };

  return models;
}
