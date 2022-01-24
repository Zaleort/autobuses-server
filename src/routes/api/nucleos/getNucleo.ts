import { Router } from 'express';
import NucleosMongoRepository from '../../../infrastructure/nucleos/NucleosMongoRepository.js';
import GetNucleoCommand from '../../../aplicacion/getNucleo/GetNucleoCommand.js';
import GetNucleoHandler from '../../../aplicacion/getNucleo/GetNucleoHandler.js';

const router = Router();

router.get('/api/nucleos/:id', async (req, res, next) => {
  try {
    if (!req.db) {
      throw new Error('No se ha podido conectar con la base de datos');
    }

    const nucleoHandler = new GetNucleoHandler(new NucleosMongoRepository(req.db), req.db);
    const nucleo = nucleoHandler.execute(new GetNucleoCommand(req.params.id));
    res.status(200).json(nucleo);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }

    res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
  }
});

export default router;
