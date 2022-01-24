import Linea from "./Linea.js";

export interface LineasRepository {
  findOne(id: string): Promise<Linea | undefined>;
}
