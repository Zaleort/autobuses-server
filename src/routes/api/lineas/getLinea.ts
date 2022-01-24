import { Router } from 'express';
import LineasMongoRepository from '../../../infrastructure/lineas/LineasMongoRepository.js';
import GetLineaCommand from '../../../aplicacion/getLinea/GetLineaCommand.js';
import GetLineaHandler from '../../../aplicacion/getLinea/GetLineaHandler.js';

const router = Router({ mergeParams: true });

router.get('/api/lineas/:id', async (req, res, next) => {
  try {
    if (!req.db) {
      throw new Error('No se ha podido encontrar la base de datos');
    }

    const getLineaService = new GetLineaHandler(new LineasMongoRepository(req.db), req.db);
    const linea = await getLineaService.execute(new GetLineaCommand(req.params.id));

    res.json(linea);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }

    res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
  }
});

export default router;
