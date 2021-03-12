import getLinea from './api/lineas/getLinea.js';
import getLineas from './api/lineas/getLineas.js';
import getNucleo from './api/nucleos/getNucleo.js';
import getNucleos from './api/nucleos/getNucleos.js';
import getParada from './api/paradas/getParada.js';
import getParadas from './api/paradas/getParadas.js';
import login from './auth/login.js';
import register from './auth/register.js';

export default () => {
  const routes = [
    getLinea,
    getLineas,
    getNucleo,
    getNucleos,
    getParada,
    getParadas,
    login,
    register,
  ];

  return routes;
}
