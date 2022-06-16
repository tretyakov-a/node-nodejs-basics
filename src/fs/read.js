import path from 'path';
import fsPromises from 'fs/promises';
import FsOperationFailedError from './error.js';
import { getConstants } from '../constants.js';

const { __dirname, FILES_DIR_NAME, ERRORS } = getConstants(import.meta.url);
const FILE_NAME = 'fileToRead.txt'

export const read = async () => {
  try {
    const pathToFile = path.join(__dirname, FILES_DIR_NAME, FILE_NAME);
    const fileContent = await fsPromises.readFile(pathToFile, 'utf8');
    console.log(fileContent);
  } catch (err) {
    if (err.code === ERRORS.NO_ENTITY) {
      throw new FsOperationFailedError(read.name);
    }
    console.error(err);
  }
};

read()
  .catch((err) => console.error(err));