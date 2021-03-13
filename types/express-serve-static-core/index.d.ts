import { Model } from "mongoose";

declare module 'express-serve-static-core' {
  export interface Request {
    db?: {
      [key: string]: Model<any, any>
    }
  }
}
