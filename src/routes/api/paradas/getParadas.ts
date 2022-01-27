import { Router } from 'express';
import GetParadasHandler from '../../../aplicacion/getParadas/GetParadasHandler.js';
import ParadasMongoRepository from '../../../infrastructure/paradas/ParadasMongoRepository.js';

const router = Router();
router.get('/api/paradas', async (req, res, next) => {
  try {
    if (!req.db) {
      throw new Error('Ha ocurrido un error conectando con la base de datos');
    }

    const paradasHandler = new GetParadasHandler(new ParadasMongoRepository(req.db));
    const paradas = await paradasHandler.getParadas();

    console.log('API Response: Enviados todas las paradas');
    res.status(200).json(paradas);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    }

    res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
  }
});

export default router;
