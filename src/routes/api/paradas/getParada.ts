import GetParadaCommand from '../../../aplicacion/getParada/GetParadaCommand.js';
import GetParadaHandler from '../../../aplicacion/getParada/GetParadaHandler.js';
import ParadasMongoRepository from '../../../infrastructure/paradas/ParadasMongoRepository.js';
import { Router } from 'express';
const router = Router();

router.get('/api/paradas/:id', async (req, res, next) => {
  console.log('API Call: Paradas');
  try {
    if (!req.db) {
      throw new Error('No se ha podido conectar con la base de datos');
    }

    const paradaRepository = new ParadasMongoRepository(req.db);
    const paradaHandler = new GetParadaHandler(paradaRepository);
    const parada = await paradaHandler.execute(new GetParadaCommand(req.params.id));
    res.status(200).json(parada);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }

    res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
  }
});

export default router;
