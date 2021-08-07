import { Router } from 'express';
import { authenticateToken } from '../../../lib/accessToken.js';

const router = Router({ mergeParams: true });

router.get('/api/usuarios/:usuario/lineas', authenticateToken, async (req, res, next) => {
  console.log('API Call: GET línea favorita');
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
    const userName = req.user;
    const usuario = await usuariosModel.findOne({ usuario: userName });

    if (!usuario) {
      res.status(500).json({ message: 'Ha ocurrido un error' });
      return;
    }

    const lineasUsuarios = usuario.autobuses.lineas;

    if (!lineasUsuarios || lineasUsuarios.length === 0) {
      res.status(200).json([]);
      return;
    }

    const lineas = await lineasModel.aggregate([
      {
        $match: {
          _id: { $in: lineasUsuarios },
        },
      },
      {
        $addFields: {
          paradasInfo: {
            $setUnion: [
              { $ifNull: ['$paradasIda', []] },
              { $ifNull: ['$paradasVuelta', []] },
            ],
          },
        },
      },
      {
        $project: {
          url: 0,
          horarios: 0,
          paradasIda: 0,
          paradasVuelta: 0,
          nucleosIda: 0,
          nucleosVuelta: 0,
        },
      },
    ]).exec();

    console.log('Líneas favoritas obtenidas con éxito');
    res.status(200).json(lineas);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: 'Ha ocurrido un error al contactar con la base de datos' })
  }
});

export default router;
