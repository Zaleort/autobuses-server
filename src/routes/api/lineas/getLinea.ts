import { Router } from 'express';
import mongo from '../../../mongo.js';

const router = Router({ mergeParams: true });

router.get('/api/lineas/:id', async (req, res, next) => {
  console.log('API Call: GET Línea');
  const db = mongo.getDb();
  const { id } = req.params;
  try {
    const linea = await db.collection('lineas').aggregate([
      {
        $match: { _id: id },
      },
      {
        $project: { url: 0 },
      },
      {
        $addFields: {
          paradas: {
            $setUnion: [
              { $ifNull: ['$paradasIda', []] },
              { $ifNull: ['$paradasVuelta', []] },
            ],
          },
          nucleos: {
            $setUnion: [
              { $ifNull: ['$nucleosIda', []] },
              { $ifNull: ['$nucleosVuelta', []] },
            ],
          },
        },
      },
      {
        $lookup: {
          from: 'nucleos',
          localField: 'nucleos',
          foreignField: '_id',
          as: 'nucleosInfo',
        },
      },
      {
        $lookup: {
          from: 'paradas',
          localField: 'paradas',
          foreignField: '_id',
          as: 'paradasInfo',
        },
      },
      {
        $project: {
          paradas: 0,
          nucleos: 0,
        },
      },
    ]).next();

    if (linea === null) {
      console.warn(`API Error: La línea ${id} no existe`);
      res.status(404).json({ message: 'La línea no existe' });
    }

    console.log(`Enviada la línea ${id}`);
    res.status(200).json(linea);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: 'Ha ocurrido un error al contactar con la base de datos' })
  }
});

export default router;
