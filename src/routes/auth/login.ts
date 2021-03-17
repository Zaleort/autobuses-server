import { Router } from 'express';
import { generateToken } from '../../lib/accessToken.js';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/auth/login', async (req, res, next) => {
  const usuariosModel = req.db?.usuarios;

  if (!usuariosModel) {
    res.status(500).json({ message: 'Error conectando con la base de datos' });
    return;
  }

  const { usuario, contrasena } = req.body;
  console.log('Intentando hacer login');

  try {
    const user = await usuariosModel.findOne({ usuario });
    if (!user) {
      console.log('El usuario no existe');
      res.status(500).json({ message: 'Usuario o contraseña inválido' });
      return;
    }

    const pass = contrasena;
    const dbPass = user.contrasena;

    const compare = await bcrypt.compare(pass, dbPass);
    if (compare) {
      console.log('Login realizado con éxito');
      const token = generateToken(usuario);
      console.log(token);
      const response = {
        ...user.toObject(),
        contrasena: undefined,
        token,
      };
      res.status(200).json(response);
      return;
    }

    console.log('La contraseña es inválida');
    res.status(401).json({ message: 'Usuario o contraseña inválido' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
