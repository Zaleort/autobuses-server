import mongo from '../../mongo.js';

export default {
  name: 'usuarios',
  async execute(args: string[]) {
    console.log('API Call: Usuarios');
    const db = mongo.getDbCuentas();
    if (args.length === 0 || args[0] === '') {
      try {
        const usuarios = await db.collection('usuarios').find().toArray();
        console.log('API Response: Enviadas todas los usuarios');
        return usuarios;
      } catch (err) {
        console.log(err.stack);
        return { message: 'Ha ocurrido un error conectándose con la base de datos' };
      }
    } else {
      try {
        const usuario = await db.collection('usuarios').findOne({ _id: args[0] });

        if (usuario === null) {
          console.warn(`API Error: El usuario ${args[0]} no existe`);
          return { message: 'El usuario solicitada no existe' };
        }

        console.log(`API Response: Enviada el usuario ${args[0]}`);
        return usuario;
      } catch (err) {
        console.log(err.stack);
        return { message: 'Ha ocurrido un error conectándose con la base de datos' };
      }
    }
  },
};
