export default class Parada {
  public readonly id: string;
  public readonly name: string;
  public readonly zona: string;
  public readonly index?: number;

  constructor(id: string, name: string, zona: string, index?: number) {
    this.id = id;
    this.name = name;
    this.zona = zona;
    this.index = index;
  }
}
