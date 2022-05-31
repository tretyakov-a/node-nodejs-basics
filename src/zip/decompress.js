import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream/promises';
import { createGunzip } from 'zlib';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FILE_NAME = 'files/fileToCompress.txt';
const COMPRESSED_FILE_NAME = 'files/archive.gz'

export const decompress = async () => {
  try {
    const readStream = fs.createReadStream(path.join(__dirname, COMPRESSED_FILE_NAME));
    const writeStream = fs.createWriteStream(path.join(__dirname, FILE_NAME));
    const gunzip = createGunzip();
  
    await pipeline(readStream, gunzip, writeStream);
  } catch (err) {
    console.error(err);
  }
};

decompress();
