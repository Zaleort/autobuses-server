import { Router } from 'express';
import mongoose from 'mongoose';
import { authenticateToken } from '../../../lib/accessToken.js';

const router = Router({ mergeParams: true });

router.post('/api/usuarios/:usuario/tarjetas', authenticateToken, async (req, res, next) => {
  console.log('API Call: Añadir tarjeta');
  const usuariosModel = req.db?.usuarios;

  if (!usuariosModel) {
    res.status(500).json({ message: 'Error conectando con la base de datos' });
    return;
  }

  if (req.params.usuario !== req.user) {
    res.status(403).json({ message: 'No tienes permiso para modificar otro usuario' });
    return;
  }

  const tarjeta = req.body.tarjeta;
  if (!tarjeta) {
    res.status(400).json({ message: 'No se han especificado los datos de la tarjeta' });
  }

  try {
    const userName = req.user;
    const usuario = await usuariosModel.findOne({ usuario: userName });

    if (!usuario) {
      res.status(500).json({ message: 'Ha ocurrido un error' });
      return;
    }

    tarjeta._id = mongoose.Types.ObjectId();
    usuario.autobuses.tarjetas.push(tarjeta);
    const updated = await usuario.save();

    console.log('Tarjeta añadida con éxito');
    res.status(200).json({ ...updated.toObject(), contrasena: undefined });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: 'Ha ocurrido un error al contactar con la base de datos' })
  }
});

export default router;
