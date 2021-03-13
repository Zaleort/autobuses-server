import { Document, Model } from 'mongoose';

interface NucleoSchema {
  _id: string;
  name: string;
}

interface NucleoDocument extends NucleoSchema, Document {}
interface NucleoModel extends Model<NucleoDocument> {}
