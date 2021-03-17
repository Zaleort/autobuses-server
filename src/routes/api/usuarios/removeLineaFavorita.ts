import { Router } from 'express';
import { authenticateToken } from '../../../lib/accessToken.js';

const router = Router({ mergeParams: true });

router.delete('/api/usuarios/:usuario/lineas/:linea', authenticateToken, async (req, res, next) => {
  console.log('API Call: Eliminar línea favorita');
  const usuariosModel = req.db?.usuarios;
  const lineasModel = req.db?.lineas;
  if (!usuariosModel || !lineasModel) {
    res.status(500).json({ message: 'Error conectando con la base de datos' });
    return;
  }

  if (req.params.usuario !== req.user) {
    res.status(403).json({ message: 'No tienes permiso para modificar otro usuario' });
    return;
  }

  try {
    const lineaId = req.params.linea;
    const userName = req.user;
    const usuario = await usuariosModel.findOne({ usuario: userName });

    if (!usuario) {
      res.status(500).json({ message: 'Ha ocurrido un error' });
      return;
    }

    const lineasUsuarios = usuario.autobuses.lineas || [];
    const i = lineasUsuarios.findIndex(l => l === lineaId);
    if (i === -1) {
      res.status(404).json({ message: 'La línea no existe dentro de las favoritas' });
      return;
    }

    lineasUsuarios.splice(i, 1);
    usuario.autobuses.lineas = lineasUsuarios;
    const updated = await usuario.save();

    res.status(200).json({ ...updated.toObject(), contrasena: undefined });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: 'Ha ocurrido un error al contactar con la base de datos' })
  }
});

export default router;
