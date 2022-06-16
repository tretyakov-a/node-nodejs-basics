import path from 'path';
import { readFile } from 'fs/promises';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c.js';
import { getConstants } from '../constants.js';

const { __dirname, __filename } = getConstants(import.meta.url);

const random = Math.random();

let unknownObject;

const requireJson = async (source) => {
  return JSON.parse(await readFile(path.join(__dirname, source), 'utf8'));
}
unknownObject = await requireJson(random > 0.5 ? 'files/a.json' : 'files/b.json');

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const createMyServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

export {
  unknownObject,
  createMyServer,
};
