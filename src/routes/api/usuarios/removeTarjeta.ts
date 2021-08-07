import usuarios from '@/database/schemas/usuarios.js';
import { Router } from 'express';
import { authenticateToken } from '../../../lib/accessToken.js';

const router = Router({ mergeParams: true });

router.delete('/api/usuarios/:usuario/tarjetas', authenticateToken, async (req, res, next) => {
  console.log('API Call: Borrar tarjeta');
  const usuariosModel = req.db?.usuarios;

  if (!usuariosModel) {
    res.status(500).json({ message: 'Error conectando con la base de datos' });
    return;
  }

  if (req.params.usuario !== req.user) {
    res.status(403).json({ message: 'No tienes permiso para modificar otro usuario' });
    return;
  }

  const id = req.body.id;
  if (!id) {
    res.status(400).json({ message: 'Es necesario el id de la tarjeta para eliminarla' });
  }

  try {
    const userName = req.user;
    const usuario = await usuariosModel.findOne({ usuario: userName });

    if (!usuario) {
      res.status(500).json({ message: 'Ha ocurrido un error' });
      return;
    }

    const i = usuario.autobuses.tarjetas.findIndex(t => t._id.toString() === id);
    if (i === -1) {
      res.status(404).json({ message: `No se ha encontrado la tarjeta con ID ${id}` });
      return;
    }

    usuario.autobuses.tarjetas.splice(i, 1);
    const updated = await usuario.save();

    console.log('Tarjeta eliminada con éxito');
    res.status(200).json({ ...updated.toObject(), contrasena: undefined });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: 'Ha ocurrido un error al contactar con la base de datos' })
  }
});

export default router;
