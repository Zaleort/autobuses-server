import { DbModels } from '../../database/createDatabase';

export default class GetLineasService {
  private db: DbModels;

  constructor(db: DbModels) {
    this.db = db;
  }

  public async getLineas()  {
    console.log('API Call: Líneas');
    const lineasModel = this.db.lineas;
    if (!lineasModel) {
      throw new Error('Error conectando con la base de datos');
    }

    const lineas = await lineasModel.aggregate([
      {
        $addFields: {
          paradas: {
            $setUnion: [
              { $ifNull: ['$paradasIda', []] },
              { $ifNull: ['$paradasVuelta', []] },
            ],
          },
          nucleos: {
            $setUnion: [
              { $ifNull: ['$nucleosIda', []] },
              { $ifNull: ['$nucleosVuelta', []] },
            ],
          },
        },
      },
      {
        $lookup: {
          from: 'nucleos',
          localField: 'nucleos',
          foreignField: '_id',
          as: 'nucleosInfo',
        },
      },
      {
        $lookup: {
          from: 'paradas',
          localField: 'paradas',
          foreignField: '_id',
          as: 'paradasInfo',
        },
      },
      {
        $project: {
          url: 0,
          horarios: 0,
          paradasIda: 0,
          paradasVuelta: 0,
          nucleosVuelta: 0,
        },
      },
    ]).exec();

    console.log('API Response: Enviadas todas las líneas');
    return lineas;
  };
 }
