import { DbModels } from '../../database/createDatabase';
import { NucleosRepository } from '../../domain/nucleos/NucleosRepository.js';

export default class GetNucleosHandler {
  constructor(private nucleosRepository: NucleosRepository) {}

  public async getNucleos()  {
    const nucleos = await this.nucleosRepository.findAll();
    console.log('API Response: Enviados todos los núcleos');
    return nucleos;
  };
 }
