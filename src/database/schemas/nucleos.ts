import { NucleoDocument, NucleoModel } from '../../interfaces/nucleos';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const nucleos = new Schema<NucleoDocument, NucleoModel>({
  _id: String,
  name: String,
});

export default nucleos;
