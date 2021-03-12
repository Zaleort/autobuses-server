import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongo from './mongo.js';
import scrape from './getTableData.js';
import router from './routes/createRouter.js';
import path from 'path';

const app = express();
const apiRoutes = router();
console.log(apiRoutes);
const __dirname = path.resolve();

mongo.connect(() => {
  // scrape.getLineasTableInfo();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', apiRoutes);

/* app.use(express.static(path.resolve(__dirname, '../dist/Autobuses')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/Autobuses/index.html'));
}); */

app.listen(3000, () => console.log('Escuchando en el puerto 3000'));
