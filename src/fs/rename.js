import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ERROR_MSG = 'FS operation failed';
const WRONG_FILE_NAME = 'wrongFilename.txt';
const PROPER_FILE_NAME = 'properFilename.md';
const DIR_NAME = 'files';

async function isFileExists(source) {
  try {
    await fsPromises.access(source, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export const rename = async () => {
  const oldPath = path.join(__dirname, DIR_NAME, WRONG_FILE_NAME);
  const newPath = path.join(__dirname, DIR_NAME, PROPER_FILE_NAME);

  if (await isFileExists(newPath)) {
    throw new Error(ERROR_MSG);
  }
  try {
    await fsPromises.rename(oldPath, newPath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(ERROR_MSG);
    }
    console.error(err);
  }
};

rename();
