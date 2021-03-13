import { Router } from 'express';
const router = Router({ mergeParams: true });

router.get('/api/lineas', async (req, res, next) => {
  console.log('API Call: Líneas');
  const lineasModel = req.db?.lineas;
  if (!lineasModel) {
    res.status(500).json({ message: 'Error conectando con la base de datos' });
    return;
  }

  try {
    const lineas = await lineasModel.aggregate([
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
          url: 0,
          horarios: 0,
          paradasIda: 0,
          paradasVuelta: 0,
          nucleosVuelta: 0,
        },
      },
    ]).exec();

    console.log('API Response: Enviadas todas las líneas');
    res.status(200).json(lineas);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: 'Ha ocurrido un error al contactar con la base de datos' })
  }
});

export default router;
