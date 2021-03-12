import url from 'url';
import path from 'path';

export function dirname(importMeta: ImportMeta) {
    return path.dirname(filename(importMeta));
}

export function filename(importMeta: ImportMeta) {
    return url.fileURLToPath(importMeta.url);
}
