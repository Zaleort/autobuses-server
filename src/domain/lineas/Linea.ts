export default class Linea {
  public readonly id: string;
  public readonly name: string;
  public readonly url: string;
  public readonly accesible: boolean;
  public readonly horarios: object;
  public readonly nucleosIda: any[];
  public readonly nucleosVuelta: any[];
  public readonly paradasIda: any[];
  public readonly paradasVuelta: any[];
  public readonly saltos: number;
  public readonly recorrido: string;

  constructor(
    id: string,
    name: string,
    url: string,
    accesible: boolean,
    horarios: object,
    nucleosIda: any[],
    nucleosVuelta: any[],
    paradasIda: any[],
    paradasVuelta: any[],
    saltos: number,
    recorrido: string,
  ) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.accesible = accesible;
    this.horarios = horarios;
    this.nucleosIda = nucleosIda;
    this.nucleosVuelta = nucleosVuelta;
    this.paradasIda = paradasIda;
    this.paradasVuelta = paradasVuelta;
    this.saltos = saltos;
    this.recorrido = recorrido;
  }
}