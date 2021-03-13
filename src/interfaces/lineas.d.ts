import { Document, Model } from 'mongoose';

interface LineaSchema {
  _id: string;
  name: string;
  url: string,
  accesible: boolean,
  horarios: object,
  nucleosIda: [],
  nucleosVuelta: [],
  paradasIda: [],
  paradasVuelta: [],
}

interface LineaDocument extends LineaSchema, Document {}
interface LineaModel extends Model<LineaDocument> {}
