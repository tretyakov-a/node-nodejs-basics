import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ERROR_MSG = 'FS operation failed';
const DIR_NAME = 'files';

async function getFilesStats(source) {
  const readDir = async (dirPath, parentDir = '') => {
    const files = await fsPromises.readdir(dirPath, { withFileTypes: true });
    const fileNames = await Promise.all(files.map((file) => {
      const filePath = path.join(dirPath, file.name);
      const fileName = `${parentDir}${parentDir && '/'}${file.name}`;
      return file.isDirectory()
        ? readDir(filePath, fileName)
        : [ fileName ];
    }));
    return fileNames.reduce((acc, el) => [...acc, ...el], []);
  };
  return await readDir(source);
}

export const list = async () => {
  const source = path.join(__dirname, DIR_NAME); 
  try {
    const filesStats = await getFilesStats(source);
    console.log(filesStats.join('\n'));
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(ERROR_MSG);
    }
    console.error(err);
  }
};

list();
