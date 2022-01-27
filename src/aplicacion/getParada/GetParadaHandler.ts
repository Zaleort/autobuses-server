import { ParadasRepository } from "../../domain/paradas/ParadasRepository.js";
import GetParadaCommand from "./GetParadaCommand.js";

export default class GetParadaService {
  constructor(private paradasRepository: ParadasRepository) {}

  public async execute(command: GetParadaCommand) {
    console.log('API Call: GET Parada');
    const parada = await this.paradasRepository.findOne(command.id);

    if (parada === null) {
      throw new Error(`API Error: La parada ${command.id} no existe`);
    }

    console.log(`API Response: Enviada la parada ${command.id}`);
    return parada;
  }
}