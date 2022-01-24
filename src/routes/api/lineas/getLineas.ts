import { Router } from 'express';
import GetLineasService from '../../../aplicacion/getLineas/GetLineasService.js';

const router = Router({ mergeParams: true });

router.get('/api/lineas', async (req, res, next) => {
  try {
    if (!req.db) {
      throw new Error('No se ha podido encontrar la base de datos');
    }

    const getLineasService = new GetLineasService(req.db);
    const lineas = await getLineasService.getLineas();

    res.json(lineas);
  } catch (error: unknown) {
    res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
  }
});

export default router;
