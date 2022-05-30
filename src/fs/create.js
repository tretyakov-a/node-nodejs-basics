import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DIR_NAME = 'files';
const FILE_NAME = 'fresh.txt';
const FILE_CONTENT = 'I am fresh and young';
const ERROR_MSG = 'FS operation failed';

export const create = async () => {
  const pathToFile = path.join(__dirname, DIR_NAME, FILE_NAME);
  let fd = null;
  try {
    fd = await fsPromises.open(pathToFile, 'wx');
    await fd.write(FILE_CONTENT);
  } catch (err) {
    if (err.code === 'EEXIST') {
      throw new Error(ERROR_MSG);
    }
    console.error(err);
  } finally {
    if (fd) {
      await fd.close();
    }
  }
};

create();
