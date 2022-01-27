import { DbModels } from "@/database/createDatabase";
import Nucleo from "../../domain/nucleos/Nucleo.js";
import { NucleosRepository } from "../../domain/nucleos/NucleosRepository.js";

export default class NucleosMongoRepository implements NucleosRepository {
  private db: DbModels;
  constructor(db: DbModels) {
    this.db = db;
  }

  async findAll(): Promise<Nucleo[] | undefined> {
    const nucleosModel = this.db.nucleos;
    const nucleos = await nucleosModel.find().exec();

    if (nucleos.length > 0) {
      return nucleos.map(n => new Nucleo(n._id, n.name));
    }

    return undefined;
  }

  async findOne(id: string): Promise<Nucleo | undefined> {
    const nucleosModel = this.db.nucleos;
    const nucleo = await nucleosModel.findOne({ _id: id }).exec();

    if (nucleo !== null) {
      return new Nucleo(
        nucleo._id,
        nucleo.name,
      );
    }

    return undefined;
  }
}