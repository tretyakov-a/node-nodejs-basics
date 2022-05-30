import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR_NAME = 'files';
const FILE_NAME = 'fileToRead.txt';

export const read = async () => {
  const pathToFile = path.join(__dirname, DIR_NAME, FILE_NAME);
  const readStream = fs.createReadStream(pathToFile);
  
  readStream.on('end', () => console.log('\n'));
  readStream.pipe(process.stdout, { end: false })
    .on('error', (err) => console.error(err));
};

read();
