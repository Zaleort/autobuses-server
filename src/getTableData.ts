import request from 'request-promise';
import cheerio from 'cheerio';
import { DbModels } from './database/createDatabase';

let db: DbModels;
const transform = (body: any) => cheerio.load(body);

export function setDatabase(database: DbModels) {
  db = database;
}

export async function updateDatabase() {
  let count = await db.nucleos.countDocuments();
  if (count === 0) {
    await getNucleos();
  }

  count = await db.lineas.countDocuments();
  if (count === 0) {
    await getLineas();
  }

  await getLineasData();
}

export async function getNucleos() {
  const urlNucleos = 'http://siu.ctal.es/es/horarios.php';
  try {
    const $ = await request(urlNucleos, { transform });
    const nucleos = $('option', '#municipioLineas');

    const nucleosObj: any[] = [];
    nucleos.each((i: number, elem: any) => {
      const _id = `n${i}`;
      const name = $(elem).text();

      if (name !== 'Todos' && name !== 'Vacio') {
        nucleosObj.push({ _id, name });
      }
    });

    await db.nucleos.insertMany(nucleosObj);
  } catch (error) {
    console.log('Error obteniendo núcleos');
    console.warn(error);
  }
}

export async function getLineas() {
  console.log('Obteniendo lista de líneas');
  const urlLineas = 'http://siu.ctal.es/es/lineas.php';

  try {
    const $ = await request(urlLineas, { transform });
    const span = $('span', '.linea').filter((i: number, elem: any) => $(elem).text().startsWith('M-'));
    const lineas: any[] = [];

    span.each((i: number, elem: any) => {
      const name = $(elem).text().trim();
      const _id = name.replace('-', '').toLocaleLowerCase();
      const url = `http://siu.ctal.es/es/${$(elem).parent('a').attr('href')}`;

      lineas.push({ _id, name, url });
    });

    await db.lineas.insertMany(lineas);
    console.log('Líneas añadidas con éxito');
  } catch (error) {
    console.log('Ha ocurrido un error obteniendo las líneas');
  }
} 

export async function getLineasData() {
  try {
    const lineas = await db.lineas.find();

    lineas.forEach(async l => {
      if (l === null) return;
      await getTablaHorarios(l._id, l.url);
    });

    console.log('Finalizado');
  } catch (err) {
    console.log('Ha ocurrido un error obteniendo los datos de las líneas');
    console.warn(err.stack);
  }
}

export async function getTablaHorarios(id: string, url: string) {
  console.log(`Obteniendo información de la tabla de horarios para: ${id}`);

  try {
    const $ = await request(url, { transform });

    const tablas = $('.tabla_horario');
    const ida = $(tablas).get(0);
    const vuelta = $(tablas).get(1);

    console.log('Obteniendo núcleos ida');
    const nucleosIda = await getNucleosLinea(ida);

    console.log('Obteniendo paradas ida');
    const paradasIda = await getParadasLinea(ida);

    console.log('Obteniendo número de saltos');
    const saltos = await getSaltos(paradasIda);

    console.log('Obteniendo horarios ida');
    const horariosIda = getHorariosLinea(ida, paradasIda);

    console.log('Obteniendo información sobre accesibilidad');
    const accesible = getAccesible($);

    console.log('Obteniendo núcleos vuelta');
    const nucleosVuelta = await getNucleosLinea(vuelta);

    console.log('Obteniendo paradas vuelta');
    const paradasVuelta = await getParadasLinea(vuelta);

    console.log('Obteniendo horarios vuelta');
    const horariosVuelta = getHorariosLinea(vuelta, paradasVuelta);

    console.log('Obteniendo recorrido');
    const recorrido = await getRecorrido(nucleosIda);

    const linea = await db.lineas.findOne({ _id: id });
    if (!linea) {
      throw new Error(`Línea no encontrada: ${id}`);
    }

    linea.paradasIda = paradasIda as [];
    linea.paradasVuelta = paradasVuelta as [];
    linea.nucleosIda = nucleosIda as [];
    linea.nucleosVuelta = nucleosVuelta as [];
    linea.horarios = { ida: horariosIda, vuelta: horariosVuelta };
    linea.accesible = accesible;
    linea.saltos = saltos;
    linea.recorrido = recorrido;

    await linea.save();
  } catch (error) {
    console.log(`Ha ocurrido un error obteniendo los horarios de ${id}`)
    console.warn(error);
  }
}

