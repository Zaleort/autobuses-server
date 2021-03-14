import { Router } from 'express';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/auth/register', async (req, res, next) => {
  const usuariosModel = req.db?.usuarios;

  if (!usuariosModel) {
    res.status(500).json({ message: 'Error conectando con la base de datos' });
    return;
  }
  const { usuario, contrasena } = req.body;
  console.log(`Intentando registrar usuario ${usuario}`);

  try {
    let user = await usuariosModel.findOne({ usuario });

    if (user) {
      console.log('El usuario ya existe');
      res.status(500).json({ message: 'Usuario ya existe' });
      return;
    }

    const hashPass = await bcrypt.hash(contrasena, 10);

    user = await usuariosModel.create({ usuario, contrasena: hashPass });
    usuario.contrasena = undefined;
    console.log('Usuario creado correctamente');

    res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

export default router;
