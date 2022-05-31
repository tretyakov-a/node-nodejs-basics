import path from 'path';
import fsPromises from 'fs/promises';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ERROR_MSG = 'FS operation failed';
const FILE_NAME = 'fileToRead.txt'
const DIR_NAME = 'files';

export const read = async () => {
  try {
    const pathToFile = path.join(__dirname, DIR_NAME, FILE_NAME);
    const fileContent = await fsPromises.readFile(pathToFile, 'utf8');
    console.log(fileContent);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(ERROR_MSG);
    }
    console.error(err);
  }
};

read();
