import fsPromises from 'fs/promises';
import path from 'path';
import { __dirname, FILES_DIR_NAME, ERRORS } from './constants.js';
import FsOperationFailedError from './error.js';

const FILE_NAME = 'fresh.txt';
const FILE_CONTENT = 'I am fresh and young';

export const create = async () => {
  const pathToFile = path.join(__dirname, FILES_DIR_NAME, FILE_NAME);
  let fd = null;
  try {
    fd = await fsPromises.open(pathToFile, 'wx');
    await fd.write(FILE_CONTENT);
  } catch (err) {
    if (err.code === ERRORS.EXIST) {
      throw new FsOperationFailedError(create.name);
    }
    console.error(err);
  } finally {
    if (fd) {
      await fd.close();
    }
  }
};

create()
  .catch((err) => console.error(err));
