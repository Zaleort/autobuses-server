import { Router } from 'express';
import mongo from '../../../mongo.js';

const router = Router();

router.get('/api/nucleos', async (req, res, next) => {
  const db = mongo.getDb();

  try {
    const nucleos = await db.collection('nucleos').find().toArray();
    console.log('API Response: Enviados todos los núcleos');
    res.status(200).json(nucleos);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: 'Ha ocurrido un error conectándose con la base de datos' });
  }
});

export default router;
