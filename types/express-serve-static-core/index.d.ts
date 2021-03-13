import { DbModels } from '../../src/database/createDatabase';
declare module 'express-serve-static-core' {
  export interface Request {
    db?: DbModels,
  }
}
