import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR_NAME = 'files';
const FILE_NAME = 'fileToWrite.txt';

export const write = async () => {
  const pathToFile = path.join(__dirname, DIR_NAME, FILE_NAME);
  const writeStream = fs.createWriteStream(pathToFile);

  process.stdin.pipe(writeStream)
    .on('error', (err) => console.error(err));
};

write();