export async function getNucleosLinea(tabla: any) {
  if (!tabla) return [];
  let $ = cheerio.load(tabla);

  const nucleosTabla = $('th', '#fila1');
  const nucleos = [];
  const nucleosNames: string[] = [];

  nucleosTabla.each((i: number, elem) => {
    const name = $(elem).text();
    if (name === 'Frecuencia') { return; }
    nucleosNames.push(name);
  });

  try {
    for (let i = 0; i < nucleosNames.length; i++) {
      const doc = await db.nucleos.findOne({ name: nucleosNames[i] });

      if (doc === null) {
        console.log(nucleosNames[i]);
        continue;
      }

      nucleos.push(doc._id);
    }
  } catch (err) {
    console.log(err.stack);
  }

  console.log('Núcleos obtenidos');
  return nucleos;
}

// Como no hay forma de recoger todas las paradas desde una sola URL
// desde aquí se consigue la información completa de las paradas
// y las relativas para las líneas
export async function getParadasLinea(tabla: any): Promise<string[]> {
  if (!tabla) return [];
  const $ = cheerio.load(tabla);

  // Generación dinámica de IDs
  let _id;

  const paradasFila = $('tr').get(1);
  const paradasTabla = $('th', paradasFila);
  const paradasLinea: string[] = [];
  const paradas: any[] = [];

  try {
    // El objeto en la colección con ID 0 es el index con el que se generan el resto de IDs
    let doc = await db.paradas.findOne({ _id: 0 });

    if (!doc) {
      doc = await db.paradas.create({ _id: 0, index: 154 })
    }

    _id = `p${doc.index}`;

    paradasTabla.each((i, elem) => {
      const name = $(elem).text();
      const zona = getZona($(elem).css('background'));
      paradas.push({ name, zona });
    });

    for (let i = 0; i < paradas.length; i++) {
      const res = await db.paradas.findOne({ name: paradas[i].name });
      if (res != null && res.name) {
        paradasLinea.push(res._id as string);
      } else {
        db.paradas.create({ _id, name: paradas[i].name, zona: paradas[i].zona });
        paradasLinea.push(_id);

        doc.index ? doc.index++ : doc.index = 0;
        _id = `p${doc.index}`;
        await doc.save();
      }
    }
  } catch (err) {
    console.log(err.stack);
  }

  console.log('Paradas obtenidas');
  return paradasLinea;
}

export function getHorariosLinea(tabla: any, paradas: string[]) {
  if (!tabla) return [];

  const $ = cheerio.load(tabla);
  const filas = $('tr');
  const horarios: any = {};

  filas.each((i, elem) => {
    if (i < 2) { return; }
    const data = $('td', elem);

    const frecuencia = $(data.get(paradas.length)).text();

    for (let j = 0; j < paradas.length; j++) {
      const hora = $(data.get(j)).text();
      const horario = { hora, frecuencia };

      if (!horarios[paradas[j]]) {
        horarios[paradas[j]] = [];
      }

      horarios[paradas[j]].push(horario);
    }
  });

  console.log('Horarios obtenidos');
  return horarios;
}

export function getZona(color: string) {
  switch (color) {
    case '#6db0ff': return 'A';
    case '#aaff85': return 'B';
    case '#da85ff': return 'C';
    case '#3cff8e': return 'D';
    case '#00da64': return 'E';
    case '#ff150c': return 'F';
    case '#ff8594': return 'G';
    case '#da8700': return 'H';
    case '#ffc124': return 'I';
    case '#e6f20c': return 'J';
    default: return '';
  }
}

export async function getSaltos(paradas: string[]) {
  let saltos = -1;
  const zonas: string[] = [];

  try {
    for (let i = 0; i < paradas.length; i++) {
      const parada = await db.paradas.findOne({ _id: paradas[i] });
      if (!parada) {
        continue;
      }

      if (!zonas.some(z => z === parada.zona)) {
        zonas.push(parada.zona);
        saltos++;
      }
    }

    return saltos;
  } catch (err) {
    console.log(err.stack);
    return saltos;
  }
}

export async function getRecorrido(nucleos: string[]) {
  if (!nucleos || nucleos.length === 0) return '';

  const salidaId = nucleos[0];
  const destinoId = nucleos[nucleos.length - 1];

  const salida = await db.nucleos.findOne({ _id: salidaId });
  const destino = await db.nucleos.findOne({ _id: destinoId });
  if (!salida || !destino) return '';

  return `${salida.name} - ${destino.name}`;
}

export function getAccesible(html: any): boolean {
  const accesible = html('#informacion ul').children().last().text();
  return accesible.includes('sí');
}
