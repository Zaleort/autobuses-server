import Parada from "./Parada";

export interface ParadasRepository {
  findAll: () => Promise<Parada[] | undefined>
  findOne: (id: string) => Promise<Parada | undefined>
}