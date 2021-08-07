import { Router } from 'express';
import { authenticateToken } from '../../../lib/accessToken.js';

const router = Router({ mergeParams: true });

router.put('/api/usuarios/:usuario/tarjetas', authenticateToken, async (req, res, next) => {
  console.log('API Call: Editar tarjeta');
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
  if (!tarjeta || !tarjeta._id) {
    res.status(400).json({ message: 'No se han especificado los datos de la tarjeta' });
  }

  try {
    const userName = req.user;
    const usuario = await usuariosModel.findOne({ usuario: userName });

    if (!usuario) {
      res.status(500).json({ message: 'Ha ocurrido un error' });
      return;
    }

    const { tarjetas } = usuario.autobuses;
    const i = tarjetas.findIndex(t => tarjeta._id === t._id.toString());

    if (i < 0) {
      console.log(`No se ha encontrado la tarjeta ${tarjeta._id}`);
      res.status(404).json({ message: `No se ha encontrado la tarjeta ${tarjeta._id}` });
      return;
    }

    tarjetas[i] = tarjeta;
    usuario.autobuses.tarjetas = tarjetas;
    const updated = await usuario.save();

    console.log('Tarjeta actualizada con éxito');
    res.status(200).json({ ...updated.toObject(), contrasena: undefined });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: 'Ha ocurrido un error al contactar con la base de datos' });
  }
});

export default router;
