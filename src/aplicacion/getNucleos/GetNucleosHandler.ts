import { DbModels } from '../../database/createDatabase';
import { NucleosRepository } from '../../domain/nucleos/NucleosRepository.js';

export default class GetNucleosHandler {
  constructor(private nucleosRepository: NucleosRepository, private db: DbModels) {}

  public async getNucleos()  {
    const nucleos = await this.nucleosRepository.find();
    console.log('API Response: Enviados todos los núcleos');
    return nucleos;
  };
 }
