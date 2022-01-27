import { ParadasRepository } from '../../domain/paradas/ParadasRepository.js';

export default class GetParadasHandler {
  constructor(private paradasRepository: ParadasRepository) {}

  public async getParadas()  {
    const paradas = await this.paradasRepository.findAll();
    console.log('API Response: Enviados todas las paradas');
    return paradas;
  };
 }
