import { DbModels } from "@/database/createDatabase";
import Parada from "../../domain/paradas/Parada.js";
import { ParadasRepository } from "../../domain/paradas/ParadasRepository.js";

export default class ParadasMongoRepository implements ParadasRepository {
  private db: DbModels;
  constructor(db: DbModels) {
    this.db = db;
  }

  async findAll(): Promise<Parada[] | undefined> {
    const paradasModel = this.db.paradas;
    const paradas = await paradasModel.find().exec();

    if (paradas.length > 0) {
      return paradas.map(n => new Parada(n._id, n.name, n.zona, n.index));
    }

    return undefined;
  }

  async findOne(id: string): Promise<Parada | undefined> {
    const paradasModel = this.db.paradas;
    const parada = await paradasModel.findOne({ _id: id }).exec();

    if (parada !== null) {
      return new Parada(
        parada._id,
        parada.name,
        parada.zona,
        parada.index,
      );
    }

    return undefined;
  }
}