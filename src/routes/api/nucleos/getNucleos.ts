import { Router } from 'express';
import NucleosMongoRepository from '../../../infrastructure/nucleos/NucleosMongoRepository.js';
import GetNucleosHandler from '../../../aplicacion/getNucleos/GetNucleosHandler.js';

const router = Router();

router.get('/api/nucleos', async (req, res, next) => {
  try {
    if (!req.db) {
      throw new Error('Ha ocurrido un error conectando con la base de datos');
    }

    const nucleosHandler = new GetNucleosHandler(new NucleosMongoRepository(req.db));
    const nucleos = await nucleosHandler.getNucleos();

    console.log('API Response: Enviados todos los núcleos');
    res.status(200).json(nucleos);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    }

    res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
  }
});

export default router;
