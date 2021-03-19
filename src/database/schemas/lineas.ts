import { LineaDocument, LineaModel } from '../../interfaces/lineas';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const lineas = new Schema<LineaDocument, LineaModel>({
  _id: String,
  name: String,
  url: String,
  accesible: Boolean,
  horarios: Object,
  nucleosIda: [String],
  nucleosVuelta: [String],
  paradasIda: [String],
  paradasVuelta: [String],
  saltos: Number,
  recorrido: String,
});

export default lineas;
