import { Router } from 'express';
const router = Router();

router.get('/api/paradas', async (req, res, next) => {
  console.log('API Call: Paradas');
  const paradasModel = req.db?.nucleos;

  if (!paradasModel) {
    res.status(500).json({ message: 'Error conectando con la base de datos' });
    return;
  }

  try {
    const paradas = await paradasModel.find();
    console.log('API Response: Enviadas todas las paradas');
    res.status(200).json(paradas);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: 'Ha ocurrido un error conectándose con la base de datos' });
  }
});

export default router;
