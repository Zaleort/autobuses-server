import { Document, Model } from 'mongoose';

interface ParadaSchema {
  _id: string;
  name: string;
  zona: string;
  index?: number;
}

interface ParadaDocument extends ParadaSchema, Document {}
interface ParadaModel extends Model<ParadaDocument> {}
