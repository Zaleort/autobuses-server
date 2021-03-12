import { Router } from 'express';
import mongo from '../../mongo.js';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/auth/login', async (req, res, next) => {
  const db = mongo.getDbCuentas();
    const { usuario, contrasena } = req.body;
    console.log('Intentando hacer login');

    try {
      const user = await db.collection('usuarios').findOne({ usuario }, { projection: { contrasena: 0 } });
      if (!user) {
        console.log('El usuario no existe');
        res.status(401).json({ message: 'Usuario o contraseña inválido' });
        return;
      }

      const pass = contrasena;
      const dbPass = user.contrasena;

      const compare = await bcrypt.compare(pass, dbPass);
      if (compare) {
        console.log('Login realizado con éxito');
        res.status(200).json(user);
        return;
      }

      console.log('La contraseña es inválida');
      res.status(401).json({ message: 'Usuario o contraseña inválido' });
    } catch (error) {
      res.status(500).json({ error });
    }
});

export default router;
