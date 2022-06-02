import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ERROR_MSG = 'FS operation failed';
const FILE_NAME = 'fileToRemove.txt';
const DIR_NAME = 'files';

export const remove = async () => {
  const pathToFile = path.join(__dirname, DIR_NAME, FILE_NAME);
  try {
    await fsPromises.rm(pathToFile);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(ERROR_MSG);
    }
    console.error(err);
  }
};

remove();
