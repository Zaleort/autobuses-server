import { NucleosRepository } from "../../domain/nucleos/NucleosRepository.js";
import { DbModels } from "../../database/createDatabase";
import GetNucleoCommand from "./GetNucleoCommand.js";

export default class GetNucleoService {
  constructor(private nucleosRepository: NucleosRepository, private db: DbModels) {}

  public async execute(command: GetNucleoCommand) {
    console.log('API Call: GET Núcleo');
    const nucleo = await this.nucleosRepository.findOne(command.id);

    if (nucleo === null) {
      throw new Error(`API Error: El núcleo ${command.id} no existe`);
    }

    console.log(`API Response: Enviado el núcleo ${command.id}`);
    return nucleo;
  }
}