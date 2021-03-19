import { ParadaDocument, ParadaModel } from '../../interfaces/paradas';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const paradas = new Schema<ParadaDocument, ParadaModel>({
  _id: String,
  name: String,
  zona: String,
  index: Number,
});

export default paradas;
