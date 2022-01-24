import { LineasRepository } from "../../domain/lineas/LineasRepository.js";
import { DbModels } from "../../database/createDatabase";
import GetLineaCommand from "./GetLineaCommand.js";
import GetLineaResult from "./GetLineaResult.js";

export default class GetLineaService {
  constructor(private lineaRepository: LineasRepository, private db: DbModels) {}

  public async execute(command: GetLineaCommand): Promise<GetLineaResult> {
    console.log('API Call: GET Línea');

    const linea = await this.lineaRepository.findOne(command.id);
    if (!linea) {
      throw new Error('No se ha encontrado la línea');
    }

    const todosLosNucleos = [...new Set([...linea.nucleosIda, ...linea.nucleosVuelta])]
    const nucleosPromises = todosLosNucleos.map(async (idNucleo: any) => await this.db.nucleos.findOne({ _id: idNucleo }).exec());
    const nucleos = await Promise.all(nucleosPromises);

    const todasLasParadas = [...new Set([...linea.paradasIda, ...linea.paradasVuelta])]
    const paradasPromises = todasLasParadas.map(async (idParada: any) => await this.db.paradas.findOne({ _id: idParada }).exec());
    const paradas = await Promise.all(paradasPromises);

    console.log(`Enviada la línea ${command.id}`);
    return GetLineaResult.fromEntity(linea, nucleos, paradas);
  }
}