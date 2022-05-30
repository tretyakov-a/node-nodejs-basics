import fsPromises from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ERROR_MSG = 'FS operation failed';
const DIR_NAME = 'files';
const pathToDir = path.join(__dirname, DIR_NAME);
const pathToDirCopy = path.join(__dirname, `${DIR_NAME}-copy`);

const copyDir = async (src, dest) => {
  await fsPromises.mkdir(dest);
  const files = await fsPromises.readdir(src, { withFileTypes: true });
  await Promise.all(files.map((file) => {
    const srcFilePath = path.join(src, file.name);
    const destFilePath = path.join(dest, file.name);
    return file.isDirectory()
      ? copyDir(srcFilePath, destFilePath)
      : fsPromises.copyFile(srcFilePath, destFilePath);
  }));
}

export const copy = async () => {
  try {
    await fsPromises.access(pathToDir, fs.constants.F_OK);
    await copyDir(pathToDir, pathToDirCopy);
  } catch (err) {
    if (err.code === 'ENOENT' || err.code === 'EEXIST') {
      throw new Error(ERROR_MSG);
    }
    console.error(err);
  }
};

copy();
