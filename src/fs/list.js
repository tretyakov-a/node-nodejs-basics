import fsPromises from 'fs/promises';
import path from 'path';
import { __dirname, FILES_DIR_NAME, ERRORS } from './constants.js';
import FsOperationFailedError from './error.js';

export const list = async () => {
  const source = path.join(__dirname, FILES_DIR_NAME); 
  try {
    const filesStats = await fsPromises.readdir(source, { withFileTypes: true });
    console.log(filesStats.map((file) => file.name).join('\n'));
  } catch (err) {
    if (err.code === ERRORS.NO_ENTITY) {
      throw new FsOperationFailedError(list.name);
    }
    console.error(err);
  }
};

list()
  .catch((err) => console.error(err));
