import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ERROR_MSG = 'FS operation failed';
const FILE_NAME = 'fileToRemove.txt';

export const remove = async () => {
  const pathToFile = path.join(__dirname, 'files', FILE_NAME);
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
