import { Router } from 'express';
const router = Router();

router.get('/api/nucleos', async (req, res, next) => {
  const nucleosModel = req.db?.nucleos;

  if (!nucleosModel) {
    res.status(500).json({ message: 'Error conectando con la base de datos' });
    return;
  }

  try {
    const nucleos = await nucleosModel.find();
    console.log('API Response: Enviados todos los núcleos');
    res.status(200).json(nucleos);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: 'Ha ocurrido un error conectándose con la base de datos' });
  }
});

export default router;
