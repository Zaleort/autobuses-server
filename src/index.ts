import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import createDatabase from './database/createDatabase.js';
import createRouter from './routes/createRouter.js';
import path from 'path';

const app = express();
const router = createRouter();
const database = createDatabase();
const __dirname = path.resolve();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.db = database;
  next();
}); 

app.use('/', router);

/* app.use(express.static(path.resolve(__dirname, '../dist/Autobuses')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/Autobuses/index.html'));
}); */

app.listen(3000, () => console.log('Escuchando en el puerto 3000'));
