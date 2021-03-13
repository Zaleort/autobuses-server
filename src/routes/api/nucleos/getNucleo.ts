import { Router } from 'express';
const router = Router();

router.get('/api/nucleos/:id', async (req, res, next) => {
  const nucleosModel = req.db?.nucleos;

  if (!nucleosModel) {
    res.status(500).json({ message: 'Error conectando con la base de datos' });
    return;
  }

  const { id } = req.params;

  try {
    const nucleo = await nucleosModel.findOne({ _id: id });

    if (nucleo === null) {
      console.warn(`API Error: El núcleo ${id} no existe`);
      res.status(404).json({ message: 'El núcleo solicitado no existe' });
    }

    console.log(`API Response: Enviado el núcleo ${id}`);
    res.status(200).json(nucleo);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: 'Ha ocurrido un error conectándose con la base de datos' })
  }
});

export default router;
