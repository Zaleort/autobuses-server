import Linea from "../../domain/lineas/Linea.js"

export default class GetLineasResult {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly url: string,
        public readonly accesible: boolean,
        public readonly horarios: object,
        public readonly nucleosIda: any[],
        public readonly nucleosVuelta: any[],
        public readonly paradasIda: any[],
        public readonly paradasVuelta: any[],
        public readonly saltos: number,
        public readonly recorrido: string,
        public readonly nucleosInfo: any[],
        public readonly paradasInfo: any[],
    ) {}

    public static fromEntity(linea: Linea, nucleosInfo: any[], paradasInfo: any[]): GetLineasResult {
        return new GetLineasResult(
            linea.id,
            linea.name,
            linea.url,
            linea.accesible,
            linea.horarios, 
            linea.nucleosVuelta,
            linea.nucleosVuelta,
            linea.paradasIda,
            linea.paradasVuelta,
            linea.saltos,
            linea.recorrido,
            nucleosInfo,
            paradasInfo
        );
    }
}