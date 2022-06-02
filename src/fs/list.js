import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ERROR_MSG = 'FS operation failed';
const DIR_NAME = 'files';

export const list = async () => {
  const source = path.join(__dirname, DIR_NAME); 
  try {
    const filesStats = await fsPromises.readdir(source, { withFileTypes: true });
    console.log(filesStats.map((file) => file.name).join('\n'));
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(ERROR_MSG);
    }
    console.error(err);
  }
};

list();
