import Nucleo from "./Nucleo.js";

export interface NucleosRepository {
  find(): Promise<Nucleo[] | undefined>
  findOne(id: string): Promise<Nucleo | undefined>;
}
