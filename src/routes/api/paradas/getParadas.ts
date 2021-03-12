import { Router } from 'express';
import mongo from '../../../mongo.js';

const router = Router();

router.get('/api/paradas', async (req, res, next) => {
  console.log('API Call: Paradas');
  const db = mongo.getDb();
  try {
    const paradas = await db.collection('paradas').find().toArray();
    console.log('API Response: Enviadas todas las paradas');
    res.status(200).json(paradas);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: 'Ha ocurrido un error conectándose con la base de datos' });
  }
});

export default router;
