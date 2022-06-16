import path from 'path';
import fs from 'fs';
import { getConstants } from '../constants.js';

const { __dirname, FILES_DIR_NAME } = getConstants(import.meta.url);
const FILE_NAME = 'fileToRead.txt';

export const read = async () => {
  const pathToFile = path.join(__dirname, FILES_DIR_NAME, FILE_NAME);
  const readStream = fs.createReadStream(pathToFile);
  
  readStream.on('end', () => process.stdout.write('\n'));
  readStream.pipe(process.stdout, { end: false })
    .on('error', (err) => console.error(err));
};

read();
