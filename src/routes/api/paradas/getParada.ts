import { Router } from 'express';
import mongo from '../../../mongo.js';

const router = Router();

router.get('/api/paradas/:id', async (req, res, next) => {
  console.log('API Call: Paradas');
  const db = mongo.getDb();
  const { id } = req.params;

  try {
    const nucleo = await db.collection('paradas').findOne({ _id: id });
  
    if (nucleo === null) {
      console.warn(`API Error: La parada ${id} no existe`);
      res.status(404).json({ message: 'La parada solicitada no existe' });
    }
  
    console.log(`API Response: Enviada la parada ${id}`);
    res.status(200).json(nucleo);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: 'Ha ocurrido un error conectándose con la base de datos' });
  }
});

export default router;


