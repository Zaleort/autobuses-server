// @TODO Conexión segura con usuario
import mongo, { Db } from 'mongodb';
const { MongoClient } = mongo;

const url = 'mongodb://localhost:27017';
const dbName = 'autobuses';
const dbUserName = 'cuentas';
let db: Db;
let dbUser: Db;
const client = new MongoClient(url, { useUnifiedTopology: true });

export default {
  connect(callback: Function) {
    client.connect((err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log('Conectado a la base de datos');
      db = client.db(dbName);
      dbUser = client.db(dbUserName);

      if (callback !== null && typeof (callback) === 'function') {
        callback(client);
      }
    });
  },

  getDb() {
    return db;
  },

  getDbCuentas() {
    return dbUser;
  },
};
