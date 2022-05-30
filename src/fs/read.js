import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ERROR_MSG = 'FS operation failed';
const FILE_NAME = 'fileToRead.txt'
const DIR_NAME = 'files';

export const read = async () => {
  const readStream = fs.createReadStream(
    path.join(__dirname, DIR_NAME, FILE_NAME), 
    { highWaterMark: 4 }
  );
  
  readStream.on('data', (chunk) => {
    process.stdout.write(chunk);
  });
  
  readStream.on('error', (err) => {
    if (err.code === 'ENOENT') {
      throw new Error(ERROR_MSG);
    }
    console.error(err);
  });
};

read();
