import Nucleo from "./Nucleo.js";

export interface NucleosRepository {
  findAll(): Promise<Nucleo[] | undefined>
  findOne(id: string): Promise<Nucleo | undefined>;
}
