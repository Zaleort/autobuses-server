import getLinea from './api/lineas/getLinea.js';
import getLineas from './api/lineas/getLineas.js';
import getNucleo from './api/nucleos/getNucleo.js';
import getNucleos from './api/nucleos/getNucleos.js';
import getParada from './api/paradas/getParada.js';
import getParadas from './api/paradas/getParadas.js';
import addLineaFavorita from './api/usuarios/addLineaFavorita.js';
import removeLineaFavorita from './api/usuarios/removeLineaFavorita.js';
import getLineasFavoritas from './api/usuarios/getLineasFavoritas.js';
import addTarjeta from './api/usuarios/addTarjeta.js';
import removeTarjeta from './api/usuarios/removeTarjeta.js';
import login from './auth/login.js';
import register from './auth/register.js';
import checkToken from './auth/checkToken.js';

export default () => {
  const routes = [
    getLinea,
    getLineas,
    getNucleo,
    getNucleos,
    getParada,
    getParadas,
    addLineaFavorita,
    removeLineaFavorita,
    getLineasFavoritas,
    addTarjeta,
    removeTarjeta,
    login,
    register,
    checkToken,
  ];

  return routes;
}
