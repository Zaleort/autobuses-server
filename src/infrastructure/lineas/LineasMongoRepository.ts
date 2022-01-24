import { DbModels } from "@/database/createDatabase";
import Linea from "../../domain/lineas/Linea.js";
import { LineasRepository } from "../../domain/lineas/LineasRepository.js";

export default class LineasMongoRepository implements LineasRepository {
  private db: DbModels;
  constructor(db: DbModels) {
    this.db = db;
  }

  async findOne(id: string): Promise<Linea | undefined> {
    const lineasModel = this.db.lineas;
    const linea = await lineasModel.findOne({ _id: id }).exec();

    if (linea !== null) {
      return new Linea(
        linea._id,
        linea.name,
        linea.url,
        linea.accesible,
        linea.horarios,
        linea.nucleosIda,
        linea.nucleosVuelta,
        linea.paradasIda,
        linea.paradasVuelta,
        linea.saltos,
        linea.recorrido,
      );
    }

    return undefined;
  }
}