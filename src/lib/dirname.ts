import url from 'url';
import path from 'path';

// Calcula correctamente __dirname ya que no está disponible al usar
// Módulos EcmaScript

export function dirname(importMeta: ImportMeta) {
    return path.dirname(filename(importMeta));
}

export function filename(importMeta: ImportMeta) {
    return url.fileURLToPath(importMeta.url);
}
