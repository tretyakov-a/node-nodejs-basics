import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream/promises';
import { createGzip } from 'zlib';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DIR_NAME = 'files';
const FILE_NAME = 'fileToCompress.txt';
const COMPRESSED_FILE_NAME = 'archive.gz'

export const compress = async () => {
  try {
    const readStream = fs.createReadStream(path.join(__dirname, DIR_NAME, FILE_NAME));
    const writeStream = fs.createWriteStream(path.join(__dirname, DIR_NAME, COMPRESSED_FILE_NAME));
    const gzip = createGzip();
  
    await pipeline(readStream, gzip, writeStream);
  } catch (err) {
    console.error(err);
  }
};

compress();
