import fsPromises from 'fs/promises';
import path from 'path';
import { __dirname, FILES_DIR_NAME, ERRORS } from './constants.js';
import FsOperationFailedError from './error.js';

const FILE_NAME = 'fileToRemove.txt';

export const remove = async () => {
  const pathToFile = path.join(__dirname, FILES_DIR_NAME, FILE_NAME);
  try {
    await fsPromises.rm(pathToFile);
  } catch (err) {
    if (err.code === ERRORS.NO_ENTITY) {
      throw new FsOperationFailedError(remove.name);
    }
    console.error(err);
  }
};

remove()
  .catch((err) => console.error(err));
