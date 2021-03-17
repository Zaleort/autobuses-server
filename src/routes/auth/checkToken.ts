import { Router } from 'express';
import { authenticateToken, generateToken } from '../../lib/accessToken.js';

const router = Router();

router.get('/auth/token', authenticateToken, async (req, res, next) => {
  const usuariosModel = req.db?.usuarios;

  if (!usuariosModel) {
    res.status(500).json({ message: 'Error conectando con la base de datos' });
    return;
  }

  try {
    const user = await usuariosModel.findOne({ usuario: req.user });
    if (!user) {
      console.log('El usuario no existe');
      res.status(500).json({ message: 'El usuario no existe' });
      return;
    }

    const token = generateToken(req.user as string);
    const response = {
      ...user.toObject(),
      contrasena: undefined,
      token,
    };

    console.log('El token es correcto');
    console.log('Enviando datos de usuario');

    res.status(200).json(response);
    return;
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
