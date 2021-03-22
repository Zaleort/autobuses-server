import { LineaDocument } from '@/interfaces/lineas.js';
import { Router } from 'express';
import { authenticateToken } from '../../../lib/accessToken.js';

const router = Router({ mergeParams: true });

router.post('/api/usuarios/:usuario/lineas', authenticateToken, async (req, res, next) => {
  console.log('API Call: Añadir línea favorita');
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

    const lineaIds = Array.isArray(req.body.linea) ? req.body.linea : [req.body.linea];
    if (!lineaIds || lineaIds.length === 0) {
      res.status(401).json({ message: 'No se ha especificado ninguna línea' });
      return;
    }

    const lineas: LineaDocument[] = await lineasModel.aggregate([
      {
        $match: {
          _id: { $in: lineaIds },
        },
      },
    ]).exec();

    // Array solo con las líneas que existan de verdad
    const ids = lineas.map(l => l._id);

    let lineasUsuarios = usuario.autobuses.lineas || [];
    lineasUsuarios.push(...ids);

    // Elimina duplicados
    lineasUsuarios = [ ...new Set(lineasUsuarios) ];
    usuario.autobuses.lineas = lineasUsuarios;
    const updated = await usuario.save();

    res.status(200).json({ ...updated.toObject(), contrasena: undefined });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: 'Ha ocurrido un error al contactar con la base de datos' })
  }
});

export default router;
